import {z} from "zod";

export const eventsSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(20, "Title must be at most 20 characters"),
    description: z.string().min(3, "Description must be at least 3 characters").max(100, "Description must be at most 100 characters"),
    location: z.object({
        address: z.string().min(3, "Address must be at least 3 characters").max(100, "Address must be at most 100 characters"),
        latitude: z.number(),
        longitude: z.number(),
    }),
    time: z.string(),
    category: z.string(),
    date: z.date(),
    image: z.string()
})