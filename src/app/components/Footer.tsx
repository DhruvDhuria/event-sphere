"use client";
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Blog", path: "/blog" },
        { name: "Press", path: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help" },
        { name: "Privacy", path: "/privacy" },
        { name: "Terms", path: "/terms" },
        { name: "Accessibility", path: "/accessibility" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Twitter", path: "https://twitter.com" },
        { name: "Instagram", path: "https://instagram.com" },
        { name: "Facebook", path: "https://facebook.com" },
        { name: "LinkedIn", path: "https://linkedin.com" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-semibold gradient-text">
                EventSphere
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Discover and join amazing local events. Connect with your
              community and never miss out on what's happening around you.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, i) => (
            <div key={i}>
              <h3 className="font-medium text-sm text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.path}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section with copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Eventify. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
