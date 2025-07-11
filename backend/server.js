// backend/server.js
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

dotenv.config()
const app = express()

// ✅ JSON body parser must be before routes
app.use(cors())
app.use(express.json()) // <-- this line is critical!

// Connect DB
connectDB()

// Routes
import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import feeRoutes from "./routes/feeRoutes.js"

app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/fees", feeRoutes)
app.use("/uploads", express.static("uploads"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
