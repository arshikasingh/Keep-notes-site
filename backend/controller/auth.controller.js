import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
//hamlog ne ye signup function ko use kiya hai routes mein toh yahan se export kartenge or route mein import kartenge

export const signup = async (req, res, next) => {
  // we get the details from req.body
  console.log("request bodyyyyyy", req.body);

  const { userName, email, password } = req.body;
  // now it will check that user email is exist or not this findone function will written the matched doc
  const isValidUser = await User.findOne({ email });
  console.log("Is valid user", isValidUser);

  if (isValidUser) {
    return next(errorHandler(400, "User already exists")); //here next means it will return the direct error middleware
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  console.log("hashed password", hashedPassword);

  //if user does not exist then create its new user

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });
  //now we handle the error in try catch
  console.log("new user", newUser);

  try {
    //ye jo naya user bana hai ye uska save hone ka wait karega
    await newUser.save(); //it save the new user in db

    //If the save operation is successful, the response is sent back to the client with res.status(201).json() 201 is http status code created

    res.status(201).json({
      success: true,
      message: "User Created successfully",
    });
  } catch (err) {
    next(err);
  }
};

//function for signin

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    console.log("valid user", validUser);
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    //sending respond to the xlient

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login Successful",
      rest,
    });
  } catch (err) {
    return next(err);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
