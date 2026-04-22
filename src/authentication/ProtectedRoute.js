import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const token = localStorage.getItem("auth");
        if (!token) {
          console.error("No auth token found");
          return;
        }
        const response = await axios.get(`${BASE_URL}/api/authenticate`, {
          headers: {
            Authorization: token,
          },
        });
        setIsAuthenticated(true);
        if (response.data.role === "user" && response.data.addPhone) {
          navigate("/add-number");
        }
        setUserRole(response.data.role);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!loading && allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
