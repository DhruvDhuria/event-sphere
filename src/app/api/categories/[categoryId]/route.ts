import Event from "@/models/Event";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/Category";

dbConnect();

export async function GET(req: NextRequest, { params }: { params: Promise<{ categoryId: string }> }) {
    try {
        const { categoryId } = await params;
        const category = await Category.findById(categoryId)
        if (!category){
            return NextResponse.json({error: "cannot find category"}, {status: 404})
        }
        const events = await Event.find({ category: categoryId })
                                  .select("-location.latitude -location.longitude -createdAt -updatedAt -organizerId")
        return NextResponse.json({ categoryName: category.name, events }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while fetching events" }, { status: 500 });
    }
}