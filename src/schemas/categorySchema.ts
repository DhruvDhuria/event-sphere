import {z} from "zod";

export const categorySchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
    description: z.string().min(3, "Description must be at least 3 characters").max(100, "Description must be at most 100 characters").optional(),
    image: z.string().optional(),
})