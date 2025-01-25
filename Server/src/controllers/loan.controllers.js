import Loan from "../models/loan.model.js";

// Create Loan
const createLoan = async (req, res) => {
  try {
    const { category, subcategory, maxLoanAmount, loanPeriod } = req.body;

    const newLoan = new Loan({
      category,
      subcategory,
      maxLoanAmount,
      loanPeriod,
    });

    const savedLoan = await newLoan.save();
    res.status(201).json({ message: "Loan created successfully", loan: savedLoan });
  } catch (error) {
    res.status(500).json({ message: "Error creating loan", error });
  }
};

// Get All Loans
const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json({ loans });
  } catch (error) {
    res.status(500).json({ message: "Error fetching loans", error });
  }
};

// Get Loan by ID
const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findById(id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ loan });
  } catch (error) {
    res.status(500).json({ message: "Error fetching loan", error });
  }
};

// Update Loan
const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, subcategory, maxLoanAmount, loanPeriod } = req.body;

    const updatedLoan = await Loan.findByIdAndUpdate(
      id,
      { category, subcategory, maxLoanAmount, loanPeriod },
      { new: true, runValidators: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ message: "Loan updated successfully", loan: updatedLoan });
  } catch (error) {
    res.status(500).json({ message: "Error updating loan", error });
  }
};

// Delete Loan
const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLoan = await Loan.findByIdAndDelete(id);

    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json({ message: "Loan deleted successfully", loan: deletedLoan });
  } catch (error) {
    res.status(500).json({ message: "Error deleting loan", error });
  }
};

export {createLoan , getAllLoans , getLoanById , updateLoan , deleteLoan};