// backend/server.js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import feeRoutes from "./routes/feeRoutes.js"

dotenv.config()

const app = express() // ✅ Declare app first!

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ Serve static files (images) from uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// ✅ Middleware
app.use(cors())
app.use(express.json())

// ✅ Connect database
connectDB()

// ✅ Routes
app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/fees", feeRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
