import express from "express"
import { createStudent, getStudents } from "../controllers/studentController.js"
import upload from "../middleware/upload.js"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.use(protect, authorizeRoles("admin", "deo"))

router.get("/", getStudents)
router.post("/", upload.single("picture"), createStudent)

export default router
