import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChromeMessaging } from "@/hooks/useChromeMessaging";
import ScrapeOptions from "@/components/ScrapeOptions";
import StatusMessage from "@/components/StatusMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function App() {
  const { scrapedData, status, scrapeWebsite } = useChromeMessaging();
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Simulate analysis steps with animations
  useEffect(() => {
    if (status.type === "loading") {
      const steps = [
        "Searching for resources...",
        "Fact-checking content...",
        "Analyzing credibility...",
        "Verifying sources...",
        "Generating report...",
      ];
      setAnalysisSteps(steps);

      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [status.type]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-6">
      <Card className="mx-auto max-w-3xl border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center text-2xl font-bold">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                repeatDelay: 5,
              }}
              className="mr-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M12 8V12L15 15"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
            Satya Check AI
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrapeOptions onScrape={scrapeWebsite} />

          {/* Analysis Animation */}
          {status.type === "loading" && (
            <Card className="mt-6 overflow-hidden border-none bg-white/80 shadow-md">
              <CardContent className="p-4">
                <div className="mb-3 flex justify-between">
                  <span className="text-sm font-medium text-indigo-700">
                    Analysis in progress
                  </span>
                  <span className="text-xs text-indigo-500">
                    {currentStep + 1}/{analysisSteps.length}
                  </span>
                </div>
                <Progress
                  value={((currentStep + 1) / analysisSteps.length) * 100}
                  className="h-2 bg-indigo-100"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 flex items-center"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="mr-3 h-3 w-3 rounded-full bg-indigo-500"
                    />
                    <span className="text-base font-medium text-gray-700">
                      {analysisSteps[currentStep]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          )}

          {/* Display Analysis Results */}
          {scrapedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 space-y-6"
            >
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                  Analysis Results
                </h2>

                {/* Verdict Badge */}
                <div className="mb-6 flex justify-center">
                  <Badge
                    className={`px-4 py-2 text-lg font-semibold ${
                      scrapedData.real_percentage > 70
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : scrapedData.real_percentage > 40
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }`}
                  >
                    {scrapedData.real_percentage > 70
                      ? "Likely Authentic"
                      : scrapedData.real_percentage > 40
                      ? "Potentially Misleading"
                      : "Likely False"}
                  </Badge>
                </div>

                {/* Percentage Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between">
                      <p className="text-sm font-medium text-gray-700">
                        Authenticity Score
                      </p>
                      <p className="text-sm font-bold text-green-600">
                        {scrapedData.real_percentage}%
                      </p>
                    </div>
                    <Progress
                      value={scrapedData.real_percentage}
                      className="h-2.5 bg-gray-100"
                      indicatorClassName="bg-gradient-to-r from-green-400 to-green-600"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between">
                      <p className="text-sm font-medium text-gray-700">
                        Misinformation Score
                      </p>
                      <p className="text-sm font-bold text-red-600">
                        {scrapedData.fake_percentage}%
                      </p>
                    </div>
                    <Progress
                      value={scrapedData.fake_percentage}
                      className="h-2.5 bg-gray-100"
                      indicatorClassName="bg-gradient-to-r from-red-400 to-red-600"
                    />
                  </div>
                </div>

                {/* Explanation with Markdown */}
                <div className="mt-6">
                  <h3 className="mb-3 text-xl font-semibold text-gray-800">
                    Explanation
                  </h3>
                  <div className="rounded-lg bg-gray-50 p-4 text-gray-700">
                    <ReactMarkdown>{scrapedData.explanation}</ReactMarkdown>
                  </div>
                </div>

                {/* Related Links */}
                {scrapedData.related_links &&
                  scrapedData.related_links.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-3 text-xl font-semibold text-gray-800">
                        Related Links
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {scrapedData.related_links.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center rounded-md bg-indigo-50 px-3 py-2 text-sm text-indigo-700 transition-colors hover:bg-indigo-100"
                          >
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Source {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Cross-Check Sources */}
                {scrapedData.cross_check_sources &&
                  scrapedData.cross_check_sources.length > 0 && (
                    <div className="mt-6">
                      <h3 className="mb-3 text-xl font-semibold text-gray-800">
                        Cross-Check Sources
                      </h3>
                      <ul className="space-y-2 rounded-lg bg-gray-50 p-4">
                        {scrapedData.cross_check_sources.map(
                          (source, index) => (
                            <li key={index} className="text-gray-700">
                              • {source}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </motion.div>
          )}

          <StatusMessage status={status} />
        </CardContent>
      </Card>
    </div>
  );
}
