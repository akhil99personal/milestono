import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserHeader from "./UserHeader";
import "./PropertyDetails.css";
import ShareModal from "../others/ShareModal";
import MainNavBar from "./MainNavBar";
import FadeLoader from "react-spinners/FadeLoader";
import FeedbacksSection from "./homepage/FeedbacksSection";
import AdvertisementPage from "./homepage/AdvertisementSection";
import { ChevronRight, Info, InfoIcon, Phone, PhoneCall } from "lucide-react";
import { FaInfo, FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";

// Inject CSS Variables for Color Theme
if (typeof document !== 'undefined') {
  const root = document.documentElement;
  root.style.setProperty('--primary-color', '#232761');
  root.style.setProperty('--primary-301-color', 'rgba(35, 39, 97, 0.301)');
  root.style.setProperty('--dark-primary-color', '#1a1e4d');
  root.style.setProperty('--faint-primary-color', '#4d517b');
  root.style.setProperty('--ffaint-primary-color', '#8b9cff7c');
  root.style.setProperty('--secondary-color', '#ffffff');
  root.style.setProperty('--background-color', '#f5f5f5');
  root.style.setProperty('--text-color', '#333333');
  root.style.setProperty('--hover-color', '#0a0c2c');
}

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contactViewed, setContactViewed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [countViewed, setCountViewed] = useState(0);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [areaUnit, setAreaUnit] = useState("sq ft");

  const convertAreaDisplay = (sqftValue) => {
    if (!sqftValue) return "";
    const numericValue = parseFloat(sqftValue);
    if (isNaN(numericValue)) return sqftValue;

    let multiplier = 1;
    if (areaUnit === "sq meter") multiplier = 0.092903;
    if (areaUnit === "acre") multiplier = 0.0000229568;
    if (areaUnit === "guntha") multiplier = 0.000918274;

    return (numericValue * multiplier).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const propertyUrl = `${window.location.origin}/details/${id}`;

  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === property.uploadedPhotos.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? property.uploadedPhotos.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/property_details`);
        const filtered = response.data.filter((listing) => listing._id === id);
        setProperty(filtered[0]);
      } catch (error) {
        console.error("Error fetching property details:" + error);
      } finally {
        setLoading(false);
      }
    };

    const checkContactViewed = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("auth");
        if (token) {
          const response = await axios.get(
            `${BASE_URL}/api/contact-viewed/${id}`,
            {
              headers: { Authorization: token },
            },
          );
          setContactViewed(response.data.viewed);
        }
      } catch (error) {
        console.error("Error checking contact viewed status:" + error);
      } finally {
        setLoading(false);
      }
    };

    const checkCountContactViewed = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/count-contact-viewed/${id}`,
        );
        setCountViewed(response.data.count);
      } catch (error) {
        console.error("Error fetching property details:" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
    checkContactViewed();
    checkCountContactViewed();
  }, [BASE_URL, id]);

  const getUserDetail = async (email) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/owner-details`, { email });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (property?.email)
      getUserDetail(property?.email);
  }, [property]);

  const handleViewPhoneClick = async () => {
    if (!window.confirm("Do you want to unlock the contact?")) {
      return;
    }

    const token = localStorage.getItem("auth");
    if (!token) {
      if (window.confirm("If you want to unlock, login first.")) {
        navigate("/login");
      }
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/contact-viewed`,
        { property_id: id },
        { headers: { Authorization: token } },
      );
      if (response.data.message === "Property marked as viewed.") {
        setContactViewed(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        if (
          window.confirm(
            "You have reached the limit. Upgrade to a premium account to view more contacts.",
          )
        ) {
          navigate("/premium");
        }
      } else {
        console.error("Error marking property as viewed:" + error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewWhatsappClick = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      if (window.confirm("If you want to unlock, login first.")) {
        navigate("/login");
      }
      return;
    }
    setLoading(true);
    try {
      openWhatsApp();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        if (
          window.confirm(
            "You have reached the limit. Upgrade to a premium account to view more contacts.",
          )
        ) {
          navigate("/premium");
        }
      } else {
        console.error("Error marking property as viewed:" + error);
      }
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    if (!contactViewed) {
      alert("Unlock contact first.");
      return;
    }
    const phoneToUse = property?.sameAsProfile ? user?.phone : property?.ownerPhone;
    if (!phoneToUse) {
      alert("Phone number is not available.");
      return;
    }
    const message = `Hi, I'm interested in the property listed as "${property.heading}" at ${property.landmark}. Can we discuss further?`;
    const whatsappUrl = `https://wa.me/${phoneToUse}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleSaveClick = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      if (window.confirm("If you want to unlock, login first.")) {
        navigate("/login");
      }
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/save-property`,
        { property_id: id },
        { headers: { Authorization: token } },
      );
      if (response.data.message === "Property marked as saved.") {
        setSaved(true);
      }
    } catch (error) {
      console.error("Error marking property as saved:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnSaveClick = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      if (window.confirm("If you want to unlock, login first.")) {
        navigate("/login");
      }
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/unsave-property`,
        { property_id: id },
        { headers: { Authorization: token } },
      );

      if (response.data.message === "Property removed from saved list.") {
        setSaved(false);
      }
    } catch (error) {
      console.error("Error marking property as saved:" + error);
    } finally {
      setLoading(false);
    }
  };

  const checkSaved = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth");
      if (token) {
        const response = await axios.get(`${BASE_URL}/api/saved/${id}`, {
          headers: { Authorization: token },
        });
        setSaved(response.data.viewed);
      }
    } catch (error) {
      console.error("Error checking contact viewed status:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToRecent = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    const storedPropertyIds =
      JSON.parse(localStorage.getItem("recentViewedProperties")) || [];

    if (storedPropertyIds.includes(id)) {
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/mark-view`,
        { property_id: id },
        { headers: { Authorization: token || "" } },
      );

      storedPropertyIds.push(id);
      localStorage.setItem(
        "recentViewedProperties",
        JSON.stringify(storedPropertyIds),
      );
    } catch (error) {
      console.error("Error marking property as saved:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAddToRecent();
    checkSaved();
  }, [id]);

  const handleInquiryClick = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");

    if (!token) {
      alert("User must be logged in to send a property enquiry.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/property-enquiry`,
        { property_id: id },
        { headers: { Authorization: token } },
      );
      toast.success("Property enquiry submitted to agent successfully.");
    } catch (error) {
      toast.error("Error submitting property enquiry:");
    } finally {
      setLoading(false);
    }
  };

  const handleCallClick = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      if (window.confirm("If you want to unlock, login first.")) {
        navigate("/login");
      }
      return;
    }
    try {
      const phoneToUse = property?.sameAsProfile ? user?.phone : property?.ownerPhone;
      if (!phoneToUse) {
        alert("Phone number is not available.");
        return;
      }
      window.open(`tel:${phoneToUse}`, "_blank");
    } catch (error) {
      window.alert("Error making call to agent.");
      console.error("Error making call to agent:" + error);
    } finally {
      setLoading(false);
    }
  };

  function numberToWords(num) {
    num = Number(num).toFixed(0);
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"];

    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    function convert(n) {
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
      if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
      return "";
    }

    const crore = Math.floor(num / 10000000);
    num %= 10000000;

    const lakh = Math.floor(num / 100000);
    num %= 100000;

    const thousand = Math.floor(num / 1000);
    num %= 1000;

    const hundred = num;

    let result = "";

    if (crore) result += convert(crore) + " Crore ";
    if (lakh) result += convert(lakh) + " Lakh ";
    if (thousand) result += convert(thousand) + " Thousand ";
    if (hundred) result += convert(hundred);

    return result.trim();
  }

  const displayEmail = property?.sameAsProfile ? user?.email : property?.ownerEmail;
  const displayPhone = property?.sameAsProfile ? user?.phone : property?.ownerPhone;

  const PropertyHeadingString = `${property.landmark} ${property.bedrooms} ${property.bedrooms !== "1RK" ? "BHK" : ""} Flat ${property.city}`;
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="property-details-page-full-details" style={{ marginBottom: "100px" }}>
      {loading ? (
        <div className="property-details-page-loader-container">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <>
          <MainNavBar />
          <div className="property-details-page-one-property-details">
            {/* <div className="property-details-page-property-location property-details-page-property-location-top-heading">
              <div className="property-details-page-header">
                <div className="property-details-page-header-left">
                  <p className="property-details-page-property-title">
                    {property.heading + " "}
                    {property.bedrooms + " "}
                    {property.bedrooms !== "1RK" && <> BHK</>} Flat
                  </p>
                </div>
                <div className="property-details-page-header-right property-details-page-actions">
                  <button className="property-details-page-action-btn" onClick={handleShareClick}>
                    <i className="fa fa-share-nodes"></i> <span>Share</span>
                  </button>
                  <button
                    className={`property-details-page-action-btn ${saved ? "property-details-page-saved" : ""}`}
                    onClick={() => {
                      if (saved) {
                        handleUnSaveClick();
                      } else {
                        handleSaveClick();
                      }
                    }}
                  >
                    <i className="fa fa-heart"></i> <span>{saved ? "Unsave" : "Save"}</span>
                  </button>
                </div>
              </div>
            </div> */}
            <div className="property-details-page-slider-container">
              <button onClick={prevSlide} className="property-details-page-slider-button">
                <i className="fa-solid fa-circle-chevron-left"></i>
              </button>

              <div className="property-details-page-property-slider">
                {property.uploadedPhotos &&
                  property.uploadedPhotos.map((image, index) =>
                    index === currentIndex ? (
                      <div key={index} className="property-details-page-slide property-details-page-active-slide">
                        <img
                          src={image}
                          alt={`Slide ${index}`}
                          className="property-details-page-slider-image"
                        />
                        <div className="property-details-page-header" style={{ position: "absolute", right: 0 }}>
                          <div className="property-details-page-header-right property-details-page-actions-mob">
                            <button className="property-details-page-action-btn" onClick={handleShareClick}>
                              <i className="fa fa-share-nodes"></i> <span>Share</span>
                            </button>
                            <button
                              className={`property-details-page-action-btn ${saved ? "property-details-page-saved" : ""}`}
                              onClick={() => {
                                if (saved) {
                                  handleUnSaveClick();
                                } else {
                                  handleSaveClick();
                                }
                              }}
                            >
                              <i className="fa fa-heart"></i> <span>{saved ? "Unsave" : "Save"}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null,
                  )}
              </div>

              <button onClick={nextSlide} className="property-details-page-slider-button">
                <i className="fa-solid fa-circle-chevron-right"></i>
              </button>
            </div>

            <ShareModal
              isOpen={isModalOpen}
              onClose={closeModal}
              title={`${property.bedrooms !== "1RK"
                ? property.bedrooms + "BHK"
                : property.bedrooms
                } Flat`}
              message="Check out this amazing property!"
              url={propertyUrl}
              className="share-modal"
            />

            <div className="property-details-page-property-location">
              <p className="property-details-page-semi-bold">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <p style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-start" }}>
                    <h1 style={{fontSize: '2rem'}}>{property.heading}</h1>
                    <p title="Click to navigate to Maps for Property Location...."
                      onClick={() => window.location.href = `https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                      style={{ display: "flex", alignItems: "center", gap: "0" ,fontSize: "1.1rem", color: "var(--text-color)", marginBottom: "5px", cursor: "pointer" }}>
                      {/* <i className="fa-solid fa-location-dot property-details-page-location-icon" style={{ marginRight: "5px" ,fontSize: "1.1rem", color: "var(--text-color)"}}></i> */}
                      {PropertyHeadingString}
                    </p>
                    {property.uniqueFeatures && (<p style={{ color: "var(--text-color)", fontSize: "1rem" }}>Property Description :</p>)}
                    {property.uniqueFeatures && (
                      <>
                        <span
                          style={{
                            color: "#666",
                            fontSize: "1rem",
                            display: "-webkit-box",
                            WebkitLineClamp: showMore ? "unset" : 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {property.uniqueFeatures}{" "}
                        </span>
                        <p
                          style={{ color: "#232761", cursor: "pointer", marginTop: "4px", fontSize: "0.9rem" }}
                          onClick={() => setShowMore(!showMore)}
                        >
                          {showMore ? "See less" : "See more"}
                        </p>
                      </>
                    )}
                  </p>
                </div>
                <br />
              </p>
            </div>

            <div className="property-details-page-property-overview-and-owner-contact">
              <div className="property-details-page-property-overview">
                <h2>📋 Property Overview
                  <select
                    className="property-details-page-area-select"
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value)}
                  >
                    <option value="sq ft">sq ft</option>
                    <option value="sq meter">sq meter</option>
                    <option value="acre">acre</option>
                    <option value="guntha">guntha</option>
                  </select>
                </h2>
                <div className="property-details-page-overview-container">
                  <div className="property-details-page-overview-item">
                    <p className="property-details-page-item-title">
                      {property.sellType === "Sell"
                        ? "Price:"
                        : "Rent for month:"}
                    </p>
                    <p className="property-details-page-item-value">
                      ₹{" "}
                      {property.sellType === "Sell"
                        ? Number(property.expectedPrice).toLocaleString("en-IN")
                        : Number(property.pricePerMonth).toLocaleString("en-IN")}
                    </p>
                    <p className="property-details-page-item-value-in-words">
                      {property.sellType === "Sell"
                        ? numberToWords(property.expectedPrice)
                        : numberToWords(property.pricePerMonth)}
                    </p>
                    {property.sellType === "Sell" && (
                      <Link to="/" className="property-details-page-item-feature">
                        Get an Instant Loan
                      </Link>
                    )}
                  </div>

                  {(property.carpetArea || property.areaSqft) && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>Carpet Area:</p>
                      <p className="property-details-page-item-value">{convertAreaDisplay(property.carpetArea || property.areaSqft)} {areaUnit}</p>
                    </div>
                  )}
                  
                  {property.builtUpArea && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Built-up Area:</p>
                      <p className="property-details-page-item-value">{convertAreaDisplay(property.builtUpArea)} {areaUnit}</p>
                    </div>
                  )}

                  {property.superBuiltUpArea && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Super Built-up Area:</p>
                      <p className="property-details-page-item-value">{convertAreaDisplay(property.superBuiltUpArea)} {areaUnit}</p>
                    </div>
                  )}

                  {property.plotArea && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">{property.propertyContains?.[0] === "Agricultural land" ? "Area in Acre:" : "Plot / Total Area:"}</p>
                      <p className="property-details-page-item-value">{convertAreaDisplay(property.plotArea)} {areaUnit}</p>
                    </div>
                  )}

                  {property.sellType === "Sell" && property.pricePerSqFt && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">
                        Price Per {areaUnit === "sq ft" ? "Sq. Ft" : areaUnit === "sq meter" ? "Sq. Meter" : areaUnit === "acre" ? "Acre" : "Guntha"}:
                      </p>
                      <p className="property-details-page-item-value">
                        ₹{" "}
                        {Math.round(
                          property.pricePerSqFt *
                          (areaUnit === "sq ft"
                            ? 1
                            : areaUnit === "sq meter"
                              ? 10.7639
                              : areaUnit === "acre"
                                ? 43560
                                : 1089)
                        ).toLocaleString("en-IN")}{" "}
                        / {areaUnit === "sq ft" ? "Sq. Ft" : areaUnit === "sq meter" ? "Sq. Meter" : areaUnit === "acre" ? "Acre" : "Guntha"}
                      </p>
                    </div>
                  )}
                  

                  {property.plotLength && property.plotWidth && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Dimensions:</p>
                      <p className="property-details-page-item-value">{property.plotLength} x {property.plotWidth}</p>
                    </div>
                  )}

                  <div className="property-details-page-overview-item">
                    <p className="property-details-page-item-title">Brokerage:</p>
                    <p className="property-details-page-item-value">No Charge</p>
                    <Link to="/" className="property-details-page-item-feature">
                      Access Zero Brokerage
                    </Link>
                  </div>

                  {property.sellType !== "Sell" && property.deposite && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Deposit:</p>
                      <p className="property-details-page-item-value">₹ {Number(property.deposite).toLocaleString("en-IN")}</p>
                    </div>
                  )}

                  {property.closingDealPercentage && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Token / Advance Amount:</p>
                      <p className="property-details-page-item-value">
                        ₹ {property.sellType === "Sell"
                          ? Number((property.expectedPrice * property.closingDealPercentage) / 100).toLocaleString("en-IN")
                          : Number((property.deposite * property.closingDealPercentage) / 100).toLocaleString("en-IN")
                        }
                        <span style={{ fontSize: "12px", color: "gray", marginLeft: "5px" }}>
                          ({property.closingDealPercentage}% of {property.sellType === "Sell" ? "Price" : "Deposit"})
                        </span>
                      </p>
                    </div>
                  )}

                  {property.balconies && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Balconies:</p>
                      <p className="property-details-page-item-value">{property.balconies}</p>
                    </div>
                  )}

                  {property.bedrooms && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Bedrooms:</p>
                      <p className="property-details-page-item-value">{property.bedrooms}</p>
                    </div>
                  )}

                  {property.bathrooms && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Bathrooms:</p>
                      <p className="property-details-page-item-value">{property.bathrooms}</p>
                    </div>
                  )}

                  {property.propertyAge && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Property Age:</p>
                      <p className="property-details-page-item-value">{property.propertyAge} Years</p>
                    </div>
                  )}

                  {property.totalFloors && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Total Floors:</p>
                      <p className="property-details-page-item-value">{property.totalFloors}</p>
                    </div>
                  )}
                  {property.floorNo && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Floor No:</p>
                      <p className="property-details-page-item-value">{property.floorNo}</p>
                    </div>
                  )}

                  {property.facing && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Facing:</p>
                      <p className="property-details-page-item-value">{property.facing}</p>
                    </div>
                  )}

                  {property.totalRooms && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Total Rooms:</p>
                      <p className="property-details-page-item-value">{property.totalRooms}</p>
                    </div>
                  )}

                  {property.commonBathrooms && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Common Bathrooms:</p>
                      <p className="property-details-page-item-value">{property.commonBathrooms}</p>
                    </div>
                  )}

                  <div className="property-details-page-overview-item">
                    <p className="property-details-page-item-title">Property Category:</p>
                    <p className="property-details-page-item-value">{property.propertyCategory} {property.propertyContains?.[0] ? `(${property.propertyContains[0]})` : ''}</p>
                  </div>

                  {property.oldProperty && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Property Status:</p>
                      <p className="property-details-page-item-value">{property.oldProperty}</p>
                    </div>
                  )}

                  {property.reservedParking && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Parking Type:</p>
                      <p className="property-details-page-item-value">{property.reservedParking}</p>
                    </div>
                  )}

                  {property.selectedFurnishing && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Furnishing:</p>
                      <p className="property-details-page-item-value">{property.selectedFurnishing}</p>
                    </div>
                  )}

                  {property.isAllInclusive && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">All Inclusive Price:</p>
                      <p className="property-details-page-item-value">Yes</p>
                    </div>
                  )}

                  {property.isPriceNegotiable && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Price Negotiable:</p>
                      <p className="property-details-page-item-value">Yes</p>
                    </div>
                  )}

                  {property.isTaxchargeExc && (
                    <div className="property-details-page-overview-item">
                      <p className="property-details-page-item-title">Tax & Govt. Charges:</p>
                      <p className="property-details-page-item-value">Excluded</p>
                    </div>
                  )}

                </div>
              </div>

              <div style={{}}>
                <div className="property-details-page-contact-owner">
                  <h2>☎️ Owner Contact Details</h2>

                  <div className="property-details-page-contact-details">
                    <p className="property-details-page-owner-name">
                      <i className="fa-solid fa-envelope"></i>
                      {contactViewed ? displayEmail ?? "XXXXXXXXXX" : displayEmail ? displayEmail.slice(0, 4) + "XXXXXXXXXX" : "XXXXXXXXXX"}
                    </p>

                    <p className="property-details-page-owner-phone">
                      <i className="fa-solid fa-mobile-button"></i>
                      {contactViewed ? displayPhone ?? "XXXXXX" : displayPhone ? displayPhone.slice(0, 4) + "XXXXXX" : "XXXXXX"}
                    </p>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        className={`property-details-page-${contactViewed ? "unlocked-contact" : "unlock-contact"}`}
                        onClick={contactViewed ? handleCallClick : handleViewPhoneClick}
                      >
                        {contactViewed ? (
                          <>
                            <i className="fa-solid fa-lock-open"></i>
                            <span>Contact Now</span>
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-unlock" style={{ fontSize: ".5rem" }}></i>
                            <span>Unlock Contact</span>
                          </>
                        )}
                      </button>

                      <button
                        className="property-details-page-whatsapp"
                        onClick={() => {
                          handleViewWhatsappClick();
                        }}
                      >
                        <i className="fa-brands fa-whatsapp"></i>
                        WhatsApp
                      </button>

                      <button
                        className="property-details-page-action-btn"
                        onClick={handleInquiryClick}
                        style={{ backgroundColor: '#0066cc', color: 'white', borderColor: '#0066cc' }}
                      >
                        {/* <InfoIcon size={18} /> */}
                        <span>Inquiry</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="property-details-page-amenities-and-furniture">
                  {property.amenities && property.amenities.length > 0 && (
                    <div className="property-details-page-amenities">
                      <h2>🏠 Amenities</h2>
                      <div className="property-details-page-amenity-items">
                        <div
                          className={`property-details-page-amenity-item ${property.amenities &&
                            !property.amenities.includes("Car Parking")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-car"></i>
                          <p>Car Parking</p>
                        </div>

                        <div
                          className={`property-details-page-amenity-item ${property.amenities && !property.amenities.includes("CCTV")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-video-camera"></i>
                          <p>CCTV</p>
                        </div>

                        <div
                          className={`property-details-page-amenity-item ${property.amenities &&
                            !property.amenities.includes("Guard")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-shield"></i>
                          <p>Guard</p>
                        </div>

                        <div
                          className={`property-details-page-amenity-item ${property.amenities && !property.amenities.includes("Gym")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-dumbbell"></i>
                          <p>Gym</p>
                        </div>

                        <div
                          className={`property-details-page-amenity-item ${property.amenities &&
                            !property.amenities.includes("Club House")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-building"></i>
                          <p>Club House</p>
                        </div>

                        <div
                          className={`property-details-page-amenity-item ${property.amenities &&
                            !property.amenities.includes("Water Supply")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-tint"></i>
                          <p>Water Supply</p>
                        </div>

                        <div
                          className={`property-details-page-amenity-item ${property.amenities && !property.amenities.includes("Lift")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-arrow-up"></i>
                          <p>Lift</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {property.furnitures && property.furnitures.length > 0 && (
                    <div className="property-details-page-furniture">
                      <h2>🛋️ Furniture</h2>
                      <div className="property-details-page-furniture-items">
                        <div
                          className={`property-details-page-furniture-item ${property.furnitures &&
                            !property.furnitures.includes("Bed")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-bed"></i>
                          <p>Bed</p>
                        </div>

                        <div
                          className={`property-details-page-furniture-item ${property.furnitures &&
                            !property.furnitures.includes("Sofa")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-couch"></i>
                          <p>Sofa</p>
                        </div>

                        <div
                          className={`property-details-page-furniture-item ${property.furnitures && !property.furnitures.includes("TV")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-tv"></i>
                          <p>TV</p>
                        </div>

                        <div
                          className={`property-details-page-furniture-item ${property.furnitures &&
                            !property.furnitures.includes("Cupboard")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-archive"></i>
                          <p>Cupboard</p>
                        </div>

                        <div
                          className={`property-details-page-furniture-item ${property.furnitures && !property.furnitures.includes("AC")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-snowflake"></i>
                          <p>AC</p>
                        </div>

                        <div
                          className={`property-details-page-furniture-item ${property.furnitures &&
                            !property.furnitures.includes("Water Purifier")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-tint"></i>
                          <p>Water Purifier</p>
                        </div>

                        <div
                          className={`property-details-page-furniture-item ${property.furnitures &&
                            !property.furnitures.includes("Geyser")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-shower"></i>
                          <p>Geyser</p>
                        </div>

                        <div
                          className={`property-details-page-furniture-item ${property.furnitures &&
                            !property.furnitures.includes("Washing Machine")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-box"></i>
                          <p>Washing Machine</p>
                        </div>

                        <div
                          className={`property-details-page-furniture-item ${property.furnitures &&
                            !property.furnitures.includes("Dining Table")
                            ? "property-details-page-display-none"
                            : ""
                            }`}
                        >
                          <i className="fa fa-utensils"></i>
                          <p>Dining Table</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="property-details-page-viewers">
              <p>
                <i className="fa-solid fa-eye"></i>
                <strong className="property-details-page-red">{countViewed} people</strong> are currently viewing this property
              </p>
            </div>
          </div>

          <div className="pricing-page-bottom-bar">
            <div
              className="pricing-page-bottom-bar-content"
              style={{ flexWrap: "wrap", gap: "10px", alignItems: "center" }}
            >
              <div>
                <p className="pricing-page-price" style={{ fontWeight: "700" }}>
                  <i className="fa-solid fa-user"></i>{" "}
                  <span className="red">{countViewed} people</span> are
                  currently viewing this property
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="pricing-page-buy-now-button"
                  onClick={handleCallClick}
                >
                  <Phone />
                  Call Now
                </button>

                <button
                  className="pricing-page-buy-now-button"
                  onClick={handleInquiryClick}
                >
                  <InfoIcon />
                  Inquiry
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <FeedbacksSection />
      <AdvertisementPage />
    </div>
  );
}
