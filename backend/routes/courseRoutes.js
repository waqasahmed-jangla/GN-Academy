// backend/routes/courseRoutes.js
import express from "express"
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

// All routes below are protected and allowed only for admin
router.use(protect, authorizeRoles("admin"))

router.get("/", getCourses)
router.get("/:id", getCourseById)
router.post("/", createCourse)
router.put("/:id", updateCourse)
router.delete("/:id", deleteCourse)

export default router
