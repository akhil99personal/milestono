import React, { useState } from "react";
import dummyImg from "../../images/dummyImage.webp";
import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property, viewMode = "grid" }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  function numberToWords(num) {
    num = Number(num).toFixed(0);
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"];

    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function convert(n) {
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
      return "";
    }

    const crore = Math.floor(num / 10000000);
    num %= 10000000;

    const lakh = Math.floor(num / 100000);
    num %= 100000;

    const thousand = Math.floor(num / 1000);
    num %= 1000;

    const hundred = num;

    let result = "";

    if (crore) result += convert(crore) + " Crore ";
    if (lakh) result += convert(lakh) + " Lakh ";
    if (thousand) result += convert(thousand) + " Thousand ";
    if (hundred) result += convert(hundred);

    return result.trim();
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.bedrooms + " BHK in " + property.landmark,
        text: "Check out this property",
        url: window.location.href + "/details/" + property._id
      });
    } else {
      alert("Property: " + property.landmark);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={`property-card-property property-card-${viewMode}`} key={property._id}>
      {/* Image Container */}
      <div className="property-card-property-image">
        {property.uploadedPhotos && property.uploadedPhotos.length > 0 ? (
          <img
            src={property.uploadedPhotos[0]}
            alt={`${property.bedrooms} BHK in ${property.landmark}`}
          />
        ) : (
          <img src={dummyImg} alt={`Apartment ${property._id}`} />
        )}

        {/* Category Badge */}
        {property.propertyCategory && (
          <div className="property-card-badge">
            {property.propertyCategory.substring(0, 2).toUpperCase()}
          </div>
        )}

        {/* Like Button in Image */}
        <button
          className={`property-card-like-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
          title="Add to favorites"
        >
          <i className={`fa-${isLiked ? "solid" : "regular"} fa-heart`}></i>
        </button>
      </div>

      {/* Details Container */}
      <div className="property-card-property-details">
        {/* Title and Price */}
        <div className="property-card-header">
          <div className="property-card-title-section">
            <h2 className="property-card-title">
              {property.bedrooms}
              {property.bedrooms !== "1RK" && <> BHK</>}
              {property.landmark && <> - {property.landmark.replace(/\b\w/g, (char) => char.toUpperCase())}</>}
            </h2>
          </div>
          <div className="property-card-price">
            <span className="property-card-price-main">
              ₹{property.sellType === "Sell"
                ? Number(property.expectedPrice).toLocaleString("en-IN")
                : Number(property.pricePerMonth).toLocaleString("en-IN")}
            </span>
            {property.sellType === "Rent" && <span className="property-card-price-period">/mo</span>}
          </div>
        </div>

        {/* Location */}
        <div className="property-card-location">
          <i className="fa-solid fa-location-dot"></i>
          <span>{property.city}</span>
        </div>

        {/* Features Row */}
        <div className="property-card-features">
          {property.bedrooms && (
            <div className="property-card-feature-item">
              <i className="fa-solid fa-bed"></i>
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="property-card-feature-item">
              <i className="fa-solid fa-bath"></i>
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.areaSqft && (
            <div className="property-card-feature-item">
              <i className="fa-solid fa-ruler-combined"></i>
              <span>{property.areaSqft} sqft</span>
            </div>
          )}
          {property.rating && (
            <div className="property-card-feature-item">
              <i className="fa-solid fa-star"></i>
              <span>{property.rating}</span>
            </div>
          )}
        </div>

        {/* Price Per Sqft */}
        {property.sellType === "Sell" && property.pricePerSqFt && (
          <div className="property-card-price-sqft">
            ₹ {Math.round(property.pricePerSqFt).toLocaleString("en-IN")} / sq.ft
          </div>
        )}

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="property-card-amenities">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="property-card-amenity">{amenity}</span>
            ))}
            {property.amenities.length > 3 && (
              <span className="property-card-amenity-more">+{property.amenities.length - 3}</span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="property-card-actions">
          <button
            className="property-card-unlock-btn"
            onClick={() => navigate(`/details/${property._id}`)}
          >
            <i className="fa-solid fa-lock"></i> Unlock Contact
          </button>
          <button
            className="property-card-share-btn"
            onClick={handleShare}
            title="Share"
          >
            <i className="fa-solid fa-share-nodes"></i>
          </button>
        </div>
      </div>

      {/* Verified Badge */}
      {property.verified && (
        <div className="property-card-verified-badge">
          <i className="fa-solid fa-check"></i> Verified
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
