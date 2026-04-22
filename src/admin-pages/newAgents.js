import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./newAgents.css";
import toast from "react-hot-toast";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

function NewAgents() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    operatingSince: "",
    buyersServed: "",
    propertiesForSale: "",
    propertiesForRent: "",
    address: "",
    image: null,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customRows, setCustomRows] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/agents`);
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching agents: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const totalPages = Math.ceil(agents.length / rowsPerPage);

  const filteredAgents = agents.filter((agent) => {
    const query = searchQuery.toLowerCase();
    return (
      agent.name.toLowerCase().includes(query) ||
      agent.company.toLowerCase().includes(query)
    );
  });

  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append(
        "formData",
        JSON.stringify({
          name: formData.name,
          company: formData.company,
          address: formData.address,
          operatingSince: formData.operatingSince,
          buyersServed: formData.buyersServed,
          propertiesForSale: formData.propertiesForSale,
          propertiesForRent: formData.propertiesForRent,
        }),
      );
      data.append("agentImage", formData.image);
      if (editIndex) {
        await axios.put(`${BASE_URL}/api/agents/${editIndex}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Agent updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/agent`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Agent created successfully!");
      }
      setFormData({
        name: "",
        company: "",
        operatingSince: "",
        buyersServed: "",
        propertiesForSale: "",
        propertiesForRent: "",
        address: "",
        image: null,
      });
      setEditIndex(null);
      fetchAgents();
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (agent) => {
    setFormData(agent);
    setEditIndex(agent._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) {
      return;
    }
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/agents/${id}`);
      setAgents(agents.filter((agent) => agent._id !== id));
      toast.success("Agent deleted successfully!");
      fetchAgents();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Agent.");
    } finally {
      setLoading(false);
    }
  };

  const handleRowsPerPageChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsModalOpen(true);
    } else {
      setRowsPerPage(parseInt(value, 10));
      setCurrentPage(1);
    }
  };

  const handleCustomRowsChange = (e) => {
    setCustomRows(e.target.value);
  };

  const handleSaveCustomRows = () => {
    const rows = parseInt(customRows, 10);
    if (!isNaN(rows) && rows > 0) {
      setRowsPerPage(rows);
      setCurrentPage(1);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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
          <div className="article-section">
            <h2 className="section-title">Post New Agent</h2>
            <form className="project-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Agent Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Company address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="operatingSince"
                placeholder="Operating Since"
                value={formData.operatingSince}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="buyersServed"
                placeholder="Buyers Served"
                value={formData.buyersServed}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="propertiesForSale"
                placeholder="Properties for Sale"
                value={formData.propertiesForSale}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="propertiesForRent"
                placeholder="Properties for Rent"
                value={formData.propertiesForRent}
                onChange={handleInputChange}
                required
              />
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                className="project-file-input"
                required
              />
              <button type="submit">
                {editIndex !== null ? "Update Agent" : "Post Agent"}
              </button>
            </form>

            <div className="admin-news-header-section">
              <h2 className="section-title">All Agents</h2>
              <select
                id="rowsPerPage"
                className="section-selects"
                onChange={handleRowsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div style={{ display: "flex", minWidth: "100%", gap: "10px" }}>
              <input
                type="text"
                placeholder="Search Agents by Name or Company"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: "80%",
                  minHeight: "40px",
                  borderRadius: "9px",
                  border: "1px solid black",
                  padding: "10px 15px",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div className="project-list">
              {paginatedAgents.map((agent, index) => (
                <div className="project-card" key={index}>
                  {agent.image && <img src={agent.image} alt="Agent" />}
                  <h3>{agent.name}</h3>
                  <p>Company: {agent.company}</p>
                  <p>Company Address: {agent.address}</p>
                  <p>Operating Since: {agent.operatingSince}</p>
                  <p>Buyers Served: {agent.buyersServed}</p>
                  <p>Properties for Sale: {agent.propertiesForSale}</p>
                  <p>Properties for Rent: {agent.propertiesForRent}</p>
                  <div style={{ textAlign: "center" }}>
                    <button onClick={() => handleEdit(agent)}>Edit</button>
                    <button onClick={() => handleDelete(agent._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <div className="pagination">
                {agents.length > 0 && (
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
          </div>
        </div>
      )}

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
              placeholder="Custom rows per page"
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
  );
}

export default NewAgents;
