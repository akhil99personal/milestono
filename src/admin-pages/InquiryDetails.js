import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import toast from "react-hot-toast";

function InquiryDestails() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [enquiryData, setEnquiryData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterEnquiryData, setFilterEnquiryData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filterEnquiryData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filterEnquiryData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customRows, setCustomRows] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/enquiries`);
      setEnquiryData(response.data);
      setFilterEnquiryData(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleRowsPerPageChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsModalOpen(true);
    } else {
      setRowsPerPage(Number(value));
    }
  };

  const handleCustomRowsChange = (e) => {
    setCustomRows(e.target.value);
  };

  const handleSaveCustomRows = () => {
    if (!isNaN(customRows) && Number(customRows) > 0) {
      setRowsPerPage(Number(customRows));
      setIsModalOpen(false);
      setCustomRows("");
    } else {
      alert("Please enter a valid number greater than 0.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCustomRows("");
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const [statuses, setStatuses] = useState(
    Array(filterEnquiryData.length).fill(null),
  );

  const handleStatusChange = async (reachedId) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api//enquiries/reached`, {
        _id: reachedId,
      });
      fetchEnquiries();
      toast.success("Status is Updated");
    } catch (error) {
      console.error("Error updating reached:" + error);
    } finally {
      setLoading(false);
    }
  };

  const searchfeedbacksF = () => {
    let searched = enquiryData;
    searched = searched.filter(
      (fb) =>
        fb.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fb.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilterEnquiryData(searched);
  };

  useEffect(() => {
    searchfeedbacksF();
  }, [searchQuery]);

  return (
    <div className="table-container">
      <AdminNavbar />
      {loading ? (
        <div className="loading-center">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <div className="admin-section">
          <h1 className="section-title">All Inquries</h1>
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search by email or Name"
              className="search-box"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              id="rowsPerPage"
              className="filter-dropdown"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={5} disabled selected>
                Rows per page:
              </option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value="custom" selected>
                Custom
              </option>
            </select>
            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Enter Custom Rows Per Page</h3>
                  <input
                    type="number"
                    min="1"
                    className="custom-rows-input"
                    value={customRows}
                    onChange={handleCustomRowsChange}
                    placeholder="Enter a number"
                  />
                  <div className="modal-buttons">
                    <button className="save-btn" onClick={handleSaveCustomRows}>
                      Save
                    </button>
                    <button className="cancel-btn" onClick={handleCloseModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Property Type</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.location}</td>
                  <td>{data.propertyType}</td>
                  <td>{data.description}</td>
                  <td>{new Date(data.date).toLocaleDateString("en-US")}</td>
                  <td>
                    <span className="status-message-accepted">
                      {data.reached && "Reached"}
                    </span>
                    {!data.reached && (
                      <button
                        className="admin-accept-btn"
                        onClick={() => handleStatusChange(data._id)}
                        disabled={data.reached}
                      >
                        Mark as Reached
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="page-button prev-next"
              disabled={currentPage === 1}
              onClick={handlePrevious}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="page-button prev-next"
              disabled={currentPage === totalPages}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InquiryDestails;
