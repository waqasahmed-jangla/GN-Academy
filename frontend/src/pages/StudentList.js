import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const StudentList = () => {
  const [students, setStudents] = useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStudents(data)
    } catch (err) {
      console.error('Fetch students error:', err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure to delete this student?')) return
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchStudents() // Refresh the list
    } catch (err) {
      alert('❌ Delete failed')
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h3>📋 Student List</h3>
        <Link to="/students/add" className="btn btn-primary">+ Enroll New</Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Enrollment ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>CNIC</th>
            <th>Contact</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.enrollmentId}</td>
              <td>{s.name}</td>
              <td>{s.course?.courseName}</td>
              <td>{s.cnic}</td>
              <td>{s.contactNo}</td>
              <td>
                {s.picture && (
                  <img
                    src={`http://localhost:5000/${s.picture}`}
                    alt="pic"
                    style={{ height: '50px' }}
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/students/edit/${s._id}`)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s._id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentList