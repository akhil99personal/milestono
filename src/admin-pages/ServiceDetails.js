import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import toast from "react-hot-toast";
import "./ServiceDetails.css";

const ServiceDetails = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [serviceMan, setServiceMan] = useState([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState({
    index: null,
    action: "",
  });

  const handleGetServiceMan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/serviceman_details`);
      setServiceMan(response.data);
    } catch (error) {
      console.error("Error fetching property details:" + error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetServiceMan();
  }, []);

  const openModal = (images) => {
    setSelectedImages(images);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImages([]);
    setModalOpen(false);
  };

  const openConfirmationModal = (index, action) => {
    setConfirmationDetails({ index, action });
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationDetails({ index: null, action: "" });
    setConfirmationModalOpen(false);
  };

  const handleConfirmAction = async () => {
    setLoading(true);
    const { index, action } = confirmationDetails;
    const serviceId = serviceMan[index]._id;
    try {
      if (action === "accept") {
        await axios.put(`${BASE_URL}/api/accept_serviceman/${serviceId}`);
        toast.success(`Accepted entry at index ${index}`);
      } else if (action === "reject") {
        await axios.delete(`${BASE_URL}/api/delete_serviceman/${serviceId}`);
        toast.success(`Rejected entry at index ${index}`);
      }

      handleGetServiceMan();
    } catch (error) {
      console.error(`Error performing ${action} action:` + error);
    } finally {
      setLoading(false);
      closeConfirmationModal();
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
                <th>Service Man Name</th>
                <th>Service Email</th>
                <th>Service Roll</th>
                <th>Vendor Description</th>
                <th>Experience</th>
                <th>District</th>
                <th>State</th>
                <th>Sub District</th>
                <th>Aadhar number</th>
                <th>GST number</th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceMan.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.vendorName}</td>
                  <td>{data.email}</td>
                  <td>{data.serviceRoll}</td>
                  <td>{data.vendorDescription}</td>
                  <td>{data.experience}</td>
                  <td>{data.district}</td>
                  <td>{data.state}</td>
                  <td>{data.subDistrict}</td>
                  <td>{data.adharNumber}</td>
                  <td>{data.panNumber}</td>
                  <td>
                    <Link
                      to="#"
                      onClick={() =>
                        openModal([
                          data.vendorImage,
                          data.adharImage,
                          data.panImage,
                          data.certificateImage,
                        ])
                      }
                    >
                      View Documents
                    </Link>
                  </td>
                  <td>
                      <>
                        <button
                          onClick={() => openConfirmationModal(index, "reject")}
                          className="red-btn"
                        >
                          Delete Details
                        </button>
                      </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {modalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Documents</h2>
                <button onClick={closeModal}>Close</button>
                <div className="image-grid">
                  {selectedImages.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Document ${idx + 1}`}
                      className="modal-image"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {confirmationModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Confirm Action</h2>
                <p>
                  Are you sure you want to {confirmationDetails.action} this
                  entry?
                </p>
                <button onClick={handleConfirmAction} className="green-btn">
                  Yes
                </button>
                <button onClick={closeConfirmationModal} className="red-btn">
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
