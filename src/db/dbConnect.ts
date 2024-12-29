import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://amananurag20:0s5gdiIw6lGR7RB8@cluster0.h2rzd.mongodb.net/";

export const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
