import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      
    if (!email || !password) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:6001/login", {
        email,
        password,
      });
      if (response.status === 200) {
        console.log("omg we made it")
         // destructure the token and isDoctor properties from the response.data object
        //remember that login returns the object?
        localStorage.setItem("token", response.data.token);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.log("omg we fucked it")
      console.error(error);
    }
  };

  return (
    <div className="w-full fixed top-24 flex items-center justify-center py-6 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-6 text-center">Log in</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <input
                type="text"
                className="w-full p-3 bg-gray-100 rounded focus:outline-none focus:bg-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                className="w-full p-3 bg-gray-100 rounded focus:outline-none focus:bg-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center mb-6">
              <button className="bg-blue-300 text-gray-700 font-semibold px-4 py-2 rounded-md focus:outline-none">LOGIN</button>
            </div>
          </form>
          <div className="text-center mb-4">
            Don't have an account?
            <Link to={"/signup"}>
              <button className="ml-2 bg-green-300 text-gray-700 font-semibold px-4 py-2 rounded-md focus:outline-none">SIGN UP</button>
            </Link>
          </div>
          <div className="text-center">
            <Link to={"/ForgotPassword"}>
              <button className="bg-red-300 text-gray-700 font-semibold px-4 py-2 rounded-md focus:outline-none">Forgot Password?</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
