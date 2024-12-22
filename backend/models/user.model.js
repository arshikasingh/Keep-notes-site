import mongoose from "mongoose";
//creating user schema
//ye schema jo hai ye request ki body mein jayega
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
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
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

//create model  (object based on schema)
//first param is about the model file name and second is schema name
// model-> route -> controller
const User = mongoose.model("User", userSchema);
console.log("Userrr", User);

export default User;
