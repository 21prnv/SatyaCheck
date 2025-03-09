"use client";

import { useState, useEffect } from "react";
import { Menu, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/#hero" },
    { name: "Dashboard", path: "/#dashboard" },
    { name: "News", path: "/#news" },
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Docs", path: "/docs" },
    { name: "About", path: "/#about" },
  ];

  const handleNavigation = (path: string) => {
    setActiveSection(path);
    setMobileMenuOpen(false);

    if (path.startsWith("/#")) {
      // Handle smooth scroll for same-page navigation
      const element = document.getElementById(path.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Handle navigation to different pages
      router.push(path);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 relative group">
          <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"></div>
          <Shield className="h-6 w-6 text-blue-600 transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-bold text-xl text-gray-900">
            Satya
            <span className="text-blue-600 relative">
              check
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className="relative px-4 py-2 group"
            >
              <span
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.path
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-0.5 left-4 right-4 h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                    activeSection === item.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <AuthButton />

          <Button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-white bg-blue-600  hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white border-t border-blue-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center w-full text-left px-4 py-3 group"
            >
              <ChevronRight
                className={`h-4 w-4 mr-2 transition-opacity duration-300 ${
                  activeSection === item.path
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
              <span
                className={`font-medium transition-colors duration-200 relative ${
                  activeSection === item.path
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                    activeSection === item.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
