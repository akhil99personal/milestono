import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UnlockedProperty.css";

const UnlockedProperty = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();
  const handleGetProperties = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/unlocked-property`, {
        headers: {
          Authorization: token,
        },
      });
      setProperty(response.data);
    } catch (error) {
      console.error("Error fetching property details:" + error);
    }
  };

  useEffect(() => {
    handleGetProperties();
  }, []);
  return (
    <div className="unlocked-property-property-list">
      {property.map((property) => (
        <div className="unlocked-property-property" key={property._id}>
          <div className="unlocked-property-property-image">
            <img
              src={property.uploadedPhotos && property.uploadedPhotos[0]}
              alt={`Apartment ${property._id}`}
            />
          </div>
          <div className="unlocked-property-property-details">
            <h2>
              {property.bedrooms}
              {property.bedrooms !== "1RK" && <>BHK</>} Flat for{" "}
              {property.sellType} in {property.city}
            </h2>
            <p>{property.uniqueFeatures}</p>
            <div className="unlocked-property-details-description">
              <span className="unlocked-property-description">
                {property.city}
              </span>
              <span className="unlocked-property-description">
                {property.propertyCategory}
              </span>
              <span className="unlocked-property-description">
                Built-up Area: {property.areaSqft} sq.ft
              </span>
              <span className="unlocked-property-description">
                ₹ {property.pricePerSqFt}/sq.ft
              </span>
            </div>
            <h4>Price: ₹ {property.expectedPrice}</h4>
            <div className="unlocked-property-property-actions">
              <button
                onClick={() => {
                  navigate(`/details/${property._id}`);
                }}
              >
                <i className="fa-solid fa-eye"></i> <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default UnlockedProperty;
