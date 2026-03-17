import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Load environment variables


const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    // Fail fast with a clear message if JWT_SECRET is missing
    throw new Error(
      "JWT_SECRET is not set. Define it in your backend .env file."
    );
  }

  return jwt.sign({ id }, secret, {
    expiresIn: "7d",
  });
};

// Seed a default admin if none exists
export const ensureAdminSeeded = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (!existingAdmin) {
    const admin = new User({
      name: "Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });
    await admin.save();
    console.log("Default admin created: admin@example.com / admin123");
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body || {};

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email, role: "admin" });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = generateToken(user._id);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // Detailed logging for debugging in development / logs
    console.error("Login error:", error);

    // More meaningful error response while avoiding leaking full internals
    return res.status(500).json({
      message: "Authentication failed.",
      error:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body || {};

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required." });
    }

    const exists = await User.findOne({ email: String(email).toLowerCase() });
    if (exists) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Registration failed.",
      error:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({
      email: String(email).toLowerCase(),
      role: "user",
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = generateToken(user._id);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User login error:", error);
    return res.status(500).json({
      message: "Authentication failed.",
      error:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

