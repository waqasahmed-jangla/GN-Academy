// backend/models/Student.js
import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: Date, required: true },
  cnic: { type: String, required: true },
  fatherCnic: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  picture: { type: String },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
})

export default mongoose.model("Student", studentSchema)
