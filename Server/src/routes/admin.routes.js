import express from "express";
import {createAdmin , getAllAdmins , getAdminByEmail , updateAdmin , deleteAdmin} from "../controllers/admin.controllers.js";

const router = express.Router();

router.post("/admins", createAdmin); 
router.get("/admins", getAllAdmins); 
router.get("/admins/:email", getAdminByEmail); 
router.put("/admins/:email", updateAdmin); 
router.delete("/admins/:email", deleteAdmin);

export default router;
