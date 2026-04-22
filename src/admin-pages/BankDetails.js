import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import toast from "react-hot-toast";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import "./BankDetails.css";

function BankDetails() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("bankLoanDetails");
  const [banks, setBanks] = useState([]);
  const [bankUsers, setBankUsers] = useState([]);
  const [formData, setFormData] = useState({
    bankName: "",
    bankImage: null,
    interestRate: "",
    processingFees: "",
    emi: "",
    maxLoanAmount: "",
    featured: false,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(banks.length / rowsPerPage);

  const paginatedBanks = banks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const fetchBanks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/bank`);
      setBanks(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBankUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/bank-users`);
      setBankUsers(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
    fetchBankUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append(
        "formData",
        JSON.stringify({
          bankName: formData.bankName,
          interestRate: formData.interestRate,
          processingFees: formData.processingFees,
          emi: formData.emi,
          maxLoanAmount: formData.maxLoanAmount,
          featured: formData.featured,
        }),
      );
      data.append("bankImage", formData.bankImage);
      if (editIndex) {
        await axios.put(`${BASE_URL}/api/bank/${editIndex}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Project updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/bank`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Project created successfully!");
      }
      setFormData({
        bankName: "",
        bankImage: null,
        interestRate: "",
        processingFees: "",
        emi: "",
        maxLoanAmount: "",
        featured: false,
      });
      setEditIndex(null);
      fetchBanks();
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bank) => {
    setFormData(bank);
    setEditIndex(bank._id);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/bank/${id}`);
      setBanks(banks.filter((project) => project._id !== id));
      toast.success("Project deleted successfully!");
      fetchBanks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Project.");
    } finally {
      setLoading(false);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const bankUsers1 = [
    {
      loanAmount: "30,00,000",
      tenure: "20 Years",
      age: "35",
      propertyIdentified: "Yes",
      propertyCity: "Mumbai",
      propertyCost: "37,50,000",
      employmentStatus: "Salaried",
      income: "1,00,000",
      emi: "10,000",
      fullName: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
    },
    {
      loanAmount: "25,00,000",
      tenure: "15 Years",
      age: "40",
      propertyIdentified: "Yes",
      propertyCity: "Delhi",
      propertyCost: "30,00,000",
      employmentStatus: "Self-Employed",
      income: "1,50,000",
      emi: "15,000",
      fullName: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543211",
    },
    {
      loanAmount: "30,00,000",
      tenure: "20 Years",
      age: "35",
      propertyIdentified: "Yes",
      propertyCity: "Mumbai",
      propertyCost: "37,50,000",
      employmentStatus: "Salaried",
      income: "1,00,000",
      emi: "10,000",
      fullName: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
    },
    {
      loanAmount: "25,00,000",
      tenure: "15 Years",
      age: "40",
      propertyIdentified: "Yes",
      propertyCity: "Delhi",
      propertyCost: "30,00,000",
      employmentStatus: "Self-Employed",
      income: "1,50,000",
      emi: "15,000",
      fullName: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543211",
    },
    {
      loanAmount: "30,00,000",
      tenure: "20 Years",
      age: "35",
      propertyIdentified: "Yes",
      propertyCity: "Mumbai",
      propertyCost: "37,50,000",
      employmentStatus: "Salaried",
      income: "1,00,000",
      emi: "10,000",
      fullName: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
    },
    {
      loanAmount: "25,00,000",
      tenure: "15 Years",
      age: "40",
      propertyIdentified: "Yes",
      propertyCity: "Delhi",
      propertyCost: "30,00,000",
      employmentStatus: "Self-Employed",
      income: "1,50,000",
      emi: "15,000",
      fullName: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543211",
    },
    {
      loanAmount: "30,00,000",
      tenure: "20 Years",
      age: "35",
      propertyIdentified: "Yes",
      propertyCity: "Mumbai",
      propertyCost: "37,50,000",
      employmentStatus: "Salaried",
      income: "1,00,000",
      emi: "10,000",
      fullName: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
    },
    {
      loanAmount: "25,00,000",
      tenure: "15 Years",
      age: "40",
      propertyIdentified: "Yes",
      propertyCity: "Delhi",
      propertyCost: "30,00,000",
      employmentStatus: "Self-Employed",
      income: "1,50,000",
      emi: "15,000",
      fullName: "Jane Smith",
      email: "jane@example.com",
      mobile: "9876543211",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredLoanDetails = bankUsers.filter((detail) => {
    const searchText = searchQuery.toLowerCase();
    return (
      detail.email.toLowerCase().includes(searchText) ||
      detail.fullName.toLowerCase().includes(searchText) ||
      detail.propertyCity.toLowerCase().includes(searchText) ||
      detail.loanAmount.toLowerCase().includes(searchText)
    );
  });

  const totalLoanPages = Math.ceil(filteredLoanDetails.length / rowsPerPage);
  const paginatedLoanDetails = filteredLoanDetails.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          <div className="bank-detail-tab-buttons">
            <button
              onClick={() => setActiveTab("bankLoanDetails")}
              className={activeTab === "bankLoanDetails" ? "active-tab" : ""}
            >
              Bank Loan Details
            </button>
            <button
              onClick={() => setActiveTab("postBankDetails")}
              className={activeTab === "postBankDetails" ? "active-tab" : ""}
            >
              Post Bank Details
            </button>
          </div>
          {activeTab === "postBankDetails" ? (
            <div className="article-section">
              <h2 className="section-title">Post Bank Details</h2>
              <form className="project-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="bankName"
                  placeholder="Bank Name"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="article-file-input"
                  type="file"
                  name="bankImage"
                  onChange={handleInputChange}
                  required
                  accept="image/*"
                />
                <input
                  type="number"
                  name="interestRate"
                  placeholder="Rate of Interest (%)"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="processingFees"
                  placeholder="Processing Fees"
                  value={formData.processingFees}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="emi"
                  placeholder="EMI"
                  value={formData.emi}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="maxLoanAmount"
                  placeholder="Max Loan Amount (%)"
                  value={formData.maxLoanAmount}
                  onChange={handleInputChange}
                  required
                />
                <div className="project-form-radio-group">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  Featured
                </div>
                <button type="submit">
                  {editIndex !== null ? "Update" : "Post"} Bank Detail
                </button>
              </form>

              <div className="admin-news-header-section">
                <h2 className="section-title">All Bank Details</h2>
                <select
                  id="rowsPerPage"
                  className="section-selects"
                  onChange={handleRowsPerPageChange}
                >
                  <option value={5} selected disabled>
                    Choose Banks Per Page
                  </option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>

              <section className="bank-list">
                {paginatedBanks.length > 0 && (
                  <div className="loan-comparison-table-header">
                    <div className="loan-comparison-header-cell">Bank Name</div>
                    <div className="loan-comparison-header-cell">
                      Rate of interest
                    </div>
                    <div className="loan-comparison-header-cell">
                      Processing fees
                    </div>
                    <div className="loan-comparison-header-cell">EMI</div>
                    <div className="loan-comparison-header-cell">
                      Max. loan amount
                    </div>
                    <div className="loan-comparison-header-cell">Actions</div>
                  </div>
                )}
                {paginatedBanks.length > 0 ? (
                  paginatedBanks.map((bank, index) => (
                    <div key={index} className="loan-comparison-table-row">
                      <div className="loan-comparison-bank-info">
                        {bank.featured && (
                          <div className="loan-comparison-featured-tag">
                            FEATURED
                          </div>
                        )}
                        <img
                          src={bank.bankImage}
                          alt={bank.bankName}
                          className="loan-comparison-bank-logo"
                        />
                        <span className="loan-comparison-bank-name">
                          {bank.bankName}
                        </span>
                      </div>
                      <div className="loan-comparison-interest-rate">
                        {bank.interestRate}
                        <span className="loan-comparison-percentage">%</span>
                      </div>
                      <div className="loan-comparison-processing-fee">
                        ₹{bank.processingFees}
                        <span className="loan-comparison-gst">+ GST</span>
                      </div>
                      <div className="loan-comparison-emi-amount">
                        ₹{bank.emi}
                      </div>
                      <div className="loan-comparison-max-loan">
                        {bank.maxLoanAmount}
                        <span className="loan-comparison-percentage">%</span>
                        <span className="loan-comparison-subtitle">
                          Loan to value ratio
                        </span>
                      </div>
                      <div
                        className="project-card"
                        style={{
                          background: "white",
                          boxShadow: "none",
                          textAlign: "left",
                        }}
                      >
                        <button onClick={() => handleEdit(bank)}>Edit</button>
                        <button onClick={() => handleDelete(bank._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No bank details available.</p>
                )}
              </section>

              <div className="pagination">
                {banks.length > 0 && (
                  <>
                    <button
                      className="page-button prev-next"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`page-button ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className="page-button prev-next"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="section-title">Bank Loan Details</h2>
              <div className="filter-container">
                <input
                  type="text"
                  placeholder="Search by Name, Email, City, Loan Amount"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-box"
                />
                <select
                  className="filter-dropdown"
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                >
                  <option value={5}>Choose Rows per page</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Loan Amount</th>
                    <th>Tenure</th>
                    <th>Age</th>
                    <th>Property Identified</th>
                    <th>Property City</th>
                    <th>Property Cost</th>
                    <th>Employment Status</th>
                    <th>Income</th>
                    <th>EMI</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLoanDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.fullName}</td>
                      <td>{detail.email}</td>
                      <td>{detail.mobile}</td>
                      <td>{detail.loanAmount}</td>
                      <td>{detail.tenure}</td>
                      <td>{detail.age}</td>
                      <td>{detail.propertyIdentified}</td>
                      <td>{detail.propertyCity}</td>
                      <td>{detail.propertyCost}</td>
                      <td>{detail.employmentType}</td>
                      <td>{detail.income}</td>
                      <td>{detail.currentEmi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <button
                  className="page-button prev-next"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  Previous
                </button>
                {Array.from({ length: totalLoanPages }, (_, index) => (
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
                  disabled={currentPage === totalLoanPages}
                  onClick={() => {
                    if (currentPage < totalLoanPages) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BankDetails;
