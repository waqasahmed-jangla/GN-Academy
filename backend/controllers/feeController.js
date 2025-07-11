import Fee from "../models/Fee.js"
import Student from "../models/Student.js"

export const createFee = async (req, res) => {
  const { studentId, paid, description } = req.body

  try {
    const student = await Student.findById(studentId).populate("course")
    if (!student || !student.course) {
      return res.status(404).json({ message: "Student or course not found" })
    }

    const totalFee = student.course?.fee || 10000 // fallback if not in DB
    const remaining = totalFee - paid

    const fee = await Fee.create({
      student: student._id,
      course: student.course._id,
      totalFee,
      paid,
      remaining,
      description
    })

    res.status(201).json(fee)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


export const getFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("student", "name cnic")
      .populate("course", "courseName courseId")

    res.json(fees)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
