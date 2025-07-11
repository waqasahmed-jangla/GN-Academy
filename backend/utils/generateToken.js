// backend/utils/generateToken.js
import jwt from "jsonwebtoken"

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
}

export default generateToken
