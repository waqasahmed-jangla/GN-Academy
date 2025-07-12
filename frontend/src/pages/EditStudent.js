import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [formData, setFormData] = useState({
    name: '', fatherName: '', dob: '', cnic: '',
    fatherCnic: '', course: '', contactNo: '',
    address: '', email: ''
  })
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const courseRes = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCourses(courseRes.data)

        const studentRes = await axios.get(`http://localhost:5000/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const student = studentRes.data
        setFormData({
          name: student.name,
          fatherName: student.fatherName,
          dob: student.dob.substring(0, 10),
          cnic: student.cnic,
          fatherCnic: student.fatherCnic,
          course: student.course?._id || '',
          contactNo: student.contactNo,
          address: student.address,
          email: student.email,
        })
      } catch (err) {
        alert('❌ Failed to load student')
      }
    }

    loadInitialData()
  }, [id, token])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('✅ Student updated successfully')
      navigate('/students')
    } catch (err) {
      alert('❌ Update failed')
    }
  }

  return (
    <div className="container mt-4">
      <h4>✏️ Edit Student</h4>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-4">
            <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="cnic" value={formData.cnic} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="fatherCnic" value={formData.fatherCnic} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <select className="form-select" name="course" value={formData.course} onChange={handleChange} required>
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.courseName}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input className="form-control" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-4">Update Student</button>
      </form>
    </div>
  )
}

export default EditStudent
