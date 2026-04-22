import React, { useState, useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Filter, User, ChevronLeft, Phone, MapPin } from "lucide-react";
import "./ReceivedServiceRequestsPage.css";
import dummyPerson from "../../images/PersonDummy.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const ServiceProviderMap = () => {
  const [requestedServices, setRequestedServices] = useState([]);
  const [isListOpen, setIsListOpen] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [vendorLocation, setVendorLocation] = useState(null);
  const [centerLoc, setCenterLoc] = useState(null);
  const [showDetailedProfile, setShowDetailedProfile] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userIcon, setUserIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  const [serviceId, setServiceId] = useState("");
  const [userId, setUserId] = useState("");
  const [qoutedPrice, setQoutedPrice] = useState();
  const [otpErr, setOtpErr] = useState("");

  const [serviceOTP, setServiceOTP] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setUserId(user_id);

    getVendorCurrentLocation();
  }, []);

  const submitServiceOTP = async (serviceId, serviceOTP) => {
    const token = localStorage.getItem("auth");

    if (!token) throw new Error("No token found. Please login again.");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/services/verify-otp`,
        {
          serviceId,
          otp: serviceOTP,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.success) {
        navigate("/");
      } else {
        setOtpErr(response.data?.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpErr("OTP verification failed");
      throw error;
    }
  };

  const mapPinSvg = ReactDOMServer.renderToStaticMarkup(
    <MapPin color="#10b981" />,
  );
  const mapPinUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(mapPinSvg)}`;

  const getVendorCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          };
          setVendorLocation(newLocation);
        },
        (error) => {
          console.error("Unable to fetch current location", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (selectedService) {
      if (
        selectedService.coordinates &&
        selectedService.coordinates.length === 2
      ) {
        const serviceLocation = {
          lat: selectedService.coordinates[0],
          lng: selectedService.coordinates[1],
        };
      }
    }
  }, [selectedService]);

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

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setServiceId(service._id);
    if (
      mapRef.current &&
      service.coordinates &&
      service.coordinates.length === 2
    ) {
      mapRef.current.panTo({
        lat: service.coordinates[0],
        lng: service.coordinates[1],
      });
      mapRef.current.setZoom(15);
    }
  };

  const showService = (service) => {
    setSelectedService(service);
    setServiceId(service._id);
    setShowDetailedProfile(true);
  };

  useEffect(() => {
    if (selectedService) {
      setServiceId(selectedService._id);
    }
  }, [selectedService]);

  useEffect(() => {
    if (!centerLoc) {
      setCenterLoc(vendorLocation);
    }
  }, [vendorLocation]);

  const closeProfile = () => {
    setShowDetailedProfile(false);
  };

  const formatRating = (rating) => {
    return <div className="serviceman-page-rating"></div>;
  };

  const fetchNearByRequestedServiceByCategory = async (
    longitude,
    latitude,
    maxDistance = 100000,
  ) => {
    try {
      const token = localStorage.getItem("auth");
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/services/nearby/category`,
        {
          longitude,
          latitude,
          maxDistance,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
      );

      setRequestedServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requested services:", error);
      setError(
        error?.response?.data?.error || "Failed to load requested services",
      );
      setLoading(false);
    }
  };

  const handleQouteAndAssociateVendorWithService = async () => {
    try {
      const token = localStorage.getItem("auth");

      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/vendors/quote`,
        {
          serviceId: selectedService._id,
          price: qoutedPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
      );
      
      window.location.reload();
    } catch (error) {
      console.error("Error in Quoting Price:", error);
      setError("Error in Quoting Price");
    }
  };

  useEffect(() => {
    if (vendorLocation) {
      const interval = setInterval(() => {
        fetchNearByRequestedServiceByCategory(
          vendorLocation.lat,
          vendorLocation.lng,
          200000,
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [vendorLocation]);

  const formatStatus = (status) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const updateVendorLocation = async () => {
    try {
      const token = localStorage.getItem("auth");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/vendors`,
        {
          coordinates: [vendorLocation.lat, vendorLocation.lng],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
      );

    } catch (error) {
      console.error("Error updating vendor location:", error);
    }
  };

  useEffect(() => {
    getVendorCurrentLocation();

    const intervalId = setInterval(() => {
      getVendorCurrentLocation();
      if (userId) {
        updateVendorLocation();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [userId]);

  if (loading) {
    return (
      <div className="serviceman-page-loading">Loading service data...</div>
    );
  }

  if (error) {
    return <div className="serviceman-page-error">{error}</div>;
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
            {!showDetailedProfile ? (
              <div className="serviceman-page-list-content">
                <h2 className="serviceman-page-list-title">
                  Available Services for you:
                </h2>

                <div className="serviceman-page-providers-list">
                  {requestedServices.map((service) => (
                    <div
                      key={service._id}
                      className="serviceman-page-provider-item"
                      onClick={() => handleServiceSelect(service)}
                    >
                      <div className="serviceman-page-provider-avatar">
                        {service.profileImage ? (
                          <img
                            src={service.profileImage}
                            alt={service.name}
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
                        <h3>{service.name}</h3>
                        <p className="serviceman-page-provider-experience">
                          {service.landmark}
                        </p>
                      </div>
                      <div className="serviceman-page-provider-actions">
                        <button
                          className="serviceman-page-request-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            showService(service);
                          }}
                        >
                          View
                        </button>
                        <span className="serviceman-page-provider-price">
                          {service.quotedPrice
                            ? `You Quoted: ${service.quotedPrice} Rs. ${service.status === "paid" ? "is PAID" : ""}`
                            : null}
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

                <div
                  className="serviceman-page-profile-header"
                  style={{ display: "grid" }}
                >
                  <div className="serviceman-page-profile-title">
                    <h2>{selectedService?.name}</h2>
                    <p>Category: {selectedService?.category}</p>
                    <p>Address: {selectedService?.landmark}</p>
                  </div>
                  <br />
                  <img
                    src={
                      selectedService?.image
                        ? selectedService?.image
                        : dummyPerson
                    }
                    alt={selectedService?.name}
                    className="serviceman-page-profile-image"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      height: "150px",
                      marginBottom: "0",
                    }}
                  />
                </div>

                <p className="serviceman-page-profile-milestone">
                  {selectedService?.description || "No description available"}
                </p>

                {selectedService?.quotedPrice && (
                  <h3>Your Qoute: {selectedService?.quotedPrice} Rs</h3>
                )}
                <br />
                {selectedService?.status !== "paid" ? (
                  <>
                    <p>
                      {selectedService?.quotedPrice ? "Update" : "Qoate"} Your
                      Charges for this Service:
                    </p>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter Charges"
                      className="serviceman-page-quote-otp"
                      value={qoutedPrice}
                      onChange={(e) => {
                        setQoutedPrice(e.target.value);
                      }}
                    />
                    <br />
                    <button
                      className="serviceman-page-view-profile-button"
                      onClick={() => {
                        // Validate before calling the handler
                        const numericPrice = Number(qoutedPrice);
                        if (!qoutedPrice || isNaN(numericPrice) || numericPrice <= 0) {
                        toast.error("Please enter a valid numeric charge");
                          return;
                        }

                        // Proceed if valid
                        handleQouteAndAssociateVendorWithService(selectedService._id);
                      }}
                    >
                      Quote
                    </button>
                    <br />
                  </>
                ) : (
                  <>
                    <h2
                      className="serviceman-page-pin-warning"
                      fontSize={26}
                      style={{ color: "green" }}
                    >
                      EMAIL : {selectedService.email}
                      <br />
                      PHONE : {selectedService.servicePhone}
                    </h2>
                    <o>Enter Service OTP:</o>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="serviceman-page-quote-otp"
                      value={serviceOTP}
                      onChange={(e) => {
                        setServiceOTP(e.target.value);
                      }}
                    />
                    <br />
                    <button
                      className="serviceman-page-view-profile-button"
                      onClick={() =>
                        submitServiceOTP(selectedService._id, serviceOTP)
                      }
                    >
                      Submit OTP
                    </button>
                    <br />
                    {otpErr && <p className="otp-err">{otpErr}</p>}
                    <br />
                  </>
                )}

                <div className="serviceman-page-profile-info-section">
                  <a
                    href={`tel:${selectedService?.mobile}`}
                    className="serviceman-page-call-button"
                    style={{ textDecoration: "none" }}
                  >
                    <Phone className="serviceman-page-call-icon" size={18} />
                    Call Customer Now
                  </a>
                </div>

                <div className="serviceman-page-profile-divider"></div>

                <div className="serviceman-page-profile-contact">
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
            {centerLoc && (
              <GoogleMap
                mapContainerClassName="serviceman-page-google-map-container"
                center={centerLoc}
                zoom={14}
                onLoad={onMapLoad}
                onClick={() => setSelectedService(null)}
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
                {centerLoc && (
                  <Marker
                    position={centerLoc}
                    icon={userIcon || undefined}
                    title="Your location"
                  />
                )}

                {requestedServices.map((service) => {
                  if (
                    !service.coordinates ||
                    service.coordinates.length !== 2
                  ) {
                    console.warn(
                      "Invalid coordinates for service:",
                      service._id,
                    );
                    return null;
                  }

                  return (
                    <Marker
                      key={service._id}
                      position={{
                        lat: service.coordinates[0],
                        lng: service.coordinates[1],
                      }}
                      onClick={() => handleServiceSelect(service)}
                      icon={
                        mapLoaded && window.google && window.google.maps
                          ? {
                              url: mapPinUrl,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }
                          : undefined
                      }
                      title={service.name}
                    />
                  );
                })}

                {selectedService &&
                  selectedService.coordinates &&
                  selectedService.coordinates.length === 2 && (
                    <InfoWindow
                      position={{
                        lat: selectedService.coordinates[0],
                        lng: selectedService.coordinates[1],
                      }}
                      onCloseClick={() => setSelectedService(null)}
                    >
                      <div className="serviceman-page-info-window" style={{}}>
                        <h3>{selectedService.name}</h3>
                        <br />
                        <img
                          src={selectedService.image}
                          alt={selectedService?.name}
                          className="serviceman-page-profile-image"
                          style={{
                            minWidth: "175px",
                            height: "100px",
                            borderRadius: "0%",
                          }}
                        />
                        <br />
                        <br />
                        <h4 className="serviceman-page-info-experience">
                          Category: {selectedService.category}
                        </h4>

                        <p className="serviceman-page-info-category">
                          Description: {selectedService.description}
                        </p>

                        <p className="serviceman-page-info-category">
                          Address: {selectedService.landmark}
                        </p>
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
