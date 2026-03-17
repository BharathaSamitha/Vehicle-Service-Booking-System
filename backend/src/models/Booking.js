import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Core customer & vehicle info (aligned with frontend)
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },

    // Optional extended details (for future expansion / manual entries)
    customerPhone: { type: String },
    vehicleMake: { type: String },
    vehicleModel: { type: String },
    vehicleYear: { type: Number },

    // Link to configured categories (used mainly by admins)
    serviceCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: false,
    },

    preferredDate: { type: Date },
    notes: { type: String },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

