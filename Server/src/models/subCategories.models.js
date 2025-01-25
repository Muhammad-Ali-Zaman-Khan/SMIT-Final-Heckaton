import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
    name: { 
      type: String,
      required: true 
    },
    loanCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Loan',
      required: true 
    },
  },
  {
    timestamps: true,
  },
);
  

export default mongoose.model("Subcategory", SubcategorySchema);
  