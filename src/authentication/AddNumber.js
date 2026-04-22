import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogo from "../images/Google.png";
import AuthImage from "../images/auth-image1.png";
import "./AddNumber.css";

const AddNumber = () => {
  const [phone, setPhone] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneOtpInput, setPhoneOtpInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
    if (message === "Registered successfully") {
      navigate("/");
    }
  };

  const handleSignup = async () => {
    if (!phoneVerified) {
      setMessage("Please verify your phone before signing up");
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
      const token = localStorage.getItem("auth");
      await axios.put(
        `${BASE_URL}/api/userprofile`,
        { phone },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setMessage("Registered successfully");
      setIsConfirmationOpen(true);
    } catch (error) {
      setMessage("Signup failed: " + error?.response?.data?.error);
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

  const glogout = () => {
    window.open(`${BASE_URL}/auth/logout`, "_self");
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
          <button
            type="button"
            className="buttons red-button"
            onClick={() => {
              localStorage.removeItem("auth");
              localStorage.removeItem("user_id");
              glogout();
              navigate("/");
            }}
          >
            Log out
          </button>
        </form>
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

export default AddNumber;
