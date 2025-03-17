import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

export async function cloudinaryHelper(file: File | Buffer): Promise<CloudinaryUploadResult> {

  const {userId} = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  if (!file) {
    throw new Error("File is required");
  }

  try {
    let buffer: Buffer;

    if (Buffer.isBuffer(file)){
        buffer = file;
    } else {
        const bytes = await file.arrayBuffer();
        buffer = Buffer.from(bytes);
    }
  
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "event-profile" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.write(buffer)
        uploadStream.end();
      }
    );
  
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("something went wrong")
  }
}