import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import AdminNavbar from "./AdminNavbar";
import toast from "react-hot-toast";
import "./PayToServiceRequest.css";

const ProblemsTable = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/pay-to-vendor`);
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const openModal = (problem) => {
    setSelectedProblem(problem);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProblem(null);
    setModalOpen(false);
  };

  const openConfirmModal = (problem) => {
    setSelectedProblem(problem);
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setSelectedProblem(null);
    setConfirmModalOpen(false);
  };

  const handleMarkAsDone = async () => {
    if (!selectedProblem) return;

    try {
      setLoading(true);
      await axios.put(
        `${BASE_URL}/api/done_servicerequest/${selectedProblem._id}`,
      );
      toast.success("Marked as Done");
      fetchProblems();
    } catch (error) {
      console.error("Error marking problem as done:" + error);
    } finally {
      setLoading(false);
      closeConfirmModal();
    }
  };

  return (
    <div className="table-container">
      <AdminNavbar />
      {loading ? (
        <div className="loading-center">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <div className="admin-section">
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Problem Type</th>
                <th>Problem Image</th>
                <th>Vendor Email</th>
                <th>Account No.</th>
                <th>IFSC Code</th>
                <th>Status</th>
                <th>Main Amount</th>
                <th>4% Tax Deducted Amount</th>
                <th>Mark As Done</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <tr key={problem._id}>
                  <td>{index + 1}</td>
                  <td>{problem.name}</td>
                  <td>
                    <Link to="#" onClick={() => openModal(problem)}>
                      View Image
                    </Link>
                  </td>
                  <td>{problem.vendorEmail}</td>
                  <td>{problem.serviceman && problem.serviceman.accountNo}</td>
                  <td>{problem.serviceman && problem.serviceman.ifsccode}</td>
                  <td>{problem.status}</td>
                  <td>{problem.price}</td>
                  <td>
                    {parseFloat(problem.price) -
                      parseFloat((problem.price / 100) * 4)}
                  </td>
                  <td>
                    <button
                      onClick={() => openConfirmModal(problem)}
                      disabled={problem.status !== "completed"}
                    >
                      Mark as Done
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {modalOpen && selectedProblem && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Problem Image</h2>
                <button onClick={closeModal}>Close</button>
                <br />
                <img
                  src={selectedProblem.image}
                  alt="Problem"
                  className="modal-image"
                />
              </div>
            </div>
          )}

          {confirmModalOpen && selectedProblem && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Confirm Mark as Done</h2>
                <p>Are you sure you want to mark this problem as done?</p>
                <button onClick={closeConfirmModal} className="red-btn">
                  Cancel
                </button>
                <button onClick={handleMarkAsDone} className="green-btn">
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProblemsTable;
