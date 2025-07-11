// backend/middleware/upload.js
import multer from "multer"
import path from "path"
import fs from "fs"

// Ensure uploads directory exists
const uploadPath = "uploads"
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath)
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true)
  else cb(new Error("Only image files are allowed"), false)
}

const upload = multer({ storage, fileFilter })

export default upload