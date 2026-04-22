import React from "react";
import dummyImg from "../../images/dummyImage.webp";
import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
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
  return (
    <div className="property-card-property" key={property._id}>
      {property.featured && (
        <div className="branding-container">
          <div className="verified">
            <i className="fa-solid fa-check"></i> Featured
          </div>
        </div>
      )}

      <div className="property-card-property-image">
        <img
          src={property.uploadedPhotos ? property.uploadedPhotos[0] : dummyImg}
          alt={`Apartment ${property._id}`}
        />
      </div>
      <div className="property-card-property-details">
        <h2>
          {property.bedrooms}
          {property.bedrooms !== "1RK" && <> BHK</>} Flat for{" "}
          {property.sellType} in{" "}
          {property.landmark.replace(/\b\w/g, (char) => char.toUpperCase())},{" "}
          {property.city}
        </h2>
        <p>
          Features of properties posted by <b>{property.sellerType}</b>
        </p>
        <div className="property-card-details-description">
          <span className="property-card-description">
            City: {property.city}
          </span>
          <span className="property-card-description">
            Property Category: {property.propertyCategory}
          </span>
          <span className="property-card-description">
            {property.sellType === "Sell" ? "Carpet Area:" : "Deposite:"}

            {property.sellType === "Sell"
              ? property.areaSqft + " sq.ft"
              : "₹ " + property.deposite}
          </span>
          <span className="property-card-description">
            Property Type: {property.sellType}
          </span>
        </div>
        <div className="price-section">
          <div className="price-main">
            ₹
            {property.sellType === "Sell"
              ? Number(property.expectedPrice).toLocaleString("en-IN")
              : Number(property.pricePerMonth).toLocaleString("en-IN")}
            <div className="price-words">
              {property.sellType === "Sell"
                ? numberToWords(property.expectedPrice)
                : numberToWords(property.pricePerMonth)}
            </div>
          </div>

          <div className="price-extra">
            {property.sellType === "Sell" ? (
              <span className="price-tag">
                ₹ {Math.round(property.pricePerSqFt).toLocaleString("en-IN")} / sq.ft
              </span>
            ) : (
              <span className="price-tag">
                Deposit ₹ {Math.round(property.deposite).toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
        <div className="property-card-property-actions">
          <button
            onClick={() => {
              navigate(`/details/${property._id}`);
            }}
          >
            <i className="fa-solid fa-eye"></i> <span>View Details</span>
          </button>
        </div>
      </div>
      {property.bulkCount && property.bulkCount > 1 && (
        <div className="bulk-container">X {property.bulkCount}</div>
      )}
    </div>
  );
};
export default PropertyCard;
