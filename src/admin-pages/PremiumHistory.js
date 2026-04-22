import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const PremiumAccountHistory = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [accountHistories, setAccountHistories] = useState([]);
  const [filteredHistories, setFilteredHistories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("All");

  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");

  const fetchAccountHistories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/account-histories`);
      setAccountHistories(response.data);
      setFilteredHistories(response.data);
    } catch (error) {
      console.error("Error fetching account histories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountHistories();
  }, []);

  const searchAndFilterHistories = (query, plan) => {
    let filtered = accountHistories;

    if (plan !== "All") {
      filtered = filtered.filter((history) => history.accountName === plan);
    }

    if (query) {
      filtered = filtered.filter(
        (history) =>
          history.accountName.toLowerCase().includes(query.toLowerCase()) ||
          history.email.toLowerCase().includes(query.toLowerCase()),
      );
    }

    setFilteredHistories(filtered);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    searchAndFilterHistories(val, selectedPlan);
  };

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    setSelectedPlan(plan);
    searchAndFilterHistories(searchQuery, plan);
  };

  const openMailModal = (email) => {
    setSelectedEmail(email);
    setMailSubject("");
    setMailBody("");
    setIsMailModalOpen(true);
  };

  const closeMailModal = () => {
    setIsMailModalOpen(false);
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${selectedEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoLink;
    closeMailModal();
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
          <div className="filter-container" style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search by Account Name, Email"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-box"
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", minWidth: "250px" }}
            />

            <select
              value={selectedPlan}
              onChange={handlePlanChange}
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              <option value="All">All Plans</option>
              <option value="Smart Seller">Smart Seller</option>
              <option value="Elite Agent">Elite Agent</option>
              <option value="Developer Pro">Developer Pro</option>
            </select>
          </div>

          <p style={{ fontWeight: "bold", marginBottom: "15px" }}>count : {filteredHistories.length}</p>
          <div style={{ overflowX: "auto" }}>
            <table className="table" style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ddd" }}>
                  <th style={{ padding: "12px 8px" }}>Sr. No</th>
                  <th style={{ padding: "12px 8px" }}>Account Name</th>
                  <th style={{ padding: "12px 8px" }}>Email</th>
                  <th style={{ padding: "12px 8px" }}>Price</th>
                  <th style={{ padding: "12px 8px" }}>Payment Date</th>
                  <th style={{ padding: "12px 8px" }}>Validity End Date</th>
                  <th style={{ padding: "12px 8px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistories.map((history, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px 8px" }}>{index + 1}</td>
                    <td style={{ padding: "12px 8px" }}>{history.accountName}</td>
                    <td style={{ padding: "12px 8px" }}>{history.email}</td>
                    <td style={{ padding: "12px 8px" }}>{history.price}</td>
                    <td style={{ padding: "12px 8px" }}>{new Date(history.paymentDate).toLocaleDateString()}</td>
                    <td style={{ padding: "12px 8px" }}>
                      {new Date(history.validityEndDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <button
                        onClick={() => openMailModal(history.email)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer"
                        }}
                      >
                        Mail To
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredHistories.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ padding: "20px", textAlign: "center" }}>No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mail Modal */}
      {isMailModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "white", padding: "25px", borderRadius: "8px", width: "90%", maxWidth: "500px", position: "relative" }}>
            <button
              onClick={closeMailModal}
              style={{ position: "absolute", top: "15px", right: "20px", background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}
            >
              &times;
            </button>
            <h2 style={{ marginTop: 0, marginBottom: "20px" }}>Send Mail</h2>
            <form onSubmit={handleSendMail}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>To:</label>
                <input
                  type="email"
                  value={selectedEmail}
                  disabled
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#f9f9f9", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Subject:</label>
                <input
                  type="text"
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Message:</label>
                <textarea
                  value={mailBody}
                  onChange={(e) => setMailBody(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box", minHeight: "100px", resize: "vertical" }}
                  required
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button type="button" onClick={closeMailModal} style={{ padding: "10px 20px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer" }}>Open Mail Client</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumAccountHistory;
