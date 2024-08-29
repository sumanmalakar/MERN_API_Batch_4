import express from "express";
import mongoose from "mongoose";
import bodyParse from "express";
import cors from 'cors'
import productRouter from "./routes/product.js";
import userRouter from './routes/user.js'
import { config } from "dotenv";

const app = express();
app.use(bodyParse.json());

// .env setup
config({ path: ".env" }); 

app.use(cors({
  origin:true,
  methods:["GET","POST","DELETE","PUT"],
  credentials:true
}))

// userRouter
app.use('/api/user',userRouter);

// productRouter
app.use("/api/products", productRouter);

// MVC
// M = Models - (DB Schema)
// V = Views - Client (React App)
// C = Controllers - (functions)

mongoose
  .connect(process.env.Mongo_Url, {
    dbName: "Volcanus_Batch_4_4pm",
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(() => console.log("Internal server error"));

const port = 1000;

app.listen(port, () => console.log(`server is running on port ${port}`));
