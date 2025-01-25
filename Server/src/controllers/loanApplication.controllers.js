import LoanApplication from "../models/loanApplication.model.js";
import Loan from "../models/loan.model.js";
import User from "../models/user.model.js";

// Create Loan Application
const createLoanApplication = async (req, res) => {
  try {
    const { user, loan, requestedAmount, duration } = req.body;

    const existingUser = await User.findById(user);
    const existingLoan = await Loan.findById(loan);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!existingLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const newLoanApplication = new LoanApplication({
      user,
      loan,
      requestedAmount,
      duration,
    });

    const savedLoanApplication = await newLoanApplication.save();
    res.status(201).json({
      message: "Loan application created successfully",
      loanApplication: savedLoanApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating loan application", error });
  }
};

// Get All Loan Applications
const getAllLoanApplications = async (req, res) => {
  try {
    const loanApplications = await LoanApplication.find()
      .populate("users", "cnic phone address") 
      .populate("loan", "category subcategory maxLoanAmount"); 

    res.status(200).json({ loanApplications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching loan applications", error });
  }
};

// Get Loan Application by ID
const getLoanApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const loanApplication = await LoanApplication.findById(id)
      .populate("user", "cnic phone address")
      .populate("loan", "category subcategory maxLoanAmount");

    if (!loanApplication) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    res.status(200).json({ loanApplication });
  } catch (error) {
    res.status(500).json({ message: "Error fetching loan application", error });
  }
};

// Update Loan Application Status
const updateLoanApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedLoanApplication = await LoanApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedLoanApplication) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    res.status(200).json({
      message: "Loan application status updated successfully",
      loanApplication: updatedLoanApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating loan application", error });
  }
};

// Delete Loan Application
const deleteLoanApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLoanApplication = await LoanApplication.findByIdAndDelete(id);

    if (!deletedLoanApplication) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    res.status(200).json({
      message: "Loan application deleted successfully",
      loanApplication: deletedLoanApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting loan application", error });
  }
};

export { createLoanApplication , getAllLoanApplications , getLoanApplicationById , updateLoanApplicationStatus , deleteLoanApplication}