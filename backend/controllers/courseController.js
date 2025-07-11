// backend/controllers/courseController.js
import Course from "../models/Course.js"

export const createCourse = async (req, res) => {
  const { courseId, courseName, description } = req.body
  try {
    const existing = await Course.findOne({ courseId })
    if (existing) return res.status(400).json({ message: "Course ID already exists" })

    const course = await Course.create({ courseId, courseName, description })
    res.status(201).json(course)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.json(courses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ message: "Course not found" })
    res.json(course)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateCourse = async (req, res) => {
  const { courseId, courseName, description } = req.body
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { courseId, courseName, description },
      { new: true }
    )
    if (!course) return res.status(404).json({ message: "Course not found" })
    res.json(course)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return res.status(404).json({ message: "Course not found" })
    res.json({ message: "Course deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}