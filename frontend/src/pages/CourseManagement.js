import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CourseForm from '../components/CourseForm'

const CourseManagement = () => {
  const [courses, setCourses] = useState([])
  const [editCourse, setEditCourse] = useState(null)
  const token = localStorage.getItem('token')

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/courses', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCourses(data)
    } catch (err) {
      console.error('❌ Fetch Error:', err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    await axios.delete(`http://localhost:5000/api/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchCourses()
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <div className="container mt-5">
      <h3>📚 Manage Courses</h3>

      {/* ✅ Pass onSuccess prop */}
      <CourseForm
        onSuccess={fetchCourses}
        editData={editCourse}
        clearEdit={() => setEditCourse(null)}
      />

      <hr />

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Course ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.description}</td>
              <td>{course.fee}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditCourse(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CourseManagement