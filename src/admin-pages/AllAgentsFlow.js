import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./AllAgentsFlow.css";
import toast from "react-hot-toast";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import dummyImg from "../images/dummyImage.webp";

function AllAgentsFlow() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [agents, setAgents] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customRows, setCustomRows] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAgent, setSelectedAgent] = useState(null);

    const fetchAgents = async () => {
        try {
            setLoading(true);
            // Reusing the endpoint that returns agents with their active properties and projects count
            const response = await axios.get(`${BASE_URL}/api/verified-all-agents`);
            if (response.data && Array.isArray(response.data)) {
                setAgents(response.data);
            }
        } catch (error) {
            console.error("Error fetching verified agents: " + error);
            toast.error("Failed to load agents.")
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
        const agentName = `${agent.firstName} ${agent.lastName}`.toLowerCase();
        const companyName = (agent.companyName || "").toLowerCase();
        const email = (agent.email || "").toLowerCase();
        return (
            agentName.includes(query) ||
            companyName.includes(query) ||
            email.includes(query)
        );
    });

    const paginatedAgents = filteredAgents.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
    );

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

    const openAgentModal = (agent) => {
        setSelectedAgent(agent);
    };

    const closeAgentModal = () => {
        setSelectedAgent(null);
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
                        <div className="admin-flow-header-section">
                            <h2 className="admin-flow-modal-title" style={{ borderBottom: 'none', marginBottom: 0 }}>All Agents Flow</h2>
                            <select
                                id="rowsPerPage"
                                className="admin-flow-search-input"
                                style={{ width: 'auto', minHeight: 'auto', padding: '6px 12px' }}
                                onChange={handleRowsPerPageChange}
                                value={rowsPerPage === 5 || rowsPerPage === 10 || rowsPerPage === 15 ? rowsPerPage : "custom"}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>

                        <div className="admin-flow-search-container">
                            <input
                                type="text"
                                placeholder="Search Agents by Name, Email, or Company"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="admin-flow-search-input"
                            />
                        </div>

                        <p className="admin-flow-total-count">Total Verified Agents: {filteredAgents.length}</p>

                        <div className="admin-flow-table-container">
                            <table className="admin-flow-table">
                                <thead>
                                    <tr>
                                        <th>Sr. No</th>
                                        <th>Agent Profile</th>
                                        <th>Agent Name</th>
                                        <th>Company</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th style={{ textAlign: "center" }}>Total Properties</th>
                                        <th style={{ textAlign: "center" }}>Total Projects</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedAgents.map((agent, index) => (
                                        <tr key={agent._id}>
                                            <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                            <td>
                                                <img
                                                    src={agent.profile || dummyImg}
                                                    alt="Agent Profile"
                                                    className="admin-flow-profile-img"
                                                />
                                            </td>
                                            <td>{agent.firstName} {agent.lastName}</td>
                                            <td>{agent.companyName || "N/A"}</td>
                                            <td>{agent.email}</td>
                                            <td>{agent.mobileNumber}</td>
                                            <td style={{ textAlign: "center" }}>{agent.propertiesCount || 0}</td>
                                            <td style={{ textAlign: "center" }}>{agent.projectsCount || 0}</td>
                                            <td>
                                                <button
                                                    onClick={() => openAgentModal(agent)}
                                                    className="admin-flow-action-btn"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedAgents.length === 0 && (
                                        <tr>
                                            <td colSpan="9" style={{ padding: "24px", textAlign: "center" }}>No agents found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="admin-flow-pagination">
                            {filteredAgents.length > 0 && (
                                <>
                                    <button
                                        className="admin-flow-page-btn"
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`admin-flow-page-btn ${currentPage === index + 1 ? "active" : ""}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        className="admin-flow-page-btn"
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
            )}

            {isModalOpen && (
                <div className="admin-flow-modal-overlay">
                    <div className="admin-flow-modal-content admin-flow-modal-small">
                        <h3 className="admin-flow-modal-title">Custom Rows</h3>
                        <input
                            type="number"
                            min="1"
                            className="admin-flow-input"
                            value={customRows}
                            onChange={handleCustomRowsChange}
                            placeholder="Rows per page"
                        />
                        <div className="admin-flow-btn-group">
                            <button className="admin-flow-btn-cancel" onClick={handleCloseModal}>
                                Cancel
                            </button>
                            <button className="admin-flow-btn-save" onClick={handleSaveCustomRows}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Agent Details Modal */}
            {selectedAgent && (
                <div className="admin-flow-modal-overlay">
                    <div className="admin-flow-modal-content admin-flow-modal-large">
                        <button
                            onClick={closeAgentModal}
                            className="admin-flow-modal-close"
                        >
                            &times;
                        </button>
                        <h2 className="admin-flow-modal-title">Agent Details</h2>

                        <div className="admin-flow-agent-header">
                            <img
                                src={selectedAgent.profile || dummyImg}
                                alt="Profile"
                                className="admin-flow-agent-image"
                            />
                            <div className="admin-flow-agent-info">
                                <h3>{selectedAgent.firstName} {selectedAgent.lastName}</h3>
                                <p><strong>Company:</strong> {selectedAgent.companyName || "N/A"}</p>
                                <p><strong>Email:</strong> {selectedAgent.email}</p>
                                <p><strong>Phone:</strong> {selectedAgent.mobileNumber}</p>
                                <p><strong>Address:</strong> {selectedAgent.address || "N/A"}</p>
                                <p><strong>City/State:</strong> {selectedAgent.city}, {selectedAgent.state}</p>
                                <p><strong>Experience:</strong> {selectedAgent.experience || 0} Years</p>
                                <p><strong>Properties Count:</strong> {selectedAgent.propertiesCount || 0}</p>
                                <p><strong>Projects Count:</strong> {selectedAgent.projectsCount || 0}</p>
                            </div>
                        </div>

                        <div className="admin-flow-details-grid">
                            <div className="admin-flow-details-card">
                                <h4>Residential Properties</h4>
                                <ul className="admin-flow-details-list">
                                    {selectedAgent.residentialProperties && selectedAgent.residentialProperties.length > 0 ? (
                                        selectedAgent.residentialProperties.map(p => (
                                            <li key={p._id}>
                                                {p.heading || "Unnamed Property"} - {p.city || "Unknown Location"}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No residential properties found.</li>
                                    )}
                                </ul>
                            </div>

                            <div className="admin-flow-details-card">
                                <h4>Commercial Properties</h4>
                                <ul className="admin-flow-details-list">
                                    {selectedAgent.commercialProperties && selectedAgent.commercialProperties.length > 0 ? (
                                        selectedAgent.commercialProperties.map(p => (
                                            <li key={p._id}>
                                                {p.heading || "Unnamed Property"} - {p.city || "Unknown Location"}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No commercial properties found.</li>
                                    )}
                                </ul>
                            </div>

                            <div className="admin-flow-details-card full-width">
                                <h4>Projects</h4>
                                <ul className="admin-flow-details-list">
                                    {selectedAgent.project && selectedAgent.project.length > 0 ? (
                                        selectedAgent.project.map(p => (
                                            <li key={p._id}>
                                                {p.title || "Unnamed Project"} - {p.address || "Unknown Location"}
                                                <span className={`admin-flow-status-badge ${p.status === 'Completed' ? 'admin-flow-status-paid' : 'admin-flow-status-pending'}`} style={{ marginLeft: "10px" }}>
                                                    {p.status || "Unknown"}
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No projects found.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllAgentsFlow;
