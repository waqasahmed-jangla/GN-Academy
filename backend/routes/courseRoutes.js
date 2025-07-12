import express from "express"
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js"

import { protect, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

// ✅ Apply protection and role restriction
router.use(protect, authorizeRoles("admin"))

router.get("/", getCourses)
router.get("/:id", getCourseById)
router.post("/", createCourse)
router.put("/:id", updateCourse)
router.delete("/:id", deleteCourse)

export default router
