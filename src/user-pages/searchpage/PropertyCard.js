import React, { useState } from "react";
import dummyImg from "../../images/dummyImage.webp";
import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, viewMode = "grid" }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  const getBadgeColor = (type) => {
    const colors = {
      "Buy": "#FF9500",
      "Sell": "#FF9500",
      "Rent": "#10B981",
      "Lease": "#3B82F6",
      "Commercial": "#8B5CF6",
      "PG": "#EC4899",
      "Co-living": "#EC4899"
    };
    return colors[type] || "#232761";
  };

  const getListingTypeLabel = () => {
    if (property.sellType === "Sell") return "Buy";
    if (property.sellType === "Rent") return "Rent";
    if (property.sellType === "Lease") return "Lease";
    if (property.propertyCategory === "Commercial") return "Commercial";
    return property.sellType;
  };

  const getMatchPercentage = () => {
    return Math.floor(Math.random() * 30) + 70; // Random 70-99%
  };

  const getVerificationBadges = () => {
    const badges = [];
    if (Math.random() > 0.5) badges.push("RERA Verified");
    if (Math.random() > 0.5) badges.push("3D Tour Available");
    if (Math.random() > 0.5) badges.push("Ready to Move");
    return badges.slice(0, 2);
  };

  const getAmenities = () => {
    const allAmenities = [
      "Car Parking", "Gym", "CCTV", "Guard", "Club House",
      "Water Supply", "Lift", "Balcony", "Garden"
    ];
    return allAmenities.slice(0, 3);
  };

  const isGridView = viewMode === "grid";

  if (isGridView) {
    return (
      <div className="property-card-grid-item">
        <div className="property-card-image-container">
          <img
            src={property.uploadedPhotos ? property.uploadedPhotos[0] : dummyImg}
            alt={`Property ${property._id}`}
          />
          <div className="property-card-listing-badge" style={{ backgroundColor: getBadgeColor(getListingTypeLabel()) }}>
            {getListingTypeLabel()}
          </div>
          <div className="property-card-match-badge">
            <i className="fa-solid fa-fire"></i> {getMatchPercentage()}% Match
          </div>
          <div className="property-card-actions-overlay">
            <button className="property-card-icon-btn">
              <i className="fa-solid fa-share-nodes"></i>
            </button>
            <button
              className="property-card-icon-btn"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <i className={`fa-${isFavorited ? "solid" : "regular"} fa-heart`}></i>
            </button>
          </div>
        </div>

        <div className="property-card-grid-content">
          <h3 className="property-card-title">
            {property.bedrooms}
            {property.bedrooms !== "1RK" && <> BHK</>} {property.propertyContains ? property.propertyContains[0] : "Flat"} for {property.sellType}
          </h3>

          <p className="property-card-location">
            <i className="fa-solid fa-location-dot"></i>
            {property.landmark.replace(/\b\w/g, (char) => char.toUpperCase())}, {property.city}
          </p>

          <div className="property-card-verification-badges">
            {getVerificationBadges().map((badge, idx) => (
              <span key={idx} className="property-card-badge">
                {badge === "RERA Verified" && <i className="fa-solid fa-check"></i>}
                {badge === "3D Tour Available" && <i className="fa-solid fa-cube"></i>}
                {badge === "Ready to Move" && <i className="fa-solid fa-check-circle"></i>}
                {badge}
              </span>
            ))}
          </div>

          <div className="property-card-amenities">
            {getAmenities().map((amenity, idx) => (
              <span key={idx} className="property-card-amenity">
                {amenity}
              </span>
            ))}
          </div>

          <div className="property-card-specs">
            <div className="property-card-spec-item">
              <span className="property-card-spec-label">Area</span>
              <span className="property-card-spec-value">{property.areaSqft} sq.ft</span>
            </div>
            <div className="property-card-spec-divider"></div>
            <div className="property-card-spec-item">
              <span className="property-card-spec-label">Price/sq.ft</span>
              <span className="property-card-spec-value">₹{Math.round(property.pricePerSqFt)}</span>
            </div>
          </div>

          <div className="property-card-price-section">
            <div className="property-card-price-main">
              ₹{property.sellType === "Sell"
                ? Number(property.expectedPrice).toLocaleString("en-IN")
                : Number(property.pricePerMonth).toLocaleString("en-IN")}
            </div>
            {property.sellType !== "Sell" && (
              <div className="property-card-price-sub">
                /month
              </div>
            )}
          </div>

          <button
            className="property-card-view-details-btn"
            onClick={() => navigate(`/details/${property._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    );
  } else {
    // List view
    return (
      <div className="property-card-list-item">
        <div className="property-card-list-image">
          <img
            src={property.uploadedPhotos ? property.uploadedPhotos[0] : dummyImg}
            alt={`Property ${property._id}`}
          />
          <div className="property-card-listing-badge" style={{ backgroundColor: getBadgeColor(getListingTypeLabel()) }}>
            {getListingTypeLabel()}
          </div>
        </div>

        <div className="property-card-list-content">
          <div className="property-card-list-header">
            <div>
              <h3 className="property-card-list-title">
                {property.bedrooms}
                {property.bedrooms !== "1RK" && <> BHK</>} {property.propertyContains ? property.propertyContains[0] : "Flat"} for {property.sellType}
              </h3>
              <p className="property-card-list-location">
                <i className="fa-solid fa-location-dot"></i>
                {property.landmark.replace(/\b\w/g, (char) => char.toUpperCase())}, {property.city}
              </p>
            </div>
            <div className="property-card-list-price">
              <div className="property-card-price-main">
                ₹{property.sellType === "Sell"
                  ? Number(property.expectedPrice).toLocaleString("en-IN")
                  : Number(property.pricePerMonth).toLocaleString("en-IN")}
              </div>
              <div className="property-card-price-per-sqft">
                ₹{Math.round(property.pricePerSqFt)}/sq.ft
              </div>
            </div>
          </div>

          <div className="property-card-list-specs">
            <span><strong>Area:</strong> {property.areaSqft} sq.ft</span>
            <span><strong>Category:</strong> {property.propertyCategory}</span>
            <span><strong>Posted by:</strong> {property.sellerType}</span>
          </div>

          <div className="property-card-list-badges">
            {getVerificationBadges().map((badge, idx) => (
              <span key={idx} className="property-card-badge">{badge}</span>
            ))}
          </div>

          <div className="property-card-list-footer">
            <button
              className="property-card-view-details-btn"
              onClick={() => navigate(`/details/${property._id}`)}
            >
              View Details
            </button>
            <div className="property-card-list-actions">
              <button className="property-card-icon-btn">
                <i className="fa-solid fa-share-nodes"></i>
              </button>
              <button
                className="property-card-icon-btn"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <i className={`fa-${isFavorited ? "solid" : "regular"} fa-heart`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PropertyCard;
