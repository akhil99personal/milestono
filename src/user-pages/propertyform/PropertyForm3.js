import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./PropertyForm3.css";

const PropertyForm3 = ({
  formData,
  handleFormData,
  handleSubmit,
  uploadedPhotos,
  setUploadedPhotos,
  disabled,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const furnishingOptions = ["Unfurnished", "Semi-Furnished", "Furnished"];
  const roomOptions = ["Pooja Room", "Servant Room", "Study Room", "Others"];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedPhotos([...uploadedPhotos, ...files]);
  };

  const validateForm = () => {
    const errors = {};
    if (uploadedPhotos.length === 0) {
      errors.photos = "At least one photo is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitForm = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <div>
      <h2 className="property-form-3-property-form-heading">
        Add Photos & Other Details
      </h2>
      <div className="property-form-3-add-photo-section">
        <h3 className="property-form-3-property-form-heading2">
          Add Property Photos
        </h3>
        <div
          className="property-form-3-add-photos drop-zone"
          onDrop={(e) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files);
            setUploadedPhotos([...uploadedPhotos, ...files]);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <button onClick={() => document.getElementById("file-input").click()}>
            + Add Photos
          </button>
          <p>Click or drag and drop photos here</p>
          <input
            id="file-input"
            type="file"
            accept=".png, .jpg, .jpeg, .gif, .webp, .heic, .heif"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        {uploadedPhotos.length > 0 && (
          <div className="property-form-3-uploaded-photos">
            <h4>Uploaded Photos:</h4>
            <ul>
              {uploadedPhotos.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        {formErrors.photos && (
          <div className="property-form-3-error">{formErrors.photos}</div>
        )}
      </div>
      <div className="property-form-3-add-photo-section">
        <h3 className="property-form-3-property-form-heading2">
          Other Rooms (Optional)
        </h3>
        <div className="property-form-3-options">
          {roomOptions.map((option) => (
            <div
              key={option}
              className={`property-form-3-option ${formData.selectedRoom === option ? "property-form-3-selected" : ""}`}
              onClick={() => handleFormData("selectedRoom", option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="property-form-3-add-photo-section">
        <h3 className="property-form-3-property-form-heading2">
          Furnishing (Optional)
        </h3>
        <div className="property-form-3-options">
          {furnishingOptions.map((option) => (
            <div
              key={option}
              className={`property-form-3-option ${formData.selectedFurnishing === option ? "property-form-3-selected" : ""}`}
              onClick={() => handleFormData("selectedFurnishing", option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="property-form-3-add-photo-section">
        <h3 className="property-form-3-property-form-heading2">
          Reserved Parking (Optional)
        </h3>
        <div className="property-form-3-parking-list">
          <label>
            <input
              type="radio"
              name="parking"
              value="Covered Parking"
              checked={formData.reservedParking === "Covered Parking"}
              onChange={() =>
                handleFormData("reservedParking", "Covered Parking")
              }
            />
            <p>Covered Parking</p>
          </label>
          <label>
            <input
              type="radio"
              name="parking"
              value="Open Parking"
              checked={formData.reservedParking === "Open Parking"}
              onChange={() => handleFormData("reservedParking", "Open Parking")}
            />
            <p>Open Parking</p>
          </label>
        </div>
      </div>
      <div
        className={`property-form-3-continue-button ${disabled ? "property-form-3-disabled-btn" : ""}`}
      >
        <button
          onClick={() => {
            if (disabled) {
              setShowModal(true);
            } else {
              handleSubmitForm();
            }
          }}
        >
          Continue
        </button>
      </div>
      {showModal && (
        <div className="property-form-3-modal-overlay">
          <div className="property-form-3-modal-content">
            <p>
              You have reached the maximum number of properties you can post.
              Please upgrade to a premium account.
            </p>
            <div className="property-form-3-modal-buttons">
              <button
                onClick={() => {
                  navigate("/premium");
                }}
              >
                OK
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PropertyForm3.propTypes = {
  formData: PropTypes.shape({
    selectedRoom: PropTypes.string,
    selectedFurnishing: PropTypes.string,
    reservedParking: PropTypes.string,
  }),
  handleFormData: PropTypes.func,
  handleSubmit: PropTypes.func,
  uploadedPhotos: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  setUploadedPhotos: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PropertyForm3;
