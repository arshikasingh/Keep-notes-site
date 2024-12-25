import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateEmail } from "../../utils/helper";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/apiConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //login api functionality
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    try {
      //TODO
      dispatch(signInStart());
      const res = await axios.post(
        `${API_URL}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      if (res.data.success === false) {
        toast.error(res.data.message);
        dispatch(signInFailure(data.message)); //TODO
      }
      toast.success(res.data.message);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
      dispatch(signInFailure(err.message));
    }
  };
  return (
    <div className="flex  items-center justify-center mt-28 border">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>
          <input
            type="text"
            placeholder="Enter your mail"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <p className="text-sm text-center mt-4">
            Not Regoistered yet?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-[#2B85FF] underline"
            >
              {" "}
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
