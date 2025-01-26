import express from "express";
import { loginUser, registerUser , createUser , getAllUsers , getUserByCNIC , updateUser , deleteUser , logoutUser } from "../controllers/user.controller.js";


const router = express.Router();

// REGISTER USER

router.post("/register" , registerUser);
router.post("/loginUser" , loginUser);
router.get("/logoutuser", logoutUser);
router.post("/users", createUser); 
router.get("/users", getAllUsers); 
router.get("/users/:cnic", getUserByCNIC);
router.put("/users/:cnic", updateUser);
router.delete("/users/:cnic", deleteUser);


export default router;