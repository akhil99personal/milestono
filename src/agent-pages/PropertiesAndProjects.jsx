"use client";

import { useEffect, useRef, useState } from "react";
import {
  Eye,
  Filter,
  MapPin,
  MessageSquare,
  Plus,
  Search,
  Star,
} from "lucide-react";
import "./PropertiesAndProjects.css";
import Sidebar from "./components/Sidebar";
import dummyImg from "../images/dummyImage.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PropertiesProjects = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("properties");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [addNewTab, setAddNewTab] = useState("project");
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    status: "",
    developer: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    units: "",
    minPrice: "",
    maxPrice: "",
    possessionDate: "",
    progress: "",
    rating: "",
    description: "",
    features: [],
    images: [],
  });
  const fileInputRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleFileSelectClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const featureId = id.split("-")[1];
    setFormData((prevData) => ({
      ...prevData,
      features: checked
        ? [...prevData.features, featureId]
        : prevData.features.filter((feature) => feature !== featureId),
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem({
      ...editItem,
      [name]: value,
    });
  };

  const handleEditCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const featureId = id.split("-")[1];
    setEditItem((prevData) => ({
      ...prevData,
      features: checked
        ? [...prevData.features, featureId]
        : prevData.features.filter((feature) => feature !== featureId),
    }));
  };

  const handleEditFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEditItem({
      ...editItem,
      images: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("auth");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("formData", JSON.stringify(formData));
      formData.images.forEach((file) => {
        payload.append("images", file);
      });

      const response = await axios.post(`${BASE_URL}/api/project`, payload, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;

      window.alert("Project created successfully!");
      setFormData({
        title: "",
        type: "",
        status: "",
        developer: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        units: "",
        minPrice: "",
        maxPrice: "",
        possessionDate: "",
        progress: "",
        rating: "",
        description: "",
        features: [],
        images: [],
      });
    } catch (err) {
      console.error("Error submitting project:", err);
      window.alert("An error occurred. Please try again.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("auth");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("formData", JSON.stringify(editItem));
      editItem.images.forEach((file) => {
        if (file instanceof File) {
          payload.append("images", file);
        }
      });

      const response = await axios.put(
        `${BASE_URL}/api/project/${editItem._id}`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const result = response.data;

      if (response.status === 201) {
        alert("Project edited successfully!");
        setEditItem(null);
      } else {
        alert(result.error || "Failed to create project");
      }
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error submitting project:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const properties1 = [
    {
      id: 1,
      title: "Luxury Villa 1",
      address: "123 Main St, City 1",
      price: "10 Lakh",
      beds: 3,
      baths: 2,
      area: 2000,
      views: 130,
      inquiries: 12,
      image: dummyImg,
    },
    {
      id: 2,
      title: "Cozy Cottage",
      address: "456 Country Rd, City 2",
      price: "3 Lakh",
      beds: 2,
      baths: 2,
      area: 1500,
      views: 95,
      inquiries: 8,
      image: dummyImg,
    },
    {
      id: 3,
      title: "Urban Apartment",
      address: "789 City Ave, City 3",
      price: "25 Lakh",
      beds: 2,
      baths: 1,
      area: 1100,
      views: 180,
      inquiries: 15,
      image: dummyImg,
    },
    {
      id: 4,
      title: "Modern Condo",
      address: "321 Skyline Blvd, City 4",
      price: "1 Lakh",
      beds: 3,
      baths: 2,
      area: 1700,
      views: 140,
      inquiries: 10,
      image: dummyImg,
    },
    {
      id: 5,
      title: "Beach House",
      address: "654 Ocean Dr, City 5",
      price: "23 Lakh",
      beds: 4,
      baths: 3,
      area: 2500,
      views: 220,
      inquiries: 18,
      image: dummyImg,
    },
    {
      id: 6,
      title: "Mountain Retreat",
      address: "987 Hilltop Rd, City 6",
      price: "65 Lakh",
      beds: 3,
      baths: 2,
      area: 2100,
      views: 160,
      inquiries: 14,
      image: dummyImg,
    },
    {
      id: 7,
      title: "Suburban Home",
      address: "159 Suburb Ln, City 7",
      price: "1 Lakh",
      beds: 3,
      baths: 2,
      area: 1900,
      views: 110,
      inquiries: 9,
      image: dummyImg,
    },
    {
      id: 8,
      title: "Downtown Loft",
      address: "753 Central St, City 8",
      price: "1 Crore",
      beds: 2,
      baths: 2,
      area: 1300,
      views: 200,
      inquiries: 16,
      image: dummyImg,
    },
  ];

  const formatPrice = (price) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)}Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)}L`;
    return price.toLocaleString("en-IN");
  };

  const formatPossessionDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleString("default", { month: "long", year: "numeric" });
  };
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(`${BASE_URL}/api/my-project`, {
        headers: { Authorization: token },
      });
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:" + error);
    }
  };

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(`${BASE_URL}/api/shared-property`, {
        headers: { Authorization: token },
      });
      setProperties(response.data.properties);
    } catch (error) {
      console.error("Error fetching projects:" + error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchProperties();
  }, []);

  const avl_features = [
    { id: "ac", label: "Air Conditioning" },
    { id: "balcony", label: "Balcony" },
    { id: "security", label: "Security" },
    { id: "pool", label: "Swimming Pool" },
    { id: "gym", label: "Gym" },
    { id: "elevator", label: "Elevator" },
    { id: "garden", label: "Garden" },
    { id: "parking", label: "Parking" },
    { id: "furnished", label: "Furnished" },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddNewTabChange = (tab) => {
    setAddNewTab(tab);
  };

  const handleCheckboxFeatured = async (propertyId) => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.put(
        `${BASE_URL}/api/featured-property/${propertyId}`,
        {},
        {
          headers: { Authorization: token },
        },
      );
      if (response.data?.status) {
        fetchProperties();
      }
    } catch (error) {
      console.error("Error updating property:" + error);
    }
  };

  return (
    <div className="agent-dashboard-container">
      <Sidebar />
      <div className="agent-dashboard-main-content">
        <div className="agent-properties-projects-header">
          <div>
            <h1 className="agent-properties-projects-h1">
              Properties & Projects
            </h1>
            <p className="agent-properties-projects-subtitle">
              Manage your properties and projects
            </p>
          </div>
          <button
            className="agent-properties-projects-btn agent-properties-projects-btn-primary"
            onClick={() => {
              handleTabChange("add-new");
            }}
          >
            <Plus className="agent-properties-projects-icon" /> Add New
          </button>
        </div>

        <div className="agent-properties-projects-tabs-container">
          <div className="agent-properties-projects-tabs-header">
            <div className="agent-properties-projects-tabs-list">
              <button
                className={`agent-properties-projects-tab-trigger ${activeTab === "properties" ? "active" : ""}`}
                onClick={() => handleTabChange("properties")}
              >
                Properties
              </button>
              <button
                className={`agent-properties-projects-tab-trigger ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => handleTabChange("projects")}
              >
                Projects
              </button>
              <button
                className={`agent-properties-projects-tab-trigger ${activeTab === "add-new" ? "active" : ""}`}
                onClick={() => handleTabChange("add-new")}
              >
                Add New
              </button>
            </div>
            {activeTab !== "add-new" && (
              <div className="agent-properties-projects-search-filter">
                <div className="agent-properties-projects-search-container">
                  <Search className="agent-properties-projects-search-icon" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab === "properties" ? "Properties" : "Projects"}...`}
                    className="agent-properties-projects-search-input"
                  />
                </div>
                <button className="agent-properties-projects-btn agent-properties-projects-btn-outline agent-properties-projects-btn-icon">
                  <Filter className="agent-properties-projects-icon-sm" />
                </button>
              </div>
            )}
          </div>

          <div
            className={`agent-properties-projects-tab-content ${activeTab === "properties" ? "active" : ""}`}
          >
            <div className="agent-properties-projects-card-grid">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="agent-properties-projects-card"
                >
                  <input
                    type="checkbox"
                    className="agent-properties-topright-checkbox"
                    checked={property.featured}
                    onChange={() => {
                      handleCheckboxFeatured(property._id);
                    }}
                  />
                  <div className="agent-properties-projects-card-image-container">
                    <img
                      src={property.uploadedPhotos?.[0] || dummyImg}
                      alt={property.heading}
                      className="agent-properties-projects-card-image"
                    />
                  </div>
                  <div className="agent-properties-projects-card-content">
                    <div className="agent-properties-projects-card-header">
                      <div>
                        <h3 className="agent-properties-projects-h3">
                          {property.heading}
                        </h3>
                        <div className="agent-properties-projects-card-address">
                          <MapPin className="agent-properties-projects-icon-sm" />
                          {property.landmark}, {property.city}
                        </div>
                      </div>
                      <span className="agent-properties-projects-card-price">
                        ₹{" "}
                        {property.expectedPrice
                          ? property.expectedPrice
                          : property.pricePerMonth}
                      </span>
                    </div>
                    <div className="agent-properties-projects-property-features">
                      <div className="agent-properties-projects-feature">
                        <span className="agent-properties-projects-feature-value">
                          {property.bedrooms}
                        </span>{" "}
                        beds
                      </div>
                      <div className="agent-properties-projects-feature">
                        <span className="agent-properties-projects-feature-value">
                          {property.bathrooms}
                        </span>{" "}
                        baths
                      </div>
                      <div className="agent-properties-projects-feature">
                        <span className="agent-properties-projects-feature-value">
                          {property.balconies}
                        </span>{" "}
                        balcony
                      </div>
                    </div>
                    <div className="agent-properties-projects-card-footer">
                      <div className="agent-properties-projects-card-stats">
                        <div className="agent-properties-projects-stat">
                          <Eye className="agent-properties-projects-icon-sm" />
                          <span>{10} views</span>
                        </div>
                        <div className="agent-properties-projects-stat">
                          <MessageSquare className="agent-properties-projects-icon-sm" />
                          <span>{10} inquiries</span>
                        </div>
                      </div>
                      <div className="agent-properties-projects-card-actions">
                        <button
                          className="agent-properties-projects-btn agent-properties-projects-btn-outline agent-properties-projects-btn-sm"
                          onClick={() => {
                            setEditItem(property);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button className="agent-properties-projects-btn agent-properties-projects-btn-primary agent-properties-projects-btn-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`agent-properties-projects-tab-content ${activeTab === "projects" ? "active" : ""}`}
          >
            <div className="agent-properties-projects-card-grid">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="agent-properties-projects-card"
                >
                  <div className="agent-properties-projects-card-image-container">
                    <div className="agent-properties-projects-project-status">
                      {project.status}
                    </div>
                    <div className="agent-properties-projects-project-rating">
                      <Star className="agent-properties-projects-icon-xs" />
                      {project.rating}
                    </div>
                    <img
                      src={project.images?.[0] || dummyImg}
                      alt={project.title}
                      className="agent-properties-projects-card-image"
                    />
                  </div>
                  <div className="agent-properties-projects-card-content">
                    <div className="agent-properties-projects-card-header">
                      <h3 className="agent-properties-projects-h3">
                        {project.title}
                      </h3>
                      <div className="agent-properties-projects-card-address">
                        <MapPin className="agent-properties-projects-icon-sm" />
                        {project.address}, {project.city}
                      </div>
                    </div>
                    <div className="agent-properties-projects-project-details">
                      <div className="agent-properties-projects-project-price">
                        <div className="agent-properties-projects-detail-value">
                          {formatPrice(project.minPrice)} -{" "}
                          {formatPrice(project.maxPrice)}
                        </div>
                        <div className="agent-properties-projects-detail-label">
                          {project.units} units
                        </div>
                      </div>
                      <div className="agent-properties-projects-project-possession">
                        <div className="agent-properties-projects-detail-value">
                          Possession: {formatPossessionDate(project.possession)}
                        </div>
                        <div className="agent-properties-projects-detail-label">
                          {project.progress}% complete
                        </div>
                      </div>
                    </div>
                    <div className="agent-properties-projects-card-footer">
                      <div className="agent-properties-projects-card-stats">
                        <div className="agent-properties-projects-stat">
                          <MessageSquare className="agent-properties-projects-icon-sm" />
                          <span>{10} inquiries</span>
                        </div>
                      </div>
                      <div className="agent-properties-projects-card-actions">
                        <button
                          className="agent-properties-projects-btn agent-properties-projects-btn-outline agent-properties-projects-btn-sm"
                          onClick={() => {
                            setEditItem(project);
                            setIsEditModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button className="agent-properties-projects-btn agent-properties-projects-btn-primary agent-properties-projects-btn-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`agent-properties-projects-tab-content ${activeTab === "add-new" ? "active" : ""}`}
          >
            <div className="agent-properties-projects-add-new-tabs">
              <div className="agent-properties-projects-tabs-list-header">
                <div
                  className="agent-properties-projects-tabs-list"
                  style={{ margin: "1rem 0", width: "max-content" }}
                >
                  <button
                    className={`agent-properties-projects-tab-trigger ${addNewTab === "project" ? "active" : ""}`}
                    onClick={() => handleAddNewTabChange("project")}
                  >
                    Add Project
                  </button>
                  <button
                    className={`agent-properties-projects-tab-trigger ${addNewTab === "property" ? "active" : ""}`}
                    onClick={() => {
                      navigate("/post-property");
                    }}
                  >
                    Add Property
                  </button>
                </div>
              </div>

              <div
                className={`agent-properties-projects-tab-content ${addNewTab === "project" ? "active" : ""}`}
              >
                <div className="agent-properties-projects-form-container">
                  <h2 className="agent-properties-projects-form-title">
                    Add New Project
                  </h2>
                  <p className="agent-properties-projects-form-subtitle">
                    Fill in the details to add a new project listing
                  </p>

                  <div className="agent-properties-projects-form-section">
                    <h3 className="agent-properties-projects-section-title">
                      Project Images
                    </h3>
                    <div className="agent-properties-projects-upload-container">
                      <div
                        className="agent-properties-projects-upload-content"
                        onClick={handleFileSelectClick}
                      >
                        <div className="agent-properties-projects-upload-icon">
                          <Plus className="agent-properties-projects-icon" />
                        </div>
                        <p className="agent-properties-projects-upload-text">
                          Drag and drop your images here
                        </p>
                        <p className="agent-properties-projects-upload-subtext">
                          PNG, JPG, WEBP up to 10MB
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept=".png,.jpg,.jpeg,.webp"
                        onChange={handleFileChange}
                        className="agent-properties-projects-file-input"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                      />
                      <button
                        className="agent-properties-projects-btn agent-properties-projects-btn-outline agent-properties-projects-btn-sm"
                        onClick={handleFileSelectClick}
                      >
                        Select Files
                      </button>
                    </div>
                  </div>

                  <div className="agent-properties-projects-form-sections">
                    <div className="agent-properties-projects-form-section">
                      <h3 className="agent-properties-projects-section-title">
                        Basic Information
                      </h3>
                      <div className="agent-properties-projects-form-grid">
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-title"
                            className="agent-properties-projects-form-label"
                          >
                            Project Title
                          </label>
                          <input
                            id="project-title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. Serene Meadows"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-type"
                            className="agent-properties-projects-form-label"
                          >
                            Project Type
                          </label>
                          <select
                            id="project-type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-select"
                          >
                            <option value="">Select type</option>
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="mixed">Mixed Use</option>
                          </select>
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-status"
                            className="agent-properties-projects-form-label"
                          >
                            Status
                          </label>
                          <select
                            id="project-status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-select"
                          >
                            <option value="">Select status</option>
                            <option value="planning">Planning</option>
                            <option value="under-construction">
                              Under Construction
                            </option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-developer"
                            className="agent-properties-projects-form-label"
                          >
                            Developer
                          </label>
                          <input
                            id="project-developer"
                            name="developer"
                            value={formData.developer}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. ABC Developers"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="agent-properties-projects-form-section">
                      <h3 className="agent-properties-projects-section-title">
                        Location
                      </h3>
                      <div className="agent-properties-projects-form-grid">
                        <div className="agent-properties-projects-form-group agent-properties-projects-full-width">
                          <label
                            htmlFor="project-address"
                            className="agent-properties-projects-form-label"
                          >
                            Address
                          </label>
                          <input
                            id="project-address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. Central District"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-city"
                            className="agent-properties-projects-form-label"
                          >
                            City
                          </label>
                          <input
                            id="project-city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. New York"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-state"
                            className="agent-properties-projects-form-label"
                          >
                            State
                          </label>
                          <input
                            id="project-state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. NY"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-zip"
                            className="agent-properties-projects-form-label"
                          >
                            Zip Code
                          </label>
                          <input
                            id="project-zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. 10001"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-country"
                            className="agent-properties-projects-form-label"
                          >
                            Country
                          </label>
                          <input
                            id="project-country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. USA"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="agent-properties-projects-form-section">
                      <h3 className="agent-properties-projects-section-title">
                        Project Details
                      </h3>
                      <div className="agent-properties-projects-form-grid">
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-units"
                            className="agent-properties-projects-form-label"
                          >
                            Total Units
                          </label>
                          <input
                            id="project-units"
                            name="units"
                            value={formData.units}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. 50"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-min-price"
                            className="agent-properties-projects-form-label"
                          >
                            Minimum Price
                          </label>
                          <input
                            id="project-min-price"
                            name="minPrice"
                            value={formData.minPrice}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. 650000"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-max-price"
                            className="agent-properties-projects-form-label"
                          >
                            Maximum Price
                          </label>
                          <input
                            id="project-max-price"
                            name="maxPrice"
                            value={formData.maxPrice}
                            onChange={handleInputChange}
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. 950000"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-possession"
                            className="agent-properties-projects-form-label"
                          >
                            Possession Date
                          </label>
                          <input
                            id="project-possession"
                            name="possession"
                            value={formData.possession}
                            onChange={handleInputChange}
                            type="date"
                            className="agent-properties-projects-form-input"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-progress"
                            className="agent-properties-projects-form-label"
                          >
                            Construction Progress (%)
                          </label>
                          <input
                            id="project-progress"
                            name="progress"
                            value={formData.progress}
                            onChange={handleInputChange}
                            type="number"
                            min="0"
                            max="100"
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. 30"
                          />
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-rating"
                            className="agent-properties-projects-form-label"
                          >
                            Rating (1-5)
                          </label>
                          <input
                            id="project-rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            className="agent-properties-projects-form-input"
                            placeholder="e.g. 4.5"
                          />
                        </div>
                      </div>
                      <div className="agent-properties-projects-form-group">
                        <label
                          htmlFor="project-description"
                          className="agent-properties-projects-form-label"
                        >
                          Description
                        </label>
                        <textarea
                          id="project-description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="agent-properties-projects-form-textarea"
                          placeholder="Describe the project..."
                        ></textarea>
                      </div>
                    </div>

                    <div className="agent-properties-projects-form-section">
                      <h3 className="agent-properties-projects-section-title">
                        Features & Amenities
                      </h3>
                      <div className="agent-properties-projects-features-grid">
                        {avl_features.map((feature) => (
                          <div
                            key={feature.id}
                            className="agent-properties-projects-checkbox-group"
                          >
                            <input
                              type="checkbox"
                              id={`project-${feature.id}`}
                              className="agent-properties-projects-checkbox"
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor={`project-${feature.id}`}
                              className="agent-properties-projects-checkbox-label"
                            >
                              {feature.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="agent-properties-projects-form-actions">
                    <button
                      className="agent-properties-projects-btn agent-properties-projects-btn-primary"
                      onClick={handleSubmit}
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEditModalOpen && (
          <div className="agent-properties-projects-modal-overlay">
            <div className="agent-properties-projects-modal">
              <div className="agent-properties-projects-modal-header">
                <h2 className="agent-properties-projects-modal-title">
                  Edit {editItem?.title}
                </h2>
                <button
                  className="agent-properties-projects-modal-close"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="agent-properties-projects-modal-content">
                {editItem && (
                  <div className="agent-properties-projects-form-sections">
                    <div className="agent-properties-projects-form-section">
                      <h3 className="agent-properties-projects-section-title">
                        Images
                      </h3>
                      <div className="agent-properties-projects-edit-image-preview">
                        <img
                          src={editItem.images?.[0] || dummyImg}
                          alt={editItem.title}
                        />
                        <div className="agent-properties-projects-upload-container">
                          <div
                            className="agent-properties-projects-upload-content"
                            onClick={handleFileSelectClick}
                          >
                            <div className="agent-properties-projects-upload-icon">
                              <Plus className="agent-properties-projects-icon" />
                            </div>
                            <p className="agent-properties-projects-upload-text">
                              Drag and drop your images here
                            </p>
                            <p className="agent-properties-projects-upload-subtext">
                              PNG, JPG, WEBP up to 10MB
                            </p>
                          </div>
                          <input
                            type="file"
                            multiple
                            accept=".png,.jpg,.jpeg,.webp"
                            onChange={handleEditFileChange}
                            className="agent-properties-projects-file-input"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                          />
                          <button
                            className="agent-properties-projects-btn agent-properties-projects-btn-outline agent-properties-projects-btn-sm"
                            onClick={handleFileSelectClick}
                          >
                            Select Files
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="agent-properties-projects-form-sections">
                      <div className="agent-properties-projects-form-section">
                        <h3 className="agent-properties-projects-section-title">
                          Basic Information
                        </h3>
                        <div className="agent-properties-projects-form-grid">
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-title"
                              className="agent-properties-projects-form-label"
                            >
                              Project Title
                            </label>
                            <input
                              id="project-title"
                              name="title"
                              value={editItem.title}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. Serene Meadows"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-type"
                              className="agent-properties-projects-form-label"
                            >
                              Project Type
                            </label>
                            <select
                              id="project-type"
                              name="type"
                              value={editItem.type}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-select"
                            >
                              <option value="">Select type</option>
                              <option value="residential">Residential</option>
                              <option value="commercial">Commercial</option>
                              <option value="mixed">Mixed Use</option>
                            </select>
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-status"
                              className="agent-properties-projects-form-label"
                            >
                              Status
                            </label>
                            <select
                              id="project-status"
                              name="status"
                              value={editItem.status}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-select"
                            >
                              <option value="">Select status</option>
                              <option value="planning">Planning</option>
                              <option value="under-construction">
                                Under Construction
                              </option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-developer"
                              className="agent-properties-projects-form-label"
                            >
                              Developer
                            </label>
                            <input
                              id="project-developer"
                              name="developer"
                              value={editItem.developer}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. ABC Developers"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="agent-properties-projects-form-section">
                        <h3 className="agent-properties-projects-section-title">
                          Location
                        </h3>
                        <div className="agent-properties-projects-form-grid">
                          <div className="agent-properties-projects-form-group agent-properties-projects-full-width">
                            <label
                              htmlFor="project-address"
                              className="agent-properties-projects-form-label"
                            >
                              Address
                            </label>
                            <input
                              id="project-address"
                              name="address"
                              value={editItem.address}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. Central District"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-city"
                              className="agent-properties-projects-form-label"
                            >
                              City
                            </label>
                            <input
                              id="project-city"
                              name="city"
                              value={editItem.city}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. New York"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-state"
                              className="agent-properties-projects-form-label"
                            >
                              State
                            </label>
                            <input
                              id="project-state"
                              name="state"
                              value={editItem.state}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. NY"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-zip"
                              className="agent-properties-projects-form-label"
                            >
                              Zip Code
                            </label>
                            <input
                              id="project-zip"
                              name="zip"
                              value={editItem.zip}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. 10001"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-country"
                              className="agent-properties-projects-form-label"
                            >
                              Country
                            </label>
                            <input
                              id="project-country"
                              name="country"
                              value={editItem.country}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. USA"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="agent-properties-projects-form-section">
                        <h3 className="agent-properties-projects-section-title">
                          Project Details
                        </h3>
                        <div className="agent-properties-projects-form-grid">
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-units"
                              className="agent-properties-projects-form-label"
                            >
                              Total Units
                            </label>
                            <input
                              id="project-units"
                              name="units"
                              value={editItem.units}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. 50"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-min-price"
                              className="agent-properties-projects-form-label"
                            >
                              Minimum Price
                            </label>
                            <input
                              id="project-min-price"
                              name="minPrice"
                              value={editItem.minPrice}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. 650000"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-max-price"
                              className="agent-properties-projects-form-label"
                            >
                              Maximum Price
                            </label>
                            <input
                              id="project-max-price"
                              name="maxPrice"
                              value={editItem.maxPrice}
                              onChange={handleEditInputChange}
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. 950000"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-possession"
                              className="agent-properties-projects-form-label"
                            >
                              Possession Date
                            </label>
                            <input
                              id="project-possession"
                              name="possession"
                              value={editItem.possession}
                              onChange={handleEditInputChange}
                              type="date"
                              className="agent-properties-projects-form-input"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-progress"
                              className="agent-properties-projects-form-label"
                            >
                              Construction Progress (%)
                            </label>
                            <input
                              id="project-progress"
                              name="progress"
                              value={editItem.progress}
                              onChange={handleEditInputChange}
                              type="number"
                              min="0"
                              max="100"
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. 30"
                            />
                          </div>
                          <div className="agent-properties-projects-form-group">
                            <label
                              htmlFor="project-rating"
                              className="agent-properties-projects-form-label"
                            >
                              Rating (1-5)
                            </label>
                            <input
                              id="project-rating"
                              name="rating"
                              value={editItem.rating}
                              onChange={handleEditInputChange}
                              type="number"
                              min="1"
                              max="5"
                              step="0.1"
                              className="agent-properties-projects-form-input"
                              placeholder="e.g. 4.5"
                            />
                          </div>
                        </div>
                        <div className="agent-properties-projects-form-group">
                          <label
                            htmlFor="project-description"
                            className="agent-properties-projects-form-label"
                          >
                            Description
                          </label>
                          <textarea
                            id="project-description"
                            name="description"
                            value={editItem.description}
                            onChange={handleEditInputChange}
                            className="agent-properties-projects-form-textarea"
                            placeholder="Describe the project..."
                          ></textarea>
                        </div>
                      </div>

                      <div className="agent-properties-projects-form-section">
                        <h3 className="agent-properties-projects-section-title">
                          Features & Amenities
                        </h3>
                        <div className="agent-properties-projects-features-grid">
                          {avl_features.map((feature) => (
                            <div
                              key={feature.id}
                              className="agent-properties-projects-checkbox-group"
                            >
                              <input
                                type="checkbox"
                                id={`project-${feature.id}`}
                                className="agent-properties-projects-checkbox"
                                onChange={handleEditCheckboxChange}
                                checked={editItem?.features.includes(
                                  feature.id,
                                )}
                              />
                              <label
                                htmlFor={`project-${feature.id}`}
                                className="agent-properties-projects-checkbox-label"
                              >
                                {feature.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="agent-properties-projects-form-actions">
                      <button
                        className="agent-properties-projects-btn agent-properties-projects-btn-outline"
                        onClick={() => setIsEditModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="agent-properties-projects-btn agent-properties-projects-btn-primary"
                        onClick={handleEditSubmit}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesProjects;
