import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RequestedService.css";

const ServiceRequestList = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchCustomerServices = async () => {
    try {
      const token = localStorage.getItem("auth");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/services-requests`, {
        headers: {
          Authorization: token, 
        },
      });

      setServices(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCustomerServices();
  }, []);

  const getStatusColor = (status) => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "requested") {
      return "#f0ad4e";
    } else if (normalizedStatus === "quoted") {
      return "#fc7d7d";
    }
     else if (normalizedStatus === "paid") {
      return "#0275d8";
    } else if (normalizedStatus === "completed"|| normalizedStatus === "done") {
      return "#5cb85c";
    } else {
      return "#d9534f";
    }
  };

  const mapStatusLabel = (status) => {
    const normalizedStatus = status.toLowerCase();

    if (normalizedStatus === "requested") {
      return "Requested";
    } else if (normalizedStatus === "quoted") {
      return "Quoted";
    }
     else if (normalizedStatus === "paid") {
      return "Paid";
    } else if (normalizedStatus === "completed" || normalizedStatus === "done") {
      return "Completed";
    } else {
      return "Requested";
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

  const handleViewServicemans = (serviceId) => {
    navigate("/servicemans", { state: { serviceId } });
  };

  if (loading) return <p>Loading service requests...</p>;
  if (error) return <p>Error loading service requests: {error}</p>;

  return (
    <div className="requested-service-service-request-list">
      <h2>My Requested Services</h2>
      {services.length === 0 ? (
        <p>No service requests found.</p>
      ) : (
        <table className="requested-service-table">
          <thead>
            <tr
              style={{
                border: "2px solid #ddd",
                borderRight: "2px solid #ddd",
              }}
            >
              <th style={{ borderRight: "2px solid #ddd" }}>Service</th>
              <th style={{ borderRight: "2px solid #ddd" }}>Category</th>
              <th style={{ borderRight: "2px solid #ddd" }}>Description</th>
              <th style={{ borderRight: "2px solid #ddd" }}>Price</th>
              <th style={{ borderRight: "2px solid #ddd" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr
                key={index}
                onClick={() => openModal(service)}
                style={{
                  borderLeft: "2px solid #ddd",
                  borderRight: "2px solid #ddd",
                }}
              >
                <td style={{ borderRight: "2px solid #ddd" }}>
                  {service.name}
                </td>
                <td style={{ borderRight: "2px solid #ddd" }}>
                  {service.category}
                </td>
                <td style={{ borderRight: "2px solid #ddd" }}>
                  {service.description}
                </td>
                <td style={{ borderRight: "2px solid #ddd" }}>
                  {service.price ? `${service.price} Rs.` : "-"}
                </td>
                <td
                  onClick={() => openModal(service)}
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="requested-service-status-badge"
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
        <div className="requested-service-modal-overlay" onClick={closeModal}>
          <div
            className="requested-service-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="requested-service-modal-close"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="requested-service-modal-title">
              Service Request Details
            </h2>
            {selectedService && (
              <div className="requested-service-modal-body">
                <div className="requested-service-modal-left">
                  {selectedService.image && (
                    <div className="requested-service-modal-image">
                      <img src={selectedService.image} alt="Service" />
                    </div>
                  )}
                  <div
                    className="requested-service-status-box"
                    style={{
                      backgroundColor: getStatusColor(selectedService.status),
                    }}
                  >
                    {mapStatusLabel(selectedService.status)}
                  </div>
                  <div
                    className="requested-service-status-box"
                    style={{
                      backgroundColor: "greenyellow",
                    }}
                    onClick={()=>{navigate(`/servicemans/${selectedService._id}`)}}
                  >
                    Go To Request ➡
                  </div>
                </div>
                <div className="requested-service-modal-right">
                  <div className="requested-service-modal-details">
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
                    {selectedService.vendorPhone && (
                      <p>
                        <strong>Mobile:</strong> {selectedService.vendorPhone}
                      </p>
                    )}
                    <p>
                      <strong>Address:</strong> {selectedService.landmark}
                    </p>
                    {selectedService.price && (
                      <p>
                        <strong>Price:</strong> {selectedService.price}
                      </p>
                    )}
                    {selectedService.otp && (
                      <p>
                        <strong>OTP:</strong> {selectedService.otp}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestList;
