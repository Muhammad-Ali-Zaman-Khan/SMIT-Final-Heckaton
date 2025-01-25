import mongoose from "mongoose";


const loanApplicationSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", 
      required: true,
    },
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan", 
      required: true,
    },
    requestedAmount: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, 
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("LoanApplication", loanApplicationSchema);
  