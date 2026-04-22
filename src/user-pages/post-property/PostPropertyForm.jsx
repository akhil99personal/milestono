import React, { useState, useEffect } from "react";
import "./PostPropertyForm.css";
import Footer from "../homepage/Footer";
import MainNavBar from "../MainNavBar";

import MapInput from "../propertyform/MapInput";

import dummyImg from "../../images/contact.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PropertyForm = () => {
  const [defaultAmenty, setDefaultAmenty] = useState([
    "Car Parking",
    "CCTV",
    "Guard",
    "Gym",
    "Club House",
    "Water Supply",
    "Lift",
  ]);
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
    ownerEmail: "",
    ownerPhone: "",
    ownerName: "",
    sameAsProfile: false,
    bathrooms: "",
    balconies: "",
    ownership: "",
    expectedPrice: "",
    pricePerSqFt: "",
    closingDealPercentage: "",
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
    totalFloors: "",
    floorNo: "",
    propertyAge: "",
    carpetArea: "",
    builtUpArea: "",
    superBuiltUpArea: "",
    plotArea: "",
    plotLength: "",
    plotWidth: "",
    parkingAvailable: "",
    coveredParking: "",
    openParking: "",
    poojaRoom: false,
    studyRoom: false,
    servantRoom: false,
    facing: "",
    terrace: false,
    garden: false,
    roadAccess: false,
    roadWidth: "",
    mainRoadTouch: false,
    waterSource: false,
    electricityStatus: false,
    drainage: false,
    frontageWidth: "",
    mainRoadFacing: false,
    cabins: "",
    workstations: "",
    meetingRooms: "",
    washrooms: "",
    ceilingHeight: "",
    truckAccess: false,
    loadingDock: false,
    industrialPower: false,
    powerLoad: "",
    heavyVehicleAccess: false,
    visibility: "",
    totalRooms: "",
    attachedBathrooms: false,
    commonBathrooms: "",
    hallCapacity: "",
    swimmingPool: false,
  });
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  var [currentStep, setCurrentStep] = useState(1);
  const [propertyScore, setPropertyScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const circleRadius = 40;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const strokeDashoffset =
    circleCircumference - (propertyScore / 100) * circleCircumference;
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [maxStep, setMaxStep] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState({
    lat: formData.latitude || 0,
    lng: formData.longitude || 0,
  });
  const [numOfImages, setNumOfImages] = useState(5);
  const [numOfVideos, setNumOfVideos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [newAmenity, setNewAmenity] = useState("");
  const [bulkAdd, setBulkAdd] = useState(false);
  const [checkedOwner, setCheckedOwner] = useState(false);

  const [areaUnit, setAreaUnit] = useState("sq ft");
  const [displayAreas, setDisplayAreas] = useState({
    carpetArea: "",
    builtUpArea: "",
    superBuiltUpArea: "",
    plotArea: "",
  });

  const conversionRates = {
    "sq ft": 1,
    "sq meter": 10.7639,
    "acre": 43560,
    "guntha": 1089
  };

  const handleAreaDisplayChange = (key, value) => {
    setDisplayAreas((prev) => ({ ...prev, [key]: value }));
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const sqftValue = numericValue * conversionRates[areaUnit];
      setFormData((prev) => ({ ...prev, [key]: sqftValue.toFixed(2) }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleAreaUnitChange = (newUnit) => {
    setAreaUnit(newUnit);
    const newDisplayAreas = {};
    ["carpetArea", "builtUpArea", "superBuiltUpArea", "plotArea"].forEach(key => {
      if (formData[key]) {
        const sqftValue = parseFloat(formData[key]);
        if (!isNaN(sqftValue)) {
          newDisplayAreas[key] = (sqftValue / conversionRates[newUnit]).toFixed(2);
        } else {
          newDisplayAreas[key] = "";
        }
      } else {
        newDisplayAreas[key] = "";
      }
    });
    setDisplayAreas((prev) => ({ ...prev, ...newDisplayAreas }));
  };

  const getUserDetail = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/userdetail`, {
        headers: {
          Authorization: token,
        },
      });
      setFormData((prev) => ({ ...prev, ownerEmail: response.data.email, ownerPhone: response.data.phone, ownerName: response.data.fullName }))
    } catch (error) {
      console.error("Error fetching user details:" + error);
    }
  };

  useEffect(() => {
    if (checkedOwner) {
      getUserDetail();
    }
  }, [checkedOwner]);

  const validateForm1 = () => {
    const newErrors = {};
    let isValid = true;
    if (!formData.heading) {
      newErrors.heading = "Please fill property name";
      isValid = false;
    }
    if (!formData.sellType) {
      newErrors.sellType = "Please select a property type.";
      isValid = false;
    }
    if (!formData.ownerEmail) {
      newErrors.ownerEmail = "Please fill owner email";
      isValid = false;
    }
    if (!formData.ownerPhone) {
      newErrors.ownerPhone = "Please fill owner phone";
      isValid = false;
    }
    if (!formData.ownerName) {
      newErrors.ownerName = "Please fill owner name";
      isValid = false;
    }
    if (!formData.sellerType) {
      newErrors.sellerType = "Please select a seller type.";
      isValid = false;
    }
    if (!formData.oldProperty) {
      newErrors.oldProperty = "Please select the property age.";
      isValid = false;
    }
    if (!formData.propertyCategory) {
      newErrors.propertyCategory = "Please select a property category.";
      isValid = false;
    }
    if (formData.propertyContains.length === 0) {
      newErrors.propertyContains = "Please select at least one property type.";
      isValid = false;
    }
    if (formData.amenities.length === 0) {
      newErrors.amenities = "Please select at least one amenity.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const validateForm2 = () => {
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

    const service = formData.propertyContains?.[0] || "";
    const needsRooms = ["Flats/Apartment", "Independent House/Villa", "Independent/Builder Floor", "1RK/Studio Apartment", "Serviced Apartment", "Farmhouse"].includes(service) ||
      ["Guest house", "Banquet halls", "Hotels", "Resorts"].includes(service);

    if (needsRooms && !formData.bedrooms) {
      newErrors.bedrooms = "Number of bedrooms is required.";
      isValid = false;
    }

    if (needsRooms && !formData.bathrooms) {
      newErrors.bathrooms = "Number of bathrooms is required.";
      isValid = false;
    }

    if (needsRooms && !formData.balconies && !["1RK/Studio Apartment", "Guest house", "Banquet halls", "Hotels", "Resorts"].includes(service)) {
      newErrors.balconies = "Number of balconies is required.";
      isValid = false;
    }

    // Ownership is okay to be required generally, or make it conditional? Keep as is if possible.
    if (!formData.ownership && !["Shop", "Office", "Showrooms", "Kiosk", "Warehouse", "Godown", "Factory", "Industrial land", "Industrial plots"].includes(service)) {
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
      const hasAnyArea = formData.areaSqft || formData.carpetArea || formData.builtUpArea || formData.plotArea || formData.superBuiltUpArea;
      if (!hasAnyArea && formData.propertyCategory !== "Commercial") {
        // It's okay, some properties don't strictly enforce it right now to avoid breaking existing forms,
        // but let's enforce if missing
        if (!formData.plotArea && !formData.carpetArea && !formData.builtUpArea) {
          newErrors.areaSqft = "At least one Area field (Carpet/Built-up/Plot) is required.";
          isValid = false;
        }
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
  const validateForm3 = () => {
    let isValid = true;
    const errors = {};
    if (uploadedPhotos.length === 0) {
      errors.photos = "At least one photo is required.";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  useEffect(() => {
    checkPropertyEligibility();
  }, []);

  const handleSubmit = async () => {
    setLoading(true)
    if (!validateForm3()) {
      setLoading(false);
      return
    };
    if (!disabled && formData.ownerEmail !== "") {
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
        setFormData({
          heading: "",
          sellType: "",
          propertyCategory: "",
          oldProperty: "",
          propertyContains: [],
          amenities: [],
          furnitures: [],
          ownerEmail: "",
          ownerPhone: "",
          ownerName: "",
          sameAsProfile: false,
          city: "",
          landmark: "",
          bedrooms: "",
          bathrooms: "",
          balconies: "",
          ownership: "",
          expectedPrice: "",
          pricePerSqFt: "",
          closingDealPercentage: "",
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
          totalFloors: "",
          floorNo: "",
          propertyAge: "",
          carpetArea: "",
          builtUpArea: "",
          superBuiltUpArea: "",
          plotArea: "",
          plotLength: "",
          plotWidth: "",
          parkingAvailable: "",
          coveredParking: "",
          openParking: "",
          poojaRoom: false,
          studyRoom: false,
          servantRoom: false,
          facing: "",
          terrace: false,
          garden: false,
          roadAccess: false,
          roadWidth: "",
          mainRoadTouch: false,
          waterSource: false,
          electricityStatus: false,
          drainage: false,
          frontageWidth: "",
          mainRoadFacing: false,
          cabins: "",
          workstations: "",
          meetingRooms: "",
          washrooms: "",
          ceilingHeight: "",
          truckAccess: false,
          loadingDock: false,
          industrialPower: false,
          powerLoad: "",
          heavyVehicleAccess: false,
          visibility: "",
          totalRooms: "",
          attachedBathrooms: false,
          commonBathrooms: "",
          hallCapacity: "",
          swimmingPool: false,
        });
        toast.success(response.data.message);
        navigate("/");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error submitting property details:" + error);
      }
    }
  };


  const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/heic", "image/heif"];
  const videoTypes = ["video/mp4", "video/webm", "video/ogg", "video/mov", "video/quicktime"];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const currentPhotos = uploadedPhotos.filter(file => imageTypes.includes(file.type));
    const currentVideos = uploadedPhotos.filter(file => videoTypes.includes(file.type));

    let newPhotos = [];
    let newVideos = [];

    files.forEach((file) => {
      if (imageTypes.includes(file.type)) {
        newPhotos.push(file);
      } else if (videoTypes.includes(file.type)) {
        newVideos.push(file);
      }
    });

    const isPhotoUnlimited = numOfImages === -1;
    const isVideoUnlimited = numOfVideos === -1;

    const totalPhotos = currentPhotos.length + newPhotos.length;
    const totalVideos = currentVideos.length + newVideos.length;

    const allowedPhotos = isPhotoUnlimited ? newPhotos.length : Math.max(0, numOfImages - currentPhotos.length);
    const allowedVideos = isVideoUnlimited ? newVideos.length : Math.max(0, numOfVideos - currentVideos.length);

    if ((!isPhotoUnlimited && totalPhotos > numOfImages) || (!isVideoUnlimited && totalVideos > numOfVideos)) {
      alert(`To upload more media, upgrade to a premium account, or stay with the current limits (${numOfImages === -1 ? "Unlimited" : numOfImages} photos, ${numOfVideos === -1 ? "Unlimited" : numOfVideos} videos).`);
    }

    const filteredNewFiles = [
      ...newPhotos.slice(0, allowedPhotos),
      ...newVideos.slice(0, allowedVideos),
    ];

    setUploadedPhotos(prev => [...prev, ...filteredNewFiles]);
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
      setBulkAdd(response.data.bulkUpload);
      setNumOfImages(response.data.numOfImages);
      setNumOfVideos(response.data.numOfVideos);
    } catch (error) {
      console.error("Error checking property eligibility:" + error);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    handleSelection("latitude", location.lat);
    handleSelection("longitude", location.lng);
  };

  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };
          setSelectedLocation(currentLocation);
          handleSelection("latitude", latitude);
          handleSelection("longitude", longitude);
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
  useEffect(() => {
    const area = formData.carpetArea || formData.builtUpArea || formData.plotArea || formData.areaSqft || formData.superBuiltUpArea;
    if (
      area &&
      formData.expectedPrice &&
      parseFloat(area) !== 0
    ) {
      setFormData((prev) => ({
        ...prev,
        pricePerSqFt:
          parseFloat(formData.expectedPrice) / parseFloat(area),
      }));
    }
  }, [formData.areaSqft, formData.carpetArea, formData.builtUpArea, formData.plotArea, formData.superBuiltUpArea, formData.expectedPrice]);

  const nextStep = () => {
    if (currentStep === 1) {
      if (!validateForm1()) return;
    }
    if (currentStep === 2) {
      if (!validateForm2()) return;
    }
    if (currentStep === 3) {
      if (!validateForm3()) return;
    }
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
      setPropertyScore((prevScore) => {
        const newScore = prevScore + 33;
        return newScore > 100 ? 100 : newScore;
      });
      setTimeout(() => {
        window.scrollBy({ top: -100000, behavior: "smooth" });
        document
          .getElementById("post-property-form-mainId")
          .scrollBy({ top: -100000, behavior: "smooth" });
      }, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
      setPropertyScore((prevScore) => {
        const newScore = prevScore - 33;
        return newScore > 100 ? 100 : newScore;
      });
      setTimeout(() => {
        window.scrollBy({ top: -100000, behavior: "smooth" });
        document
          .getElementById("post-property-form-mainId")
          .scrollBy({ top: -100000, behavior: "smooth" });
      }, 0);
    }
  };

  const handleSelection = (key, value, isMultiSelect = false) => {
    setFormData((prev) => {
      if (isMultiSelect) {
        const isSelected = prev[key].includes(value);
        return {
          ...prev,
          [key]: isSelected
            ? prev[key].filter((item) => item !== value)
            : [...prev[key], value],
        };
      } else {
        return { ...prev, [key]: value };
      }
    });
  };

  const renderStepContent = () => {
    const service = formData.propertyContains?.[0] || "";
    const isFlat = ["Flats/Apartment", "Independent/Builder Floor", "Serviced Apartment", "1RK/Studio Apartment"].includes(service);
    const isIndHouse = ["Independent House/Villa"].includes(service);
    const isPlot = ["Plot/Land"].includes(service);
    const isFarmhouse = ["Farmhouse"].includes(service);
    const isShop = ["Shop", "Kiosk"].includes(service);
    const isOffice = ["Office"].includes(service);
    const isWarehouse = ["Warehouse", "Godown"].includes(service);
    const isIndustrial = ["Industrial land", "Industrial plots"].includes(service);
    const isFactory = ["Factory"].includes(service);
    const isShowroom = ["Showrooms"].includes(service);
    const isAgri = ["Agricultural land"].includes(service);
    const isGuestHouse = ["Guest house", "Banquet halls", "Hotels", "Resorts"].includes(service);

    const renderAreaFields = () => (
      <div className="post-property-form-group">
        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>Area Details <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            fontSize: "14px",
          }}
        >
          <select
            value={areaUnit}
            onChange={(e) => handleAreaUnitChange(e.target.value)}
            style={{
              padding: "6px 10px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <option value="sq ft">sq ft</option>
            <option value="sq meter">sq meter</option>
            <option value="acre">acre</option>
            <option value="guntha">guntha</option>
          </select>
        </div></label>
        {(isFlat || isIndHouse || isShop || isOffice || isShowroom || isGuestHouse) && (
          <input type="number" placeholder={`Carpet Area (in ${areaUnit})`} value={displayAreas.carpetArea || ""} onChange={(e) => handleAreaDisplayChange("carpetArea", e.target.value)} />
        )}
        {(isFlat || isIndHouse || isFarmhouse || isShop || isOffice || isShowroom || isFactory || isGuestHouse) && (
          <input type="number" placeholder={`Built-up Area (in ${areaUnit})`} value={displayAreas.builtUpArea || ""} onChange={(e) => handleAreaDisplayChange("builtUpArea", e.target.value)} />
        )}
        {(isFlat) && (
          <input type="number" placeholder={`Super Built-up Area (in ${areaUnit})`} value={displayAreas.superBuiltUpArea || ""} onChange={(e) => handleAreaDisplayChange("superBuiltUpArea", e.target.value)} />
        )}
        {(isIndHouse || isPlot || isWarehouse || isIndustrial || isFactory || isFarmhouse || isAgri) && (
          <input type="number" placeholder={isAgri ? `Area in Acre (in ${areaUnit})` : `Plot / Total Area (in ${areaUnit})`} value={displayAreas.plotArea || ""} onChange={(e) => handleAreaDisplayChange("plotArea", e.target.value)} />
        )}
        {isPlot && (
          <>
            <input type="number" placeholder="Length (ft)" value={formData.plotLength || ""} onChange={(e) => setFormData(p => ({ ...p, plotLength: e.target.value }))} />
            <input type="number" placeholder="Width (ft)" value={formData.plotWidth || ""} onChange={(e) => setFormData(p => ({ ...p, plotWidth: e.target.value }))} />
          </>
        )}
      </div>
    );

    const renderBuildingDetails = () => {
      if (isPlot || isAgri || isIndustrial) return null;
      return (
        <div className="post-property-form-group">
          <label>Building / Structural Details</label>
          {(isFlat || isIndHouse || isShop || isOffice || isShowroom || isGuestHouse) && (
            <input type="number" placeholder="Total Floors" value={formData.totalFloors || ""} onChange={(e) => setFormData(p => ({ ...p, totalFloors: e.target.value }))} />
          )}
          {(isFlat || isShop || isOffice || isShowroom) && (
            <input type="number" placeholder="Floor No" value={formData.floorNo || ""} onChange={(e) => setFormData(p => ({ ...p, floorNo: e.target.value }))} />
          )}
          {(isIndHouse || isFlat) && (
            <input type="number" placeholder="Property Age (Years)" value={formData.propertyAge || ""} onChange={(e) => setFormData(p => ({ ...p, propertyAge: e.target.value }))} />
          )}
          {isIndHouse && (
            <input type="text" placeholder="Facing (e.g. East, North-West)" value={formData.facing || ""} onChange={(e) => setFormData(p => ({ ...p, facing: e.target.value }))} />
          )}
          {isOffice && (
            <>
              <input type="number" placeholder="Cabins" value={formData.cabins || ""} onChange={(e) => setFormData(p => ({ ...p, cabins: e.target.value }))} />
              <input type="number" placeholder="Workstations" value={formData.workstations || ""} onChange={(e) => setFormData(p => ({ ...p, workstations: e.target.value }))} />
              <input type="number" placeholder="Meeting Rooms" value={formData.meetingRooms || ""} onChange={(e) => setFormData(p => ({ ...p, meetingRooms: e.target.value }))} />
              <input type="number" placeholder="Washrooms" value={formData.washrooms || ""} onChange={(e) => setFormData(p => ({ ...p, washrooms: e.target.value }))} />
            </>
          )}
          {isWarehouse && (
            <input type="number" placeholder="Ceiling Height" value={formData.ceilingHeight || ""} onChange={(e) => setFormData(p => ({ ...p, ceilingHeight: e.target.value }))} />
          )}
          {(isShop || isShowroom) && (
            <input type="number" placeholder="Frontage Width" value={formData.frontageWidth || ""} onChange={(e) => setFormData(p => ({ ...p, frontageWidth: e.target.value }))} />
          )}
          {(isGuestHouse) && (
            <>
              <input type="number" placeholder="Total Rooms" value={formData.totalRooms || ""} onChange={(e) => setFormData(p => ({ ...p, totalRooms: e.target.value }))} />
              <input type="number" placeholder="Common Bathrooms" value={formData.commonBathrooms || ""} onChange={(e) => setFormData(p => ({ ...p, commonBathrooms: e.target.value }))} />
              <input type="number" placeholder="Hall Capacity" value={formData.hallCapacity || ""} onChange={(e) => setFormData(p => ({ ...p, hallCapacity: e.target.value }))} />
            </>
          )}
        </div>
      );
    };

    const renderAccessAndUtilities = () => {
      if (isFlat || isIndHouse || isOffice || isShop || isShowroom) return null;
      return (
        <div className="post-property-form-group">
          <label>Access & Utilities</label>
          {(!isGuestHouse) && (
            <label className="property-form-2-checkbox-label"><input type="checkbox" checked={formData.roadAccess} onChange={(e) => setFormData(p => ({ ...p, roadAccess: e.target.checked }))} /> Road Access</label>
          )}
          {formData.roadAccess && !isGuestHouse && (
            <input type="number" placeholder="Road Width" value={formData.roadWidth || ""} onChange={(e) => setFormData(p => ({ ...p, roadWidth: e.target.value }))} />
          )}
          {(!isGuestHouse) && <label className="property-form-2-checkbox-label"><input type="checkbox" checked={formData.mainRoadTouch} onChange={(e) => setFormData(p => ({ ...p, mainRoadTouch: e.target.checked }))} /> Main Road Touch</label>}
          {(!isFactory && !isWarehouse && !isGuestHouse) && <label className="property-form-2-checkbox-label"><input type="checkbox" checked={formData.waterSource} onChange={(e) => setFormData(p => ({ ...p, waterSource: e.target.checked }))} /> Water Source</label>}
          {(!isFactory && !isWarehouse && !isGuestHouse) && <label className="property-form-2-checkbox-label"><input type="checkbox" checked={formData.electricityStatus} onChange={(e) => setFormData(p => ({ ...p, electricityStatus: e.target.checked }))} /> Electricity</label>}
          {(!isFactory && !isWarehouse && !isGuestHouse) && <label className="property-form-2-checkbox-label"><input type="checkbox" checked={formData.drainage} onChange={(e) => setFormData(p => ({ ...p, drainage: e.target.checked }))} /> Drainage</label>}
          {isFarmhouse && <label className="property-form-2-checkbox-label"><input type="checkbox" checked={formData.swimmingPool} onChange={(e) => setFormData(p => ({ ...p, swimmingPool: e.target.checked }))} /> Swimming Pool</label>}
          {(isWarehouse || isIndustrial || isFactory) && (
            <>
              <label className="property-form-2-checkbox-label"><input type="checkbox" checked={formData.truckAccess} onChange={(e) => setFormData(p => ({ ...p, truckAccess: e.target.checked }))} /> Truck / Heavy Vehicle Access</label>
              <label className="property-form-2-checkbox-label"><input type="checkbox" checked={formData.loadingDock} onChange={(e) => setFormData(p => ({ ...p, loadingDock: e.target.checked }))} /> Loading Dock</label>
              <label className="property-form-2-checkbox-label"><input type="checkbox" checked={formData.industrialPower} onChange={(e) => setFormData(p => ({ ...p, industrialPower: e.target.checked }))} /> Industrial Power</label>
              <input type="number" placeholder="Power Load (kVA)" value={formData.powerLoad || ""} onChange={(e) => setFormData(p => ({ ...p, powerLoad: e.target.value }))} />
            </>
          )}
        </div>
      );
    };

    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="form-heading">Step 1: Basic Details</h2>
            <div className="post-property-form-group">
              <label>Property Name</label>
              <input
                type="text"
                placeholder="Enter Property Name"
                value={formData.heading || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, heading: e.target.value }))
                }
              />
              {errors.heading && (
                <div className="property-form-1-error">{errors.heading}</div>
              )}
            </div>

            {bulkAdd && (
              <div className="post-property-form-group">
                <label>No. of Properties(bulk upload)</label>
                <input
                  type="number"
                  placeholder="Enter Property count"
                  value={formData.bulkCount || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bulkCount: e.target.value,
                    }))
                  }
                />
              </div>
            )}

            <div className="post-property-form-group">
              <label>What Kind of Property Do You Have?</label>
              <div className="post-property-form-options">
                {["Sell", "Rent", "PG"].map((option) => (
                  <button
                    key={option}
                    className={`post-property-form-option ${formData.sellType === option ? "active" : ""
                      }`}
                    onClick={() => handleSelection("sellType", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.sellType && (
                <div className="property-form-1-error">{errors.sellType}</div>
              )}
            </div>

            <div className="post-property-form-group">
              <label>Seller Type?</label>
              <div className="post-property-form-options">
                {["Owner", "Builder", "Dealer", "Feature Dealer"].map(
                  (option) => (
                    <button
                      key={option}
                      className={`post-property-form-option ${formData.sellerType === option ? "active" : ""
                        }`}
                      onClick={() => handleSelection("sellerType", option)}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
              {errors.sellerType && (
                <div className="property-form-1-error">{errors.sellerType}</div>
              )}
            </div>

            <div className="post-property-form-group">
              <label>Owner Details</label>
              <label className="property-form-2-checkbox-label">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setCheckedOwner(e.target.checked);
                    setFormData((prev) => ({ ...prev, sameAsProfile: e.target.checked }));
                  }}
                />
                Owner Details Same as profile
              </label>
              <input
                type="text"
                placeholder="Enter Owner Name"
                value={formData.ownerName || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ownerName: e.target.value }))
                }
              />
              {errors.ownerName && (
                <div className="property-form-1-error">{errors.ownerName}</div>
              )}
              <input
                type="text"
                placeholder="Enter Owner Contact Number"
                value={formData.ownerPhone || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ownerPhone: e.target.value }))
                }
              />
              {errors.ownerPhone && (
                <div className="property-form-1-error">{errors.ownerPhone}</div>
              )}
              <input
                type="text"
                placeholder="Enter Owner Email"
                value={formData.ownerEmail || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ownerEmail: e.target.value }))
                }
              />
              {errors.ownerEmail && (
                <div className="property-form-1-error">{errors.ownerEmail}</div>
              )}
            </div>

            <div className="post-property-form-group">
              <label>Construction Status ?</label>
              <div className="post-property-form-options">
                {["New Launch", "Under Construction", "Ready to move"].map(
                  (option) => (
                    <button
                      key={option}
                      className={`post-property-form-option ${formData.oldProperty === option ? "active" : ""
                        }`}
                      onClick={() => handleSelection("oldProperty", option)}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
              {errors.oldProperty && (
                <div className="property-form-1-error">
                  {errors.oldProperty}
                </div>
              )}
            </div>

            <div className="post-property-form-group">
              <label>Property Type</label>
              <div className="post-property-form-options">
                {["Residential", "Commercial"].map((type) => (
                  <button
                    key={type}
                    className={`post-property-form-option ${formData.propertyCategory === type ? "active" : ""
                      }`}
                    onClick={() => handleSelection("propertyCategory", type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.propertyCategory && (
                <div className="property-form-1-error">
                  {errors.propertyCategory}
                </div>
              )}
            </div>

            <div className="post-property-form-group">
              <label>Property Services</label>
              {formData.propertyCategory === "Commercial" ?
                <div className="post-property-form-options">
                  {[
                    "Shop",
                    "Industrial land",
                    "Office",
                    "Godown",
                    "Agricultural land",
                    "Industrial plots",
                    "Showrooms",
                    "Warehouse",
                    "Kiosk",
                    "Factory",
                    "Guest house",
                    "Banquet halls",
                    "Hotels",
                    "Resorts",
                  ].map((service) => (
                    <button
                      key={service}
                      className={`post-property-form-option ${formData.propertyContains?.includes(service)
                        ? "active"
                        : ""
                        }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, propertyContains: [service] }))
                      }
                    >
                      {service}
                    </button>
                  ))}
                </div> :
                <div className="post-property-form-options">
                  {[
                    "Flats/Apartment",
                    "Independent House/Villa",
                    "Independent/Builder Floor",
                    "Plot/Land",
                    "1RK/Studio Apartment",
                    "Serviced Apartment",
                    "Farmhouse",
                    "Other",
                  ].map((service) => (
                    <button
                      key={service}
                      className={`post-property-form-option ${formData.propertyContains?.includes(service)
                        ? "active"
                        : ""
                        }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, propertyContains: [service] }))
                      }
                    >
                      {service}
                    </button>
                  ))}
                </div>
              }
              {errors.propertyContains && (
                <div className="property-form-1-error">
                  {errors.propertyContains}
                </div>
              )}
            </div>

            <div className="post-property-form-group">
              <label>Amenities</label>
              <div className="post-property-form-options">
                {defaultAmenty.map((amenity) => (
                  <button
                    className={`post-property-form-option ${formData.amenities?.includes(amenity) ? "active" : ""
                      }`}
                    onClick={() => handleSelection("amenities", amenity, true)}
                  >
                    {amenity}
                  </button>
                ))}
              </div>

              <div className="add-amenity">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Add custom amenity"
                  className="post-property-form-input"
                />
                <button
                  type="button"
                  className="add-amenity-btn"
                  onClick={() => {
                    if (newAmenity) {
                      handleSelection(
                        "amenities",
                        newAmenity.replace(/\b\w/g, (char) =>
                          char.toUpperCase(),
                        ),
                        true,
                      );
                      setDefaultAmenty([
                        ...defaultAmenty,
                        newAmenity.replace(/\b\w/g, (char) =>
                          char.toUpperCase(),
                        ),
                      ]);
                      setNewAmenity("");
                    }
                  }}
                >
                  Add
                </button>
              </div>

              {errors.amenities && (
                <div className="property-form-1-error">{errors.amenities}</div>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="form-heading">
              Step 2: Property Location and Details
            </h2>
            <div className="post-property-form-group">
              <label>Where is your property located?</label>
              <input
                type="text"
                placeholder="City"
                value={formData.city || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
              />
              {errors.city && (
                <div className="property-form-2-error">{errors.city}</div>
              )}
              <input
                type="text"
                placeholder="Nearest Landmark"
                value={formData.landmark || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, landmark: e.target.value }))
                }
              />
              {errors.landmark && (
                <div className="property-form-2-error">{errors.landmark}</div>
              )}
              <button
                className="post-property-form-option active"
                onClick={detectCurrentLocation}
              >
                Detect my current location
              </button>
              {errors.location && (
                <div className="property-form-2-error">{errors.location}</div>
              )}
            </div>
            <div className="post-property-form-group">
              <label>Select Your Property Location on the Map</label>
              <div className="map-container">
                <MapInput
                  onLocationSelect={handleLocationSelect}
                  selectedLocation={selectedLocation}
                />
              </div>
            </div>
            <div className="post-property-form-group">
              <label>Add Room Details</label>
              {['Flats/Apartment', 'Independent House/Villa', 'Independent/Builder Floor', '1RK/Studio Apartment', 'Serviced Apartment', 'Farmhouse', 'Guest house', 'Banquet halls', 'Hotels', 'Resorts', 'Shop', 'Office', 'Showrooms', 'Factory'].includes(formData.propertyContains?.[0] || "") && (
                <div>
                  <label>{['Guest house', 'Banquet halls', 'Hotels', 'Resorts'].includes(formData.propertyContains?.[0]) ? "Total Rooms" : "No. of Bedrooms"}</label>
                  <div className="post-property-form-options">
                    {["1RK", 1, 2, 3, 4, "5+"].map((bedroom) => (
                      <button key={bedroom} className={`post-property-form-option ${formData.bedrooms === bedroom ? "active" : ""}`} onClick={() => handleSelection("bedrooms", bedroom)}>
                        {bedroom}
                      </button>
                    ))}
                  </div>
                  {errors.bedrooms && <div className="property-form-2-error">{errors.bedrooms}</div>}
                </div>
              )}
              {['Flats/Apartment', 'Independent House/Villa', 'Independent/Builder Floor', '1RK/Studio Apartment', 'Serviced Apartment', 'Farmhouse', 'Guest house', 'Banquet halls', 'Hotels', 'Resorts', 'Shop', 'Office', 'Factory', 'Warehouse', 'Godown'].includes(formData.propertyContains?.[0]) && (
                <div>
                  <label>No. of Bathrooms</label>
                  <div className="post-property-form-options">
                    {[1, 2, 3, 4, "5+"].map((bathroom) => (
                      <button key={bathroom} className={`post-property-form-option ${formData.bathrooms === bathroom ? "active" : ""}`} onClick={() => handleSelection("bathrooms", bathroom)}>
                        {bathroom}
                      </button>
                    ))}
                  </div>
                  {errors.bathrooms && <div className="property-form-2-error">{errors.bathrooms}</div>}
                </div>
              )}
              {['Flats/Apartment', 'Independent House/Villa', 'Independent/Builder Floor', 'Serviced Apartment', 'Farmhouse'].includes(formData.propertyContains?.[0]) && (
                <div>
                  <label>No. of Balconies</label>
                  <div className="post-property-form-options">
                    {[1, 2, 3, 4, "5+"].map((balcony) => (
                      <button key={balcony} className={`post-property-form-option ${formData.balconies === balcony ? "active" : ""}`} onClick={() => handleSelection("balconies", balcony)}>
                        {balcony}
                      </button>
                    ))}
                  </div>
                  {errors.balconies && <div className="property-form-2-error">{errors.balconies}</div>}
                </div>
              )}
            </div>

            {renderBuildingDetails()}
            {renderAreaFields()}
            {renderAccessAndUtilities()}

            <div className="post-property-form-group">
              <label>Basic Details</label>
              {(isFlat || isIndHouse || isPlot || isAgri || isIndustrial || isFarmhouse) ? (
                <div className="post-property-form-options">
                  {["Freehold", "Co-operative society", "Leasehold", "Power of Attorney"].map((ownership) => (
                    <button key={ownership} className={`post-property-form-option ${formData.ownership === ownership ? "active" : ""}`} onClick={() => handleSelection("ownership", ownership)}>
                      {ownership}
                    </button>
                  ))}
                </div>
              ) : null}
              {errors.ownership && <div className="property-form-2-error">{errors.ownership}</div>}

              <div style={{ marginTop: "15px" }}>
                <label className="property-form-2-checkbox-label">
                  <input type="checkbox" checked={formData.isAllInclusive} onChange={(e) => setFormData((prev) => ({ ...prev, isAllInclusive: e.target.checked }))} />
                  All inclusive price?
                </label>
                <label className="property-form-2-checkbox-label">
                  <input type="checkbox" checked={formData.isPriceNegotiable} onChange={(e) => setFormData((prev) => ({ ...prev, isPriceNegotiable: e.target.checked }))} />
                  Price Negotiable
                </label>
                <label className="property-form-2-checkbox-label">
                  <input type="checkbox" checked={formData.isTaxchargeExc} onChange={(e) => setFormData((prev) => ({ ...prev, isTaxchargeExc: e.target.checked }))} />
                  Tax and Govt.charges excluded
                </label>
              </div>
            </div>

            {formData.sellType !== "Sell" && (
              <div className="post-property-form-group">
                <label>Price Details</label>
                <input type="number" value={formData.deposite} onChange={(e) => setFormData((prev) => ({ ...prev, deposite: e.target.value }))} placeholder="₹ Deposite" />
                {errors.deposite && <div className="property-form-2-error">{errors.deposite}</div>}
                <input type="number" value={formData.pricePerMonth} onChange={(e) => setFormData((prev) => ({ ...prev, pricePerMonth: e.target.value }))} placeholder="₹ Price per month" />
                {errors.pricePerMonth && <div className="property-form-2-error">{errors.pricePerMonth}</div>}
                <input type="number" value={formData.closingDealPercentage || ''} onChange={(e) => setFormData((prev) => ({ ...prev, closingDealPercentage: e.target.value }))} placeholder="% Amount to pay to close the deal (Token Amount Percentage)" />
                {formData.closingDealPercentage && formData.deposite && (
                  <p className="property-form-hint" style={{ color: "green", fontSize: "14px", marginTop: "5px" }}>Token Amount: ₹ {Number((formData.deposite * formData.closingDealPercentage) / 100).toLocaleString("en-IN")}</p>
                )}
              </div>
            )}

            {formData.sellType === "Sell" && (
              <div className="post-property-form-group">
                <label>Expected Price Details</label>
                <input type="number" value={formData.expectedPrice} onChange={(e) => setFormData((prev) => ({ ...prev, expectedPrice: e.target.value }))} placeholder="₹ Expected Price" />
                {errors.expectedPrice && <div className="property-form-2-error">{errors.expectedPrice}</div>}
                <input type="number" value={formData.pricePerSqFt || ''} disabled={true} placeholder="₹ Price per sq.ft. (Auto calc)" />
                {errors.pricePerSqFt && <div className="property-form-2-error">{errors.pricePerSqFt}</div>}
                <input type="number" value={formData.closingDealPercentage || ''} onChange={(e) => setFormData((prev) => ({ ...prev, closingDealPercentage: e.target.value }))} placeholder="% Amount to pay to close the deal (Token Amount Percentage)" />
                {formData.closingDealPercentage && formData.expectedPrice && (
                  <p className="property-form-hint" style={{ color: "green", fontSize: "14px", marginTop: "5px" }}>Token Amount: ₹ {Number((formData.expectedPrice * formData.closingDealPercentage) / 100).toLocaleString("en-IN")}</p>
                )}
              </div>
            )}
            <div className="post-property-form-group">
              <label>What makes your property unique? (Optional)</label>
              <textarea
                placeholder="Share some details about your property like spacious rooms, well-maintained facilities."
                value={formData.uniqueFeatures || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    uniqueFeatures: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="form-heading">
              Step 3: Add Photos & Other Details
            </h2>
            <div className="post-property-form-group">
              <label>Add Photos & Other Details</label>
              <div
                className="photo-upload-box"
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  processFiles(files);
                }}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById("file-input").click()}
              >
                <span >
                  + Add Photos
                </span>
                <p>Click or drag and drop photos/videos here</p>
                <input
                  id="file-input"
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif, .webp, .heic, .heif, .mp4, .webm, .ogg, .mov, .quicktime"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              <p>
                {
                  uploadedPhotos.filter(file =>
                    ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/heic", "image/heif"].includes(file.type)
                  ).length
                }/{numOfImages === -1 ? "∞" : numOfImages} Photos,
                {
                  uploadedPhotos.filter(file =>
                    ["video/mp4", "video/webm", "video/ogg", "video/mov", "video/quicktime"].includes(file.type)
                  ).length
                }/{numOfVideos === -1 ? "∞" : numOfVideos} Videos uploaded
              </p>
            </div>
            {uploadedPhotos.length > 0 && (
              <div className="property-form-3-uploaded-photos">
                <h4>Uploaded Photos and Video:</h4>
                <ul>
                  {uploadedPhotos.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {errors.photos && (
              <div className="property-form-3-error">{errors.photos}</div>
            )}
            <div className="post-property-form-group">
              <label>Other Rooms (Optional)</label>
              <div className="post-property-form-options">
                {["Pooja Room", "Servant Room", "Study Room", "Others"].map(
                  (room) => (
                    <button
                      key={room}
                      className={`post-property-form-option ${formData.selectedRoom?.includes(room) ? "active" : ""
                        }`}
                      onClick={() =>
                        handleSelection("selectedRoom", room, true)
                      }
                    >
                      {room}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="post-property-form-group">
              <label>Furnishing (Optional)</label>
              <div className="post-property-form-options">
                {["Unfurnished", "Semi-Furnished", "Furnished"].map(
                  (furnishing) => (
                    <button
                      key={furnishing}
                      className={`post-property-form-option ${formData.selectedFurnishing === furnishing
                        ? "active"
                        : ""
                        }`}
                      onClick={() =>
                        handleSelection("selectedFurnishing", furnishing)
                      }
                    >
                      {furnishing}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="post-property-form-group">
              <label>Reserved Parking (Optional)</label>
              <div>
                <label className="radiogroups" style={{ display: "flex" }}>
                  <input
                    type="radio"
                    name="reservedParking"
                    value="Covered Parking"
                    checked={formData.reservedParking === "Covered Parking"}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        reservedParking: "Covered Parking",
                      }))
                    }
                    className="post-property-form-group-input-radio"
                    style={{ width: "50px" }}
                  />
                  Covered Parking
                </label>
                <label className="radiogroups">
                  <input
                    type="radio"
                    name="reservedParking"
                    value="Open Parking"
                    checked={formData.reservedParking === "Open Parking"}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        reservedParking: "Open Parking",
                      }))
                    }
                    className="post-property-form-group-input-radio"
                    style={{ width: "50px" }}
                  />
                  Open Parking
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MainNavBar />
      <div className="post-property-form-container">
        <div className="post-property-form-sidebar">
          <div className="post-property-form-steps">
            <div
              className={`post-property-form-step ${currentStep === 1 ? "active" : ""}`}
            >
              Step 1
            </div>
            <div
              className={`post-property-form-step ${currentStep === 2 ? "active" : ""}`}
            >
              Step 2
            </div>
            <div
              className={`post-property-form-step ${currentStep === 3 ? "active" : ""}`}
            >
              Step 3
            </div>
          </div>
          <div className="property-form-step-container postproperty">
            <div
              className={`property-form-step property-form-step1 ${currentStep >= 1 && "property-form-active"}`}
            >
              <span>Step 1</span>
            </div>
            <div
              className={`property-form-step property-form-step2 ${currentStep >= 2 && "property-form-active"}`}
            >
              <span>Step 2</span>
            </div>
            <div
              className={`property-form-step property-form-step3 ${currentStep >= 3 && "property-form-active"}`}
            >
              <span>Step 3</span>
            </div>
          </div>
          <div className="post-property-form-score">
            <p>Property Score</p>
            <div className="post-property-form-score-circle-wrapper">
              <svg
                className="post-property-form-score-circle"
                width="100"
                height="100"
              >
                <circle
                  className="post-property-form-score-background"
                  cx="50"
                  cy="50"
                  r={circleRadius}
                  stroke="#e6e6e6"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  className="post-property-form-score-progress"
                  cx="50"
                  cy="50"
                  r={circleRadius}
                  stroke="#4caf50"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
              <span className="post-property-form-score-percentage">
                {propertyScore}%
              </span>
            </div>
            <p>Better your property score, greater your visibility</p>
          </div>
        </div>
        <div className="post-property-form-main" id="post-property-form-mainId">
          <div className="post-property-form-content">
            {renderStepContent()}
            <div className="post-property-form-buttons">
              {currentStep > 1 && <button onClick={prevStep}>Previous</button>}
              {currentStep < 3 && <button onClick={nextStep}>Continue</button>}
              {currentStep === 3 && (
                <button
                  onClick={() => {
                    setPropertyScore((prevScore) => {
                      const newScore = prevScore + 34;
                      return newScore > 100 ? 100 : newScore;
                    });
                    if (disabled) {
                      setShowModal(true);
                    } else {
                      handleSubmit();
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="service-form-spinner"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      Submit
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="post-property-form-contact">
          <img src={dummyImg} alt="" width={100} height={50} />
          <p>Need Help?</p>
          <span>
            You can emain us at <a href="mailto:info@milestono.in">info@milestono.in</a> or call us
            at
          </span>
        </div>
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
    </>
  );
};

export default PropertyForm;
