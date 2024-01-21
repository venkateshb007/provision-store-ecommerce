import { useState } from "react";
import { SHA256 } from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const validatePassword = (password) =>
    /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
      password
    );

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setErrors({
        ...errors,
        password:
          "Password must be 8 characters long, contain one capital letter, one small letter, one number, and one special character.",
      });
      return;
    }

    // Hash the password using SHA256 from crypto-js
    const hashedPassword = SHA256(password).toString();

    // Create FormData object for the payload
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", hashedPassword);
    formData.append("grant_type", "password");

    try {
      const response = await axios.post(
        "https://apiv2stg.promilo.com/user/oauth/token",
        formData,
        {
          headers: {
            Authorization: "Basic UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg==",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      sessionStorage.setItem("accessToken", response.data.access_token);

      console.log("Login Successful", response.data);
      navigate("/products");
      alert("Logged in");
    } catch (error) {
      console.log("Login Error:", error);
      alert("Invalid Email or Password");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-300">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login Page</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-stone-800 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter Your Email"
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-stone-800 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter Your Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-40 bg-stone-800 text-white px-4 py-2 rounded-md hover:bg-stone-950 focus:outline-none focus:bg-stone-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
