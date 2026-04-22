import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogo from "../images/Google.png";
import AuthImage from "../images/auth-image1.png";
import "./SignUp.css";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailOtp, setEmailOtp] = useState(null);
  const [phoneOtp, setPhoneOtp] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailOtpInput, setEmailOtpInput] = useState("");
  const [phoneOtpInput, setPhoneOtpInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
    if (message === "Registered successfully") {
      navigate("/login");
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsConfirmationOpen(true);
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setIsConfirmationOpen(true);
      return;
    }

    if (!emailVerified || !phoneVerified) {
      setMessage("Please verify your email and phone before signing up");
      setIsConfirmationOpen(true);
      return;
    }

    if (!isChecked) {
      setMessage(
        "You must accept the privacy policy and terms and conditions to sign up.",
      );
      setIsConfirmationOpen(true);
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/register`, {
        name,
        email,
        phone,
        password,
      });
      setMessage("Registered successfully");
      setIsConfirmationOpen(true);
    } catch (err) {
      if (err.response?.data?.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage("Signup failed: " + err.message);
      }
      setIsConfirmationOpen(true);
    }
  };

  const handleGoogleSignup = () => {
    window.open(`${BASE_URL}/auth/google`, "_self");
  };

  const verifyEmail = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/verify-email`, {
        email,
      });
      setEmailOtp(response.data.otp);
      setMessage("OTP sent successfully to email");
      setIsConfirmationOpen(true);
    } catch (error) {
      setMessage("Failed to send email OTP: " + error.message);
      setIsConfirmationOpen(true);
    }
  };

  const verifyPhone = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/verify-phone`, {
        phone,
      });
      setPhoneOtp(response.data.otp);
      setMessage("OTP sent successfully to phone");
      setIsConfirmationOpen(true);
    } catch (error) {
      setMessage("Failed to send phone OTP: " + error.message);
      setIsConfirmationOpen(true);
    }
  };

  const handleEmailOtpVerification = () => {
    if (emailOtpInput === emailOtp) {
      setEmailVerified(true);
      setMessage("Email verified successfully");
      setIsConfirmationOpen(true);
    } else {
      setMessage("Invalid email OTP");
      setIsConfirmationOpen(true);
    }
  };

  const handlePhoneOtpVerification = () => {
    if (phoneOtpInput === phoneOtp) {
      setPhoneVerified(true);
      setMessage("Phone verified successfully");
      setIsConfirmationOpen(true);
    } else {
      setMessage("Invalid phone OTP");
      setIsConfirmationOpen(true);
    }
  };

  return (
    <div className="signup">
      <div className="signup-image">
        <img src={AuthImage} alt="Login Image" />
      </div>

      <div className="signup-form">
        <h2 className="heading">Milestono</h2>
        <p>
          Welcome to the MILESTONO, <br />
          We&apos;re excited to welcome you! .
        </p>
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="inputss"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            disabled={emailVerified}
            className="inputss"
          />
          {!emailVerified && (
            <>
              <button
                type="button"
                className="verify-btn"
                onClick={verifyEmail}
                disabled={emailOtp}
              >
                Verify Email
              </button>
              {emailOtp && (
                <>
                  <input
                    type="text"
                    value={emailOtpInput}
                    onChange={(e) => setEmailOtpInput(e.target.value)}
                    placeholder="Enter Email OTP"
                    className="inputss"
                  />
                  <button
                    type="button"
                    className="verify-btn"
                    onClick={handleEmailOtpVerification}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </>
          )}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            disabled={phoneVerified}
            className="inputss"
          />
          {!phoneVerified && (
            <>
              <button
                type="button"
                className="verify-btn"
                onClick={verifyPhone}
                disabled={phoneOtp}
              >
                Verify Phone
              </button>
              {phoneOtp && (
                <>
                  <input
                    type="text"
                    value={phoneOtpInput}
                    onChange={(e) => setPhoneOtpInput(e.target.value)}
                    placeholder="Enter Phone OTP"
                    className="inputss"
                  />
                  <button
                    type="button"
                    className="verify-btn"
                    onClick={handlePhoneOtpVerification}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </>
          )}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              className="inputss"
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} eye-icon`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="inputss"
          />
          <div
            className="privacy-policy"
            style={{ display: "flex", gap: "10px", marginTop: "10px" }}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
              style={{ width: "25px" }}
            />
            <label style={{ fontSize: "15px" }}>
              I accept the{" "}
              <a href="/privacy-policy" style={{ color: "#333" }}>
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms-condition" style={{ color: "#333" }}>
                Terms and Conditions
              </a>{" "}
              of Milestono.
            </label>
          </div>
          <button type="button" className="buttons" onClick={handleSignup}>
            Sign Up
          </button>
        </form>

        <div className="line-with-or">
          <div className="line"></div>
          <div className="or">OR</div>
          <div className="line"></div>
        </div>

        <div className="signup-with-google" onClick={handleGoogleSignup}>
          <img src={GoogleLogo} alt="Google Logo" className="google-image" />
          <div>Sign Up with Google</div>
        </div>

        <div className="sign-in-message">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      {isConfirmationOpen && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal-content feedback-confirmation-content">
            <p>{message}</p>
            <button onClick={closeConfirmationModal} className="close-button">
              X
            </button>
            <button onClick={closeConfirmationModal} className="ok-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
