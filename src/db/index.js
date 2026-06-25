import mongoose from "mongoose";
import { DB_NAME } from "../constants/index.js";
// import express from "express"
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`mongodb connected successfully on port ${process.env.PORT}`)
    } catch (error) {
        console.error("MongoDB connection error", error)
        process.exit(1)
    }
}
export default connectDB