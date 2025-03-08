/* eslint-disable @typescript-eslint/no-explicit-any */
console.log("Content script loaded");

// Initialize
chrome.runtime.sendMessage({ action: "contentScriptReady" });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in content script:", request, sender);

  // Respond to ping message to check if content script is loaded
  if (request.action === "ping") {
    sendResponse({ status: "ready" });
    return true;
  }

  if (request.action === "scrape") {
    const options = request.options;
    const data: any = {};

    try {
      // Get page metadata
      data.title = document.title;
      data.url = window.location.href;
      data.timestamp = new Date().toISOString();

      // Get HTML content if requested
      if (options.html) {
        data.html = document.documentElement.outerHTML;
      }

      // Get text content if requested
      if (options.text) {
        data.text = document.body.innerText;
      }

      // Get links if requested
      if (options.links) {
        const links = Array.from(document.querySelectorAll("a"));
        data.links = links.map((link: HTMLAnchorElement) => ({
          text: link.innerText,
          href: link.href,
        }));
      }

      // Get images if requested
      if (options.images) {
        const images = Array.from(document.querySelectorAll("img"));
        data.images = images.map((img: HTMLImageElement) => ({
          src: img.src,
          alt: img.alt,
          width: img.width,
          height: img.height,
        }));
      }

      console.log("Data scraped successfully:", data);
      sendResponse({ data: data });
    } catch (error: any) {
      console.error("Error during scraping:", error);
      sendResponse({ error: error.message });
    }

    return true; // Keep the message channel open for async response
  }
});
