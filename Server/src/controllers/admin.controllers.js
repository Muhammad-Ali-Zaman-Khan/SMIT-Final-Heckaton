import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";

// Create Admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully", admin: savedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
};

// Get All Admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};

// Get Admin by Email
const getAdminByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error });
  }
};

// Update Admin
const updateAdmin = async (req, res) => {
  try {
    const { email } = req.params;
    const { name, password } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const updatedAdmin = await Admin.findOneAndUpdate(
      { email },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error });
  }
};

// Delete Admin
const deleteAdmin = async (req, res) => {
  try {
    const { email } = req.params;

    const deletedAdmin = await Admin.findOneAndDelete({ email });

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully", admin: deletedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error });
  }
};


export {createAdmin , getAdminByEmail , getAllAdmins , updateAdmin , deleteAdmin};