import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PropertyForm1.css";

function PropertyForm1({ handleStepInc, formData, handleFormData }) {
  const [errors, setErrors] = useState({});

  const sellType = ["Sell", "Rent", "PG"];
  const oldProperty = ["New Launch", "Under Construction", "Ready to move"];
  const sellerType = ["Owner", "Builder", "Dealer", "Feature Dealer"];

  const propertyContains = [
    "Flats/Apartment",
    "Independent House/Villa",
    "Independent/Builder Floor",
    "Plot/Land",
    "1RK/Studio Apartment",
    "Serviced Apartment",
    "Farmhouse",
    "Other",
  ];

  const amenities = [
    "Car Parking",
    "CCTV",
    "Guard",
    "Gym",
    "Club House",
    "Water Supply",
    "Lift",
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
    const newErrors = {};
    if (!formData.heading) {
      newErrors.heading = "Please fill property name";
    }
    if (!formData.sellType) {
      newErrors.sellType = "Please select a property type.";
    }
    if (!formData.sellerType) {
      newErrors.sellerType = "Please select a seller type.";
    }
    if (!formData.oldProperty) {
      newErrors.oldProperty = "Please select the property age.";
    }
    if (!formData.propertyCategory) {
      newErrors.propertyCategory = "Please select a property category.";
    }
    if (formData.propertyContains.length === 0) {
      newErrors.propertyContains = "Please select at least one property type.";
    }
    if (formData.amenities.length === 0) {
      newErrors.amenities = "Please select at least one amenity.";
    }
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      handleStepInc();
    }
  };

  return (
    <div>
      <div className="property-form-1-property-form-heading">
        <label>
          Property Name:
          <input
            type="text"
            value={formData.heading}
            onChange={(e) => {
              handleFormData("heading", e.target.value);
            }}
            placeholder="Enter Property Name"
          />
        </label>
      </div>
      {errors.heading && (
        <div className="property-form-1-error">{errors.heading}</div>
      )}
      <div className="property-form-1-property-form-heading2">
        What Kind Of property do you have?
      </div>
      <div className="property-form-1-options">
        {sellType.map((option) => (
          <div
            key={option}
            className={`property-form-1-option property-form-1-width-30 ${formData.sellType === option ? "property-form-1-selected" : ""}`}
            onClick={() => handleFormData("sellType", option)}
          >
            {option}
          </div>
        ))}
      </div>
      {errors.sellType && (
        <div className="property-form-1-error">{errors.sellType}</div>
      )}

      <div className="property-form-1-property-form-heading">Seller Type?</div>
      <div className="property-form-1-options">
        {sellerType.map((option) => (
          <div
            key={option}
            className={`property-form-1-option property-form-1-width-30 ${formData.sellerType === option ? "property-form-1-selected" : ""}`}
            onClick={() => handleFormData("sellerType", option)}
          >
            {option}
          </div>
        ))}
      </div>
      {errors.sellerType && (
        <div className="property-form-1-error">{errors.sellerType}</div>
      )}

      <div className="property-form-1-property-form-heading">
        How many years Property OLD?
      </div>
      <div className="property-form-1-options">
        {oldProperty.map((option) => (
          <div
            key={option}
            className={`property-form-1-option property-form-1-width-30 ${formData.oldProperty === option ? "property-form-1-selected" : ""}`}
            onClick={() => handleFormData("oldProperty", option)}
          >
            {option}
          </div>
        ))}
      </div>
      {errors.oldProperty && (
        <div className="property-form-1-error">{errors.oldProperty}</div>
      )}

      <hr />
      <div className="property-form-1-property-categories">
        <div className="property-form-1-category residential">
          <div className="property-form-1-category-type">
            <div
              className={`property-form-1-category-title ${formData.propertyCategory === "Residential" ? "property-form-1-selectedcat" : ""}`}
              onClick={() => handleFormData("propertyCategory", "Residential")}
            >
              Residential
            </div>
            <div
              className={`property-form-1-category-title ${formData.propertyCategory === "Commercial" ? "property-form-1-selectedcat" : ""}`}
              onClick={() => handleFormData("propertyCategory", "Commercial")}
            >
              Commercial
            </div>
          </div>
          <hr />
        </div>
      </div>
      {errors.propertyCategory && (
        <div className="property-form-1-error">{errors.propertyCategory}</div>
      )}

      <h3 className="property-form-1-property-form-heading2">
        Property Services
      </h3>
      <div className="property-form-1-options">
        {propertyContains.map((option) => (
          <div
            key={option}
            className={`property-form-1-option ${formData.propertyContains.includes(option) ? "property-form-1-selected" : ""}`}
            onClick={() => handleOptionSelect(option, "propertyContains")}
          >
            {option}
          </div>
        ))}
      </div>
      {errors.propertyContains && (
        <div className="property-form-1-error">{errors.propertyContains}</div>
      )}

      {formData.propertyContains.length > 0 && (
        <div className="property-form-1-category property-form-1-commercial">
          <div className="property-form-1-category-title">Your Selected</div>
        </div>
      )}
      <div className="property-form-1-selected-options">
        {formData.propertyContains.map((option) => (
          <div key={option} className="property-form-1-selected-option">
            {option}{" "}
            <span
              className="property-form-1-remove-option"
              onClick={() => handleOptionRemove(option, "propertyContains")}
            >
              ×
            </span>
          </div>
        ))}
      </div>

      <h3 className="property-form-1-property-form-heading2">Amenities</h3>
      <div className="property-form-1-options">
        {amenities.map((option) => (
          <div
            key={option}
            className={`property-form-1-option ${formData.amenities.includes(option) ? "property-form-1-selected" : ""}`}
            onClick={() => handleOptionSelect(option, "amenities")}
          >
            {option}
          </div>
        ))}
      </div>
      {errors.amenities && (
        <div className="property-form-1-error">{errors.amenities}</div>
      )}

      {formData.amenities.length > 0 && (
        <div className="property-form-1-category property-form-1-commercial">
          <div className="property-form-1-category-title">Your Selected</div>
        </div>
      )}
      <div className="property-form-1-selected-options">
        {formData.amenities.map((option) => (
          <div key={option} className="property-form-1-selected-option">
            {option}{" "}
            <span
              className="property-form-1-remove-option"
              onClick={() => handleOptionRemove(option, "amenities")}
            >
              ×
            </span>
          </div>
        ))}
      </div>

      <button className="property-form-1-next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

PropertyForm1.propTypes = {
  handleStepInc: PropTypes.func,
  formData: PropTypes.shape({
    heading: PropTypes.string,
    sellType: PropTypes.string,
    oldProperty: PropTypes.string,
    propertyCategory: PropTypes.string,
    propertyContains: PropTypes.arrayOf(PropTypes.string),
    amenities: PropTypes.arrayOf(PropTypes.string),
  }),
  handleFormData: PropTypes.func,
};
export default PropertyForm1;
