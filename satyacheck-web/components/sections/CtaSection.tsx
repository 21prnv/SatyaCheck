"use client";

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

const CtaSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 my-16">
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 rounded-2xl p-10 md:p-14 shadow-xl overflow-hidden relative group">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl group-hover:translate-x-10 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl group-hover:-translate-x-10 transition-transform duration-1000"></div>
        </div>

        <div className="flex flex-col items-center text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
            Join the Movement Against Misinformation
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-white/30 rounded-full"></span>
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl leading-relaxed">
            Be part of the solution in creating a more informed digital India.
            Get the tools you need to identify
            <span className="font-semibold"> truth from fiction</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-lg transform hover:-translate-y-1 group">
              <Download className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              <span>Download Extension</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
