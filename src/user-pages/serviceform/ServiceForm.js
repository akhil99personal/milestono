import { useState, useEffect } from "react";
import "./ServiceForm.css";
import { Locate, MapPin, User2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const steps = [
  {
    id: 1,
    title: "Profile Information",
    description: "Basic details and professional info",
    icon: <User2 color="blue" />,
    fields: [
      "vendorImage",
      "vendorName",
      "serviceCategory",
      "serviceRoll",
      "vendorDescription",
      "experience",
    ],
  },
  {
    id: 2,
    title: "Service Location",
    description: "Where you provide services",
    icon: <MapPin color="blue" />,
    fields: ["state", "district", "subDistrict", "address"],
  },
  {
    id: 3,
    title: "Documents & Verification",
    description: "Upload required documents",
    icon: "📄",
    fields: [
      "certificateImage",
      "adharImage",
      "panImage",
      "adharNumber",
      "panNumber",
    ],
  },
  {
    id: 4,
    title: "Banking & Final Details",
    description: "Payment information and agreement",
    icon: "💳",
    fields: ["accountNo", "ifsccode", "detailsRead"],
  },
];

const serviceCategories = [
  "Property Legal",
  "Plumbing",
  "Electrician",
  "Construction",
  "Painting",
  "Cleaning",
  "Interior Designing",
  "Pest Control",
  "Appliance Repair",
  "Carpentry",
  "Landscaping",
  "Courier"
];

const experienceOptions = ["1", "2", "3", "4", "5+"];

export default function ServiceForm() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorImage: null,
    adharImage: null,
    panImage: null,
    certificateImage: null,
    vendorName: "",
    serviceRoll: "",
    vendorDescription: "",
    experience: "",
    district: "",
    state: "",
    subDistrict: "",
    address: "",
    serviceCategory: "",
    accountNo: "",
    ifsccode: "",
    adharNumber: "",
    panNumber: "",
    detailsRead: false,
  });
  const [errors, setErrors] = useState({});
  const [imageSrc, setImageSrc] = useState(null);

  const getUserServiceDetail = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      toast.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/userservicedetail`, {
        headers: {
          Authorization: token,
        },
      });
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching user service details:" + error);
    }
  };

  useEffect(() => {
    getUserServiceDetail();
  }, []);

  const calculateProgress = () => {
    const currentStepFields = steps[currentStep - 1].fields;
    const completedFields = currentStepFields.filter((field) => {
      if (field === "detailsRead") return formData[field];
      if (
        field === "vendorImage" ||
        field === "adharImage" ||
        field === "certificateImage"
      ) {
        return formData[field] !== null;
      }
      return formData[field] && formData[field].toString().trim() !== "";
    });
    return Math.round(
      (completedFields.length / currentStepFields.length) * 100,
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [fieldName]: file }));

    if (fieldName === "vendorImage" && file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const validateCurrentStep = () => {
    const currentStepFields = steps[currentStep - 1].fields;
    const newErrors = {};

    currentStepFields.forEach((field) => {
      if (field === "panImage" || field === "panNumber") return;

      if (field === "detailsRead" && !formData[field]) {
        newErrors[field] = "You must agree to the terms and conditions";
      } else if (
        (field === "vendorImage" ||
          field === "adharImage" ||
          field === "certificateImage") &&
        !formData[field]
      ) {
        newErrors[field] = "This file is required";
      } else if (field === "adharNumber") {
        const adharPattern = /^\d{12}$/;
        if (!formData[field] || !adharPattern.test(formData[field])) {
          newErrors[field] = "Invalid Aadhar Card number (12 digits required)";
        }
      } else if (
        field !== "vendorImage" &&
        field !== "adharImage" &&
        field !== "certificateImage" &&
        field !== "detailsRead"
      ) {
        if (!formData[field] || formData[field].toString().trim() === "") {
          newErrors[field] = "This field is required";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("auth");
      if (!token) {
        console.error("No auth token found");
        return;
      }
      const data = new FormData();

      data.append(
        "formData",
        JSON.stringify({
          vendorName: formData.vendorName,
          serviceRoll: formData.serviceRoll,
          vendorDescription: formData.vendorDescription,
          experience: formData.experience,
          district: formData.district,
          state: formData.state,
          subDistrict: formData.subDistrict,
          address: formData.address,
          serviceCategory: formData.serviceCategory,
          accountNo: formData.accountNo,
          ifsccode: formData.ifsccode,
          adharNumber: formData.adharNumber,
          panNumber: formData.panNumber,
          detailsRead: formData.detailsRead,
        }),
      );

      if (formData.vendorImage instanceof File)
        data.append("vendorImage", formData.vendorImage);
      else data.append("vendorImage", null);

      if (formData.adharImage instanceof File)
        data.append("adharImage", formData.adharImage);
      else data.append("adharImage", null);

      if (formData.panImage instanceof File)
        data.append("panImage", formData.panImage);
      else data.append("panImage", null);

      if (formData.certificateImage instanceof File)
        data.append("certificateImage", formData.certificateImage);
      else data.append("certificateImage", null);

      await axios.post(`${BASE_URL}/api/vendors`, data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Vendor Data Updated successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const FileUploadArea = ({
    fieldName,
    label,
    accept = "image/*,.pdf",
    required = true,
  }) => (
    <div className="service-form-file-upload-container">
      <label className="service-form-label">
        {label} {required && <span className="service-form-required">*</span>}
      </label>
      <div
        className={`service-form-upload-area ${
          formData[fieldName] ? "service-form-upload-success" : ""
        } ${errors[fieldName] ? "service-form-upload-error" : ""}`}
        onClick={() => document.getElementById(fieldName).click()}
      >
        <input
          id={fieldName}
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(e, fieldName)}
          className="service-form-hidden"
        />
        <div className="service-form-upload-content">
          {formData[fieldName] ? (
            <>
              <div className="service-form-upload-icon service-form-upload-success-icon">
                ✓
              </div>
              <p className="service-form-upload-filename">
                {formData[fieldName].name}
              </p>
              <p className="service-form-upload-success-text">
                File uploaded successfully
              </p>
            </>
          ) : (
            <>
              <div className="service-form-upload-icon">📁</div>
              <p className="service-form-upload-text">
                Click to upload {label.toLowerCase()}
              </p>
              <p className="service-form-upload-subtext">
                Supports images and PDF files
              </p>
            </>
          )}
        </div>
      </div>
      {errors[fieldName] && (
        <p className="service-form-error-message">
          <span className="service-form-error-icon">⚠️</span>
          {errors[fieldName]}
        </p>
      )}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="service-form-step-content">
            <div className="service-form-profile-section">
              <div className="service-form-profile-upload-wrapper">
                <div
                  className="service-form-profile-image-container"
                  onClick={() =>
                    document.getElementById("profile-upload").click()
                  }
                >
                  <img
                    src={
                      imageSrc ||
                      formData.vendorImage ||
                      "https://www.nuflowerfoods.com/wp-content/uploads/2024/09/person-dummy.jpg"
                    }
                    alt="Profile"
                    className="service-form-profile-image"
                  />
                  <div className="service-form-profile-overlay">
                    <span className="service-form-camera-icon">📷</span>
                  </div>
                </div>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "vendorImage")}
                  className="service-form-hidden"
                />
              </div>
              <p className="service-form-profile-text">
                Click to upload profile photo
              </p>
              {errors.vendorImage && (
                <p className="service-form-error-message">
                  {errors.vendorImage}
                </p>
              )}
            </div>

            <div className="service-form-grid">
              <div className="service-form-field">
                <label className="service-form-label" htmlFor="vendorName">
                  Full Name <span className="service-form-required">*</span>
                </label>
                <input
                  id="vendorName"
                  name="vendorName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.vendorName}
                  onChange={handleInputChange}
                  className={`service-form-input ${errors.vendorName ? "service-form-input-error" : ""}`}
                />
                {errors.vendorName && (
                  <p className="service-form-error-message">
                    {errors.vendorName}
                  </p>
                )}
              </div>

              <div className="service-form-field">
                <label className="service-form-label" htmlFor="serviceCategory">
                  Service Category{" "}
                  <span className="service-form-required">*</span>
                </label>
                <select
                  id="serviceCategory"
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={(e) =>
                    handleSelectChange("serviceCategory", e.target.value)
                  }
                  className={`service-form-select ${errors.serviceCategory ? "service-form-input-error" : ""}`}
                >
                  <option value="">Select a category</option>
                  {serviceCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.serviceCategory && (
                  <p className="service-form-error-message">
                    {errors.serviceCategory}
                  </p>
                )}
              </div>
            </div>

            <div className="service-form-field">
              <label className="service-form-label" htmlFor="serviceRoll">
                Professional Role{" "}
                <span className="service-form-required">*</span>
              </label>
              <input
                id="serviceRoll"
                name="serviceRoll"
                type="text"
                placeholder="e.g., Senior Electrician, Construction Manager"
                value={formData.serviceRoll}
                onChange={handleInputChange}
                className={`service-form-input ${errors.serviceRoll ? "service-form-input-error" : ""}`}
              />
              {errors.serviceRoll && (
                <p className="service-form-error-message">
                  {errors.serviceRoll}
                </p>
              )}
            </div>

            <div className="service-form-field">
              <label className="service-form-label" htmlFor="vendorDescription">
                Professional Description{" "}
                <span className="service-form-required">*</span>
              </label>
              <textarea
                id="vendorDescription"
                name="vendorDescription"
                placeholder="Describe your expertise, specializations, and what makes you unique..."
                value={formData.vendorDescription}
                onChange={handleInputChange}
                rows={4}
                className={`service-form-textarea ${errors.vendorDescription ? "service-form-input-error" : ""}`}
              />
              {errors.vendorDescription && (
                <p className="service-form-error-message">
                  {errors.vendorDescription}
                </p>
              )}
            </div>

            <div className="service-form-field">
              <label className="service-form-label">
                Years of Experience{" "}
                <span className="service-form-required">*</span>
              </label>
              <div className="service-form-experience-options">
                {experienceOptions.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, experience: value }))
                    }
                    className={`service-form-experience-btn ${
                      formData.experience === value
                        ? "service-form-experience-btn-active"
                        : ""
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              {errors.experience && (
                <p className="service-form-error-message">
                  {errors.experience}
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="service-form-step-content">
            <div className="service-form-grid service-form-grid-three">
              <div className="service-form-field">
                <label className="service-form-label" htmlFor="state">
                  State <span className="service-form-required">*</span>
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`service-form-input ${errors.state ? "service-form-input-error" : ""}`}
                />
                {errors.state && (
                  <p className="service-form-error-message">{errors.state}</p>
                )}
              </div>

              <div className="service-form-field">
                <label className="service-form-label" htmlFor="district">
                  District <span className="service-form-required">*</span>
                </label>
                <input
                  id="district"
                  name="district"
                  type="text"
                  placeholder="District"
                  value={formData.district}
                  onChange={handleInputChange}
                  className={`service-form-input ${errors.district ? "service-form-input-error" : ""}`}
                />
                {errors.district && (
                  <p className="service-form-error-message">
                    {errors.district}
                  </p>
                )}
              </div>

              <div className="service-form-field">
                <label className="service-form-label" htmlFor="subDistrict">
                  Sub District <span className="service-form-required">*</span>
                </label>
                <input
                  id="subDistrict"
                  name="subDistrict"
                  type="text"
                  placeholder="Sub District"
                  value={formData.subDistrict}
                  onChange={handleInputChange}
                  className={`service-form-input ${errors.subDistrict ? "service-form-input-error" : ""}`}
                />
                {errors.subDistrict && (
                  <p className="service-form-error-message">
                    {errors.subDistrict}
                  </p>
                )}
              </div>
            </div>

            <div className="service-form-field">
              <label className="service-form-label" htmlFor="address">
                Complete Address{" "}
                <span className="service-form-required">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your complete address where you provide services"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className={`service-form-textarea ${errors.address ? "service-form-input-error" : ""}`}
              />
              {errors.address && (
                <p className="service-form-error-message">{errors.address}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="service-form-step-content">
            <div className="service-form-grid">
              <FileUploadArea
                fieldName="certificateImage"
                label="Professional Certificate"
              />
              <FileUploadArea fieldName="adharImage" label="Aadhar Card" />
            </div>

            <FileUploadArea
              fieldName="panImage"
              label="GST Receipt"
              required={false}
            />

            <div className="service-form-grid">
              <div className="service-form-field">
                <label className="service-form-label" htmlFor="adharNumber">
                  Aadhar Card Number{" "}
                  <span className="service-form-required">*</span>
                </label>
                <input
                  id="adharNumber"
                  name="adharNumber"
                  type="text"
                  placeholder="Enter 12-digit Aadhar number"
                  value={formData.adharNumber}
                  onChange={handleInputChange}
                  maxLength={12}
                  className={`service-form-input ${errors.adharNumber ? "service-form-input-error" : ""}`}
                />
                {errors.adharNumber && (
                  <p className="service-form-error-message">
                    {errors.adharNumber}
                  </p>
                )}
              </div>

              <div className="service-form-field">
                <label className="service-form-label" htmlFor="panNumber">
                  GST Number (Optional)
                </label>
                <input
                  id="panNumber"
                  name="panNumber"
                  type="text"
                  placeholder="Enter GST number"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className="service-form-input"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="service-form-step-content">
            <div className="service-form-grid">
              <div className="service-form-field">
                <label className="service-form-label" htmlFor="accountNo">
                  Account Number{" "}
                  <span className="service-form-required">*</span>
                </label>
                <input
                  id="accountNo"
                  name="accountNo"
                  type="text"
                  placeholder="Enter account number"
                  value={formData.accountNo}
                  onChange={handleInputChange}
                  className={`service-form-input ${errors.accountNo ? "service-form-input-error" : ""}`}
                />
                {errors.accountNo && (
                  <p className="service-form-error-message">
                    {errors.accountNo}
                  </p>
                )}
              </div>

              <div className="service-form-field">
                <label className="service-form-label" htmlFor="ifsccode">
                  IFSC Code <span className="service-form-required">*</span>
                </label>
                <input
                  id="ifsccode"
                  name="ifsccode"
                  type="text"
                  placeholder="Enter IFSC code"
                  value={formData.ifsccode}
                  onChange={handleInputChange}
                  className={`service-form-input ${errors.ifsccode ? "service-form-input-error" : ""}`}
                />
                {errors.ifsccode && (
                  <p className="service-form-error-message">
                    {errors.ifsccode}
                  </p>
                )}
              </div>
            </div>

            <div className="service-form-agreement-card">
              <div className="service-form-checkbox-container">
                <input
                  id="detailsRead"
                  type="checkbox"
                  checked={formData.detailsRead}
                  onChange={handleInputChange}
                  name="detailsRead"
                  className={`service-form-checkbox ${errors.detailsRead ? "service-form-checkbox-error" : ""}`}
                />
                <div className="service-form-checkbox-content">
                  <label
                    htmlFor="detailsRead"
                    className="service-form-checkbox-label"
                  >
                    I confirm that all information provided is accurate
                  </label>
                  <p className="service-form-checkbox-description">
                    By checking this box, you agree to our terms and conditions
                    and confirm that all the information provided is accurate
                    and complete.
                  </p>
                </div>
              </div>
              {errors.detailsRead && (
                <p className="service-form-error-message">
                  {errors.detailsRead}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="service-form-container">
      <div className="service-form-header">
        <h1 className="service-form-title">Service Provider Registration</h1>
        <p className="service-form-subtitle">
          Join our network of trusted professionals
        </p>
      </div>

      <div className="service-form-layout">
        <div className="service-form-sidebar">
          <div className="service-form-sidebar-card">
            <div className="service-form-sidebar-header">
              <h3 className="service-form-sidebar-title">
                Registration Progress
              </h3>
              <p className="service-form-sidebar-description">
                Complete all steps to register
              </p>
            </div>
            <div className="service-form-steps">
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className={`service-form-step ${isActive ? "service-form-step-active" : ""} ${
                      isCompleted ? "service-form-step-completed" : ""
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className="service-form-step-icon">
                      {isCompleted ? "✓" : step.id}
                    </div>
                    <div className="service-form-step-content">
                      <p className="service-form-step-title">{step.title}</p>
                      <p className="service-form-step-description">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="service-form-progress-section">
                <div className="service-form-progress-header">
                  <span className="service-form-progress-label">
                    Step Progress
                  </span>
                  <span className="service-form-progress-percentage">
                    {calculateProgress()}%
                  </span>
                </div>
                <div className="service-form-progress-bar">
                  <div
                    className="service-form-progress-fill"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="service-form-main">
          <div className="service-form-main-card">
            <div className="service-form-main-header">
              <div className="service-form-main-icon">
                <span>{steps[currentStep - 1].icon}</span>
              </div>
              <div className="service-form-main-title-section">
                <h2 className="service-form-main-title">
                  Step {currentStep}: {steps[currentStep - 1].title}
                </h2>
                <p className="service-form-main-description">
                  {steps[currentStep - 1].description}
                </p>
              </div>
            </div>
            <div className="service-form-main-content">
              {renderStepContent()}
            </div>
          </div>

          <div className="service-form-navigation">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="service-form-btn service-form-btn-secondary"
            >
              <span>← Previous</span>
            </button>

            {currentStep === steps.length ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !formData.detailsRead}
                className="service-form-btn service-form-btn-primary service-form-btn-submit"
              >
                {loading ? (
                  <>
                    <div className="service-form-spinner"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Update Application</span>
                    <span>✓</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="service-form-btn service-form-btn-primary"
              >
                <span>Next</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>

        <div className="service-form-help-sidebar">
          <div className="service-form-help-cards">
            <div className="service-form-help-card">
              <div className="service-form-help-header">
                <span className="service-form-help-icon">❓</span>
                <h3 className="service-form-help-title">Need Help?</h3>
              </div>
              <div className="service-form-help-content">
                <p className="service-form-help-text">
                  Having trouble with registration? Our support team is here to
                  help.
                </p>
                <a
                  className="service-form-help-btn"
                  href="/contact-us"
                  style={{ textDecoration: "none" }}
                >
                  Contact Support
                </a>
              </div>
            </div>

            <div className="service-form-help-card">
              <div className="service-form-help-header">
                <span className="service-form-help-icon">⭐</span>
                <h3 className="service-form-help-title">Why Join Us?</h3>
              </div>
              <div className="service-form-help-content">
                <div className="service-form-benefit">
                  <span className="service-form-benefit-icon">🛡️</span>
                  <div className="service-form-benefit-content">
                    <p className="service-form-benefit-title">
                      Verified Platform
                    </p>
                    <p className="service-form-benefit-description">
                      Trusted by thousands
                    </p>
                  </div>
                </div>
                <div className="service-form-benefit">
                  <span className="service-form-benefit-icon">🏆</span>
                  <div className="service-form-benefit-content">
                    <p className="service-form-benefit-title">
                      Professional Growth
                    </p>
                    <p className="service-form-benefit-description">
                      Expand your business
                    </p>
                  </div>
                </div>
                <div className="service-form-benefit">
                  <span className="service-form-benefit-icon">💳</span>
                  <div className="service-form-benefit-content">
                    <p className="service-form-benefit-title">
                      Secure Payments
                    </p>
                    <p className="service-form-benefit-description">
                      Get paid on time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-form-help-card">
              <div className="service-form-help-header">
                <span className="service-form-help-icon">💡</span>
                <h3 className="service-form-help-title">Registration Tips</h3>
              </div>
              <div className="service-form-help-content">
                <div className="service-form-tips">
                  <p>• Upload clear, high-quality documents</p>
                  <p>• Provide accurate contact information</p>
                  <p>• Write a detailed service description</p>
                  <p>• Double-check all entered details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
