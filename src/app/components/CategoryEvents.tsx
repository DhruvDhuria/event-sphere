"use client"
import React, { useEffect, useState } from "react";
import { Events } from "@/app/discover-events/page";
import EventCard from "@/app/components/EventCard";
import { ArrowLeft } from "lucide-react";
import Button from "@/app/components/Button";
import Link from "next/link";


const CategoryEvents = ({categoryId}: {categoryId: string}) => {
    const [events, setEvents] = useState<Events[]>([])
    const [categoryName, setCategoryName] = useState("")
    const fetchEvents = async () => {
        try {
          const response = await fetch(`/api/categories/${categoryId}`);
          const searchedEvents = await response.json()
          setEvents(searchedEvents.events)
          setCategoryName(searchedEvents.categoryName)
        } catch (error) {
          console.error("Error fething events")
        }
    }

    useEffect(() => {
      fetchEvents()
    }, [])

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 px-6 md:px-8 lg:px-12 bg-primary text-white">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/categories"
              className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {categoryName} Events
              </h1>
              <p className="text-primary-foreground/90 mt-2">
                Discover {events.length} upcoming {categoryName.toLowerCase()}{" "}
                events
              </p>
            </div>
          </div>
        </section>

        {/* Events List Section */}
        <section className="py-12 px-6 md:px-8 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {events.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any {categoryName.toLowerCase()}{" "}
                  events at the moment.
                </p>
                <Link href="/categories">
                  <Button variant="outline">Browse Other Categories</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

    </div>
  );
};

export default CategoryEvents;
