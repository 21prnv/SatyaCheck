import { Shield, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-50 to-white text-gray-600 py-16 border-t border-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.05) 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4 group">
              <Shield className="h-6 w-6 text-blue-600 transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-bold text-xl text-gray-900">
                Satya
                <span className="text-blue-600 relative">
                  check
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </span>
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Combating misinformation in India's{" "}
              <span className="text-blue-600 font-medium">digital landscape</span>
            </p>
          </div>

          <div className="flex flex-col items-end">
            <a
              href="https://github.com/21prnv/SatyaCheck"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300 mb-4"
            >
              <Github className="h-5 w-5" />
              <span className="font-medium">View on GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-200 text-center text-blue-600">
          <p>© {new Date().getFullYear()} Satyacheck AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
