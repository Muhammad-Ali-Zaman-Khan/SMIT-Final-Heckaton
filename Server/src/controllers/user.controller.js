import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"


// nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "jasper.weber@ethereal.email",
      pass: "A7NeTsUtPRPEqQGy7x",
    },
  });

// GENERATE ACCESS AND REFRESH TOKEN
const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.ACCESS_JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: "7d" });
};



// create user 
const createUser = async (req, res) => {
  try {
    const { cnic, phone, address } = req.body;

    const existingUser = await User.findOne({ cnic });
    if (existingUser) {
      return res.status(400).json({ message: "User with this CNIC already exists." });
    }

    const newUser = new User({
      cnic,
      phone,
      address,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

// GET All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Without populating loans
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

  
// GET SINGLE USER BY CNIC
const getUserByCNIC = async (req, res) => {
  try {
    const { cnic } = req.params;
    const user = await User.findOne({ cnic }); // No population here

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user by CNIC:", error); // Log the error
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};


// UPDATE USER
const updateUser = async (req, res) => {
    try {
      const { cnic } = req.params;
      const { phone, address } = req.body;
  
      const updatedUser = await User.findOneAndUpdate(
        { cnic },
        { phone, address },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
};
  
// DELETE USER
const deleteUser = async (req, res) => {
    try {
      const { cnic } = req.params;
  
      const deletedUser = await User.findOneAndDelete({ cnic });
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
};


// register user

const registerUser = async (req, res) => {
  const { username, email, cnic } = req.body;

  if (!username) {
      return res.status(400).json({ message: "Username is required" });
  }
  if (!email) {
      return res.status(400).json({ message: "Email is required" });
  }
  // if (!password) {
  //     return res.status(400).json({ message: "Password is required" });
  // }
  // if (!address) {
  //     return res.status(400).json({ message: "Address is required" });
  // }
  // if (!phone) {
  //     return res.status(400).json({ message: "Phone is required" });
  // }
  if (!cnic) {
      return res.status(400).json({ message: "CNIC is required" });
  }

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(409).json({ message: "User already exists" });
      }

      const newUser = await User.create({
          username,
          email,
          cnic,
      });

      // Sending the email
      try {
          const info = await transporter.sendMail({
              from: '"Jasper Weber" <jasper.weber@ethereal.email>',
              to: `${email}, az030366@gmail.com`,
              subject: "HEllO!!",
              text: `Welcome to our platform, ${username}`,
          });

          console.log("Message sent: %s", info.messageId);
      } catch (error) {
          console.log("Error sending email:", error);
      }

      return res.status(201).json({
          message: "User registered successfully",
          data: {
              id: newUser._id,
              username: newUser.username,
              email: newUser.email,
              cnic: newUser.cnic,
          },
      });
  } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};



// login user


const loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        return res.status(400).json({ message: "Either username or email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const user = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        res.json({
            message: "User logged in successfully",
            accessToken,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




export {registerUser , loginUser , createUser , getAllUsers , getUserByCNIC , updateUser , deleteUser};