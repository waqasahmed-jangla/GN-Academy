// backend/routes/studentRoutes.js
import express from 'express'
// Import protect and authorizeRoles as named exports from authMiddleware.js
import { protect, authorizeRoles } from "../middleware/authMiddleware.js"
// Assuming roleMiddleware.js also exports authorizeRoles as a named export
// If authorizeRoles is ONLY in authMiddleware.js, remove the line below.
// If you have a separate roleMiddleware.js, ensure it's used correctly.
// For now, I'll assume authorizeRoles comes from authMiddleware.js for consistency
// with your other route files.
// import { authorizeRoles } from '../middleware/roleMiddleware.js' // Check if this file is actually needed

// Import the student controller functions
import {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} from '../controllers/studentController.js'


const router = express.Router()

// Apply protection to all routes in this router.
// If 'protect' is the only middleware you want from authMiddleware.js for all student routes,
// you can apply it here.
router.use(protect); // Apply the 'protect' middleware to all subsequent routes

// If you also want to authorize roles for all student routes, you can add it here.
// For example, if only 'admin' or 'dataentry' can manage students:
// router.use(authorizeRoles("admin", "dataentry")); // Add this line if you need role authorization for all student routes

// Routes
router.get('/', getStudents)
router.get('/:id', getStudentById)
router.post('/', createStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router