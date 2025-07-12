import Student from "../models/Student.js"
import Course from "../models/Course.js"

export const createStudent = async (req, res) => {
  try {
    const {
      name, fatherName, dob, cnic, fatherCnic,
      course, contactNo, address, email
    } = req.body

    const picture = req.file ? `uploads/${req.file.filename}` : null

    const student = await Student.create({
      name,
      fatherName,
      dob,
      cnic,
      fatherCnic,
      course,
      contactNo,
      address,
      email,
      picture
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
export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id).populate('course')
  if (!student) return res.status(404).json({ message: 'Not found' })
  res.json(student)
}

export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(student)
}

export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id)
  res.json({ message: 'Student deleted' })
}

