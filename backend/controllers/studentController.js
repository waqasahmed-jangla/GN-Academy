import Student from "../models/Student.js"
import Course from "../models/Course.js"

export const createStudent = async (req, res) => {
  try {
    const {
      name, fatherName, dob, cnic, fatherCnic,
      course, contactNo, address, email
    } = req.body

    const picture = req.file ? req.file.filename : null

    const existing = await Student.findOne({ cnic })
    if (existing) return res.status(400).json({ message: "Student already exists" })

    const student = await Student.create({
      name, fatherName, dob, cnic, fatherCnic,
      course, contactNo, address, email, picture
    })

    res.status(201).json(student)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("course")
    res.json(students)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  
}
