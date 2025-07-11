// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "No token, access denied" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: "Invalid token" })
  }
}