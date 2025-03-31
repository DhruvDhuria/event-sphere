import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";


dbConnect();

export async function GET(req: NextRequest, {params}: {params: {eventId: string}}) {
    // get event details based on event id
    try {
        const {eventId} = await params
        const event = await Event.aggregate([
            {$match: {_id: new mongoose.Types.ObjectId(eventId)}},
          {
            $lookup: {
              from: "users",
              localField: "organizerId",
              foreignField: "_id",
              as: "organizer",
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $addFields: {
              organizer: { $arrayElemAt: ["$organizer", 0] },
              category: { $arrayElemAt: ["$category", 0] },
            },
          },
          {
            $project: {
              "organizer.username": 1,
              "organizer.email": 1,
              "category.name": 1,
              title: 1,
              description: 1,
              date: 1,
              time: 1,
              location: 1,
              image: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ]);
        

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json(event, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while fetching event" }, { status: 500 });
    }
}

export async function DELETE( {params}: {params: {eventId: string}}) {
    // delete event based on event id
    try {
        await Event.findByIdAndDelete(params.eventId);
        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while deleting event" }, { status: 500 });
    }
}