import React, { useEffect, useState } from "react";
import PropertyForm1 from "./propertyform/PropertyForm1";
import PropertyForm2 from "./propertyform/PropertyForm2";
import PropertyForm3 from "./propertyform/PropertyForm3";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserHeader from "./UserHeader";
import toast from "react-hot-toast";
import "./PropertyForm.css";
import MainNavBar from "./MainNavBar";

const PropertyForm = () => {
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [maxStep, setMaxStep] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    heading: "",
    sellType: "",
    propertyCategory: "",
    oldProperty: "",
    propertyContains: [],
    amenities: [],
    furnitures: [],
    city: "",
    landmark: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    ownership: "",
    expectedPrice: "",
    pricePerSqFt: "",
    deposite: "",
    pricePerMonth: "",
    isAllInclusive: false,
    isPriceNegotiable: false,
    isTaxchargeExc: false,
    uniqueFeatures: "",
    areaSqft: "",
    latitude: 18.52097398044019,
    longitude: 73.86017831259551,
    sellerType: "",
    reservedParking: "",
    selectedFurnishing: "",
    selectedRoom: "",
  });
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handleFormData = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleStepInc = () => {
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!disabled) {
      const formDataObj = new FormData();
      formDataObj.append("formData", JSON.stringify(formData));
      uploadedPhotos.forEach((photo) => {
        formDataObj.append("images", photo);
      });

      try {
        const token = localStorage.getItem("auth");
        if (!token) {
          console.error("No auth token found");
          return;
        }

        const response = await axios.post(
          `${BASE_URL}/api/property_details`,
          formDataObj,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        toast.success(response.data.message);
        navigate("/");
      } catch (error) {
        toast.error("Error submitting property details:" + error);
      }
    }
  };

  const checkPropertyEligibility = async () => {
    try {
      const token = localStorage.getItem("auth");
      if (!token) {
        console.error("No auth token found");
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/api/check-num-of-properties`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setDisabled(!response.data.canPost);
    } catch (error) {
      console.error("Error checking property eligibility:" + error);
    }
  };

  useEffect(() => {
    setStep(1);
    checkPropertyEligibility();
  }, []);

  useEffect(() => {
    if (step > maxStep) {
      setMaxStep(step);
    }
  }, [step]);

  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  return (
    <div className="property-form-page">
      <MainNavBar />
      <div className="property-form-form">
        <div className="property-form-step-container">
          <div
            className={`property-form-step property-form-step1 ${step >= 1 && "property-form-active"}`}
            onClick={() => {
              if (maxStep >= 1 && step !== 1) {
                goToStep(1);
              }
            }}
          >
            <span>Step 1</span>
          </div>
          <div
            className={`property-form-step property-form-step2 ${step >= 2 && "property-form-active"}`}
            onClick={() => {
              if (maxStep >= 2 && step !== 2) {
                goToStep(2);
              }
            }}
          >
            <span>Step 2</span>
          </div>
          <div
            className={`property-form-step property-form-step3 ${step >= 3 && "property-form-active"}`}
            onClick={() => {
              if (maxStep >= 3 && step !== 3) {
                goToStep(3);
              }
            }}
          >
            <span>Step 3</span>
          </div>
        </div>
        {step === 3 ? (
          <PropertyForm3
            formData={formData}
            handleFormData={handleFormData}
            uploadedPhotos={uploadedPhotos}
            setUploadedPhotos={setUploadedPhotos}
            handleSubmit={handleSubmit}
            disabled={disabled}
          />
        ) : step === 2 ? (
          <PropertyForm2
            handleStepInc={handleStepInc}
            formData={formData}
            handleFormData={handleFormData}
          />
        ) : (
          <PropertyForm1
            handleStepInc={handleStepInc}
            formData={formData}
            handleFormData={handleFormData}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyForm;
