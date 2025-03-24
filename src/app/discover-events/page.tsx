"use client";
import React, { useEffect, useState } from "react";
import EventCard from "@/app/components/EventCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

// Mock categories data
const categories = [
    "Arts & Culture",  
    "Music",
    "Sports & Fitness",    
    "Food & Drink",   
    "Community & Social",
    "Education & Workshops",
    "Festivals & Fairs",
    "Outdoor & Nature",
    "Family & Kids",
    "Business & Networking",
    "Theatre & Shows",
    "Charity & Volunteering",
    "Technology",
    "Games",
];
interface Events {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  image: string;
  category: {
    name: string;
    description: string;
  };
}

const DiscoverEvents: React.FC = () => {

  const [events, setEvents] = useState<Events[]>([])

  const fetchEvents = async (searchTerm?: string) => {
    try {
      const searchedEvents = searchTerm
        ? await fetch(`/api/events?search=${searchTerm}`)
        : await fetch(`/api/events`);
      const data = await searchedEvents.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    // fetch events based on search term and location
    fetchEvents(searchTerm);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <main className="flex-grow">
        {/* Discover Events Section */}
        <section className="py-16 px-6 md:px-8 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-3 text-sm font-medium bg-secondary text-secondary-foreground rounded-full mb-2">
                Discover
              </span>
              <h2 className="text-3xl font-bold mb-4">
                Find Your Next Experience
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse through a curated list of events happening near you.
                Filter by category to find exactly what you're looking for.
              </p>
            </div>

            <div className="mb-8 max-w-3xl mx-auto">
              <SearchBar className="mb-6" onSearch={handleSearch} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  _id={event._id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location.address}
                  image={event.image}
                  category={event.category.name}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button>Load More Events</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 md:px-8 lg:px-12 bg-foreground text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Host Your Own Event?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Create and manage your events with our easy-to-use platform. Reach
              thousands of potential attendees in your area.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-black hover:bg-white/90">
                Create Event
              </Button>
              <Button
                variant="outline"
                className="border-white text-black hover:bg-white/10 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DiscoverEvents;
