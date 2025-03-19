"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  onSearch?: (searchTerm: string, location: string, date: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch && onSearch(searchTerm, location, date);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchBarRef}
      className={cn(
        "w-full bg-white rounded-full border border-gray-200 shadow-sm transition-all duration-300 overflow-hidden",
        isExpanded ? "shadow-md" : "",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            "flex items-center transition-all duration-300",
            isExpanded ? "flex-col md:flex-row" : "flex-row"
          )}
        >
          {/* Search Input */}
          <div
            className={cn(
              "flex items-center flex-grow px-4 py-3",
              isExpanded
                ? "border-b md:border-b-0 md:border-r border-gray-100 w-full"
                : ""
            )}
          >
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search for events, workshops, concerts..."
              className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsExpanded(true)}
            />
          </div>

          {/* Location Input - Only visible when expanded */}
          {isExpanded && (
            <div className="flex items-center flex-grow px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100 w-full">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          )}

          {/* Date Input - Only visible when expanded */}
          {isExpanded && (
            <div className="flex items-center flex-grow px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100 w-full">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="date"
                placeholder="Date"
                className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}

          {/* Search Button */}
          <div
            className={cn(
              "px-2 py-2",
              isExpanded ? "w-full md:w-auto p-3" : ""
            )}
          >
            <button
              type="submit"
              className={cn(
                "rounded-full bg-primary text-white font-medium transition-all",
                isExpanded ? "w-full py-2 px-6" : "p-2"
              )}
            >
              {isExpanded ? "Search" : <Search className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
