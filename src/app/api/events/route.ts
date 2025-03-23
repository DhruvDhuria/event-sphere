import dbConnect from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import Event from "@/models/Event";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { geocodeAddress } from "@/lib/geocoding";

dbConnect();

export async function POST(req: NextRequest) {
  // check if user is authenticated to create event using clerk auth() method
  // if user is not authenticated, return error
  // else take the data from the formdata
  // validate if the data is correct
  // get geocode coordinates from address using geocodeAddress function
  // if data is correct, create the event
  // if data is not correct, return error
  // return the event

  const { userId } = await auth();
  const user = await User.find({ clerkId: userId }).exec();

  const formdata = await req.formData();
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;
  const location = formdata.get("location");
  const time = formdata.get("time");
  const category = formdata.get("category");
  const date = formdata.get("date");
  const image = formdata.get("image");

  if (
    !title ||
    !description ||
    !location ||
    !time ||
    !category ||
    !date ||
    !image
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const coordinates = await geocodeAddress(location as string);
    if (!coordinates) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 400 }
      );
    }

    const { latitude, longitude } = coordinates;
    const locationData = {
      address: location,
      latitude,
      longitude,
    };

    const event = await Event.create({
      title,
      description,
      location: locationData,
      time,
      category,
      date,
      image,
      organizerId: user[0]._id,
    });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log("Request started");
    const search = req.nextUrl.searchParams.get("search");
    const page = parseInt(req.nextUrl.searchParams.get("page") as string) || 1;

    console.log("parsed values", page, search);

    if (isNaN(page) || page < 1) {
      console.log("Invalid page parameter");
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 }
      );
    }

    console.log("About to check search condition");

    if (search && search.trim() !== "") {
      console.log("Executing search query");
      try {
        const events = await Event.find({
          $or: [
            { title: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
          ],
        })
          .skip((page - 1) * 10)
          .limit(10);
        console.log("Search query completed");
        return NextResponse.json(events, { status: 200 });
      } catch (dbError) {
        console.error("DB search error:", dbError);
        throw dbError;
      }
    } else {
      console.log("Executing regular query");
      try {
        const events = await Event.find()
          .skip((page - 1) * 10)
          .limit(10);
        console.log("Regular query completed, found", events.length, "events");
        return NextResponse.json(events, { status: 200 });
      } catch (dbError) {
        console.error("DB regular query error:", dbError);
        throw dbError;
      }
    }
  } catch (error) {
    console.error("Final error catch:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while fetching events",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}