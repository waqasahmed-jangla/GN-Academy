import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h2>👑 Admin Dashboard</h2>
      <p className="text-muted mb-4">Choose an action below:</p>

      <div className="row g-4">
        <div className="col-md-6">
          <Link to="/students" className="btn btn-outline-primary w-100 p-4 fs-5">
            🧑‍🎓 Student Enrollment
          </Link>
        </div>
        <div className="col-md-6">
          <Link to="/courses" className="btn btn-outline-success w-100 p-4 fs-5">
            📚 Manage Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard