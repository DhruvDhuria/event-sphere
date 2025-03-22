import mongoose, {Schema, Document} from "mongoose";

export interface Category extends Document {
    name: string;
    _id: string;
    description?: string;
    image?: string;
}

const categorySchema = new Schema<Category>({
    name: {
        type: String,
        required: [true, "Name is required"],
    }, 
    description: {
        type: String,
    },
    image: {
        type: String,
    }
})

const Category = mongoose.models.Category as mongoose.Model<Category> || mongoose.model<Category>("Category", categorySchema);
export default Category