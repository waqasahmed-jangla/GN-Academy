import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import StudentEnrollment from './pages/StudentEnrollment'
import CourseManagement from './pages/CourseManagement'
import StudentList from './pages/StudentList'
import EditStudent from './pages/EditStudent'

function App() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={user ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/courses" element={user ? <CourseManagement /> : <Navigate to="/" />} />

        {/* ✅ Fixed student routing */}
        <Route path="/students" element={user ? <StudentList /> : <Navigate to="/" />} />
        <Route path="/students/add" element={user ? <StudentEnrollment /> : <Navigate to="/" />} />
        <Route path="/students/edit/:id" element={user ? <EditStudent /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;