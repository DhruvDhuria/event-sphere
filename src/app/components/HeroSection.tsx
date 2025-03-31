"use client";
import React from "react";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import Button from "./Button";
import Link from "next/link";

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section
      className={cn(
        "relative min-h-[80vh] pt-24 flex items-center justify-center px-6 lg:px-8 overflow-hidden",
        className
      )}
    >
      {/* Background with subtle gradient and grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-70"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center staggered-animation">
        <span className="inline-block py-1 px-3 text-sm font-medium bg-secondary text-secondary-foreground rounded-full mb-4">
          Discover events in your city
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
          <span className="block">Find amazing experiences</span>
          <span className="block mt-2 gradient-text">happening near you</span>
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
          Connect with your community and discover local events that match your
          interests. Never miss out on what's happening around you.
        </p>

        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg">
            <Link href={'/discover-events'}>Explore All Events</Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link href={"/create-event"}>Create Event</Link>
          </Button>
        </div>

        <div className="mt-12 flex justify-center">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
            5,000+ events happening this week
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
