import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import toast from "react-hot-toast";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [properties, setProperty] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", data: {} });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  const handleGetProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/property_details`);
      setProperty(response.data);
      setFilteredData(response.data);
      setSearchedData(response.data);
    } catch (error) {
      console.error("Error fetching property details:" + error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetProperties();
  }, []);
  const openModal = (type, data) => {
    setModalContent({ type, data });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ type: "", data: {} });
  };
  const openDeleteModal = (property) => {
    setPropertyToDelete(property);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  const handleDeleteProperty = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${BASE_URL}/api/property_details/${propertyToDelete._id}`,
      );
      toast.success("Property Deleted Successfully");
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting property:" + error);
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = (val) => {
    let filtered = properties;

    if (val !== "All") {
      if (val === "Commercial") {
        filtered = filtered.filter(
          (property) => property.propertyCategory === val,
        );
      } else {
        filtered = filtered.filter((property) => property.sellType === val);
      }
    }
    setFilterType(val);

    setFilteredData(filtered);
  };

  useEffect(() => {
    searchProperties(searchQuery);
  }, [filteredData]);
  useEffect(() => {
    filterProperties(filterType);
  }, [properties]);

  const searchProperties = (val) => {
    let searched = filteredData;
    searched = searched.filter(
      (property) =>
        property.email.toLowerCase().includes(val.toLowerCase()) ||
        property.city.toLowerCase().includes(val.toLowerCase()),
    );
    setSearchQuery(val);
    setSearchedData(searched);
  };

  const handleCheckboxChange = async (propertyId, checked) => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/update_to_home_page/${propertyId}`, {
        featured: checked,
      });
      handleGetProperties();
      toast.success("Mark is Updated");
    } catch (error) {
      console.error("Error updating property:" + error);
    } finally {
      setLoading(false);
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
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search by Email, City"
              value={searchQuery}
              onChange={(e) => searchProperties(e.target.value)}
              className="search-box"
            />
            <select
              value={filterType}
              onChange={(e) => filterProperties(e.target.value)}
              className="filter-dropdown"
            >
              <option value="All">All</option>
              <option value="Rent">Rent</option>
              <option value="Commercial">Commercial</option>
              <option value="Sell">Sell</option>
              <option value="PG">PG</option>
            </select>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Sell Type</th>
                <th>Property Category</th>
                <th>City</th>
                <th>Email</th>
                <th>Property Details</th>
                <th>Property Images</th>
                <th>Expected Price</th>
                <th>Price Per SqFt</th>
                <th>Unique Features</th>
                <th>Area SqFt</th>
                <th>Show on HomePage</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {searchedData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.sellType}</td>
                  <td>{data.propertyCategory}</td>
                  <td>{data.city}</td>
                  <td>{data.email}</td>
                  <td>
                    <Link to="#" onClick={() => openModal("details", data)}>
                      view
                    </Link>
                  </td>
                  <td>
                    <Link
                      to="#"
                      onClick={() => openModal("images", data.uploadedPhotos)}
                    >
                      view
                    </Link>
                  </td>
                  <td>{data.expectedPrice}</td>
                  <td>{data.pricePerSqFt}</td>
                  <td>
                    <Link
                      to="#"
                      onClick={() =>
                        openModal("uniqueFeatures", data.uniqueFeatures)
                      }
                    >
                      view
                    </Link>
                  </td>
                  <td>{data.areaSqft}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={data.featured}
                      onChange={(e) =>
                        handleCheckboxChange(data._id, e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="red-btn"
                      onClick={() => openDeleteModal(data)}
                    >
                      Delete Property
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isDeleteModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this property?</p>
                <button onClick={closeDeleteModal} className="green-btn">
                  Cancel
                </button>
                <button onClick={handleDeleteProperty} className="red-btn">
                  Confirm
                </button>
              </div>
            </div>
          )}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                {modalContent.type === "images" && (
                  <>
                    <h2>Property Images</h2>
                    <button onClick={closeModal}>Close</button>
                    <div className="image-grid">
                      {modalContent.data.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Property Image ${index + 1}`}
                          className="modal-image"
                        />
                      ))}
                    </div>
                  </>
                )}
                {modalContent.type === "details" && (
                  <>
                    <h2>Property Details</h2>
                    <button onClick={closeModal}>Close</button>
                    <div className="property-details">
                      <p>
                        <strong>Sell Type:</strong> {modalContent.data.sellType}
                      </p>
                      <p>
                        <strong>Property Category:</strong>{" "}
                        {modalContent.data.propertyCategory}
                      </p>
                      <p>
                        <strong>City:</strong> {modalContent.data.city}
                      </p>
                      <p>
                        <strong>Coordinates:</strong> {modalContent.data.latitude},{modalContent.data.longitude} {"  "}
                        <Link to="#" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${modalContent.data.latitude},${modalContent.data.longitude}`) }>
                          view in maps
                        </Link>
                      </p>
                      <p>
                        <strong>Email:</strong> {modalContent.data.email}
                      </p>
                      <p>
                        <strong>Phone Number:</strong>{" "}
                        {modalContent.data.phnumber}
                      </p>
                      <p>
                        <strong>Bedrooms:</strong> {modalContent.data.bedrooms}
                      </p>
                      <p>
                        <strong>Bathrooms:</strong>{" "}
                        {modalContent.data.bathrooms}
                      </p>
                      <p>
                        <strong>Balconies:</strong>{" "}
                        {modalContent.data.balconies}
                      </p>
                      <p>
                        <strong>Ownership:</strong>{" "}
                        {modalContent.data.ownership}
                      </p>
                      <p>
                        <strong>Expected Price:</strong>{" "}
                        {modalContent.data.expectedPrice}
                      </p>
                      <p>
                        <strong>Token / Advance Amount:</strong>{" "}
                        {modalContent.data.closingDealPercentage ? (
                           <>₹ {modalContent.data.sellType === "Sell" 
                            ? Number((modalContent.data.expectedPrice * modalContent.data.closingDealPercentage) / 100).toLocaleString("en-IN") 
                            : Number((modalContent.data.deposite * modalContent.data.closingDealPercentage) / 100).toLocaleString("en-IN")} ({modalContent.data.closingDealPercentage}%)</>
                        ) : "N/A"}
                      </p>
                      <p>
                        <strong>Price Per SqFt:</strong>{" "}
                        {modalContent.data.pricePerSqFt}
                      </p>
                      <p>
                        <strong>Unique Features:</strong>{" "}
                        {modalContent.data.uniqueFeatures}
                      </p>
                      <p>
                        <strong>Area SqFt:</strong> {modalContent.data.areaSqft}
                      </p>
                      <p>
                        <strong>Amenities:</strong>{" "}
                        {modalContent.data.amenities.join(", ")}
                      </p>
                      <p>
                        <strong>Furnitures:</strong>{" "}
                        {modalContent.data.furnitures.join(", ")}
                      </p>
                      <p>
                        <strong>Old Property:</strong>{" "}
                        {modalContent.data.oldProperty}
                      </p>
                      <p>
                        <strong>Is All Inclusive:</strong>{" "}
                        {modalContent.data.isAllInclusive ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Is Price Negotiable:</strong>{" "}
                        {modalContent.data.isPriceNegotiable ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Is Tax Charge Excluded:</strong>{" "}
                        {modalContent.data.isTaxchargeExc ? "Yes" : "No"}
                      </p>
                    </div>
                  </>
                )}
                {modalContent.type === "uniqueFeatures" && (
                  <>
                    <h2>Unique Features</h2>
                    <button onClick={closeModal}>Close</button>
                    <div className="property-details">{modalContent.data}</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
