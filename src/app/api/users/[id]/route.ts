import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { cloudinaryHelper } from "@/helpers/cloudinaryHelper";
import User from "@/models/User";
import { clerkClient } from "@clerk/nextjs/server";

await dbConnect();

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id} = await params
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bio = formData.get("bio") as string | null;

    if (!file && !bio) {
      return NextResponse.json(
        { error: "No data provided for update" },
        { status: 400 }
      );
    }

    if (file) {
      try {
        const cloudinaryUploadResult = await cloudinaryHelper(file);
        const publicId = cloudinaryUploadResult.public_id;

        await User.findByIdAndUpdate(id, { profilePicture: publicId });

        // Return early if we only had a file
        if (!bio) {
          return NextResponse.json({
            message: "Profile picture updated successfully",
          });
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
        return NextResponse.json(
          { error: "Error updating profile picture" },
          { status: 500 }
        );
      }
    }

    
    if (bio) {
      try {
        await User.findByIdAndUpdate(id, { bio });
        return NextResponse.json({ message: "Bio updated successfully" });
      } catch (error) {
        console.error("Error updating bio:", error);
        return NextResponse.json(
          { error: "Error updating bio" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id} = await params;
    const user = await User.findById(id);
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } 
    
    return NextResponse.json({
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest, {params}:{params: Promise<{id: string}>}) {
  try {
    const {id} = await params;
    const client = await clerkClient()

    const clerkUser = await User.findById(id)

    if (!clerkUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const response = await client.users.deleteUser(clerkUser.clerkId)   
    await User.findByIdAndDelete(id)

    return NextResponse.json({message: "User deleted successfully", res: response}, {status: 200})
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}