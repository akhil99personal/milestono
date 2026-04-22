import React, { useState, useEffect } from "react";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import AdminNavbar from "./AdminNavbar";
import "./AdminNotifications.css";

const AdminNotifications = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/problem_details`);
      setProblems(response.data.filter((ele) => ele.status === "adminReview"));
    } catch (error) {
      console.error("Error fetching problems:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/accept_servicerequest/${id}`);
      fetchProblems();
    } catch (error) {
      console.error("Error submitting expected price:" + error);
    } finally {
      setLoading(false);
    }
  };
  const handleReject = async (id) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/pending_servicerequest/${id}`);
      fetchProblems();
    } catch (error) {
      console.error("Error submitting expected price:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="table-container">
      <AdminNavbar />
      {loading ? (
        <div className="loading-center">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <div className="admin-section">
          <ul className="notification-list">
            {problems.map((problem) => (
              <li key={problem._id} className="notification-item">
                Vendor is asking ${problem.expectedPrice} for{" "}
                {problem.problemDescription}{" "}
                <span className="notification-actions">
                  <button
                    className="green-btn"
                    onClick={() => {
                      handleSubmit(problem._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="red-btn"
                    onClick={() => {
                      handleReject(problem._id);
                    }}
                  >
                    Reject
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
