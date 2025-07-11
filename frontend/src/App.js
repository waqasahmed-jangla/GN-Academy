// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'
import DEODashboard from './pages/DEODashboard'

function App() {
  const user = JSON.parse(localStorage.getItem('user'))

  const roleRoute = {
    admin: <AdminDashboard />,
    student: <StudentDashboard />,
    deo: <DEODashboard />,
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={user ? roleRoute[user.role] : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
