import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/index.js";
import usersRoutes from "./src/routes/product.route.js"
import productRoutes from "./src/routes/user.route.js"
import orderRoutes from "./src/routes/order.route.js"
dotenv.config();
const app = express();
const port = 3000

app.use(express.json());
app.use(cors());
app.use(cookieParser());


// routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });