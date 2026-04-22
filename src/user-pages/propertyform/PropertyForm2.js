import React, { useState } from "react";
import MapInput from "./MapInput";
import PropTypes from "prop-types";
import "./PropertyForm2.css";

const PropertyForm2 = ({ handleStepInc, formData, handleFormData }) => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: formData.latitude || 0,
    lng: formData.longitude || 0,
  });
  const [errors, setErrors] = useState({});

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    handleFormData("latitude", location.lat);
    handleFormData("longitude", location.lng);
  };

  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };
          setSelectedLocation(currentLocation);
          handleFormData("latitude", latitude);
          handleFormData("longitude", longitude);
        },
        (error) => {
          console.error("Error fetching location:" + error);
          alert("Unable to retrieve your location.");
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const ownershipOptions = [
    "Freehold",
    "Co-operative society",
    "Leasehold",
    "Power of Attorney",
  ];
  const furnitures = [
    "Bed",
    "Sofa",
    "TV",
    "Cupboard",
    "AC",
    "Water Purifier",
    "Geyser",
    "Washing Machine",
    "Dining Table",
  ];

  const handleOptionSelect = (option, name) => {
    if (!formData[name].includes(option)) {
      handleFormData(name, [...formData[name], option]);
    }
  };

  const handleOptionRemove = (optionToRemove, name) => {
    const updatedOptions = formData[name].filter(
      (option) => option !== optionToRemove,
    );
    handleFormData(name, updatedOptions);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.latitude || !formData.longitude) {
      newErrors.location = "Please select or detect your property location.";
      isValid = false;
    }

    if (!formData.city) {
      newErrors.city = "Please fill the city name";
      isValid = false;
    }

    if (!formData.landmark) {
      newErrors.landmark = "Please fill the landmark";
      isValid = false;
    }

    if (!formData.bedrooms) {
      newErrors.bedrooms = "Number of bedrooms is required.";
      isValid = false;
    }

    if (!formData.bathrooms) {
      newErrors.bathrooms = "Number of bathrooms is required.";
      isValid = false;
    }

    if (!formData.balconies) {
      newErrors.balconies = "Number of balconies is required.";
      isValid = false;
    }

    if (!formData.ownership) {
      newErrors.ownership = "Please select a Ownership.";
      isValid = false;
    }

    if (formData.sellType !== "Sell") {
      if (!formData.deposite) {
        newErrors.deposite = "Deposite is required.";
        isValid = false;
      }
      if (!formData.pricePerMonth) {
        newErrors.pricePerMonth = "Price per month is required.";
        isValid = false;
      }
    }

    if (formData.sellType === "Sell") {
      if (!formData.areaSqft) {
        newErrors.areaSqft = "Area in sq.ft. is required.";
        isValid = false;
      }
      if (!formData.expectedPrice) {
        newErrors.expectedPrice = "Expected price is required.";
        isValid = false;
      }
      if (!formData.pricePerSqFt) {
        newErrors.pricePerSqFt = "Price per sq.ft. is required.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleStepInc();
    }
  };

  return (
    <div>
      <h2 className="property-form-2-property-form-heading">
        Basic Details of your property
      </h2>

      <div className="property-form-2-property-info-section">
        <h3 className="property-form-2-property-form-heading2">
          Where is your property located?
        </h3>
        <label>
          City:
          <input
            type="text"
            value={formData.city}
            onChange={(e) => {
              handleFormData("city", e.target.value);
            }}
          />
        </label>
        {errors.city && (
          <div className="property-form-2-error">{errors.city}</div>
        )}
        <label>
          Nearest Landmark:
          <input
            type="text"
            value={formData.landmark}
            onChange={(e) => {
              handleFormData("landmark", e.target.value);
            }}
          />
        </label>
        {errors.landmark && (
          <div className="property-form-2-error">{errors.landmark}</div>
        )}
        <button onClick={detectCurrentLocation}>
          Detect my current location
        </button>
        {errors.location && (
          <div className="property-form-2-error">{errors.location}</div>
        )}
      </div>

      <div className="property-form-2-map-section">
        <h3 className="property-form-2-property-form-heading2">
          Select Your Property Location on the Map
        </h3>
        <MapInput
          onLocationSelect={handleLocationSelect}
          selectedLocation={selectedLocation}
        />
      </div>

      <div className="property-form-2-room-details-section">
        <h3 className="property-form-2-property-form-heading2">
          Add Room Details
        </h3>
        No. of Bedrooms
        <div className="property-form-2-circle-options">
          <label
            className={
              formData.bedrooms === "1RK" ? "property-form-2-selected" : ""
            }
          >
            <input
              type="radio"
              name="bedrooms"
              value="1RK"
              onChange={(e) => {
                handleFormData("bedrooms", e.target.value);
              }}
            />
            1RK
          </label>
          <label
            className={
              formData.bedrooms === "1" ? "property-form-2-selected" : ""
            }
          >
            <input
              type="radio"
              name="bedrooms"
              value="1"
              onChange={(e) => {
                handleFormData("bedrooms", e.target.value);
              }}
            />
            1
          </label>
          <label
            className={
              formData.bedrooms === "2" ? "property-form-2-selected" : ""
            }
          >
            <input
              type="radio"
              name="bedrooms"
              value="2"
              onChange={(e) => {
                handleFormData("bedrooms", e.target.value);
              }}
            />
            2
          </label>
          <label
            className={
              formData.bedrooms === "3" ? "property-form-2-selected" : ""
            }
          >
            <input
              type="radio"
              name="bedrooms"
              value="3"
              onChange={(e) => {
                handleFormData("bedrooms", e.target.value);
              }}
            />
            3
          </label>
          <label
            className={
              formData.bedrooms === "4" ? "property-form-2-selected" : ""
            }
          >
            <input
              type="radio"
              name="bedrooms"
              value="4"
              onChange={(e) => {
                handleFormData("bedrooms", e.target.value);
              }}
            />
            4
          </label>
          <label
            className={
              formData.bedrooms === "5+" ? "property-form-2-selected" : ""
            }
          >
            <input
              type="radio"
              name="bedrooms"
              value="5+"
              onChange={(e) => {
                handleFormData("bedrooms", e.target.value);
              }}
            />
            5+
          </label>
        </div>
        {errors.bedrooms && (
          <div className="property-form-2-error">{errors.bedrooms}</div>
        )}
        <label>
          No. of Bathrooms:
          <div className="property-form-2-circle-options">
            <label
              className={
                formData.bathrooms === "1" ? "property-form-2-selected" : ""
              }
            >
              <input
                type="radio"
                name="bathrooms"
                value="1"
                onChange={(e) => {
                  handleFormData("bathrooms", e.target.value);
                }}
              />
              1
            </label>
            <label
              className={
                formData.bathrooms === "2" ? "property-form-2-selected" : ""
              }
            >
              <input
                type="radio"
                name="bathrooms"
                value="2"
                onChange={(e) => {
                  handleFormData("bathrooms", e.target.value);
                }}
              />
              2
            </label>
            <label
              className={
                formData.bathrooms === "3" ? "property-form-2-selected" : ""
              }
            >
              <input
                type="radio"
                name="bathrooms"
                value="3"
                onChange={(e) => {
                  handleFormData("bathrooms", e.target.value);
                }}
              />
              3
            </label>
            <label
              className={
                formData.bathrooms === "4" ? "property-form-2-selected" : ""
              }
            >
              <input
                type="radio"
                name="bathrooms"
                value="4"
                onChange={(e) => {
                  handleFormData("bathrooms", e.target.value);
                }}
              />
              4
            </label>
            <label
              className={
                formData.bathrooms === "5+" ? "property-form-2-selected" : ""
              }
            >
              <input
                type="radio"
                name="bathrooms"
                value="5+"
                onChange={(e) => {
                  handleFormData("bathrooms", e.target.value);
                }}
              />
              5+
            </label>
          </div>
        </label>
        {errors.bathrooms && (
          <div className="property-form-2-error">{errors.bathrooms}</div>
        )}
        <label>
          No. of Balconies:
          <div className="property-form-2-circle-options">
            <label
              className={
                formData.balconies === "1" ? "property-form-2-selected" : ""
              }
            >
              <input
                type="radio"
                name="balconies"
                value="1"
                onChange={(e) => {
                  handleFormData("balconies", e.target.value);
                }}
              />
              1
            </label>
            <label
              className={
                formData.balconies === "2" ? "property-form-2-selected" : ""
              }
            >
              <input
                type="radio"
                name="balconies"
                value="2"
                onChange={(e) => {
                  handleFormData("balconies", e.target.value);
                }}
              />
              2
            </label>
            <label
              className={
                formData.balconies === "3" ? "property-form-2-selected" : ""
              }
            >
              <input
                type="radio"
                name="balconies"
                value="3"
                onChange={(e) => {
                  handleFormData("balconies", e.target.value);
                }}
              />
              3
            </label>
            <label
              className={
                formData.balconies === "4+" ? "property-form-2-selected" : ""
              }
            >
              <input
                type="radio"
                name="balconies"
                value="4+"
                onChange={(e) => {
                  handleFormData("balconies", e.target.value);
                }}
              />
              4+
            </label>
          </div>
        </label>
        {errors.balconies && (
          <div className="property-form-2-error">{errors.balconies}</div>
        )}
        Furnitures (Optional)
        <div className="property-form-2-options">
          {furnitures.map((option) => (
            <div
              key={option}
              className={`property-form-2-option ${formData.furnitures.includes(option) ? "property-form-2-selected" : ""}`}
              onClick={() => handleOptionSelect(option, "furnitures")}
            >
              {option}
            </div>
          ))}
        </div>
        {formData.furnitures.length > 0 && (
          <div className="property-form-2-category commercial">
            <div className="property-form-2-category-title">Your Selected</div>
          </div>
        )}
        <div className="property-form-2-selected-options">
          {formData.furnitures.map((option) => (
            <div key={option} className="property-form-2-selected-option">
              {option}{" "}
              <span
                className="property-form-2-remove-option"
                onClick={() => handleOptionRemove(option, "furnitures")}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="property-form-2-basic-details-section">
        <h3 className="property-form-2-property-form-heading2">
          Basic Details
        </h3>
        <div>
          Ownership:
          <div className="property-form-2-options">
            {ownershipOptions.map((option) => (
              <div
                key={option}
                className={`property-form-2-option ${formData.ownership === option ? "property-form-2-selected" : ""}`}
                onClick={() => handleFormData("ownership", option)}
              >
                {option}
              </div>
            ))}
            {errors.ownership && (
              <div className="property-form-2-error">
                {errors.ownershipOptions}
              </div>
            )}
          </div>
        </div>
      </div>

      {formData.sellType !== "Sell" && (
        <div className="property-form-2-price-details-section">
          <h3 className="property-form-2-property-form-heading2">
            Price Details
          </h3>
          <label>
            Deposite:
            <input
              type="text"
              value={formData.deposite}
              onChange={(e) => {
                handleFormData("deposite", e.target.value);
              }}
              placeholder="₹ Deposite"
            />
          </label>
          {errors.deposite && (
            <div className="property-form-2-error">{errors.deposite}</div>
          )}
          <label>
            Price Per Month:
            <input
              type="text"
              value={formData.pricePerMonth}
              onChange={(e) => {
                handleFormData("pricePerMonth", e.target.value);
              }}
              placeholder="₹ Price per month"
            />
          </label>
          {errors.pricePerMonth && (
            <div className="property-form-2-error">{errors.pricePerMonth}</div>
          )}
        </div>
      )}

      {formData.sellType === "Sell" && (
        <div className="property-form-2-price-details-section">
          <h3 className="property-form-2-property-form-heading2">
            Price Details
          </h3>
          <label>
            Area sq.ft.:
            <input
              type="text"
              value={formData.areaSqft}
              onChange={(e) => {
                handleFormData("areaSqft", e.target.value);
              }}
              placeholder="₹ Area sq.ft."
            />
          </label>
          {errors.areaSqft && (
            <div className="property-form-2-error">{errors.areaSqft}</div>
          )}
          <label>
            Expected Price:
            <input
              type="text"
              value={formData.expectedPrice}
              onChange={(e) => {
                handleFormData("expectedPrice", e.target.value);
              }}
              placeholder="₹ Expected Price"
            />
          </label>
          {errors.expectedPrice && (
            <div className="property-form-2-error">{errors.expectedPrice}</div>
          )}
          <label>
            Price per sq.ft.:
            <input
              type="text"
              value={formData.pricePerSqFt}
              onChange={(e) => {
                handleFormData("pricePerSqFt", e.target.value);
              }}
              placeholder="₹ Price per sq.ft."
            />
          </label>
          {errors.pricePerSqFt && (
            <div className="property-form-2-error">{errors.pricePerSqFt}</div>
          )}
          <label className="property-form-2-checkbox-label">
            <input
              type="checkbox"
              checked={formData.isAllInclusive}
              onChange={(e) => {
                handleFormData("isAllInclusive", e.target.checked);
              }}
            />
            All inclusive price?
          </label>
          <label className="property-form-2-checkbox-label">
            <input
              type="checkbox"
              checked={formData.isPriceNegotiable}
              onChange={(e) => {
                handleFormData("isPriceNegotiable", e.target.checked);
              }}
            />
            Price Negotiable
          </label>
          <label className="property-form-2-checkbox-label">
            <input
              type="checkbox"
              checked={formData.isTaxchargeExc}
              onChange={(e) => {
                handleFormData("isTaxchargeExc", e.target.checked);
              }}
            />
            Tax and Govt.charges excluded
          </label>
        </div>
      )}

      <div className="property-form-2-unique-features-section">
        <h3 className="property-form-2-property-form-heading2">
          What makes your property unique (Optional)
        </h3>
        <p>Adding description will increase your listing visibility</p>
        <textarea
          value={formData.uniqueFeatures}
          onChange={(e) => {
            handleFormData("uniqueFeatures", e.target.value);
          }}
          rows={4}
          cols={50}
          placeholder="Share some details about your property like spacious rooms, well-maintained facilities."
        />
      </div>

      <button className="property-form-2-next-button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

PropertyForm2.propTypes = {
  handleStepInc: PropTypes.func,
  formData: PropTypes.object,
  handleFormData: PropTypes.func,
};

export default PropertyForm2;
