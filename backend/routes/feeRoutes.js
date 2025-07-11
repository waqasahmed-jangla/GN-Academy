import express from "express"
import { createFee, getFees } from "../controllers/feeController.js"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.use(protect, authorizeRoles("admin", "deo"))

router.get("/", getFees)
router.post("/", createFee)

export default router
