/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from "react";
import { ScrapedData, ScrapeOptions, StatusState } from "../types/types";
import { analyzeContentWithGemini } from "../geminiClient";

export const useChromeMessaging = () => {
  const [contentScriptReady, setContentScriptReady] = useState<boolean>(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [status, setStatus] = useState<StatusState>({
    type: "idle",
    message: "Ready to analyze",
  });
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  // Check if content script is ready when the popup opens
  useEffect(() => {
    const checkContentScript = async () => {
      try {
        const tabs = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tabs || tabs.length === 0) {
          return;
        }

        const activeTab = tabs[0];

        try {
          const response = await chrome.tabs.sendMessage(activeTab.id!, {
            action: "ping",
          });
          if (response && response.status === "ready") {
            setContentScriptReady(true);
          }
        } catch (error) {
          console.log("Content script not yet loaded");
        }
      } catch (error) {
        console.error("Error checking content script:", error);
      }
    };

    checkContentScript();

    // Listen for contentScriptReady message
    const handleMessage = (message: any) => {
      if (message.action === "contentScriptReady") {
        console.log("Content script is ready");
        setContentScriptReady(true);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  // Inside the scrapeWebsite function
  const scrapeWebsite = useCallback(
    async (options: ScrapeOptions) => {
      setStatus({ type: "loading", message: "Analyzing..." });

      try {
        const tabs = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tabs || tabs.length === 0) {
          setStatus({ type: "error", message: "No active tab found" });
          return;
        }

        const activeTab = tabs[0];

        if (!contentScriptReady) {
          try {
            await chrome.scripting.executeScript({
              target: { tabId: activeTab.id! },
              files: ["content.js"],
            });

            // Wait a moment for the script to initialize
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (error: any) {
            setStatus({
              type: "error",
              message: `Error injecting content script: ${error.message}`,
            });
            return;
          }
        }

        try {
          const response = await chrome.tabs.sendMessage(activeTab.id!, {
            action: "scrape",
            options,
          });

          if (response && response.data) {
            const { timestamp, url, ...filteredData } = response.data;

            // Store the URL in state
            setCurrentUrl(url);

            // Send the scraped data to Gemini
            const geminiResponse = await analyzeContentWithGemini(filteredData);

            // Store the Gemini response
            setScrapedData(geminiResponse);
            setStatus({
              type: "success",
              message: "Data analyzed successfully!",
            });
          } else if (response && response.error) {
            setStatus({ type: "error", message: `Error: ${response.error}` });
          } else {
            setStatus({
              type: "error",
              message: "No response from content script",
            });
          }
        } catch (error: any) {
          setStatus({ type: "error", message: `Error: ${error.message}` });
        }
      } catch (error: any) {
        setStatus({ type: "error", message: `Error: ${error.message}` });
      }
    },
    [contentScriptReady]
  );

  return {
    contentScriptReady,
    scrapedData,
    status,
    scrapeWebsite,
    url: currentUrl,
  };
};
