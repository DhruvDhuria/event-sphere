import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import User from "@/models/User"; // Adjust path
import { WebhookEvent } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";

const secret = process.env.SIGNING_SECRET;

export async function POST(req: Request) {
  if (!secret) {
    // console.log(secret)
    throw new Error("Error: Please add signin secret from the clerk dashboard");
  }
  const payload = await req.text();
  const svix = new Webhook(secret);

  // get all the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  let evt: WebhookEvent;

  try {
    evt = svix.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed", err);
    return NextResponse.json({}, { status: 400 });
  }

  const { type, data } = evt;

  if (type === "user.created") {
    try {
      dbConnect()

      
      
      await User.create({
        clerkId: data.id,
        username: data.username,
        email: data.email_addresses[0].email_address
      });
      return NextResponse.json({mesage: "user created successfully"}, { status: 201 });
    } catch (err) {
      console.error("MongoDB error", err);
      return NextResponse.json({}, { status: 500 });
    }
  }
  //Add other webhook events that you need to listen to.
  return NextResponse.json({});
}
