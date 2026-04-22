import React, { useEffect, useState } from "react";
import "./MyActivity.css";
import MainNavBar from "./MainNavBar";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import NorecentActivity from "../images/recentActivityPhone.png";
import NorecentActivityHome from "../images/recentActivityHouse.png";
import recentActivityNothingHere from "../images/recentActivitynothing.png";

import dummyImg from "../images/dummyImage.webp";
import FeedbackOverlay from "./FeedbackOverlay";
import { useLocation, useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

const MyActivities = () => {
  const [activeTab, setActiveTab] = useState("posted");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    setActiveTab(tab);

    window.history.replaceState({}, "", "/myproperty");
  }, [location]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();
  const handleGetProperties = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      console.error("No auth token found");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/shared-property`, {
        headers: {
          Authorization: token,
        },
      });
      setProperty(response.data.properties);
    } catch (error) {
      console.error("Error fetching property details:" + error);
    } finally {
      setLoading(false);
    }
  };

  const [recentProperties, setRecentProperties] = useState([]);

  const handleGetRecentProperties = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/get-recent-property`, {
        headers: {
          Authorization: token,
        },
      });
      setRecentProperties(response.data);
    } catch (error) {
      console.error("Error fetching recent viewed property details:" + error);
    } finally {
      setLoading(false);
    }
  };
  const [savedProperty, setSavedProperty] = useState([]);
  const handleGetSavedProperties = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/saved-property`, {
        headers: {
          Authorization: token,
        },
      });
      setSavedProperty(response.data);
    } catch (error) {
      console.error("Error fetching property details:" + error);
    } finally {
      setLoading(false);
    }
  };
  const [contactedProperty, setContactedProperty] = useState([]);
  const handleGetContacedProperties = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    if (!token) {
      setLoading(false);
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/unlocked-property`, {
        headers: {
          Authorization: token,
        },
      });
      setContactedProperty(response.data);
    } catch (error) {
      console.error("Error fetching property details:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProperties();
    handleGetRecentProperties();
    handleGetSavedProperties();
    handleGetContacedProperties();
  }, []);

  const RecentSearches = () => {
    return (
      <>
        {loading ? (
          <div className="loader-container">
            <FadeLoader color="var(--primary-color)" />
          </div>
        ) : property.length !== 0 ? (
          <div className="shared-property-property-list">
            {property.map((property) => (
              <div className="shared-property-property" key={property._id}>
                <div className="shared-property-property-image">
                  <img
                    src={property.uploadedPhotos && property.uploadedPhotos[0]}
                    alt={`Apartment ${property._id}`}
                  />
                </div>
                <div className="shared-property-property-details">
                  <h2>
                    {property.bedrooms}
                    {property.bedrooms !== "1RK" && <>BHK</>} Flat for{" "}
                    {property.sellType} in {property.city}
                  </h2>
                  <p>{property.uniqueFeatures}</p>
                  <div className="shared-property-details-description">
                    <span className="shared-property-description">
                      {property.city}
                    </span>
                    <span className="shared-property-description">
                      {property.propertyCategory}
                    </span>
                    <span className="shared-property-description">
                      Built-up Area: {property.areaSqft} sq.ft
                    </span>
                    <span className="shared-property-description">
                      ₹ {property.pricePerSqFt}/sq.ft
                    </span>
                  </div>
                  <h4>Price: ₹ {property.expectedPrice}</h4>
                  <div className="shared-property-property-actions">
                    <button
                      onClick={() => {
                        navigate(`/details/${property._id}`);
                      }}
                    >
                      <i className="fa-solid fa-eye"></i>{" "}
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-activity-nofound">
            <img src={NorecentActivity} alt="" />
            <h2>You haven’t searched anything yet!</h2>
            <p>
              You will see your search history here, once you start searching
              for properties, projects, localities or cities
            </p>
          </div>
        )}
      </>
    );
  };

  const Viewed = () => {
    return (
      <div>
        {loading ? (
          <div className="loader-container">
            <FadeLoader color="var(--primary-color)" />
          </div>
        ) : recentProperties.length !== 0 ? (
          <div className="view-properties-section">
            <h3 className="shortlisted-header">Viewed Properties</h3>
            <p>Contact now to close the deal</p>
            <div className="view-properties-property-lists">
              {recentProperties.map((property, index) => (
                <div
                  className="view-properties-property"
                  key={index}
                  onClick={() => {
                    navigate(`/details/${property._id}`);
                  }}
                >
                  <img
                    src={property.uploadedPhotos && property.uploadedPhotos[0]}
                    alt={property.heading}
                  />
                  <h4>{property.heading}</h4>
                  <p>
                    {property.landmark} | {property.city}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="my-activity-nofound">
            <img src={NorecentActivityHome} alt="" />
            <h2>You haven’t viewed anything yet!</h2>
            <p>
              All the properties and projects that you have viewed will start
              appearing here. Search or explore cities now.
            </p>
          </div>
        )}
      </div>
    );
  };

  const Shortlisted = () => {
    const handleUnSaveClick = async (id) => {
      const token = localStorage.getItem("auth");
      if (!token) {
        if (window.confirm("If you want to unSave, login first.")) {
          navigate("/login");
        }
        return;
      }
      try {
        await axios.post(
          `${BASE_URL}/api/unsave-property`,
          { property_id: id },
          { headers: { Authorization: token } },
        );
        handleGetSavedProperties();
      } catch (error) {
        console.error("Error marking property as saved:" + error);
      }
    };

    return (
      <>
        {loading ? (
          <div className="loader-container">
            <FadeLoader color="var(--primary-color)" />
          </div>
        ) : savedProperty.length !== 0 ? (
          <div className="shortlisted-container">
            <h2 className="shortlisted-header">Shortlisted Properties</h2>
            <div className="shortlisted-grid">
              {savedProperty.map((item, index) => (
                <div key={index} className="shortlisted-card">
                  <img
                    src={item.uploadedPhotos && item.uploadedPhotos[0]}
                    alt={item.heading}
                    className="property-image"
                  />
                  <div className="card-content">
                    <h3 className="property-title">{item.heading}</h3>
                    <p className="property-location">{item.city}</p>
                    <p className="date-added">
                      Added on:{" "}
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </p>
                    <p className="property-price">{item.expectedPrice}</p>
                  </div>
                  <div className="card-actions">
                    <button
                      className="primary-btn"
                      onClick={() => {
                        navigate(`/details/${item._id}`);
                      }}
                    >
                      View Details
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={() => {
                        handleUnSaveClick(item._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="my-activity-nofound">
            <img src={NorecentActivityHome} alt="" />
            <h2>You haven’t shortlisted anything yet!</h2>
            <p>
              In case you have shortlisted something on another device/account,
              Login / Register to view them here
            </p>
          </div>
        )}
      </>
    );
  };

  const Contacted = () => {
    return (
      <>
        {loading ? (
          <div className="loader-container">
            <FadeLoader color="var(--primary-color)" />
          </div>
        ) : contactedProperty.length !== 0 ? (
          <div className="contacted-container">
            <h2 className="contacted-header">Contacted Properties</h2>
            <div className="contacted-grid">
              {contactedProperty.map((item, index) => (
                <div key={index} className="contacted-card">
                  <img
                    src={item.uploadedPhotos && item.uploadedPhotos[0]}
                    alt={item.heading}
                    className="property-image"
                  />
                  <div className="contacted-card-content">
                    <div className="card-content">
                      <h3 className="property-title">{item.heading}</h3>
                      <p className="property-location">{item.city}</p>
                      <p className="date-contacted">
                        Contacted on:{" "}
                        {new Date(item.dateContacted).toLocaleDateString(
                          "en-GB",
                        )}
                      </p>
                      <p className={`contact-status responded`}>Contacted</p>
                    </div>
                    <div className="card-actions">
                      <button
                        className="primary-btn"
                        onClick={() => {
                          navigate(`/details/${item._id}`);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="my-activity-nofound">
            <img src={NorecentActivity} alt="" />
            <h2>You haven’t contacted anyone lately!</h2>
            <p>
              You will see the list of properties / projects here, where you
              have contacted the advertiser
            </p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="my-activities">
      <MainNavBar />
      <FeedbackOverlay />
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "viewed" ? "active" : ""}`}
          onClick={() => setActiveTab("viewed")}
        >
          Recently Viewed (
          {recentProperties.length > 0 && recentProperties.length})
        </button>
        <button
          className={`tab-button ${activeTab === "posted" ? "active" : ""}`}
          onClick={() => setActiveTab("posted")}
        >
          Posted Properties ({property.length > 0 && property.length})
        </button>
        <button
          className={`tab-button ${activeTab === "shortlisted" ? "active" : ""}`}
          onClick={() => setActiveTab("shortlisted")}
        >
          Shortlisted ({savedProperty.length > 0 && savedProperty.length})
        </button>
        <button
          className={`tab-button ${activeTab === "contacted" ? "active" : ""}`}
          onClick={() => setActiveTab("contacted")}
        >
          Contacted ({contactedProperty.length > 0 && contactedProperty.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "posted" && <RecentSearches />}
        {activeTab === "viewed" && <Viewed />}
        {activeTab === "shortlisted" && <Shortlisted />}
        {activeTab === "contacted" && <Contacted />}
      </div>
    </div>
  );
};

export default MyActivities;
