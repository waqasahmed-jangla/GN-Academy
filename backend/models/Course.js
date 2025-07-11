// backend/models/Course.js
import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  fee: { type: Number, required: true },
  description: { type: String },
})

export default mongoose.model("Course", courseSchema)
