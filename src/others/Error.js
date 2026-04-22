import React from "react";
import "./Error.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <h1 className="error-title">Error !</h1>
      <p className="error-message">
        Oops! The page you are looking for does not exist.
      </p>
      <a
        onClick={() => {
          navigate("/login");
        }}
        className="error-back-button"
      >
        Back to Login
      </a>
    </div>
  );
};

export default Error;
