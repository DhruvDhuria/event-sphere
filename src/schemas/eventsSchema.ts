import {z} from "zod";

const fileSchema = z.custom<File>((val) => {
  return (
    val instanceof File ||
    val instanceof Blob ||
    (typeof val === "object" &&
      val !== null &&
      "name" in val &&
      "size" in val &&
      "type" in val)
  );
}, "Image file is required");

export const eventsSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(30, "Title must be at most 20 characters"),
    description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be at most 100 characters"),
    location: z.string().min(5, "Location must be at least 5 characters").max(150, "Location must be at most 100 characters"),
    time: z.string().min(1, "Time is required"),
    category: z.string({required_error: "Please select a category"}),
    date: z.date({required_error: "Event date is required"}),
    image: fileSchema
})