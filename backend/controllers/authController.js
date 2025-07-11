// backend/controllers/authController.js
import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body
  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: "User already exists" })

    const user = await User.create({ name, email, password, role })
    const token = generateToken(user)

    res.status(201).json({ token, user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: "Invalid credentials" })

    const isMatch = await user.matchPassword(password)
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

    const token = generateToken(user)
    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
