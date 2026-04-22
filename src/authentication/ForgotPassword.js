import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthImage from "../images/Forgot password.png";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/forgot-password`, {
        email,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Error sending password reset link" + error);
      setMessage("Failed to send password reset link");
    }
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password-image">
        <img src={AuthImage} alt="Reset Password" />
      </div>
      <div className="forgot-password-form">
        <h2>Forgot Password</h2>
        <img src={AuthImage} className="forgot-pass-img-only-mobile-view" />
        <p>
          Forgot your password? No worries! Set a new password and regain access
          in no time!
        </p>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            className="inputss"
            required
          />
          <button type="submit" className="buttons">
            Send Reset Link
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
