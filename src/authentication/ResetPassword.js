import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthImage from "../images/auth-image.jpg";
import axios from "axios";
import "./ResetPassword.css";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/reset-password/${token}`,
        { newPassword },
      );
      toast.success(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Error resetting password" + error);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password-image">
        <img src={AuthImage} alt="Reset Password" />
      </div>
      <div className="reset-password-form">
        <h2>Reset Password</h2>
        <p>
          Hey, Simply create and confirm your new password here to get back on
          track!
        </p>
        <form onSubmit={handleResetPassword}>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Create New Password"
              className="inputss"
              required
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} eye-icon`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="inputss"
            required
          />
          <button type="submit" className="buttons">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
