// get all categories
import Category from "@/models/Category";
import dbConnect from "@/lib/dbConnect";
import { NextRequest,NextResponse } from "next/server";

dbConnect();

export async function GET(req: NextRequest) {
    try{
        const categories = await Category.find({}).exec();
        console.log(typeof categories)
        return NextResponse.json({ categories }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong while fetching categories" }, { status: 500 });
    }
}