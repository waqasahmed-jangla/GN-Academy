// backend/models/Fee.js
import mongoose from "mongoose"

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  totalFee: { type: Number, required: true },
  paid: { type: Number, required: true },
  remaining: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
})

export default mongoose.model("Fee", feeSchema)
