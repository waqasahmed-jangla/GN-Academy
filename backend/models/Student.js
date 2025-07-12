// backend/models/Student.js
import mongoose from 'mongoose'
import Counter from './Counter.js'

const studentSchema = new mongoose.Schema({
  enrollmentId: { type: Number, unique: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: Date, required: true },
  cnic: { type: String, required: true },
  fatherCnic: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  picture: { type: String },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true }
})

// ✅ Auto-increment middleware
studentSchema.pre('save', async function (next) {
  if (!this.enrollmentId) {
    const counter = await Counter.findOneAndUpdate(
      { id: 'student_enrollment' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
    this.enrollmentId = counter.seq
  }
  next()
})
export default mongoose.model('Student', studentSchema)