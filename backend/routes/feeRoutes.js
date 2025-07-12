import express from "express"
import { createFee, getFees } from "../controllers/feeController.js"
import { protect, authorizeRoles } from "../middleware/authMiddleware.js"

const router = express.Router()

// ✅ Protect all fee routes
router.use(protect, authorizeRoles("admin", "deo"))

router.get("/", getFees)
router.post("/", createFee)

export default router
