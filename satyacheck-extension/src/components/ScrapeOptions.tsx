import React, { useState } from "react";
import { ScrapeOptions as ScrapeOptionsType } from "../types/types";

interface ScrapeOptionsProps {
  onScrape: (options: ScrapeOptionsType) => void;
}

const ScrapeOptions: React.FC<ScrapeOptionsProps> = ({ onScrape }) => {
  const [options, setOptions] = useState<ScrapeOptionsType>({
    text: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setOptions((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleScrape = () => {
    onScrape(options);
  };

  return (
    <div className="w-64 p-3 bg-gray-50 text-gray-800 font-sans">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="text"
            checked={options.text}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
          />
          <label
            htmlFor="text"
            className="text-sm font-medium text-gray-700 select-none cursor-pointer"
          >
            Scrape Text Content
          </label>
        </div>
      </div>

      <button
        onClick={handleScrape}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!options.text}
      >
        Scrape Page
      </button>
    </div>
  );
};

export default ScrapeOptions;
