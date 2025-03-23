import dbConnect from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import Event from "@/models/Event";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { geocodeAddress } from "@/lib/geocoding";
import { cloudinaryHelper } from "@/helpers/cloudinaryHelper";

dbConnect();

export async function POST(req: NextRequest) {

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

    const cloudinaryResult =await cloudinaryHelper(image as File);

    const event = await Event.create({
      title,
      description,
      location: locationData,
      time,
      category,
      date,
      image: cloudinaryResult.secure_url,
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
    const search = req.nextUrl.searchParams.get("search");
    const page = parseInt(req.nextUrl.searchParams.get("page") as string) || 1;
    const pageSize = 10; // Number of events per page

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 }
      );
    }

    // Base pipeline that's common to both queries
    const basePipeline = [];

    // Search match stage if search parameter exists
    if (search && search.trim() !== "") {
      basePipeline.push({
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { "location.address": { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    // Add lookups and field processing
    basePipeline.push(
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
      }
    );

    // Use $facet to perform both the pagination and count in a single operation
    const result = await Event.aggregate([
      ...basePipeline,
      {
        $facet: {
          paginatedResults: [
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    const events = result[0].paginatedResults;
    const totalEvents =
      result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;

    return NextResponse.json(
      {
        events,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalEvents / pageSize),
          totalEvents,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while fetching events",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}