// backend/updateCourses.js
import mongoose from "mongoose"
import dotenv from "dotenv"
import Course from "./models/Course.js"
import connectDB from "./config/db.js"

dotenv.config()

const updateCourses = async () => {
  try {
    await connectDB()
    const result = await Course.updateMany({}, { $set: { fee: 10000 } })
    console.log("✅ Courses updated:", result.modifiedCount)
    process.exit()
  } catch (err) {
    console.error("❌ Error updating courses:", err.message)
    process.exit(1)
  }
}

updateCourses()
