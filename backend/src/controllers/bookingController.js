import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      vehicleNumber,
      serviceType,
      date,
      time,
      customerPhone,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      notes,
      serviceCategory,
    } = req.body;

    const booking = await Booking.create({
      customerName,
      customerEmail,
      vehicleNumber,
      serviceType,
      date,
      time,
      customerPhone,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      notes,
      serviceCategory: serviceCategory || undefined,
      preferredDate: date || undefined,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Invalid booking data", error: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("serviceCategory", "name")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "approved", "rejected", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("serviceCategory", "name");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating booking status" });
  }
};

