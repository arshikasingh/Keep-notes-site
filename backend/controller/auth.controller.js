import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
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
