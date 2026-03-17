import ServiceCategory from "../models/ServiceCategory.js";

export const createCategory = async (req, res) => {
  try {
    const category = await ServiceCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid category data", error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await ServiceCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating category" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await ServiceCategory.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category" });
  }
};

