import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URI;

export const connectDB = async () => {
    if (!mongoUrl) {
        console.error("MONGO_URI is not defined in .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUrl);
        console.log("Mongo database connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};
