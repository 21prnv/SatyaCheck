"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {  Linkedin, Code2 } from "lucide-react";
import Link from "next/link";
import kartik from "@/public/kartik.jpg";
import karan from "@/public/karan.jpg";
import pranav from "@/public/pranav.jpg";

const teamMembers = [
  {
    name: "Kartik Labhshetwar",
    pronouns: "He/Him",
    role: "Full Stack Developer",
    tagline: "Build ship grow",
    linkedin: "https://www.linkedin.com/in/kartikcode/",
    skills: ["Full Stack", "AI/ML", "System Design"],
    avatar: kartik,
  },
  {
    name: "Karan Kendre",
    role: "Full Stack Developer",
    tagline: "NextJs | React | NodeJs Expert",
    linkedin: "https://www.linkedin.com/in/kendrekaran/",
    education: "Swami Ramanand Teerth Marathwada University (SRTMU), Nanded",
    skills: ["NextJs", "React", "NodeJs", "Express", "MongoDB", "C/C++"],
    avatar: karan,
  },
  {
    name: "Pranav Patil",
    role: "Full Stack Developer",
    tagline: "Building ziti | Full Stack | Flutter",
    linkedin: "https://www.linkedin.com/in/pranav-patil-1b6049231/",
    skills: ["Full Stack", "Flutter", "Mobile Development"],
    avatar: pranav,
  },
];

export default function About() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're a passionate team of developers dedicated to fighting misinformation
            and making the internet a more trustworthy place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center">
                    {member.avatar ? (
                      <img
                        src={member.avatar.src}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Code2 className="w-12 h-12 text-blue-500" />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>

                  {member.pronouns && (
                    <span className="text-sm text-gray-500 mb-2">{member.pronouns}</span>
                  )}

                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>

                  <p className="text-gray-600 text-sm mb-4">{member.tagline}</p>

                  {member.education && (
                    <p className="text-gray-500 text-sm mb-4">{member.education}</p>
                  )}

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {member.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="gap-2 hover:bg-blue-50"
                    >
                      <Linkedin className="w-4 h-4" />
                      Connect on LinkedIn
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
