import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CourseForm = ({ onSuccess, editData, clearEdit }) => {
  const [courseId, setCourseId] = useState('')
  const [courseName, setCourseName] = useState('')
  const [description, setDescription] = useState('')
  const [fee, setFee] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (editData) {
      setCourseId(editData.courseId)
      setCourseName(editData.courseName)
      setDescription(editData.description || '')
      setFee(editData.fee || '')
    } else {
      setCourseId('')
      setCourseName('')
      setDescription('')
      setFee('')
    }
  }, [editData])

const handleSubmit = async (e) => {
  e.preventDefault()

  // Ensure fee is a valid number
  const feeNumber = parseFloat(fee)
  if (isNaN(feeNumber) || feeNumber <= 0) {
    alert("Please enter a valid numeric fee greater than 0.")
    return
  }

  const payload = {
    courseId,
    courseName,
    description,
    fee: feeNumber
  }

  try {
    if (editData) {
      await axios.put(`http://localhost:5000/api/courses/${editData._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      clearEdit()
    } else {
      await axios.post('http://localhost:5000/api/courses', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
    }

    onSuccess()
  } catch (err) {
    alert('Error: ' + (err.response?.data?.message || err.message))
  }
}

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>{editData ? 'Edit Course' : 'Add New Course'}</h5>
      <div className="row g-2">
        <div className="col-md-3">
          <input value={courseId} onChange={e => setCourseId(e.target.value)} required className="form-control" placeholder="Course ID" />
        </div>
        <div className="col-md-3">
          <input value={courseName} onChange={e => setCourseName(e.target.value)} required className="form-control" placeholder="Course Name" />
        </div>
        <div className="col-md-3">
          <input value={fee} onChange={e => setFee(e.target.value)} required type="number" className="form-control" placeholder="Total Fee" />
        </div>
        <div className="col-md-3">
          <input value={description} onChange={e => setDescription(e.target.value)} className="form-control" placeholder="Description" />
        </div>
      </div>
      <button className="btn btn-primary mt-3" type="submit">
        {editData ? 'Update Course' : 'Add Course'}
      </button>
    </form>
  )
}

export default CourseForm