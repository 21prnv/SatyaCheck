"use client";

// Change this import
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "@/utils/motion";
const Dashboard = ({ stats }: any) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-xl overflow-hidden border-0 rounded-2xl bg-gradient-to-br from-white to-blue-50 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
          <CardContent className="p-8 md:p-10">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gray-800 mb-8 flex items-center"
            >
              <span className="bg-blue-100 p-2 rounded-lg mr-3 transition-all duration-300 hover:bg-blue-200 hover:rotate-3">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </span>
              Dashboard Overview
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {stats.map((stat: any, index: any) => (
                <motion.div
                  key={index}
                  variants={fadeIn("up", "spring", index * 0.2, 0.75)}
                  className="flex flex-col p-6 rounded-xl bg-white border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-500 mr-3 group-hover:bg-blue-100 transition-colors duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <span className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 relative">
                    {stat.value}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-500"></span>
                  </span>
                  <span className="text-sm md:text-base text-gray-600">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 text-sm text-gray-500 flex items-center">
              <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Last updated: {new Date().toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Dashboard;
