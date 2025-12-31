import mongoose from "mongoose";
import dotenv from "dotenv"

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected succesfully")
    } catch (error) {
        console.error("MongoDB failed to connect")
    }
}

export default dbConnect