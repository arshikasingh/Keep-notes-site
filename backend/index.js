import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";
import cors from "cors";

//now making server 
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("connected to mongodb");
  
}).catch((err) => {
  console.log("error in connecting", err);

})
const app = express();
//to make input as joson doubt 
app.use(express.json());
app.use(cookieParser());//why?
app.use(cors({origin : "*"}));
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  
});

//import routes 

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

//error handling 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
});