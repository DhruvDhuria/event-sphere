import mongoose, {Schema, Document} from "mongoose";

export interface Event extends Document {
    title: string;
    description: string;
    location: {
        address: string;
        latitude: number;
        longitude: number;
    };
    time: string;
    category: string;
    date: Date;
    image: string;
    organizerId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const eventschema = new Schema<Event>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  location: {
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    latitude: {
      type: Number,
      required: [true, "Latitube is required"],
    },
    longitude: {
      type: Number,
      required: [true, "Longitude is required"],
    },
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  organizerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Organizer ID is required"],
  }

}, {timestamps: true});

const eventSchema = mongoose.models.Event as mongoose.Model<Event> || mongoose.model<Event>("Event", eventschema);

export default eventSchema;

