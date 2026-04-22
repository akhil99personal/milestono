import React, { useState } from "react";
import "./ProfileModal.css";

const ProfileModal = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    bio: "",
    licenseNumber: "",
    licenseExpiry: "",
    yearsOfExperience: "",
    agency: "",
    achievements: "",
    specializations: [],
    profile: null,
    documents: [],
  });

  const [newSpecialization, setNewSpecialization] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "documents") {
      setFormData((prev) => ({ ...prev, documents: [...files] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      setFormData((prev) => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()],
      }));
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (index) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    onSubmit(formData);
    e.preventDefault();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Add Agent Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
            <input
              name="licenseNumber"
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
            />
            <input
              name="licenseExpiry"
              placeholder="License Expiry"
              value={formData.licenseExpiry}
              onChange={handleChange}
            />
            <input
              name="yearsOfExperience"
              placeholder="Years of Experience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
            />
            <input
              name="agency"
              placeholder="Agency"
              value={formData.agency}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
          <textarea
            name="achievements"
            placeholder="Achievements"
            value={formData.achievements}
            onChange={handleChange}
          ></textarea>

          <div className="specialization-section">
            <label>Specializations</label>
            <div className="specialization-add">
              <input
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                placeholder="Add specialization"
              />
              <button type="button" onClick={addSpecialization}>
                Add
              </button>
            </div>
            <div className="specialization-list">
              {formData.specializations.map((spec, index) => (
                <span key={index} className="specialization-item">
                  {spec}
                  <button
                    type="button"
                    onClick={() => removeSpecialization(index)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="file-upload">
            <label>Profile Picture</label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="file-upload">
            <label>Documents</label>
            <input
              type="file"
              name="documents"
              multiple
              accept="application/pdf,image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
