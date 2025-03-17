import { NextResponse } from "next/server";
import Event from "@/models/Event";
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function GET( {params}: {params: {eventId: string}}) {
    // get event details based on event id
    try {
        const event = await Event.findById(params.eventId);

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