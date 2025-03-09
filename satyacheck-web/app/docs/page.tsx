"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Book,
  Code,
  Shield,
  Zap,
  Server,
  Cpu,
  Rocket,
} from "lucide-react";
import Link from "next/link";

export default function Docs() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button variant="outline" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Table of Contents - Fixed Sidebar */}
      <div className="fixed left-4 top-20 w-64 hidden xl:block">
        <Card className="p-4 mr-5 bg-white/80 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Book className="w-4 h-4" />
            Contents
          </h3>
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: Shield },
              { id: "technical-stack", label: "Technical Stack", icon: Code },
              { id: "architecture", label: "Architecture", icon: Server },
              { id: "core-services", label: "Core Services", icon: Cpu },
              { id: "features", label: "Features", icon: Zap },
              { id: "security", label: "Security & Performance", icon: Shield },
              { id: "future", label: "Future Enhancements", icon: Rocket },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </Card>
      </div>

      <div className="container mx-auto py-8 px-4 max-w-4xl xl:ml-64 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <motion.h1
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Satya Check AI Documentation
            </motion.h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Complete technical documentation and guide for the Satya Check AI
              Chrome extension
            </p>
          </div>

          <div className="space-y-12">
            {/* Overview Section */}
            <section id="overview">
              <Card className="p-8 border-l-4 border-l-blue-500">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-blue-500" />
                  Overview
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Satya Check AI is an advanced Chrome extension designed to
                    combat misinformation and propaganda in web content.
                    Leveraging Google's Gemini AI technology, it provides
                    real-time analysis of web pages, helping users verify the
                    authenticity of online content through sophisticated natural
                    language processing and machine learning algorithms.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="px-3 py-1">
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      Tailwind CSS
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      Framer Motion
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      Supabase
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      Google Gemini AI
                    </Badge>
                  </div>
                </div>
              </Card>
            </section>

            {/* Technical Stack */}
            <section id="technical-stack">
              <Card className="p-8 border-l-4 border-l-violet-500">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <Code className="w-8 h-8 text-violet-500" />
                  Technical Stack
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                      Core Technologies
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800">
                          Frontend Framework
                        </h4>
                        <p className="text-gray-600">
                          Next.js 14 with TypeScript for type safety and better
                          developer experience
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800">
                          UI Framework
                        </h4>
                        <p className="text-gray-600">
                          Custom components built with Tailwind CSS and Radix UI
                          primitives
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800">Database</h4>
                        <p className="text-gray-600">
                          Supabase with PostgreSQL for real-time data storage
                          and retrieval
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800">AI Model</h4>
                        <p className="text-gray-600">
                          Google Gemini 2.0 Flash for advanced natural language
                          processing
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                      Dependencies & Tools
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800">
                          Chrome Extension APIs
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>chrome.runtime</li>
                          <li>chrome.tabs</li>
                          <li>chrome.storage</li>
                          <li>chrome.scripting</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800">
                          Key NPM Packages
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>@google/generative-ai ^1.0.0</li>
                          <li>@supabase/supabase-js ^2.39.0</li>
                          <li>framer-motion ^10.16.0</li>
                          <li>tailwindcss ^3.4.0</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Architecture Section */}
            <section id="architecture">
              <Card className="p-8 border-l-4 border-l-emerald-500">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <Server className="w-8 h-8 text-emerald-500" />
                  Architecture
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                      Extension Components
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Popup Interface (App.tsx)
                        </h4>
                        <p className="text-gray-600 mb-2">
                          Main extension interface with:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Real-time content analysis</li>
                          <li>Progress tracking system</li>
                          <li>Result visualization</li>
                          <li>Share functionality</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Background Script
                        </h4>
                        <p className="text-gray-600 mb-2">
                          Manages extension lifecycle:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>API key management</li>
                          <li>Cross-origin communication</li>
                          <li>Event handling</li>
                          <li>State persistence</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                      Data Flow Architecture
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            1. Content Extraction
                          </h4>
                          <p className="text-gray-600">
                            Content script injects into web pages and extracts
                            relevant content using DOM APIs
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            2. AI Processing
                          </h4>
                          <p className="text-gray-600">
                            Extracted content is processed by Gemini AI for
                            authenticity analysis
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            3. Data Storage
                          </h4>
                          <p className="text-gray-600">
                            Results are stored in Supabase for persistence and
                            sharing
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            4. Result Presentation
                          </h4>
                          <p className="text-gray-600">
                            Processed data is displayed through the UI with
                            real-time updates
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Core Services */}
            <section id="core-services">
              <Card className="p-8 border-l-4 border-l-amber-500">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-amber-500" />
                  Core Services
                </h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-700">
                        Chrome Messaging System
                      </h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Message Types
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Content script ready</li>
                          <li>Scrape request</li>
                          <li>Analysis result</li>
                          <li>Error handling</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">
                          State Management
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Content script lifecycle</li>
                          <li>Analysis progress</li>
                          <li>Result caching</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-700">
                        AI Integration
                      </h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Gemini AI Features
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Natural language processing</li>
                          <li>Content classification</li>
                          <li>Source verification</li>
                          <li>Cross-reference analysis</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Analysis Pipeline
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Content preprocessing</li>
                          <li>AI model inference</li>
                          <li>Result post-processing</li>
                          <li>Confidence scoring</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">
                      Database Integration
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Supabase Schema
                        </h4>
                        <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                          {`news {
  id: uuid
  title: string
  content: text
  analysis_result: jsonb
  created_at: timestamp
  updated_at: timestamp
  user_id: uuid (foreign key)
}`}
                        </pre>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Data Operations
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          <li>Real-time subscriptions</li>
                          <li>Row Level Security (RLS)</li>
                          <li>Full-text search</li>
                          <li>Automated backups</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Features Section */}
            <section id="features" className="scroll-mt-16">
              <Card className="p-8 border-l-4 border-l-green-500">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Key Features
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-700">
                      Content Analysis
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Real-time webpage scanning</li>
                      <li>Text content extraction</li>
                      <li>Metadata collection</li>
                      <li>Link analysis</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-700">
                      AI Processing
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Authenticity scoring (0-100%)</li>
                      <li>Misinformation detection</li>
                      <li>Source verification</li>
                      <li>Cross-reference checking</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-700">
                      Result Visualization
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Score breakdown</li>
                      <li>Color-coded indicators</li>
                      <li>Detailed explanations</li>
                      <li>Related sources</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-700">
                      Data Sharing
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Report generation</li>
                      <li>Shareable links</li>
                      <li>Database storage</li>
                      <li>Export functionality</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* Security & Performance Section */}
            <section id="security" className="scroll-mt-16">
              <Card className="p-8 border-l-4 border-l-red-500">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Security & Performance
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-700">
                      Security Features
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Secure API key storage</li>
                      <li>Protected data transfer</li>
                      <li>Encrypted communication</li>
                      <li>Access control</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-700">
                      Performance Optimizations
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Efficient DOM traversal</li>
                      <li>Optimized state updates</li>
                      <li>Lazy loading components</li>
                      <li>Response caching</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* Future Enhancements Section */}
            <section id="future" className="scroll-mt-16">
              <Card className="p-8 border-l-4 border-l-purple-500">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Future Enhancements
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-700">
                      Planned Features
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Batch analysis support</li>
                      <li>Enhanced AI models</li>
                      <li>Advanced visualization</li>
                      <li>User preferences</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-700">
                      Technical Improvements
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Performance optimization</li>
                      <li>Enhanced caching</li>
                      <li>Offline support</li>
                      <li>Mobile compatibility</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
