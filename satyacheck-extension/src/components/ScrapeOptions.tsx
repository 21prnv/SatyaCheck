import React, { useState } from "react";
import { ScrapeOptions as ScrapeOptionsType } from "../types/types";

interface ScrapeOptionsProps {
  onScrape: (options: ScrapeOptionsType) => void;
}

const ScrapeOptions: React.FC<ScrapeOptionsProps> = ({ onScrape }) => {
  const [options] = useState<ScrapeOptionsType>({
    text: true,
  });

  const handleScrape = () => {
    onScrape(options);
  };

  return (
    <div className="w-64 p-3 bg-gray-50 text-gray-800 font-sans">
      <button
        onClick={handleScrape}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!options.text}
      >
        Analyze Page
      </button>
    </div>
  );
};

export default ScrapeOptions;
