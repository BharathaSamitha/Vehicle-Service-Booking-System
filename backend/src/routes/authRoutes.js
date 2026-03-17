import express from "express";
import {
  loginAdmin,
  ensureAdminSeeded,
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

ensureAdminSeeded().catch((err) => console.error("Error seeding admin:", err));

router.post("/login", loginAdmin);

// Customer auth
router.post("/register", registerUser);
router.post("/user/login", loginUser);

export default router;

