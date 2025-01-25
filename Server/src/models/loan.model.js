import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Wedding Loans", "Home Construction Loans", "Business Startup Loans", "Education Loans"],
  },
  subcategory: {
    type: String,
    required: true,
  },
  maxLoanAmount: {
    type: Number,
    required: true,
  },
  loanPeriod: {
    type: Number, 
    required: true,
  },
  
},
{
  timestamps: true,
}
);

export default mongoose.model("Loan", loanSchema);

