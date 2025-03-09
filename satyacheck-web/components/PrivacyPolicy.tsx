"use client";

import React from 'react';
import { Shield, Lock, Eye, Database, UserCog, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 animate-fade-in">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all duration-300 group mb-8"
      >
        <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-medium">Back</span>
      </button>

      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
          <Lock className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Privacy Policy for SatyaCheck Extension
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your privacy is our top priority. Learn how we protect your data while making the internet a more trustworthy place.
        </p>
      </div>
      
      <div className="space-y-12">
        <section className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            This Privacy Policy explains how SatyaCheck ("we", "our", or "us") collects, uses, and protects your information
            when you use our Chrome extension. We are committed to ensuring that your privacy is protected while providing you
            with powerful fact-checking capabilities.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
          </div>
          <p className="text-gray-600 mb-4">We collect the following types of information when you use the SatyaCheck extension:</p>
          <ul className="space-y-3">
            {[
              'Text content from web pages you analyze',
              'Images that you choose to analyze',
              'URLs and links from the content being analyzed',
              'Basic usage statistics and error logs'
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
          </div>
          <p className="text-gray-600 mb-4">The information we collect is used for:</p>
          <ul className="space-y-3">
            {[
              'Analyzing content for authenticity verification',
              'Improving our fact-checking algorithms',
              "Enhancing the extension's functionality",
              'Generating aggregated usage statistics'
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Data Storage and Security</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We take data security seriously and implement appropriate measures to protect your information:
          </p>
          <ul className="space-y-3">
            {[
              'All data transmission is encrypted using industry-standard protocols',
              'We do not store personal identification information',
              'Analyzed content is processed in real-time and not permanently stored',
              'We regularly review and update our security practices'
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCog className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Your Rights</h2>
          </div>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="space-y-3">
            {[
              'Opt-out of data collection',
              'Request deletion of your data',
              'Access information about your data usage',
              'Disable the extension at any time'
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600">
                <span className="h-1.5 w-1.5 bg-blue-600 rounded-full"></span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
          </div>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <a
            href="mailto:kartik.labhshetwar@gmail.com"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 transition-colors duration-300 font-medium"
          >
            kartik.labhshetwar@gmail.com
          </a>
        </section>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy; 