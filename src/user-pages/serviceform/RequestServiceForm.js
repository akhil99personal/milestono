import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import "./RequestServiceForm.css";
import MainNavBar from "../MainNavBar";
import FadeLoader from "react-spinners/FadeLoader";

const ProblemForm = ({ serviceCategory }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    landmark: "",
    category: serviceCategory,
    image: null,
    address: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
    status: "requested",
    price: "",
    otp: "",
    coordinates: [0, 0],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.landmark.trim()) formErrors.landmark = "Address is required";
    if (!formData.description.trim()) formErrors.description = "Problem description is required";
    if (!formData.image) formErrors.image = "Problem image is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const detectLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        console.error("Geolocation not supported");
        return reject();
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setFormData((prev) => ({ ...prev, coordinates: coords }));
          resolve(coords);
        },
        (error) => {
          console.error("Error detecting location:", error);
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    detectLocation().catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("auth");
    if (!token) {
      alert("You must be logged in.");
      navigate("/login");
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setLoading(true);

    try {
      if (formData.coordinates[0] === 0 && formData.coordinates[1] === 0) {
        await detectLocation();
      }

      const data = new FormData();
      data.append("formData", JSON.stringify({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        address: formData.address,
        status: formData.status,
        price: formData.price,
        otp: formData.otp,
        landmark: formData.landmark,
        coordinates: formData.coordinates,
      }));
      data.append("serviceImage", formData.image);

      const response = await axios.post(`${BASE_URL}/api/services`, data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Service created successfully!");
      navigate(`/servicemans/${response.data.serviceId}`);

      // Reset form
      setFormData({
        name: "",
        description: "",
        landmark: "",
        category: serviceCategory,
        image: null,
        address: "",
        district: "",
        city: "",
        state: "",
        pincode: "",
        status: "requested",
        price: "",
        otp: "",
        coordinates: [0, 0],
      });
    } catch (err) {
      console.error("Error creating service:", err);
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="request-service-form-request-service">
      {loading ? (
        <div className="loader-container">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <>
          <MainNavBar />
          <div className="request-service-form-property-form request-service-form-servicesform">
            <h2>Fill the Form to Proceed</h2>

            <div className="request-service-form-serviceformgroup">
              <label className="request-service-form-form-label" htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Problem Name"
                value={formData.name}
                onChange={handleInputChange}
                className="request-service-form-form-input"
              />
              {errors.name && <span className="request-service-form-error">{errors.name}</span>}
            </div>

            <div className="request-service-form-serviceformgroup">
              <label className="request-service-form-form-label" htmlFor="landmark">Address :</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                placeholder="Enter your Landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                className="request-service-form-form-input"
              />
              {errors.landmark && <span className="request-service-form-error">{errors.landmark}</span>}
            </div>

            <div className="request-service-form-serviceformgroup">
              <label className="request-service-form-form-label" htmlFor="image">Upload Photo of Your Problem :</label>
              <div
                className="request-service-form-add-photos request-service-form-drop-zone"
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  if (files.length > 0) {
                    setFormData((prev) => ({ ...prev, image: files[0] }));
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("problem-image-upload").click();
                  }}
                >
                  + Add Photo of Problem
                </button>
                <p>Click or drag and drop photo here</p>
                <input
                  id="problem-image-upload"
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif, .webp, .heic, .heif"
                  onChange={(e) => handleFileChange(e)}
                  style={{ display: "none" }}
                />
              </div>

              {formData.image && (
                <div className="request-service-form-uploaded-photos">
                  <h4>Uploaded Photo :</h4>
                  <ul>{formData.image.name}</ul>
                </div>
              )}
              {errors.image && <span className="request-service-form-error">{errors.image}</span>}
            </div>

            <div className="request-service-form-serviceformgroup">
              <label className="request-service-form-form-label" htmlFor="description">Problem Description :</label>
              <textarea
                id="description"
                name="description"
                placeholder="Explain about your problem"
                value={formData.description}
                onChange={handleInputChange}
                className="request-service-form-form-textarea"
              />
              {errors.description && <span className="request-service-form-error">{errors.description}</span>}
            </div>

            <div className="request-service-form-serviceformgroup request-service-form-btns">
              <button
                type="button"
                className="request-service-form-form-cancel-button request-service-form-red-btn"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    name: "",
                    landmark: "",
                    description: "",
                    image: null,
                  }))
                }
              >
                Reset
              </button>
              <button
                type="submit"
                className="request-service-form-submit-button request-service-form-green-btn"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Upload Problem
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

ProblemForm.propTypes = {
  serviceCategory: PropTypes.string,
};

export default ProblemForm;
