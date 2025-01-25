import express from "express";
import {createLoanApplication , getAllLoanApplications , getLoanApplicationById , updateLoanApplicationStatus , deleteLoanApplication} from "../controllers/loanApplication.controllers.js";

const router = express.Router();

// Routes
router.post("/loanapplications", createLoanApplication);
router.get("/loanapplications", getAllLoanApplications);
router.get("/loanapplications/:id", getLoanApplicationById);
router.put("/loanapplications/:id/status", updateLoanApplicationStatus);
router.delete("/loanapplications/:id", deleteLoanApplication);

export default router;
