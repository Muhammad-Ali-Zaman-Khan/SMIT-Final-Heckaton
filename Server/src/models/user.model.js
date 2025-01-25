import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  loans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
    },
  ],
},
{
  timestamps: true,
},
);

userSchema.pre("save" , async function (next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password , 10);
    next();
})

export default mongoose.model("Users", userSchema);

