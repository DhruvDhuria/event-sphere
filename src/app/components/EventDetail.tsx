"use client"
import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Share2, Heart } from "lucide-react";
import Button from "./Button";
import dynamic from "next/dynamic";

interface EventData {
    id: string
    title: string;
    description: string;
    location: {
        address: string;
        latitude: number;
        longitude: number;
    };
    time: string;
    category: {
      name: string
    };
    date: string;
    image: string;
    organizer: {
      username: string;
      email: string
    };
    createdAt?: string;
    updatedAt?: string;
    
}

const EventDetail= ({eventId}: {eventId: string}) => {
  
const DynamicMap = dynamic(() => import("./Map"), { ssr: false });

  const [event, setEvent] = useState<EventData>() || {}

  const fetchEventData = async() => {
    try {
        const response = await fetch(`/api/events/${eventId}`)
        const data = await response.json()
        setEvent(data[0])
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchEventData()
  }, [])


  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10" />
          <img
            src={event?.image}
            alt={event?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-6 py-8">
            <span className="inline-block px-3 py-1 mb-4 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-sm font-medium">
              {event?.category.name}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4">
              {event?.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{event?.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event?.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event?.location.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel p-6">
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="text-gray-700 mb-4">{event?.description}</p>
            </div>

            <div className="glass-panel p-6">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <p className="text-gray-700 mb-4">{event?.location.address}</p>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div>
                  <DynamicMap
                    eventName={event?.title as string}
                    latitude={event?.location.latitude as number}
                    longitude={event?.location.longitude as number}
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel p-6">
              <h2 className="text-2xl font-semibold mb-4">Organizer</h2>
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-medium">{event?.organizer.username}</h3>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  Contact Organizer
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Date and Time</h3>
                <div className="text-gray-700 space-y-2">
                  <p>
                    <strong>Date:</strong> {event?.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {event?.time}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">Register Now</Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    icon={<Heart className="w-4 h-4" />}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    icon={<Share2 className="w-4 h-4" />}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
