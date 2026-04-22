import React, { useEffect, useState } from "react";
import "./Profile.css";
import Sidebar from "./components/Sidebar";
import axios from "axios";
const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [specializations, setSpecializations] = useState([
    "Residential",
    "Commercial",
    "Luxury",
  ]);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [isAddingSpecialization, setIsAddingSpecialization] = useState(false);
  const [newDoc, setNewDoc] = useState(null);
  const [formData, setFormData] = useState({
    profile: null,
    logo: null,
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
  });
  const [profileFile, setProfileFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const fetchAgentProfile = async () => {
    const token = localStorage.getItem("auth");
    try {
      const res = await axios.get(`${BASE_URL}/api/verified-agent`, {
        headers: { Authorization: token },
      });

      const data = res.data;

      setFormData({
        profile: data.profile || "",
        logo: data.logo || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        dateOfBirth: data.dateOfBirth || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        bio: data.bio || "",
        licenseNumber: data.licenseNumber || "",
        licenseExpiry: data.licenseExpiry || "",
        yearsOfExperience: data.yearsOfExperience || "",
        agency: data.agency || "",
        achievements: data.achievements || "",
      });
      setSpecializations(data.specializations || []);
      if (data.documents && data.documentNames) {
        const loadedDocs = data.documentNames.map((name, idx) => ({
          id: idx + 1,
          name: name.split(".")[0],
          type: name.split(".").pop().toUpperCase(),
          uploadDate: new Date(
            data.updatedAt || data.createdAt,
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          base64: data.documents[idx],
        }));
        setDocuments(loadedDocs);
      }
    } catch (err) {
      console.error("Error fetching agent data:", err);
    }
  };
  useEffect(() => {
    fetchAgentProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("auth");
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (profileFile) {
      data.append("profile", profileFile);
    }

    if (logoFile) {
      data.append("logo", logoFile);
    }

    data.append("specializations", JSON.stringify(specializations));
    try {
      const response = await axios.post(
        `${BASE_URL}/api/verified-agent`,
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      alert(response.data.message);
      fetchAgentProfile();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }

    if (newDoc) {
      const data = new FormData();
      data.append("documents", newDoc);

      try {
        const response = await axios.post(
          `${BASE_URL}/api/append-documents`,
          data,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        alert(response.data.message);
        fetchAgentProfile();
        setNewDoc(null);
        setIsEditing(false);
      } catch (err) {
        console.error(err);
        alert("Error saving profile");
      }
    }
  };

  const handleAddSpecialization = () => {
    if (newSpecialization.trim() !== "") {
      setSpecializations([...specializations, newSpecialization.trim()]);
      setNewSpecialization("");
      setIsAddingSpecialization(false);
    }
  };

  const handleRemoveSpecialization = (index) => {
    const updatedSpecializations = [...specializations];
    updatedSpecializations.splice(index, 1);
    setSpecializations(updatedSpecializations);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewDoc(file);
    if (file) {
      const newDocument = {
        id: documents.length + 1,
        name: file.name.split(".")[0],
        type: file.name.split(".").pop().toUpperCase(),
        uploadDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setDocuments([...documents, newDocument]);
    }
  };

  return (
    <div className="agent-dashboard-container">
      <Sidebar />
      <div className="agent-dashboard-main-content">
        <div className="agent-profile-profile-header">
          <h1>Agent Profile</h1>
          <p className="agent-profile-subtitle">
            Manage your personal and professional information
          </p>
        </div>

        <div className="agent-profile-profile-container">
          <div className="agent-profile-profile-sidebar">
            <div className="agent-profile-profile-overview">
              <h2>Profile Overview</h2>
              <p className="agent-profile-overview-subtitle">
                Your public agent profile
              </p>

              <div className="agent-profile-profile-avatar">
                <div className="agent-profile-avatar-placeholder">
                  {formData.profile ? (
                    <img
                      src={formData.profile}
                      alt={formData.firstName}
                      className="agent-profile-icon"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="agent-profile-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  )}
                </div>
              </div>

              <h2 className="agent-profile-profile-name">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="agent-profile-profile-title">
                Senior Real Estate Agent
              </p>

              <div className="agent-profile-specialization-tags">
                {specializations.map((spec, index) => (
                  <span key={index} className="agent-profile-tag">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="agent-profile-contact-info">
                <div className="agent-profile-contact-item">
                  <span className="agent-profile-icon agent-profile-email-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="agent-profile-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <span>{formData.email}</span>
                </div>
                <div className="agent-profile-contact-item">
                  <span className="agent-profile-icon agent-profile-phone-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="agent-profile-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  <span>{formData.phone}</span>
                </div>
                <div className="agent-profile-contact-item">
                  <span className="agent-profile-icon agent-profile-location-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="agent-profile-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <span>
                    {formData.city}, {formData.state}
                  </span>
                </div>
              </div>

              <button
                className="agent-profile-edit-profile-btn"
                onClick={() => {
                  setIsEditing(true);
                  setActiveTab("personal");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="agent-profile-btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Profile
              </button>
            </div>
          </div>

          <div className="agent-profile-profile-content">
            <div className="agent-profile-tabs">
              <button
                className={`agent-profile-tab ${activeTab === "personal" ? "agent-profile-active" : ""}`}
                onClick={() => setActiveTab("personal")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="agent-profile-tab-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Personal Info
              </button>
              <button
                className={`agent-profile-tab ${activeTab === "professional" ? "agent-profile-active" : ""}`}
                onClick={() => setActiveTab("professional")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="agent-profile-tab-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                Professional
              </button>
              <button
                className={`agent-profile-tab ${activeTab === "documents" ? "agent-profile-active" : ""}`}
                onClick={() => setActiveTab("documents")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="agent-profile-tab-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Documents
              </button>
            </div>

            {activeTab === "personal" && (
              <div className="agent-profile-tab-content">
                <div className="agent-profile-section-header">
                  <h2>Personal Information</h2>
                  <p className="agent-profile-section-subtitle">
                    Update your personal details
                  </p>
                </div>

                <div className="agent-profile-form-section">
                  <div className="agent-profile-form-group agent-profile-profile-picture">
                    <label>Profile Picture</label>
                    <div className="agent-profile-profile-picture-container">
                      <div className="agent-profile-profile-picture-placeholder">
                        {formData.profile ? (
                          <img
                            src={formData.profile}
                            alt={formData.firstName}
                            className="agent-profile-icon"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="agent-profile-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        )}
                      </div>
                      <label className="agent-profile-upload-picture-btn">
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setProfileFile(file);
                            }
                          }}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-btn-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Upload New Picture
                      </label>
                    </div>
                    <label>Logo</label>
                    <div className="agent-profile-profile-picture-container">
                      <div className="agent-profile-profile-picture-placeholder">
                        {formData.logo ? (
                          <img
                            src={formData.logo}
                            alt={formData.firstName}
                            className="agent-profile-icon"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="agent-profile-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        )}
                      </div>
                      <label className="agent-profile-upload-picture-btn">
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setLogoFile(file);
                            }
                          }}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-btn-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Upload Logo
                      </label>
                    </div>
                  </div>

                  <div className="agent-profile-form-row">
                    <div className="agent-profile-form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="agent-profile-form-input"
                      />
                    </div>
                    <div className="agent-profile-form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="agent-profile-form-input"
                      />
                    </div>
                  </div>

                  <div className="agent-profile-form-row">
                    <div className="agent-profile-form-group">
                      <label htmlFor="email">Email</label>
                      <div className="agent-profile-input-with-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-input-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          disabled={true}
                          className="agent-profile-form-input agent-profile-with-icon"
                        />
                      </div>
                    </div>
                    <div className="agent-profile-form-group">
                      <label htmlFor="phone">Phone</label>
                      <div className="agent-profile-input-with-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-input-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="agent-profile-form-input agent-profile-with-icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="agent-profile-form-row">
                    <div className="agent-profile-form-group">
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                      <div className="agent-profile-input-with-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-input-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <input
                          type="text"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="agent-profile-form-input agent-profile-with-icon"
                        />
                      </div>
                    </div>
                    <div className="agent-profile-form-group">
                      <label htmlFor="address">Address</label>
                      <div className="agent-profile-input-with-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-input-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="agent-profile-form-input agent-profile-with-icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="agent-profile-form-row">
                    <div className="agent-profile-form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="agent-profile-form-input"
                      />
                    </div>
                    <div className="agent-profile-form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="agent-profile-form-input"
                      />
                    </div>
                  </div>

                  <div className="agent-profile-form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="agent-profile-form-textarea"
                    ></textarea>
                  </div>

                  <div className="agent-profile-form-actions">
                    <button className="agent-profile-cancel-btn">Cancel</button>
                    <button
                      className="agent-profile-save-btn"
                      onClick={handleSaveChanges}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="agent-profile-btn-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "professional" && (
              <div className="agent-profile-tab-content">
                <div className="agent-profile-section-header">
                  <h2>Professional Information</h2>
                  <p className="agent-profile-section-subtitle">
                    Your professional qualifications and experience
                  </p>
                </div>

                <div className="agent-profile-form-section">
                  <div className="agent-profile-form-row">
                    <div className="agent-profile-form-group">
                      <label htmlFor="licenseNumber">License Number</label>
                      <div className="agent-profile-input-with-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-input-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <input
                          type="text"
                          id="licenseNumber"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className="agent-profile-form-input agent-profile-with-icon"
                        />
                      </div>
                    </div>
                    <div className="agent-profile-form-group">
                      <label htmlFor="licenseExpiry">License Expiry</label>
                      <div className="agent-profile-input-with-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-input-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <input
                          type="text"
                          id="licenseExpiry"
                          name="licenseExpiry"
                          value={formData.licenseExpiry}
                          onChange={handleInputChange}
                          className="agent-profile-form-input agent-profile-with-icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="agent-profile-form-row">
                    <div className="agent-profile-form-group">
                      <label htmlFor="yearsOfExperience">
                        Years of Experience
                      </label>
                      <div className="agent-profile-input-with-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-input-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <input
                          type="text"
                          id="yearsOfExperience"
                          name="yearsOfExperience"
                          value={formData.yearsOfExperience}
                          onChange={handleInputChange}
                          className="agent-profile-form-input agent-profile-with-icon"
                        />
                      </div>
                    </div>
                    <div className="agent-profile-form-group">
                      <label htmlFor="agency">Agency</label>
                      <div className="agent-profile-input-with-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-input-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="7"
                            width="20"
                            height="14"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <input
                          type="text"
                          id="agency"
                          name="agency"
                          value={formData.agency}
                          onChange={handleInputChange}
                          className="agent-profile-form-input agent-profile-with-icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="agent-profile-form-group">
                    <label>Specializations</label>
                    <div className="agent-profile-specializations-container">
                      {specializations.map((spec, index) => (
                        <div
                          key={index}
                          className="agent-profile-specialization-badge"
                        >
                          {spec}
                          <span
                            className="agent-profile-remove-badge"
                            onClick={() => handleRemoveSpecialization(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="agent-profile-badge-icon"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </span>
                        </div>
                      ))}

                      {isAddingSpecialization ? (
                        <div className="agent-profile-add-specialization-input">
                          <input
                            type="text"
                            value={newSpecialization}
                            onChange={(e) =>
                              setNewSpecialization(e.target.value)
                            }
                            placeholder="Enter specialization"
                            className="agent-profile-form-input"
                          />
                          <div className="agent-profile-specialization-actions">
                            <button
                              onClick={handleAddSpecialization}
                              className="agent-profile-add-spec-btn"
                            >
                              Add
                            </button>
                            <button
                              onClick={() => setIsAddingSpecialization(false)}
                              className="agent-profile-cancel-spec-btn"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="agent-profile-add-specialization-btn"
                          onClick={() => setIsAddingSpecialization(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="agent-profile-btn-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          Add More
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="agent-profile-form-group">
                    <label htmlFor="achievements">Achievements & Awards</label>
                    <textarea
                      id="achievements"
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleInputChange}
                      rows="4"
                      className="agent-profile-form-textarea"
                    ></textarea>
                  </div>

                  <div className="agent-profile-form-actions">
                    <button className="agent-profile-cancel-btn">Cancel</button>
                    <button
                      className="agent-profile-save-btn"
                      onClick={handleSaveChanges}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="agent-profile-btn-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="agent-profile-tab-content">
                <div className="agent-profile-section-header">
                  <h2>Documents & Licenses</h2>
                  <p className="agent-profile-section-subtitle">
                    Upload and manage your professional documents
                  </p>
                </div>

                <div className="agent-profile-documents-section">
                  {documents.map((doc) => (
                    <div key={doc.id} className="agent-profile-document-item">
                      <div className="agent-profile-document-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-doc-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        {doc.type}
                      </div>
                      <div className="agent-profile-document-info">
                        <h3>{doc.name}</h3>
                        <p>Uploaded on {doc.uploadDate}</p>
                      </div>
                      <button
                        className="agent-profile-view-document-btn"
                        onClick={() => {
                          const newTab = window.open();
                          newTab.document.write(
                            `<iframe src="${doc.base64}" frameborder="0" style="width:100%;height:100%;"></iframe>`,
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="agent-profile-btn-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        View
                      </button>
                    </div>
                  ))}

                  <div className="agent-profile-upload-document-area">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="agent-profile-upload-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p className="agent-profile-upload-text">
                      Upload a new document
                    </p>
                    <p className="agent-profile-upload-format">
                      PDF, JPG, PNG up to 10MB
                    </p>
                    <input
                      type="file"
                      id="document-upload"
                      className="agent-profile-file-input"
                      onChange={handleFileUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="document-upload"
                      className="agent-profile-select-file-btn"
                    >
                      Select File
                    </label>
                  </div>
                </div>
                <div className="agent-profile-form-actions">
                  <button className="agent-profile-cancel-btn">Cancel</button>
                  <button
                    className="agent-profile-save-btn"
                    onClick={handleSaveChanges}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="agent-profile-btn-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
