"use client";
import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface EventCardProps {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  _id,
  title,
  date,
  time,
  location,
  image,
  category,
  className,
}) => {
  return (
    <Link
      href={`/event/${_id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-white hover-lift",
        "border border-gray-200/60 transition-all duration-300 h-full",
        className
      )}
    >
      {/* Event Image */}
      <div className="relative overflow-hidden aspect-[3/2]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Category Tag */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-gray-800">
            {category}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="flex flex-col flex-grow p-4 space-y-3">
        <h3 className="font-semibold text-lg line-clamp-2 text-balance">
          {title}
        </h3>

        <div className="space-y-2 mt-auto text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
