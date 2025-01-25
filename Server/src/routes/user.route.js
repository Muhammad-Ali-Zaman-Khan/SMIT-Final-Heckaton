import express from "express";
import { loginUser, registerUser , createUser , getAllUsers , getUserByCNIC , updateUser , deleteUser } from "../controllers/user.controller.js";


const router = express.Router();

// REGISTER USER

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/users", createUser); 
router.get("/users", getAllUsers); 
router.get("/users/:cnic", getUserByCNIC);
router.put("/users/:cnic", updateUser);
router.delete("/users/:cnic", deleteUser);


export default router;