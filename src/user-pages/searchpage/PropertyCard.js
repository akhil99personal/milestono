import React, { useState } from "react";
import dummyImg from "../../images/dummyImage.webp";
import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, viewMode = "grid" }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  const getListingTypeIcon = () => {
    const icons = {
      "Sell": "fa-cart-shopping",
      "Rent": "fa-key",
      "Lease": "fa-handshake",
      "Commercial": "fa-building"
    };
    return icons[property.sellType] || "fa-home";
  };

  const handleShare = () => {
    const title = `${property.bedrooms} BHK ${property.propertyContains ? property.propertyContains[0] : "Apartment"} for ${property.sellType}`;
    const text = `${property.landmark}, ${property.city}`;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: window.location.href
      }).catch(err => console.log("[v0] Share cancelled or failed:", err));
    } else {
      // Fallback: copy to clipboard
      const url = window.location.href;
      navigator.clipboard.writeText(`${title}\n${text}\n${url}`).then(() => {
        alert("Property details copied to clipboard!");
      }).catch(() => {
        alert("Unable to share. Please try again.");
      });
    }
  };

  const handleLike = () => {
    setIsFavorited(!isFavorited);
    console.log("[v0] Property liked/unliked:", property._id, !isFavorited);
  };

  // Grid View
  if (viewMode === "grid") {
    return (
      <div className="prop-card">
        <div className="prop-card-image-section">
          <img
            src={property.uploadedPhotos ? property.uploadedPhotos[0] : dummyImg}
            alt={`Property ${property._id}`}
            className="prop-card-image"
          />
          
          {/* Type Badge */}
          <div className="prop-card-type-badge">
            <i className={`fa-solid ${getListingTypeIcon()}`}></i>
            {property.sellType}
          </div>

          {/* Action Buttons */}
          <div className="prop-card-image-actions">
            <button
              className="prop-card-action-btn prop-card-share-btn"
              onClick={handleShare}
              title="Share"
            >
              <i className="fa-solid fa-share-nodes"></i>
            </button>
            <button
              className={`prop-card-action-btn prop-card-heart-btn ${isFavorited ? "prop-card-heart-btn-active" : ""}`}
              onClick={handleLike}
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <i className={`fa-${isFavorited ? "solid" : "regular"} fa-heart`}></i>
            </button>
          </div>

          {/* Match Badge */}
          <div className="prop-card-verified-badge">
            <i className="fa-solid fa-check"></i> Verified
          </div>
        </div>

        <div className="prop-card-details-section">
          {/* Price */}
          <div className="prop-card-price-section">
            <h3 className="prop-card-price">
              ₹{property.sellType === "Sell"
                ? Number(property.expectedPrice).toLocaleString("en-IN")
                : Number(property.pricePerMonth).toLocaleString("en-IN")}
            </h3>
            {property.sellType !== "Sell" && (
              <span className="prop-card-price-period">/month</span>
            )}
          </div>

          {/* Title */}
          <h4 className="prop-card-title">
            {property.bedrooms}
            {property.bedrooms !== "1RK" && <> BHK</>} {property.propertyCategory === "Commercial" ? "Commercial" : "Apartment"} for {property.sellType}
          </h4>

          {/* Location */}
          <p className="prop-card-location">
            <i className="fa-solid fa-location-dot"></i>
            {property.landmark.replace(/\b\w/g, (char) => char.toUpperCase())}, {property.city}
          </p>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="prop-card-amenities">
              {property.amenities.slice(0, 3).map((amenity, idx) => (
                <span key={idx} className="prop-card-amenity-tag">{amenity}</span>
              ))}
            </div>
          )}

          {/* Property Info Grid */}
          <div className="prop-card-info-grid">
            <div className="prop-card-info-item">
              <span className="prop-card-info-label">Area</span>
              <span className="prop-card-info-value">{property.areaSqft} sq.ft</span>
            </div>
            <div className="prop-card-info-item">
              <span className="prop-card-info-label">Price/sq.ft</span>
              <span className="prop-card-info-value">₹{Math.round(property.pricePerSqFt)}</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="prop-card-cta-btn"
            onClick={() => navigate(`/details/${property._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    );
  }
  
  // List View
  return (
    <div className="prop-card-list">
      <div className="prop-card-list-image-section">
        <img
          src={property.uploadedPhotos ? property.uploadedPhotos[0] : dummyImg}
          alt={`Property ${property._id}`}
          className="prop-card-list-image"
        />
        <div className="prop-card-type-badge">
          <i className={`fa-solid ${getListingTypeIcon()}`}></i>
          {property.sellType}
        </div>
      </div>

      <div className="prop-card-list-content">
        <div className="prop-card-list-top">
          <div>
            <h4 className="prop-card-list-title">
              {property.bedrooms}
              {property.bedrooms !== "1RK" && <> BHK</>} Apartment
            </h4>
            <p className="prop-card-list-location">
              <i className="fa-solid fa-location-dot"></i>
              {property.landmark.replace(/\b\w/g, (char) => char.toUpperCase())}, {property.city}
            </p>
          </div>
          <div className="prop-card-list-price-section">
            <p className="prop-card-list-price">
              ₹{property.sellType === "Sell"
                ? Number(property.expectedPrice).toLocaleString("en-IN")
                : Number(property.pricePerMonth).toLocaleString("en-IN")}
            </p>
            {property.sellType !== "Sell" && (
              <p className="prop-card-list-price-sub">/month</p>
            )}
          </div>
        </div>

        <div className="prop-card-list-info">
          <span className="prop-card-list-info-item">
            <i className="fa-solid fa-expand"></i> {property.areaSqft} sq.ft
          </span>
          <span className="prop-card-list-info-item">
            <i className="fa-solid fa-indian-rupee-sign"></i> ₹{Math.round(property.pricePerSqFt)}/sq.ft
          </span>
        </div>

        <div className="prop-card-list-bottom">
          <button
            className="prop-card-list-cta-btn"
            onClick={() => navigate(`/details/${property._id}`)}
          >
            View Details
          </button>
          <div className="prop-card-list-actions">
            <button
              className="prop-card-list-action-btn"
              onClick={handleShare}
              title="Share"
            >
              <i className="fa-solid fa-share-nodes"></i>
            </button>
            <button
              className={`prop-card-list-action-btn ${isFavorited ? "prop-card-list-action-btn-active" : ""}`}
              onClick={handleLike}
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <i className={`fa-${isFavorited ? "solid" : "regular"} fa-heart`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
