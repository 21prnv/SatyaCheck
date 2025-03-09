import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChromeMessaging } from "@/hooks/useChromeMessaging";
import ScrapeOptions from "@/components/ScrapeOptions";
import StatusMessage from "@/components/StatusMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { createSupabaseClient } from "@/utils/supabaseClient";
import { toast } from "sonner";

interface NewsEntry {
  isFake: string;
  fake_percentage: number;
  real_percentage: string;
  reasons_for_determination: string;
  related_links: string[];
  author_verified: string;
  post_date: string;
  subject_expertise: string;
  media_presence: string;
  cross_check_sources: string[];
  url: string;
}

export default function App() {
  const { scrapedData, status, scrapeWebsite, url } = useChromeMessaging();
  const [analysisSteps, setAnalysisSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

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

  const handleShareToNews = async () => {
    if (!scrapedData || !url) return;

    setIsSaving(true);

    try {
      const supabase = await createSupabaseClient();

      const newsEntry: NewsEntry = {
        isFake: scrapedData.fake.toString(),
        fake_percentage: scrapedData.fake_percentage,
        real_percentage: scrapedData.real_percentage.toString(),
        reasons_for_determination: scrapedData.explanation,
        related_links: scrapedData.related_links,
        author_verified: scrapedData.author_verified.toString(),
        post_date: scrapedData.post_date,
        subject_expertise: scrapedData.subject_expertise,
        media_presence: scrapedData.media_presence.toString(),
        cross_check_sources: scrapedData.cross_check_sources,
        url: url,
      };

      const { data, error } = await supabase
        .from("news")
        .insert([newsEntry])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        const newId = data[0].id;
        const postUrl = `https://satya-check.vercel.app/posts/${newId}`;
        setGeneratedUrl(postUrl);

        // Update status for success
        status.type = "success";
        status.message = "Successfull!";
      }
    } catch (error) {
      console.error("Error saving to Supabase:", error);
      status.type = "error";
      status.message = "Failed to share to news database";
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="h-[600px] w-[400px] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <Card className="min-h-full border-none">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-600 text-white sticky top-0 z-50 py-4">
            <CardTitle className="flex items-center justify-between text-xl">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow"
                  >
                    <path
                      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8L10 12H14L12 16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
                Satya Check AI
              </div>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white hover:bg-white/30"
              >
                v1.0
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-3 space-y-3">
            <div className="flex justify-center">
              <ScrapeOptions onScrape={scrapeWebsite} />
            </div>

            {/* Loading Animation */}
            {status.type === "loading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2"
              >
                <Card className="border border-blue-100 bg-blue-50/30">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-700">
                        Analyzing content...
                      </span>
                      <Badge className="bg-blue-100 text-blue-700">
                        {currentStep + 1}/{analysisSteps.length}
                      </Badge>
                    </div>
                    <Progress
                      value={((currentStep + 1) / analysisSteps.length) * 100}
                      className="h-1.5"
                    />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-2 text-sm text-blue-600"
                      >
                        {analysisSteps[currentStep]}
                      </motion.div>
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Results Section */}
            {scrapedData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {/* Verdict */}
                <div className="flex justify-center">
                  <Badge
                    className={`px-4 py-2 text-base font-medium hover:bg-opacity-90 ${
                      scrapedData.real_percentage > 70
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : scrapedData.real_percentage > 40
                        ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                        : "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-100"
                    }`}
                  >
                    {scrapedData.real_percentage > 70
                      ? "✓ Likely Authentic"
                      : scrapedData.real_percentage > 40
                      ? "⚠ Potentially Misleading"
                      : "✗ Likely False"}
                  </Badge>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-2 gap-2">
                  <Card className="border border-emerald-100 bg-emerald-50/30">
                    <CardContent className="p-2">
                      <p className="text-xs font-medium text-emerald-700">
                        Authenticity
                      </p>
                      <p className="text-lg font-bold text-emerald-600">
                        {scrapedData.real_percentage}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border border-rose-100 bg-rose-50/30">
                    <CardContent className="p-2">
                      <p className="text-xs font-medium text-rose-700">
                        Misinformation
                      </p>
                      <p className="text-lg font-bold text-rose-600">
                        {scrapedData.fake_percentage}%
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Explanation Section */}
                <Card className="border border-gray-100">
                  <CardContent className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">
                      Key Findings
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      {scrapedData.explanation.split("\n").map(
                        (point, index) =>
                          point.trim() && (
                            <div key={index} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <p>{point.trim()}</p>
                            </div>
                          )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Related Links */}
                {scrapedData.related_links &&
                  scrapedData.related_links.length > 0 && (
                    <Card className="border border-gray-100">
                      <CardContent className="p-3">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2">
                          Related Sources
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {scrapedData.related_links.map((link, index) => (
                            <motion.a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Source {index + 1}
                            </motion.a>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                {/* Share Button or Link Section */}
                <div className="flex justify-end">
                  {generatedUrl ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 bg-blue-50 p-2 rounded w-full"
                    >
                      <a
                        href={generatedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Report
                      </a>
                      <div className="flex-1" />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedUrl);
                          toast.success("Link copied!", {
                            style: {
                              backgroundColor: "white",
                              color: "#1e40af",
                              border: "1px solid #e2e8f0"
                            }
                          });
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Copy Link
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      onClick={handleShareToNews}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-1.5 rounded text-sm font-medium disabled:opacity-50 flex items-center gap-1.5 shadow hover:shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSaving ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            ⏳
                          </motion.div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <span>Share Report</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            <StatusMessage status={status} />
          </CardContent>
        </Card>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}
