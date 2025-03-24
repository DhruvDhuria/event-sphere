'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Button from "./Button";
import { cn } from "@/lib/utils";


const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { name: "Discover", path: "/discover-events" },
    { name: "Categories", path: "/categories" },
    { name: "Featured", path: "/featured" },
    { name: "About", path: "/about" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-8 lg:px-12",
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href={"/"}
          className="text-2xl font-semibold tracking-tight flex items-center"
        >
          <span className="gradient-text">EventShpere</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search & Sign In (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="p-2 rounded-full bg-secondary text-gray-700 hover:bg-secondary/80 transition-colors"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <Button size="sm" variant="outline">
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
          <Button size="sm">
            <Link href={"/sign-up"}>Create Account</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out pt-20 px-6 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="block text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="space-y-3 pt-4">
            <Button className="w-full" variant="outline">
              Sign In
            </Button>
            <Button className="w-full">Create Account</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
