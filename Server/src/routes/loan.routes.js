import express from "express";
import {createLoan , getAllLoans , getLoanById , updateLoan , deleteLoan} from "../controllers/loan.controllers.js";

const router = express.Router();

// Routes
router.post("/loans", createLoan); 
router.get("/loans", getAllLoans); 
router.get("/loans/:id", getLoanById);
router.put("/loans/:id", updateLoan); 
router.delete("/loans/:id", deleteLoan); 

export default router;
