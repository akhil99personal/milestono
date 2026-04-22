import React, { useState, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Filter, User, ChevronLeft, Phone, MapPin } from "lucide-react";
import "./ServicemansPage.css";
import dummyPerson from "../../images/PersonDummy.png";
import { useParams, useLocation } from "react-router-dom";
import { handlePayment } from "../../others/Payment";
import axios from "axios";

const ServiceProviderMap = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [requestedService, setRequestedService] = useState(null);
  const [isListOpen, setIsListOpen] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailedProfile, setShowDetailedProfile] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userIcon, setUserIcon] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  const [userLocation, setUserLocation] = useState({
    lat: 17.9064,
    lng: 75.6599,
  });

  const { id } = useParams();

  const formatStatus = (status) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const mapPinSvg = ReactDOMServer.renderToStaticMarkup(
    <MapPin color="#10b981" />,
  );
  const mapPinUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(mapPinSvg)}`;

  const fetchQoutedServiceProviders = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/vendors/by-service/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
      );

      setServiceProviders(response.data);
      if (response.data[0]?.status === "busy") {
        showProfile(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching vendors by service ID:", error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
        },
        (error) => {
          console.error("Error getting location:", error);

          if (!requestedService?.coordinates) {
            const defaultLocation = {
              lat: 17.6599,
              lng: 75.9064,
            };
            setUserLocation(defaultLocation);
          }
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");

      if (!requestedService?.coordinates) {
        const defaultLocation = {
          lat: 17.6599,
          lng: 75.9064,
        };
        setUserLocation(defaultLocation);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchQoutedServiceProviders();
    }, 4000);

    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchServiceData();
    }, 4000);

    return () => clearInterval(interval);
  }, [id]);

  const fetchServiceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/services/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;
      const matchedProvider = serviceProviders.find(
        (provider) => provider.email === data.vendorEmail,
      );

      if (matchedProvider) {
        setSelectedProvider(matchedProvider);
      }

      setRequestedService((prev) =>
        JSON.stringify(prev) === JSON.stringify(data) ? prev : data,
      );
    } catch (error) {
      console.error("Error fetching service data:", error);
      setError("Failed to load service data");
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, [serviceProviders]);

  const onMapLoad = (map) => {
    mapRef.current = map;
    setMapLoaded(true);

    if (window.google && window.google.maps) {
      setUserIcon({
        url: "/user-marker.svg",
        scaledSize: new window.google.maps.Size(30, 30),
      });
    }
  };

  const toggleList = () => {
    setIsListOpen(!isListOpen);
    if (showDetailedProfile) {
      setShowDetailedProfile(false);
    }
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);

    if (provider.coordinates && provider.coordinates.length === 2) {
      const newLocation = {
        lng: provider.coordinates[0],
        lat: provider.coordinates[1],
      };
      setUserLocation(newLocation);

      if (mapRef.current) {
        mapRef.current.panTo(newLocation);
        mapRef.current.setZoom(15);
      }
    }
  };

  const showProfile = (provider) => {
    setSelectedProvider(provider);
    setShowDetailedProfile(true);
  };

  const closeProfile = () => {
    setShowDetailedProfile(false);
  };

  const handleAcceptQoute = async (service) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/services/paid-service/${id}`,
        {
          price: service.quotedPrice,
          vendorId: service._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      window.location.reload();
    } catch (error) {
      console.error("Error in sending request to vendor:", error);
      setError(
        error.response
          ? `Failed to send request to vendor. Status: ${error.response.status}`
          : "Error in sending request to vendor",
      );
    }
  };

  useEffect(() => {
    if (selectedProvider) {
      fetchReviews(selectedProvider._id);
    }
  }, [selectedProvider]);

  useEffect(() => {
    getUserLocation();
  }, []);

  const [newReview, setNewReview] = useState({
    review: "",
    reviewer_name: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchReviews = async (vendorId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/vendors/${vendorId}/reviews`,
      );

      setSelectedProvider((prev) => ({
        ...prev,
        reviews: response.data,
      }));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/vendors/${selectedProvider._id}/reviews`,
        newReview,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;

      setSelectedProvider((prev) => ({
        ...prev,
        reviews: [...(prev.reviews || []), data],
      }));
      setNewReview({ review: "", reviewer_name: "" });
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [distance, setDistance] = useState(null);

  const calculateDistance = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/services/distance/${id}`,
        {
          emailFromBody: selectedProvider?.email || null,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setDistance(response.data.distanceInKm);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    calculateDistance();

    if (selectedProvider && requestedService?.status !== "requested" && requestedService?.status !== "quoted") {
      const interval = setInterval(() => {
        calculateDistance();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [selectedProvider]);

  if (error) {
    return <div className="serviceman-page-error">{error}</div>;
  }

  if (!userLocation) {
    return (
      <div className="serviceman-page-loading">
        Determining your location...
      </div>
    );
  }

  return (
    <div className="serviceman-page-service-provider-map">
      <style>
        {`
          .serviceman-page-google-map-container {
            width: 100%;
            height: 100%;
          }
          .serviceman-page-map-view {
            position: relative;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
      <div>
        <div className="serviceman-page-map-container">
          <div
            className={`serviceman-page-list-panel ${isListOpen ? "open" : "closed"}`}
          >
            {!showDetailedProfile &&
           ( requestedService?.status === "requested" || requestedService?.status === "quoted") ? (
              <div className="serviceman-page-list-content">
                <div className="serviceman-page-search-container">
                  <input
                    type="text"
                    className="serviceman-page-search-input"
                    placeholder="Search Least experience"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="serviceman-page-filter-button">
                    <Filter color="white" size={18} />
                  </button>
                </div>

                <h4>See Available Service man within 20 km</h4>
                <br />

                <div className="serviceman-page-providers-list">
                  {serviceProviders
                    .filter((val) => {
                      const exp = parseInt(val.experience, 10);
                      const searchExp = parseInt(searchQuery, 10);

                      if (isNaN(searchExp)) return true;

                      return exp >= searchExp;
                    })
                    .map((provider) => (
                      <div
                        key={provider._id}
                        className="serviceman-page-provider-item"
                        onClick={() => handleProviderSelect(provider)}
                      >
                        <div className="serviceman-page-provider-avatar">
                          {provider.vendorImage ? (
                            <img
                              src={provider.vendorImage}
                              alt={provider.vendorName}
                              className="serviceman-page-provider-avatar-img"
                            />
                          ) : (
                            <User
                              className="serviceman-page-user-icon"
                              size={24}
                            />
                          )}
                        </div>
                        <div className="serviceman-page-provider-info">
                          <h3>{provider.vendorName}</h3>
                          <p className="serviceman-page-provider-experience">
                            Experience: {provider.experience} Years
                          </p>
                        </div>
                        <div className="serviceman-page-provider-actions">
                          <button
                            className="serviceman-page-request-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              showProfile(provider);
                            }}
                          >
                            View
                          </button>
                          <span className="serviceman-page-provider-price">
                            Qouted: {provider.quotedPrice || "Not Qouted"} Rs
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="serviceman-page-provider-profile">
                <button
                  className="serviceman-page-back-button"
                  onClick={closeProfile}
                >
                  <ChevronLeft
                    className="serviceman-page-back-icon"
                    size={24}
                  />
                </button>

                <div className="serviceman-page-profile-header">
                  <img
                    src={selectedProvider?.vendorImage || dummyPerson}
                    alt={selectedProvider?.vendorName}
                    className="serviceman-page-profile-image"
                  />
                  <div className="serviceman-page-profile-title">
                    <h2>{selectedProvider?.vendorName}</h2>
                    <p>Experience: {selectedProvider?.experience} years</p>
                    <p>{selectedProvider?.serviceCategory}</p>
                  </div>
                </div>
                <p
                  className="serviceman-page-profile-milestone"
                  style={{ border: "none" }}
                >
                  {selectedProvider?.vendorDescription ||
                    "No description available"}
                </p>

                <div className="serviceman-page-profile-distance">
                  {distance !== null ? (
                    <p>
                      {distance < 1
                        ? "Less than 1 km away from your location"
                        : `Serviceman is ${distance} km away from your location. He will reach soon.`}
                    </p>
                  ) : (
                    <p>Calculating distance...</p>
                  )}
                </div>

                <br />

                <div className="serviceman-page-profile-milestone">
                  <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>
                    Your Service Details:
                  </h2>
                  <h4 style={{ fontWeight: "400" }}>
                    Problem: {requestedService?.name}
                  </h4>
                  <h4 style={{ fontWeight: "400" }}>
                    Description: {requestedService?.description}
                  </h4>
                  <h4 style={{ fontWeight: "400" }}>
                    Category: {requestedService?.category}
                  </h4>
                </div>

                <br />
                <h3>Qouted Price: {selectedProvider?.quotedPrice} Rs.</h3>
                <br />

                {requestedService?.status !== "paid" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {(requestedService?.status === "requested" || requestedService?.status === "quoted")? (
                      <button
                        className="serviceman-page-request-button"
                        onClick={() => {
                          handlePayment({
                            amount: parseInt(selectedProvider.quotedPrice, 10),
                            callback: ()=>{handleAcceptQoute(selectedProvider)},
                            description:
                              "Payment for " +
                              requestedService.category +
                              " Taken",
                          });
                        }}
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button
                        className="serviceman-page-request-button"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          backgroundColor: "red",
                        }}
                      >
                        Paid
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="serviceman-page-profile-pin-section">
                      <h2
                        className="serviceman-page-pin-warning"
                        fontSize={26}
                        style={{ color: "green" }}
                      >
                        EMAIL : {requestedService.vendorEmail}
                        <br />
                        PHONE : {requestedService.vendorPhone}
                      </h2>
                      <h2
                        className="serviceman-page-pin-warning"
                        fontSize={20}
                        style={{ color: "red" }}
                      >
                        Don&rsquo;t Share that Pin until your work complete *
                      </h2>
                      <div className="serviceman-page-pin-container">
                        <h1 className="serviceman-page-pin-title">
                          Service OTP
                        </h1>
                        <div className="serviceman-page-pin-digits">
                          {requestedService.otp
                            .split("")
                            .map((digit, index) => (
                              <div
                                key={index}
                                className="serviceman-page-pin-digit"
                              >
                                {digit}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <br />

                <div className="serviceman-page-reviews-section">
                  <h3>Reviews</h3>

                  <div className="serviceman-page-reviews-list">
                    {selectedProvider?.reviews?.length > 0 ? (
                      selectedProvider?.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="serviceman-page-review-item"
                          style={{ marginTop: "10px" }}
                        >
                          <div className="serviceman-page-review-header">
                            <span className="serviceman-page-reviewer-name">
                              {review.reviewer_name} Says
                            </span>
                          </div>
                          <p className="serviceman-page-review-text">
                            -{review.review}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet</p>
                    )}
                  </div>

                  <button
                    className="serviceman-page-add-review-button"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Add Review
                  </button>

                  {showReviewForm && (
                    <form
                      className="serviceman-page-review-form"
                      onSubmit={handleReviewSubmit}
                    >
                      <h4>Write a Review</h4>
                      <input
                        type="text"
                        name="reviewer_name"
                        placeholder="Your Name"
                        value={newReview.reviewer_name}
                        onChange={handleReviewChange}
                        required
                      />
                      <textarea
                        name="review"
                        placeholder="Your review..."
                        value={newReview.review}
                        onChange={handleReviewChange}
                        required
                      />
                      <div className="serviceman-page-review-buttons">
                        <button type="submit">Submit</button>
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <br />

                <div className="serviceman-page-profile-info-section">
                  <a
                    href={`tel:${selectedProvider?.mobile}`}
                    className="serviceman-page-call-button"
                    style={{ textDecoration: "none" }}
                  >
                    <Phone className="serviceman-page-call-icon" size={18} />
                    Call Customer Now
                  </a>
                </div>

                <div
                  className="serviceman-page-profile-contact"
                  style={{ marginBottom: "50px" }}
                >
                  <p>
                    You need any help{" "}
                    <a
                      href="mailto:contact@milestono.com"
                      className="serviceman-page-contact-link"
                    >
                      contact@milestono.com
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleList}
            className={`serviceman-page-toggle-button ${isListOpen ? "open" : "closed"}`}
          >
            <ChevronLeft
              className={`serviceman-page-toggle-icon ${isListOpen ? "open" : "closed"}`}
              size={16}
            />
          </button>

          <div
            className={`serviceman-page-map-view ${isListOpen ? "with-list" : "full-width"}`}
          >
            {userLocation && isLoaded && (
              <GoogleMap
                mapContainerClassName="serviceman-page-google-map-container"
                center={userLocation}
                zoom={14}
                onLoad={onMapLoad}
                onClick={() => setSelectedProvider(null)}
                options={{
                  styles: [],
                  disableDefaultUI: true,
                  zoomControl: true,
                  scrollwheel: true,
                  mapTypeControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: false,
                }}
              >
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon={userIcon || undefined}
                    title="Your location"
                  />
                )}

                {serviceProviders.map((provider) => {
                  if (
                    !provider.coordinates ||
                    provider.coordinates.length !== 2
                  ) {
                    console.warn(
                      "Invalid coordinates for provider:",
                      provider._id,
                    );
                    return null;
                  }

                  return (
                    <Marker
                      key={provider._id}
                      position={{
                        lat: provider.coordinates[0],
                        lng: provider.coordinates[1],
                      }}
                      onClick={() => handleProviderSelect(provider)}
                      icon={
                        mapLoaded && window.google && window.google.maps
                          ? {
                              url: mapPinUrl,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }
                          : undefined
                      }
                      title={provider.vendorName}
                    />
                  );
                })}

                {selectedProvider &&
                  selectedProvider.coordinates &&
                  selectedProvider.coordinates.length === 2 && (
                    <InfoWindow
                      position={{
                        lat: selectedProvider.coordinates[0],
                        lng: selectedProvider.coordinates[1],
                      }}
                      onCloseClick={() => setSelectedProvider(null)}
                    >
                      <div
                        className="serviceman-page-info-window"
                        style={{ maxWidth: "225px" }}
                      >
                        <div
                          className="serviceman-page-profile-header"
                          style={{ marginBottom: "15px" }}
                        >
                          <img
                            src={selectedProvider?.vendorImage || dummyPerson}
                            alt={selectedProvider?.vendorName}
                            className="serviceman-page-profile-image"
                            style={{ width: "65px", height: "65px" }}
                          />
                          <div className="serviceman-page-profile-title">
                            <h2 style={{ fontSize: "18px" }}>
                              {selectedProvider?.vendorName}
                            </h2>
                            <p style={{ fontSize: "12px" }}>
                              Experience: {selectedProvider?.experience} years
                            </p>
                            <p style={{ fontSize: "12px" }}>
                              {selectedProvider?.serviceCategory}
                            </p>
                          </div>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderMap;
