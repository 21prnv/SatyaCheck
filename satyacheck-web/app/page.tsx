"use client";

// Change this import
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
} from "lucide-react";
import { createClient } from "@/utils/supbase/client";
import { storeUserData } from "./actions/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import Dashboard from "@/components/sections/Dashboard";
import HowItWorks from "@/components/sections/HowitWorks";
import CtaSection from "@/components/sections/CtaSection";
import NewsSection from "@/components/sections/NewsSection";
import About from "@/components/sections/About";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

// Add type for news item
interface NewsItem {
  id: number;
  image: string;
  title: string;
  description: string;
  source: string;
  date: string;
  category: string;
  severity: string;
  votes?: number;
}

export default function Home() {
  // Move router hook before any conditional logic
  const router = useRouter();
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const supabase = createClient();

  // Add state for tracking votes
  const [votes, setVotes] = useState<{ [key: number]: number }>({});
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [news, setNews] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    console.log(data);
    if (data) {
      setNews(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    async function fetchCurrentUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        storeUserData(user);
        //  setCurrentUser({
        //    id: user.id,
        //    avatar_url: data?.avatar_url,
        //  });
      }
    }
    fetchCurrentUser();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleViewAll = () => {
    setShowAllPosts(!showAllPosts);
  };

  const handleUpvote = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when upvoting
    setVotes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  };

  const propagandaNews = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/474x/83/00/83/8300830b50db7c40459d5c64d248d697.jpg",
      title: "Misleading Claims About Government Spending",
      description:
        "Recent social media posts claiming the government allocated 70% of budget to defense are false. Official records show the actual figure is 14%.",
      source: "Verified by Satyacheck AI",
      date: "2 hours ago",
      category: "Economic",
      severity: "medium",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/474x/83/00/83/8300830b50db7c40459d5c64d248d697.jpg",
      title: "Doctored Video of Political Rally Circulating",
      description:
        "A manipulated video showing artificially inflated crowd sizes at a recent political rally has been detected across multiple platforms.",
      source: "Verified by Satyacheck AI",
      date: "5 hours ago",
      category: "Political",
      severity: "high",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/474x/83/00/83/8300830b50db7c40459d5c64d248d697.jpg",
      title: "False Statistics on Vaccination Campaign",
      description:
        "Claims about vaccine ineffectiveness using fabricated statistics have been identified. Official health data contradicts these claims.",
      source: "Verified by Satyacheck AI",
      date: "1 day ago",
      category: "Health",
      severity: "high",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/474x/83/00/83/8300830b50db7c40459d5c64d248d697.jpg",
      title: "Misattributed Quote to Opposition Leader",
      description:
        "A viral quote allegedly from an opposition leader has been confirmed as fabricated. No record of such statement exists in any official transcript.",
      source: "Verified by Satyacheck AI",
      date: "2 days ago",
      category: "Political",
      severity: "medium",
    },
    {
      id: 5,
      image:
        "https://i.pinimg.com/474x/83/00/83/8300830b50db7c40459d5c64d248d697.jpg",
      title: "Misattributed Quote to Opposition Leader",
      description:
        "A viral quote allegedly from an opposition leader has been confirmed as fabricated. No record of such statement exists in any official transcript.",
      source: "Verified by Satyacheck AI",
      date: "2 days ago",
      category: "Political",
      severity: "medium",
    },
  ];

  // Add these state variables at the top with your other states
  const [statsData, setStatsData] = useState({
    propagandaCount: 0,
    activeUsers: 0,
    accuracyRate: 0,
    sourcesVerified: 0,
  });

  // Add this function to fetch stats data
  const fetchStatsData = async () => {
    const supabase = createClient();

    // Get propaganda count (fake news)
    const { data: fakeNews } = await supabase
      .from("news")
      .select("*")
      .eq("isFake", false);

    // Get active users count
    const { data: users } = await supabase.from("user").select("*");

    // Get accuracy rate
    const { data: allNews } = await supabase
      .from("news")
      .select("isFake,fake_percentage,real_percentage");

    const totalNews = allNews?.length || 0;
    const correctPredictions =
      allNews?.filter(
        (news) =>
          (news.isFake === true && news.real_percentage > 50) ||
          (news.isFake === false && news.real_percentage < 50)
      ).length || 0;

    const accuracyPercentage = totalNews
      ? ((correctPredictions / totalNews) * 100).toFixed(1)
      : 0;

    // Get verified sources count
    const { data: verifiedSources } = await supabase
      .from("news")
      .select("*")
      .eq("author_verified", true);

    setStatsData({
      propagandaCount: fakeNews?.length || 0,
      activeUsers: users?.length || 0,
      accuracyRate: Number(accuracyPercentage),
      sourcesVerified: verifiedSources?.length || 0,
    });
  };

  // Add this to your useEffect
  useEffect(() => {
    fetchStatsData();
  }, []);

  // Update your stats array to use real data
  const stats = [
    {
      label: "Propaganda Detected",
      value: statsData.propagandaCount.toString(),
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      label: "Active Users",
      value: statsData.activeUsers.toString(),
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      label: "Accuracy Rate",
      value: `${statsData.accuracyRate}%`,
      icon: <Info className="h-5 w-5" />,
    },
    {
      label: "Sources Verified",
      value: statsData.sourcesVerified.toString(),
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  const navItems = ["Home", "How It Works", "Detections", "Resources", "About"];

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleCardClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Dashboard Overview */}
      <section id="dashboard">
        <Dashboard stats={stats} />
      </section>

      {/* News Section */}
      <section id="news">
        <NewsSection news={news} />
      </section>

      {/* How Satyacheck AI Works */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* CTA Section */}
      <CtaSection />

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      <Footer />
    </main>
  );
}
