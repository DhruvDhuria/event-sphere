import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { cloudinaryHelper } from "@/helpers/cloudinaryHelper";
import User from "@/models/User";

await dbConnect();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

        await User.findByIdAndUpdate(params.id, { profilePicture: publicId });
        console.log("profile updated successfully");

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
        await User.findByIdAndUpdate(params.id, { bio });
        console.log("bio updated successfully");
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

export async function GET({ params }: { params: { id: string } }) {
  try {
    const user = await User.findById(params.id);
    
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


export async function DELETE({params}:{params: {id: string}}) {
  try {
    await User.findByIdAndDelete(params.id)
    return NextResponse.json({message: "User deleted successfully"}, {status: 200})
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}