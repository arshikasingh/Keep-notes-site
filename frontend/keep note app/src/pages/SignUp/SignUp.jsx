import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleSignUp = async (e) => {
    e.preventDefault(); //to stop the default reloading behaviour
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter correct email id");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setError(""); //free  the error
    //signup api
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/signup`,
        { userName: name, email, password },
        { withCredentials: true }
      );
      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      setError("");

      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      console.log("error in signup", err.message);
      setError(err.message);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-27">Sign Up</h4>
            <input
              type="text"
              className="input-box"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              SIGN UP
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-[#2B85FF] underline"
              >
                {" "}
                Login{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
