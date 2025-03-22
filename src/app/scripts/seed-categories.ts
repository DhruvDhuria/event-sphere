import mongoose, { mongo } from "mongoose";
import Category from "@/models/Category";
import categories from "./categories.json" assert {type: "json"}
import dbConnect from "@/lib/dbConnect";
import  "../../../envConfig";


interface CategoryType {
    name: string;
    description?: string;
    image?: string;
}

const categoryList: CategoryType[] = categories;

async function seedCategories() {
  try {
    await dbConnect();
    await Category.deleteMany({}); // Clear existing categories (optional)
    await Category.insertMany(categoryList);
    console.log("Categories seeded successfully!");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1); // Exit with error code
  }
}

seedCategories();
