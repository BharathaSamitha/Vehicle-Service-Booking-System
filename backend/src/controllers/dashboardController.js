import Booking from "../models/Booking.js";
import ServiceCategory from "../models/ServiceCategory.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const pending = await Booking.countDocuments({ status: "pending" });
    const approved = await Booking.countDocuments({ status: "approved" });
    const rejected = await Booking.countDocuments({ status: "rejected" });
    const completed = await Booking.countDocuments({ status: "completed" });
    const categoriesCount = await ServiceCategory.countDocuments();

    const recentBookings = await Booking.find()
      .populate("serviceCategory", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalBookings,
      pending,
      approved,
      rejected,
      completed,
      categoriesCount,
      recentBookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

