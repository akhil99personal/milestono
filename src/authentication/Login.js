import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import GoogleLogo from "../images/Google.png";
import AuthImage from "../images/auth-image1.png";
import "./Login.css";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Function to save vendor location after login
  const saveVendorLocation = async (token) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            await axios.post(
              `${BASE_URL}/api/vendors/save-location`,
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
              {
                headers: { Authorization: token },
              },
            );
            console.log("Vendor location saved successfully");
          } catch (error) {
            // Silently fail if not a vendor or location save fails
            console.log(
              "Not a vendor or location save failed:",
              error.response?.data?.message,
            );
          }
        },
        (error) => {
          console.log(
            "Location permission denied or unavailable:",
            error.message,
          );
        },
      );
    }
  };

  const handleLogin = async () => {
    if (!isChecked) {
      alert(
        "You must accept the privacy policy and terms and conditions to log in.",
      );
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });
      const user = response.data;
      localStorage.setItem("auth", user.token);
      localStorage.setItem("user_id", user.user_id);

      // Save vendor location if user is a vendor
      saveVendorLocation(user.token);

      window.location.href = "/";
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const handleGoogleSignup = () => {
    window.open(`${BASE_URL}/auth/google`, "_self");
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("auth", token);

      // Save vendor location for Google login
      saveVendorLocation(token);

      window.location.href = "/";
    }
  }, [location, navigate]);

  return (
    <>
      <div className="login">
        <div className="login-image">
          <img src={AuthImage} alt="Login Image" />
        </div>
        <div className="login-form">
          <h2 className="heading">Milestono</h2>
          <p>
            Welcome to the MILESTONO, <br />
            We&apos;re thrilled to have you back!
          </p>
          <form>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} eye-icon`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
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
            <button
              className="login-button"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>

          <div className="line-with-or">
            <div className="line"></div>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>

          <div className="login-with-google" onClick={handleGoogleSignup}>
            <img src={GoogleLogo} alt="Google Logo" className="google-image" />
            <p>Log in with Google</p>
          </div>

          <div className="line"></div>

          <div className="sign-up-message">
            <p>
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
