import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { useUser } from "@clerk/nextjs";

dbConnect()

export async function POST(request:NextRequest) {
    const {user} = useUser()

    if (!user) return null

    
}

