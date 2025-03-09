"use client";

// Change this import
import { useRouter } from "next/navigation"; // <-- Change from "next/router" to "next/navigation"
import { useState, useEffect, SetStateAction } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Download,
  Info,
  Search,
  Send,
  Shield,
  X,
  Menu,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";
import PopupDialog from '@/components/ui/popup-dialog';

const HeroSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const handleInstallClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
      <PopupDialog
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Extension Under Review"
        message="The SatyaCheck extension is currently under review by the Chrome Web Store. We're working hard to make it available to you soon. Thank you for your patience and interest in fighting misinformation!"
      />

      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-blue-100 to-white"></div>

        {/* Dot pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delay"></div>
        <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow"></div>
        <div className="absolute -bottom-20 right-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delay-slow"></div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-100/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={fadeIn("down", "spring", 0.2, 1)}
            className="relative group"
          >
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 mb-6 px-4 py-1.5 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5">
              Welcome to SatyaCheck
            </Badge>
          </motion.div>

          <motion.h1
            variants={textVariant(0.4)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 max-w-4xl leading-tight tracking-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Combat Misinformation in India's{" "}
            </motion.span>
            <motion.span
              className="text-blue-600 relative inline-block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Digital Landscape
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0 4C20 0 40 8 60 4C80 0 100 4 100 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </svg>
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeIn("up", "spring", 0.8, 1)}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed"
          >
            Satyacheck AI helps you identify and counter political propaganda
            and misinformation with
            <span className="text-blue-600 font-medium">
              {" "}
              advanced AI technology{" "}
            </span>
            that's tailored for the Indian context.
          </motion.p>

          {/* CTA Buttons with enhanced animations */}
          <motion.div
            variants={fadeIn("up", "spring", 1.2, 1)}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-lg justify-center items-center"
          >
            <Button
              size="lg"
              onClick={handleInstallClick}
              className="bg-blue-600 max-w-72  hover:bg-blue-700 text-white md:px-8 md:py-6 py-2 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 flex-1 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 -z-10"></span>
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 group-hover:w-full -z-10"></span>
              <Download className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span>Install Extension</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
