import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProvidedService.css";

const ServiceRequestList = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOTPOpen, setIsOTPModalOpen] = useState(false);
  const [expectedPrice, setExpectedPrice] = useState("");
  const [otp, setOTP] = useState("");

  const fetchVendorServices = async () => {
    try{
      const token = localStorage.getItem("auth");

      const response = await axios.get(
        `${BASE_URL}/api/services-vendor`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setServices(response.data);
    } catch (err) {
      console.error("Error loading services:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorServices();
  }, []);

  const getStatusColor = (status) => {
    const normalizedStatus = status.toLowerCase();

    if (
      normalizedStatus === "requested" ||
      normalizedStatus === "vendorreview"
    ) {
      return "#f0ad4e";
    } else if (
      normalizedStatus === "accepted" ||
      normalizedStatus === "adminreview"
    ) {
      return "#0275d8";
    } else if (normalizedStatus === "paid") {
      return "#ff7f50";
    } else if (normalizedStatus === "verified") {
      return "#5cb85c";
    } else if (normalizedStatus === "done") {
      return "#fc7d7d";
    } else if (normalizedStatus === "completed") {
      return "#5cb85c";
    } else {
      return "#d9534f";
    }
  };

  const mapStatusLabel = (status) => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "completed") {
      return "Completed";
    } else if (normalizedStatus === "done") {
      return "Paid to you";
    } 
     else {
      return "Accepted";
    }
  };

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  const handleSubmitPrice = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/admin_servicerequest/${selectedService._id}`,
        { expectedPrice },
      );
      fetchVendorServices();
      toggleModal();
    } catch (error) {
      console.error("Error submitting price:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/verify_servicerequest/${selectedService._id}`,
        { otp },
      );
      fetchVendorServices();
      toggleModal();
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(false);
    setIsOTPModalOpen(false);
    setExpectedPrice("");
    setOTP("");
  };

  const handleViewProvidedService = (serviceId) => {
    navigate("/receivedservicerequests", { state: { serviceId } });
  };

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error loading services: {error}</p>;

  return (
    <div className="provided-service-service-request-list">
      <h2>My Provided Services</h2>
      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <table className="provided-service-table">
          <thead>
            <tr style={{ border: "2px solid #ccc" }}>
              <th style={{ borderRight: "2px solid #ddd" }}>Service</th>
              <th style={{ borderRight: "2px solid #ddd" }}>Category</th>
              <th style={{ borderRight: "2px solid #ddd" }}>Customer Mobile</th>
              <th style={{ borderRight: "2px solid #ddd" }}>Location</th>
              <th style={{ borderRight: "2px solid #ddd" }}>Price</th>
              <th style={{ borderRight: "2px solid #ddd" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <td
                  onClick={() => openModal(service)}
                  style={{
                    cursor: "pointer",
                    borderLeft: "2px solid #ccc",
                    borderRight: "2px solid #ddd",
                  }}
                >
                  {service.name}
                </td>
                <td
                  onClick={() => openModal(service)}
                  style={{ cursor: "pointer", borderRight: "2px solid #ddd" }}
                >
                  {service.category}
                </td>
                <td
                  onClick={() => openModal(service)}
                  style={{ cursor: "pointer", borderRight: "2px solid #ddd" }}
                >
                  {service.customerPhone}
                </td>
                <td
                  onClick={() => openModal(service)}
                  style={{ cursor: "pointer", borderRight: "2px solid #ddd" }}
                >
                  {service.landmark}
                </td>
                <td
                  onClick={() => openModal(service)}
                  style={{ cursor: "pointer", borderRight: "2px solid #ddd" }}
                >
                  {service.price || "-"} Rs.
                </td>
                <td style={{ borderRight: "2px solid #ddd" }}>
                  <span
                    className="provided-service-status-badge"
                    style={{ backgroundColor: getStatusColor(service.status) }}
                  >
                    {mapStatusLabel(service.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="provided-service-modal-overlay" onClick={closeModal}>
          <div
            className="provided-service-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="provided-service-modal-close"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="provided-service-modal-title">Service Details</h2>
            {selectedService && (
              <div className="provided-service-modal-body">
                <div className="provided-service-modal-left">
                  {selectedService.image && (
                    <div className="provided-service-modal-image">
                      <img src={selectedService.image} alt="Service" />
                    </div>
                  )}
                  <div
                    className="provided-service-status-box"
                    style={{
                      backgroundColor: getStatusColor(selectedService.status),
                    }}
                  >
                    {mapStatusLabel(selectedService.status)}
                  </div>
                  {selectedService.status !=="completed" && <div
                    className="requested-service-status-box"
                    style={{
                      backgroundColor: "greenyellow",
                    }}
                    onClick={()=>{navigate("/receivedservicerequests")}}
                  >
                    Go To Request ➡
                  </div>}
                </div>
                <div className="provided-service-modal-right">
                  <div className="provided-service-modal-details">
                    <p>
                      <strong>Name:</strong> {selectedService.name}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedService.description}
                    </p>
                    <p>
                      <strong>Category:</strong> {selectedService.category}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {selectedService.customerPhone}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedService.landmark}
                    </p>
                    {selectedService.price && (
                      <p>
                        <strong>Price:</strong> {selectedService.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="provided-service-modal-overlay">
          <div className="provided-service-modal">
            <h2>Set Expected Price</h2>
            <div>
              <label>
                Expected Price:
                <input
                  type="number"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  required
                />
              </label>
              <div className="provided-service-modal-buttons">
                <button
                  type="button"
                  className="provided-service-red-btn"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="provided-service-green-btn"
                  onClick={handleSubmitPrice}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOTPOpen && (
        <div className="provided-service-modal-overlay">
          <div className="provided-service-modal">
            <h2>Verify OTP</h2>
            <div>
              <label>
                Enter OTP:
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                />
              </label>
              <div className="provided-service-modal-buttons">
                <button
                  type="button"
                  className="provided-service-red-btn"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="provided-service-green-btn"
                  onClick={handleVerifyOTP}
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestList;
