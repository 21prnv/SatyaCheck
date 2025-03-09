"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowUp,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/utils/motion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supbase/client";
import { toast } from "sonner";

interface NewsItem {
  id: string;
  title?: string;
  content?: string;
  fake_percentage?: string;
  real_percentage?: string;
  isFake?: string;
  author_verified?: string;
  subject_expertise?: string;
  reasons_for_determination?: string;
  post_date?: string;
  media_presence: string;
  votes?: string[];
  url?: string;
}

interface NewsProps {
  news: NewsItem[];
}

const NewsSection = ({ news }: NewsProps) => {
  const [votes, setVotes] = useState<{ [key: string]: string[] }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from("user")
          .select("*")
          .eq("id", user.id)
          .single();
        setCurrentUser(userData);
      }
    };
    fetchUser();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpvote = async (postId: any, e: any) => {
    e.stopPropagation();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    try {
      const { data: newsItem } = await supabase
        .from("news")
        .select("votes")
        .eq("id", postId)
        .single();

      const currentVotes = newsItem?.votes || [];
      const newVotes = currentVotes.includes(currentUser.id)
        ? currentVotes.filter((id: any) => id !== currentUser.id)
        : [...currentVotes, currentUser.id];

      const { data, error } = await supabase
        .from("news")
        .update({ votes: newVotes })
        .eq("id", postId)
        .select()
        .single();

      if (error) throw error;

      setVotes((prev) => ({
        ...prev,
        [postId]: newVotes,
      }));
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  useEffect(() => {
    const fetchVotes = async () => {
      const { data, error } = await supabase.from("news").select("id, votes");
      if (data) {
        const votesMap = data.reduce(
          (acc, item) => ({
            ...acc,
            [item.id]: item.votes || [],
          }),
          {}
        );
        setVotes(votesMap);
      }
    };
    fetchVotes();
  }, []);

  const handleCardClick = (postId: any) => {
    router.push(`/posts/${postId}`);
  };

  const getNewsSeverity = (item: any) => {
    const fakePercentage = Number(item.fake_percentage);
    if (fakePercentage >= 70) return "high";
    if (fakePercentage >= 30) return "medium";
    return "low";
  };

  const getNewsCategory = (item: any) => {
    if (item.subject_expertise && item.subject_expertise.includes("/")) {
      return item.subject_expertise.split("/")[0];
    }
    return item.subject_expertise || "Unknown";
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return "Unknown date";
    if (dateString.includes(",")) return dateString;

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

      if (diffHours < 24) {
        return diffHours <= 1 ? "1 hour ago" : `${diffHours} hours ago`;
      } else if (diffDays < 7) {
        return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    } catch (e) {
      return dateString;
    }
  };

  const getCategoryStyles = (category: string) => {
    const styles = {
      "Fact-checking": "bg-purple-100 text-purple-700 hover:bg-purple-200",
      Economic: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      Health: "bg-sky-100 text-sky-700 hover:bg-sky-200",
      Politics: "bg-orange-100 text-orange-700 hover:bg-orange-200",
      Technology: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
      Science: "bg-teal-100 text-teal-700 hover:bg-teal-200",
    };
    return (
      styles[category as keyof typeof styles] ||
      "bg-gray-100 text-gray-700 hover:bg-gray-200"
    );
  };

  const handleOpenSource = (post: any) => {
    console.log("Opening source:", post.url);
    if (post?.url != null) {
      window.open(post.url, "_blank");
    } else {
      toast.error("Source URL not found", {
        style: {
          backgroundColor: "#f44336",
          color: "white",
        },
      });
    }
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none"></div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
        <div className="relative mb-8 md:mb-0">
          <div className="absolute -z-10 -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-2xl opacity-30"></div>
          <div className="relative">
            <span className="inline-block px-4 py-1.5 mb-3 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
              AI-Powered Analysis
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative">
              Recent{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600">News</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-100 rounded-md -z-10"></span>
              </span>{" "}
              Analysis
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl text-lg">
              Stay informed with our comprehensive fact-checking system
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-gray-100">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-gradient-to-r from-red-50 to-red-100 text-red-600 py-2 px-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-help border border-red-200/30">
                  <AlertTriangle className="w-4 h-4 mr-1.5" />
                  Fake
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>News verified as fake</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-gradient-to-r from-amber-50 to-amber-100 text-amber-600 py-2 px-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-help border border-amber-200/30">
                  <Shield className="w-4 h-4 mr-1.5" />
                  Misleading
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Content requiring further verification</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-gradient-to-r from-green-50 to-green-100 text-green-600 py-2 px-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-help border border-green-200/30">
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  Real
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Verified authentic news</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        key={`page-${currentPage}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8"
      >
        {news
          .slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
          )
          .map((newsItem: NewsItem, index: number) => {
            const isFake =
              newsItem.isFake === "true" ||
              Number(newsItem.fake_percentage) > 50;
            const isHighlyCredible = Number(newsItem.real_percentage) > 80;
            const isMisleading = !isFake && !isHighlyCredible;
            const category = getNewsCategory(newsItem);
            const reasonsText = newsItem.reasons_for_determination || "";
            const firstSentenceEnd = reasonsText.indexOf(". ");
            const title =
              firstSentenceEnd > 0
                ? reasonsText.substring(0, firstSentenceEnd + 1)
                : "News Analysis";
            const description = reasonsText;

            return (
              <motion.div
                key={newsItem.id}
                variants={fadeIn("up", "spring", index * 0.15, 0.65)}
              >
                <Card
                  className={`group h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer overflow-hidden border-0 bg-white/80 backdrop-filter backdrop-blur-sm ${
                    isFake
                      ? "hover:shadow-red-100/50"
                      : isHighlyCredible
                      ? "hover:shadow-green-100/50"
                      : "hover:shadow-amber-100/50"
                  }`}
                  onClick={() => handleCardClick(newsItem.id)}
                >
                  <div className="relative">
                    {/* Status Badge */}
                    <div
                      className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm ${
                        isFake
                          ? "bg-gradient-to-r from-red-500 to-red-600"
                          : isHighlyCredible
                          ? "bg-gradient-to-r from-green-500 to-green-600"
                          : "bg-gradient-to-r from-amber-500 to-amber-600"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {isFake ? (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        ) : isHighlyCredible ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <Shield className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {isFake
                            ? "Fake"
                            : isHighlyCredible
                            ? "Real"
                            : "Misleading"}
                        </span>
                      </div>
                    </div>

                    {/* Credibility Score */}
                    <div
                      className={`absolute top-3 right-3 z-10 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm ${
                        isFake
                          ? "bg-white/90 text-red-600 border border-red-100"
                          : isHighlyCredible
                          ? "bg-white/90 text-green-600 border border-green-100"
                          : "bg-white/90 text-amber-600 border border-amber-100"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="font-bold">
                          {isFake
                            ? newsItem.fake_percentage
                            : newsItem.real_percentage}
                          %
                        </span>
                      </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full h-48 overflow-hidden">
                      <div
                        className={`absolute inset-0 z-10 ${
                          isFake
                            ? "bg-gradient-to-t from-red-900/70 via-transparent to-transparent"
                            : isHighlyCredible
                            ? "bg-gradient-to-t from-green-900/70 via-transparent to-transparent"
                            : "bg-gradient-to-t from-amber-900/70 via-transparent to-transparent"
                        } opacity-60 group-hover:opacity-80 transition-opacity duration-300`}
                      ></div>

                      <img
                        src={
                          isFake
                            ? "https://i.pinimg.com/736x/6c/c0/08/6cc0087776f947c54ab23d9526898cfb.jpg"
                            : "https://i.pinimg.com/736x/8b/46/0a/8b460ad19de8a97577b341308c368870.jpg"
                        }
                        alt={
                          isFake
                            ? "Fake news illustration"
                            : "Verified news illustration"
                        }
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <CardContent className="p-5 flex flex-col gap-4 flex-grow relative">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between">
                      <Badge
                        className={`${getCategoryStyles(
                          category
                        )} px-3 py-1.5 text-xs font-medium rounded-full shadow-sm border border-current/10`}
                      >
                        {category || "General"}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(newsItem.post_date)}
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div className="flex-grow">
                      <h3
                        className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 
                        transition-colors duration-300 line-clamp-2 mt-1"
                      >
                        {title?.length > 80
                          ? `${title.substring(0, 80)}...`
                          : title || "Untitled"}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mt-2 mb-3">
                        {description || "No description available"}
                      </p>
                    </div>

                    {/* Footer: Source Verification and Voting */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {newsItem.media_presence === "true" ? (
                              <div className="flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                <CheckCircle className="h-4 w-4 mr-1.5" />
                                Verified
                              </div>
                            ) : (
                              <div className="flex items-center text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                <X className="h-4 w-4 mr-1.5" />
                                Unverified
                              </div>
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {newsItem.media_presence === "true"
                                ? "Verified Source"
                                : "Unverified Source"}
                            </p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger>
                            <button
                              onClick={(e) => handleUpvote(newsItem.id, e)}
                              className={`flex items-center gap-2 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                                currentUser &&
                                votes[newsItem.id]?.includes(currentUser?.id)
                                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-100/50"
                                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-transparent"
                              }`}
                              aria-label="Vote for credibility"
                            >
                              <ArrowUp className="h-4 w-4" />
                              <span>{votes[newsItem.id]?.length || 0}</span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {currentUser
                                ? "Vote for credibility"
                                : "Login to vote"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // window.open(newsItem.url, "_blank");
                                handleOpenSource(newsItem);
                              }}
                              className="flex items-center cursor-pointer gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-transparent"
                              aria-label="Open source"
                            >
                              <span>Source</span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Open source URL</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
      </motion.div>

      {news.length > 0 && (
        <div className="mt-16 flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className={`rounded-lg transition-all duration-300 ${
                      currentPage === 1
                        ? "opacity-50"
                        : "hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Previous page</span>
                  </Button>
                </PaginationItem>

                {Array.from(
                  { length: Math.ceil(news.length / ITEMS_PER_PAGE) },
                  (_, i) => {
                    const pageNumber = i + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === Math.ceil(news.length / ITEMS_PER_PAGE) ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <Button
                            variant={
                              currentPage === pageNumber ? "default" : "ghost"
                            }
                            onClick={() => handlePageChange(pageNumber)}
                            className={`h-10 w-10 rounded-lg font-medium transition-all duration-300 ${
                              currentPage === pageNumber
                                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-100/50"
                                : "hover:bg-blue-50 hover:text-blue-600"
                            }`}
                          >
                            {pageNumber}
                          </Button>
                        </PaginationItem>
                      );
                    } else if (
                      (pageNumber === currentPage - 2 && pageNumber > 1) ||
                      (pageNumber === currentPage + 2 &&
                        pageNumber < Math.ceil(news.length / ITEMS_PER_PAGE))
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis className="text-gray-400" />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                )}

                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      currentPage < Math.ceil(news.length / ITEMS_PER_PAGE) &&
                      handlePageChange(currentPage + 1)
                    }
                    disabled={
                      currentPage === Math.ceil(news.length / ITEMS_PER_PAGE)
                    }
                    className={`rounded-lg transition-all duration-300 ${
                      currentPage === Math.ceil(news.length / ITEMS_PER_PAGE)
                        ? "opacity-50"
                        : "hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">Next page</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;
