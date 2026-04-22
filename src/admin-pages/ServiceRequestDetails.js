import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import AdminNavbar from "./AdminNavbar";
import "./ServiceRequestDetails.css";

const ProblemsTable = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [serviceMan, setServiceMan] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredserviceMan, setFilteredServiceMan] = useState([]);
  const [serviceManModalOpen, setServiceManModalOpen] = useState(false);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/problem_details`);
      setProblems(response.data.filter((ele) => ele.status === "pending"));
    } catch (error) {
      console.error("Error fetching problems:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetServiceMan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/serviceman_details`);
      setServiceMan(response.data.filter((ele) => ele.status === "accepted"));
      setFilteredServiceMan(
        response.data.filter((ele) => ele.status === "accepted"),
      );
    } catch (error) {
      console.error("Error fetching property details:" + error);
    } finally {
      setLoading(false);
    }
  };

  const filteredByName = (val) => {
    let searched = serviceMan;
    searched = searched.filter(
      (property) =>
        property.vendorName &&
        property.vendorName.toLowerCase().includes(val.toLowerCase()),
    );
    setFilteredServiceMan(searched);
  };

  useEffect(() => {
    fetchProblems();
    handleGetServiceMan();
  }, []);

  useEffect(() => {
    filteredByName(searchQuery);
  }, [searchQuery]);

  const openModal = (problem) => {
    setSelectedProblem(problem);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProblem(null);
    setModalOpen(false);
  };

  const openServiceManModal = (problem) => {
    setSelectedProblem(problem);
    setServiceManModalOpen(true);
  };

  const closeServiceManModal = () => {
    setSelectedProblem(null);
    setServiceManModalOpen(false);
  };

  const assignVendor = async (email) => {
    try {
      setLoading(true);
      await axios.put(
        `${BASE_URL}/api/vendor_servicerequest/${selectedProblem._id}`,
        { email },
      );
      fetchProblems();
      handleGetServiceMan();
    } catch (error) {
      console.error(`Error` + error);
    } finally {
      setLoading(false);
      closeServiceManModal();
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
                <th>Name</th>
                <th>Address</th>
                <th>Problem Description</th>
                <th>Problem Type</th>
                <th>Problem Image</th>
                <th>Assign Vendor</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <tr key={problem._id}>
                  <td>{index + 1}</td>
                  <td>{problem.name}</td>
                  <td>{problem.address}</td>
                  <td>{problem.problemDescription}</td>
                  <td>{problem.problemType}</td>
                  <td>
                    <Link to="#" onClick={() => openModal(problem)}>
                      View Image
                    </Link>
                  </td>
                  <td>
                    <button
                      className="green-btn"
                      onClick={() => openServiceManModal(problem)}
                    >
                      Assign Vendor
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
                  src={selectedProblem.problemImage}
                  alt="Problem"
                  className="modal-image"
                />
              </div>
            </div>
          )}

          {serviceManModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Assign Vendor</h2>
                <div className="filter-container">
                  <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-box"
                  />
                </div>
                <button onClick={closeServiceManModal}>Close</button>
                <ul className="service-man-list">
                  {filteredserviceMan.map((vendor) => (
                    <li key={vendor._id} className="service-man-item">
                      <div>
                        <strong>Service Man Name:</strong> {vendor.vendorName}
                      </div>
                      <div>
                        <strong>Service Roll:</strong> {vendor.serviceRoll}
                      </div>
                      <div>
                        <strong>Description:</strong> {vendor.vendorDescription}
                      </div>
                      <div>
                        <strong>Experience:</strong> {vendor.experience} years
                      </div>
                      <button
                        className="assign-btn"
                        onClick={() => assignVendor(vendor.email)}
                      >
                        Assign
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProblemsTable;
