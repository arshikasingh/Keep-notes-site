import jwt from "jsonwebtoken";
import { errorHandler } from "./error";

//doubt
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;//This is used to extract jwt from access_token 
  if(!token) {
    return next(errorHandler(401, "Unauthorized user"));

  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) {
      return new(errorHandler(403, "forbidden"));
    }
    req.user = user;
    next();
  })
}