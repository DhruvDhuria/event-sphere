"use client";
import React from "react";
import EventForm from "../components/EventForm";

const CreateEvent: React.FC = () => {
  const handleSubmit = (data: any) => {

     const formData = new FormData();

     // Append each field to the FormData object
     Object.entries(data).forEach(([key, value]) => {
       formData.append(key, value as string | Blob);
     });

    
    fetch("/api/events", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Event created:", result);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });

  };


  return (
    <div className="min-h-screen bg-primary flex flex-col">

      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Create a New Event
          </h1>
          <EventForm onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;
