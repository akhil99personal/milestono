import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./ServiceProviderFlow.css";
import toast from "react-hot-toast";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import dummyPerson from "../images/PersonDummy.png";

function ServiceProviderFlow() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [vendors, setVendors] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customRows, setCustomRows] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // States for Vendor Services Modal
    const [selectedVendorForServices, setSelectedVendorForServices] = useState(null);
    const [vendorServices, setVendorServices] = useState([]);
    const [loadingServices, setLoadingServices] = useState(false);

    const fetchVendors = async () => {
        try {
            setLoading(true);
            // Fetching all vendors
            const response = await axios.get(`${BASE_URL}/api/vendors`);
            if (response.data && Array.isArray(response.data)) {
                setVendors(response.data);
            }
        } catch (error) {
            console.error("Error fetching vendors: " + error);
            toast.error("Failed to load service providers.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendorServices = async (vendor) => {
        try {
            setSelectedVendorForServices(vendor);
            setLoadingServices(true);
            // Currently, services endpoint gets service based on logic. Let's find all services assigned/linked to this vendor's email/id
            // Endpoint /api/services fetches all if we want, but it might just be easier if we already have it. We will call the general services endpoint and filter on the client if a specific vendor endpoint doesn't exist, to be safe.
            const response = await axios.get(`${BASE_URL}/api/services`);
            if (response.data && Array.isArray(response.data)) {
                // Filter those where the vendor is assigned to them
                const servicesForVendor = response.data.filter(s =>
                    s.vendorEmail === vendor.email || s.assignedVendorId === vendor._id
                );
                setVendorServices(servicesForVendor);
            }
        } catch (error) {
            console.error("Error fetching vendor services: " + error);
            toast.error("Failed to load services for this provider.");
        } finally {
            setLoadingServices(false);
        }
    };

    const totalPages = Math.ceil(vendors.length / rowsPerPage);

    const filteredVendors = vendors.filter((vendor) => {
        const query = searchQuery.toLowerCase();
        const vendorName = (vendor.vendorName || "").toLowerCase();
        const email = (vendor.email || "").toLowerCase();
        const serviceCategory = (vendor.serviceCategory || "").toLowerCase();
        return (
            vendorName.includes(query) ||
            email.includes(query) ||
            serviceCategory.includes(query)
        );
    });

    const paginatedVendors = filteredVendors.slice(
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

    const closeServicesModal = () => {
        setSelectedVendorForServices(null);
        setVendorServices([]);
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
                        <div className="admin-flow-header-section">
                            <h2 className="admin-flow-modal-title" style={{ borderBottom: 'none', marginBottom: 0 }}>Service Providers Flow</h2>
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
                                placeholder="Search Vendors by Name, Email, or Category"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="admin-flow-search-input"
                            />
                        </div>

                        <p className="admin-flow-total-count">Total Vendors: {filteredVendors.length}</p>

                        <div className="admin-flow-table-container">
                            <table className="admin-flow-table">
                                <thead>
                                    <tr>
                                        <th>Sr. No</th>
                                        <th>Profile</th>
                                        <th>Vendor Name</th>
                                        <th>Category</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Experience</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedVendors.map((vendor, index) => (
                                        <tr key={vendor._id}>
                                            <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                            <td>
                                                <img
                                                    src={vendor.vendorImage || dummyPerson}
                                                    alt="Profile"
                                                    className="admin-flow-profile-img"
                                                />
                                            </td>
                                            <td>{vendor.vendorName}</td>
                                            <td>{vendor.serviceCategory || "N/A"}</td>
                                            <td>{vendor.email}</td>
                                            <td>{vendor.mobile}</td>
                                            <td>{vendor.experience} Years</td>
                                            <td>
                                                <button
                                                    onClick={() => fetchVendorServices(vendor)}
                                                    className="admin-flow-action-btn"
                                                >
                                                    View Services
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedVendors.length === 0 && (
                                        <tr>
                                            <td colSpan="8" style={{ padding: "24px", textAlign: "center" }}>No vendors found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="admin-flow-pagination">
                            {filteredVendors.length > 0 && (
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

            {/* Pagination Fix Modal */}
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

            {/* Vendor Services Modal */}
            {selectedVendorForServices && (
                <div className="admin-flow-modal-overlay">
                    <div className="admin-flow-modal-content admin-flow-modal-large">
                        <button
                            onClick={closeServicesModal}
                            className="admin-flow-modal-close"
                        >
                            &times;
                        </button>
                        <h2 className="admin-flow-modal-title">
                            Services Handled by {selectedVendorForServices.vendorName}
                        </h2>

                        {loadingServices ? (
                            <div style={{ textAlign: "center", padding: "24px" }}>Loading services...</div>
                        ) : (
                            <div className="admin-flow-table-container" style={{ boxShadow: 'none', border: '1px solid #e2e8f0' }}>
                                <table className="admin-flow-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Problem Name</th>
                                            <th>User Info</th>
                                            <th>Created At</th>
                                            <th>Quote (Rs)</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendorServices.length > 0 ? (
                                            vendorServices.map((service, i) => (
                                                <tr key={service._id}>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        {service.name || "N/A"}
                                                        <br />
                                                        <small style={{ color: "#64748b" }}>{service.category}</small>
                                                    </td>
                                                    <td>
                                                        {service.username}
                                                        <br />
                                                        <small style={{ color: "#64748b" }}>{service.email}</small>
                                                    </td>
                                                    <td>
                                                        {new Date(service.createdAt).toLocaleDateString()}{" "}
                                                        {new Date(service.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </td>
                                                    <td>
                                                        {service.price ? service.price : (service.quotedPrice || "N/A")}
                                                    </td>
                                                    <td>
                                                        <span className={`admin-flow-status-badge ${service.status === 'paid' ? 'admin-flow-status-paid' :
                                                            service.status === 'quoted' ? 'admin-flow-status-quoted' :
                                                                'admin-flow-status-pending'
                                                            }`}>
                                                            {service.status ? service.status.toUpperCase() : "UNKNOWN"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" style={{ padding: "24px", textAlign: "center" }}>No services found for this vendor.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ServiceProviderFlow;
