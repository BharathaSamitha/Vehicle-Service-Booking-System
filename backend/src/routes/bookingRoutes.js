import express from "express";
import { createBooking, getBookings, updateBookingStatus } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public booking creation (customer form)
router.post("/", createBooking);

// Admin-only routes
router.get("/", protect, getBookings);
router.patch("/:id/status", protect, updateBookingStatus);

export default router;

