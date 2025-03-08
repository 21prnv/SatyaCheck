import React from "react";
import ScrapeOptions from "./components/ScrapeOptions";
import StatusMessage from "./components/StatusMessage";
import { useChromeMessaging } from "./hooks/useChromeMessaging";

const App: React.FC = () => {
  const { scrapedData, status, scrapeWebsite, downloadData } =
    useChromeMessaging();

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Website Scraper</h1>

      <ScrapeOptions onScrape={scrapeWebsite} />

      <button
        onClick={downloadData}
        disabled={!scrapedData}
        className={`w-full py-2 px-4 rounded font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
          ${
            scrapedData
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Download Results
      </button>

      <StatusMessage status={status} />
    </div>
  );
};

export default App;
