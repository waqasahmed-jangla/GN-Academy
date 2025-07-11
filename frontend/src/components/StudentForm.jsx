import React, { useEffect, useState } from 'react'
import axios from 'axios'

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    cnic: '',
    fatherCnic: '',
    course: '',
    contactNo: '',
    address: '',
    email: ''
  })
  const [picture, setPicture] = useState(null)
  const [courses, setCourses] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get('http://localhost:5000/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCourses(data)
    }
    fetchCourses()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => data.append(key, value))
    if (picture) data.append('picture', picture)

    try {
      await axios.post('http://localhost:5000/api/students', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      alert('✅ Student enrolled successfully')
      setFormData({
        name: '',
        fatherName: '',
        dob: '',
        cnic: '',
        fatherCnic: '',
        course: '',
        contactNo: '',
        address: '',
        email: ''
      })
      setPicture(null)
    } catch (err) {
      alert('❌ ' + (err.response?.data?.message || 'Submission failed'))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 mb-4 shadow-sm">
      <h5 className="mb-3">🎓 Student Enrollment</h5>
      <div className="row g-3">
        <div className="col-md-4">
          <input className="form-control" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <input className="form-control" name="cnic" placeholder="CNIC" value={formData.cnic} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="fatherCnic" placeholder="Father CNIC" value={formData.fatherCnic} onChange={handleChange} required />
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
          <input className="form-control" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <input type="file" className="form-control" onChange={(e) => setPicture(e.target.files[0])} accept="image/*" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-4">Enroll Student</button>
    </form>
  )
}

export default StudentForm