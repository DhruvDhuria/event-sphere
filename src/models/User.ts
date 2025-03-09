import mongoose, {Schema, Document, mongo} from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    bio?: string;
    savedEvents?: mongoose.Types.ObjectId[];
    createdEvents?: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        unique: true,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    profilePicture: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    savedEvents: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Event",
            },
        ],
    createdEvents: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: "Event",
            }
        ],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;