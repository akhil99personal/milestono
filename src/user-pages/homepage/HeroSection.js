import { Link, useNavigate, useLocation } from "react-router-dom";
import building from "../../images/building1.jpg";
import buildingMob from "../../images/building-mobv.jpg";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import UserProfieNavbar from "../UserProfileNavbar";
import "./HeroSection.css";
import NavBar from "../NavBar";
import { io } from "socket.io-client";

import {
  FaBookmark,
  FaBuilding,
  FaCalculator,
  FaChartPie,
  FaChevronDown,
  FaCity,
  FaClipboard,
  FaClipboardCheck,
  FaClipboardList,
  FaEye,
  FaHardHat,
  FaHome,
  FaInfoCircle,
  FaLandmark,
  FaLocationArrow,
  FaPenAlt,
  FaPhoneAlt,
  FaPlayCircle,
  FaQuestion,
  FaQuestionCircle,
  FaRoad,
  FaSearch,
  FaSearchPlus,
  FaShip,
  FaTasks,
  FaTools,
  FaUser,
  FaUsers,
  FaUserTie,
  FaMapMarkedAlt,
  FaLightbulb,
  FaNewspaper,
  FaHammer,
  FaHotel,
  FaHouseUser,
  FaMoneyCheck,
  FaInfo,
  FaInnosoft,
} from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import MilestonoLogo from "../../images/Milestono logo.png";

import Person1 from "../../images/Person1.jpg";
import Person2 from "../../images/Person2.jpg";
import PersonDummy from "../../images/PersonDummy.png";
import TeamDummy from "../../images/TeamDummy.png";
import postpropertyImg from "../../images/menudrawer post property.png";
import savepropertyImg from "../../images/menudrawer search property.png";
import postserviceImg from "../../images/menudrawer save property.png";
import useserviceImg from "../../images/plumber.png";
import { handlePayment } from "../../others/Payment";

function HeroSection({ selectedType, setSelectedType, selected, setSelected, handleMarkAsRead, problems, setProblems }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [payToProblem, setPayToProblem] = useState([]);
  const [verifyProblem, setVerifiedProblem] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOTPOpen, setIsOTPModalOpen] = useState(false);
  const [expectedPrice, setExpectedPrice] = useState("");
  const [otp, setOTP] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchArea, setSearchArea] = useState("");
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [searchByDistrict, setSearchByDistrict] = useState(false);
  const [showSearchGuide, setShowSearchGuide] = useState(true);
  const [isGuideExpanded, setIsGuideExpanded] = useState(false);
  const notiModalRef = useRef(null);
  const [city, setCity] = useState("Loading...");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // autocompleteServiceRef removed — using AutocompleteSuggestion static API instead.
  const placesServiceRef = useRef(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    premiumEndDate: "",
    userFullName: "",
    premiumAccountName: "",
  });
  const [gallerys, setGallerys] = useState([]);
  const [mobGallerys, setMobGallerys] = useState([]);
  const [latLong, setLatLong] = useState([
    18.52097398044019, 73.86017831259551,
  ]);

  const [desktopImg, setDesktopImg] = useState(null);
  const [mobImg, setMobImg] = useState(null);
  const socketRef = useRef(null);

  const isMobile = windowWidth <= 768;

  const authenticateUser = async () => {
    try {
      const token = localStorage.getItem("auth");
      if (!token) {
        console.error("No auth token found");
        return;
      }
      const response = await axios.get(`${BASE_URL}/api/authenticate`, {
        headers: {
          Authorization: token,
        },
      });
      setIsAuthenticated(response.data.role === "user");
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const getUserData = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/user-data`, {
        headers: {
          Authorization: token,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user service details:" + error);
    }
  };

  useEffect(() => {
    authenticateUser();
    getUserData();
  }, []);

  const glogout = () => {
    window.open(`${BASE_URL}/auth/logout`, "_self");
  };

  useEffect(() => {
    if (!googleMapsLoaded) return;
    // autocompleteServiceRef no longer needed — using new static
    // AutocompleteSuggestion.fetchAutocompleteSuggestions() API.
    // Keeping placesServiceRef for any legacy use elsewhere in the file.
    placesServiceRef.current = new window.google.maps.places.PlacesService(
      document.createElement("div"),
    );
  }, [googleMapsLoaded]);

  useEffect(() => {
    const loadScript = (url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleMapsLoaded(true);
      document.head.appendChild(script);
    };

    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    if (googleApiKey) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&v=weekly`,
      );
    }
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getAreaName = async () => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLong[0]},${latLong[1]}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;

        const areaComponent =
          addressComponents.find((component) =>
            component.types.includes("sublocality_level_1"),
          ) ||
          addressComponents.find((component) =>
            component.types.includes("locality"),
          );

        navigate(
          `/search?location=${areaComponent ? areaComponent.long_name : "Unknown Area"}`,
        );
      } else {
        navigate("/search?location=Pune");
      }
    } catch (error) {
      console.error("Error fetching area name", error);
      navigate("/search?location=Pune");
    }
  };

  useEffect(() => {
    const getCityName = async (latitude, longitude) => {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          const cityComponent = addressComponents.find((component) =>
            component.types.includes("locality"),
          );
          setCity(cityComponent ? cityComponent.long_name : "Unknown Location");
        } else {
          setCity("Pune");
        }
      } catch (error) {
        console.error("Error fetching city name", error);
        setCity("Pune");
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatLong([latitude, longitude]);
        getCityName(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location", error);
        setCity("Pune");
      },
    );
  }, []);

  const handleClickOutside = (event) => {
    if (notiModalRef.current && !notiModalRef.current.contains(event.target)) {
      setIsNotificationModalOpen(false);
    }
  };

  useEffect(() => {
    if (isNotificationModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationModalOpen]);

  const handleSelection = (type) => {
    setSelectedType(type);
    const queryParams =
      type === "Commercial" ? `category=${type}` : `type=${type}`;
    navigate(`/search?${queryParams}`);
  };

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const fetchProblems = async () => {
    try {
      const token = localStorage.getItem("auth");
      if (!token) {
        console.error("No auth token found");
        return;
      }
      const response = await axios.get(`${BASE_URL}/api/notification`, {
        headers: {
          Authorization: token,
        },
      });
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };
  useEffect(() => {
    fetchProblems();
  }, []);

  const openModal = (request) => {
    setSelectedProblem(request);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProblem(null);
  };

  const toggleModal = () => {
    setIsModalOpen(false);
    setIsOTPModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/admin_servicerequest/${selectedProblem._id}`,
        { expectedPrice },
      );
      navigate("/");
    } catch (error) {
      console.error("Error submitting property details:", error);
    }
    toggleModal();
  };

  const handlePaid = async (id) => {
    try {
      await axios.put(`${BASE_URL}/api/paid_servicerequest/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error submitting property details:", error);
    }
    fetchProblems();
  };

  const fetchGallerys = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/gallery`);
      setGallerys(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    }
  };

  const fetchMobGallerys = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/mob-gallery`);
      setMobGallerys(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    }
  };

  useEffect(() => {
    fetchGallerys();
    fetchMobGallerys();
  }, []);

  useEffect(() => {
    let desktopIndex = 0;
    let mobIndex = 0;

    const desktopInterval = setInterval(() => {
      if (gallerys.length > 0) {
        setDesktopImg(gallerys[desktopIndex].image);
        desktopIndex = (desktopIndex + 1) % gallerys.length;
      }
    }, 3000);

    const mobInterval = setInterval(() => {
      if (mobGallerys.length > 0) {
        setMobImg(mobGallerys[mobIndex].image);
        mobIndex = (mobIndex + 1) % mobGallerys.length;
      }
    }, 3000);

    return () => {
      clearInterval(desktopInterval);
      clearInterval(mobInterval);
    };
  }, [gallerys, mobGallerys]);

  const handleVerify = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/verify_servicerequest/${selectedProblem._id}`,
        { otp },
      );
      navigate("/");
    } catch (error) {
      console.error("Error submitting property details:", error);
    }
    toggleModal();
    fetchProblems();
  };

  const toggleRejectModal = () => {
    setIsRejectModalOpen(false);
  };
  const handleReject = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/api/servicerequest/${selectedProblem._id}`,
      );
      fetchProblems();
      navigate("/");
    } catch (error) {
      console.error("Error submitting property details:", error);
    }
    setIsRejectModalOpen(false);
    fetchProblems();
  };

  const handleAreaChange = async (e) => {
    const query = e.target.value;
    setSearchArea(query);

    if (query.length > 2) {
      try {
        const { suggestions } =
          await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            {
              input: query,
              includedRegionCodes: ["in"],
            }
          );

        const allowedTypes = [
          "sublocality",
          "sublocality_level_1",
          "sublocality_level_2",
          "neighborhood",
          "administrative_area_level_3",
          "administrative_area_level_4",
        ];
        const blockedTypes = [
          "locality",
          "administrative_area_level_1",
          "administrative_area_level_2",
          "country",
        ];

        const areaOnly = (suggestions || [])
          .map(({ placePrediction }) => ({
            place_id: placePrediction.placeId,
            description: placePrediction.text.toString(),
            types: placePrediction.types ?? [],
          }))
          .filter(({ types }) =>
            types.some((t) => allowedTypes.includes(t)) &&
            !types.some((t) => blockedTypes.includes(t))
          );

        setAreaSuggestions(areaOnly);
      } catch (err) {
        console.error("AutocompleteSuggestion (area) error:", err);
        setAreaSuggestions([]);
      }
    } else {
      setAreaSuggestions([]);
    }
  };

  const handleCityChange = async (e) => {
    const query = e.target.value;
    setSearchArea(query);

    if (query.length > 2) {
      try {
        const { suggestions } =
          await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            {
              input: query,
              includedPrimaryTypes: ["locality"],
              includedRegionCodes: ["in"],
            }
          );

        const normalised = (suggestions || []).map(({ placePrediction }) => ({
          place_id: placePrediction.placeId,
          description: placePrediction.text.toString(),
          types: placePrediction.types ?? [],
        }));
        setCitySuggestions(normalised);
      } catch (err) {
        console.error("AutocompleteSuggestion (city) error:", err);
        setCitySuggestions([]);
      }
    } else {
      setCitySuggestions([]);
    }
  };

  const [inbox, setInbox] = useState([
    {
      id: 1,
      name: "Hailey Garza",
      profilePic: Person1,
      action: "added new tags to",
      project: "🔥 Ease Design System",
      tags: ["UI Design", "Dashboard", "Design system"],
      time: "1 min ago",
    },
    {
      id: 2,
      name: "Emily",
      profilePic: Person2,
      action: "asked to join",
      project: "🔥 Ease Design System",
      tags: ["Web dev"],
      time: "1 hour ago",
    },
    {
      id: 3,
      name: "Kamron",
      profilePic: PersonDummy,
      action: "asked to join",
      project: "🔥 Ease Design System",
      time: "1 hour ago",
    },
    {
      id: 4,
      name: "Hailey Garza",
      profilePic: Person1,
      action: "added new tags to",
      project: "🔥 Ease Design System",
      tags: ["UI Design", "Dashboard", "Design system"],
      time: "1 min ago",
    },
    {
      id: 5,
      name: "Emily",
      profilePic: Person2,
      action: "asked to join",
      project: "🔥 Ease Design System",
      tags: ["Web dev"],
      time: "1 hour ago",
    },
    {
      id: 6,
      name: "Kamron",
      profilePic: PersonDummy,
      action: "asked to join",
      project: "🔥 Ease Design System",
      time: "1 hour ago",
    },
  ]);

  const [team, setTeam] = useState([
    {
      id: 1,
      name: "Winfield",
      profilePic: TeamDummy,
      action: "mentioned you in",
      project: "🍉 Kohaku Landing Page",
      time: "Feb 8",
      comment:
        "Hey, I just brought in some missing states from our old design file. Can you help set up the components?",
    },
    {
      id: 2,
      name: "MG",
      profilePic: TeamDummy,
      action: "mentioned you in",
      project: "Cammins FAQs Page",
      time: "Dec 5",
      comment:
        "Hey, I just brought in some missing states from our old design file. Can you help set up the components?",
    },
  ]);

  const [activeTab, setActiveTab] = useState("Inbox");

  const renderNotification = (item) => {
    return (
      <div key={item.id} className="notification-item">
        <img
          src={item.image || PersonDummy}
          alt="notification"
          className="profile-pic"
        />
        <div className="notification-content">
          <p>{item.textInfo}</p>
          <div className="actions">
            <button
              onClick={() => {
                item.firstFunction();
              }}
              className="accept-button"
            >
              {item.firstBtn}
            </button>
            <button
              onClick={() => {
                item.secondFunction();
              }}
              className="decline-button"
            >
              {item.secondBtn}
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const cities = [
      "Pune",
      "Mumbai",
      "Solapur",
      "Satara",
      "Amravati",
      "Delhi",
      "Maharashtra",
      "Karnataka",
      "Tamil Nadu",
      "Gujarat",
      "Rajasthan",
      "Uttar Pradesh",
    ];

    const areas = [
      "Bandra West, Mumbai, Maharashtra, India",
      "Andheri East, Mumbai, Maharashtra, India",
      "Koregaon Park, Pune, Maharashtra, India",
      "Hinjewadi, Pune, Maharashtra, India",
      "Wakad, Pune, Maharashtra, India",
      "Viman Nagar, Pune, Maharashtra, India",
      "Connaught Place, New Delhi, Delhi, India",
      "Karol Bagh, New Delhi, Delhi, India",
      "Sector 18, Noida, Uttar Pradesh, India",
      "MG Road, Bengaluru, Karnataka, India",
      "Indiranagar, Bengaluru, Karnataka, India",
      "Whitefield, Bengaluru, Karnataka, India",
      "Banjara Hills, Hyderabad, Telangana, India",
      "Jubilee Hills, Hyderabad, Telangana, India",
      "T Nagar, Chennai, Tamil Nadu, India",
      "Anna Nagar, Chennai, Tamil Nadu, India",
      "Park Street, Kolkata, West Bengal, India",
      "Salt Lake Sector V, Kolkata, West Bengal, India",
      "CG Road, Ahmedabad, Gujarat, India",
      "Satellite, Ahmedabad, Gujarat, India"
    ];

    let index = 0;

    const interval = setInterval(() => {
      const inputElement = document.getElementById("propertySearchInput");
      if (inputElement) {
        const searchList = searchByDistrict ? areas : cities;
        inputElement.placeholder = searchByDistrict
          ? `Search area "${searchList[index]}"`
          : `Search city "${searchList[index]}"`;
        index = Math.floor(Math.random() * searchList.length);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [searchByDistrict]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubmenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
    if (openDropdown === menu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(menu);
    }
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const [buyHomeOpen, setBuyHomeOpen] = useState(false);
  const [popularAreasOpen, setPopularAreasOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleBuyHome = () => {
    setBuyHomeOpen(!buyHomeOpen);
    if (!buyHomeOpen) {
      setPopularAreasOpen(false);
    }
  };

  const togglePopularAreas = () => {
    setPopularAreasOpen(!popularAreasOpen);
    if (!popularAreasOpen) {
      setBuyHomeOpen(false);
    }
  };

  console.log(userData);

  return (
    <>
      <div className="background-image">
        <div className="image-container">
          {windowWidth > 768 ? (
            <img src={desktopImg ? desktopImg : building} alt="With Gradient" />
          ) : (
            <img src={mobImg ? mobImg : buildingMob} alt="With Gradient" />
          )}
          <div className="image-content">
            <div className="hero_section">
              <div
                className="hero_top_section"
                data-aos="fade-in"
                data-aos-duration="1000"
              >
                <div className="heading-location">
                  <div className="milestono">
                    <h1 style={{ fontFamily: "The Season" }}>milestono</h1>
                  </div>
                  {city && <div className="location">Buy in {city} </div>}
                </div>

                <div className="mobile-menu">
                  <div className="mobile-menu-toggle" onClick={toggleMenu}>
                    <svg
                      width="35px"
                      height="35px"
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                        fill="white"
                      ></path>
                    </svg>
                  </div>

                  <div className={`menu-drawer ${menuOpen ? "open" : ""}`}>
                    <div className="menu-drawer-top">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "25px",
                          }}
                        >
                          <img src={PersonDummy} />
                          <h1>
                            Hello
                            {userData.userFullName && (
                              <> {userData.userFullName.split(" ")[0]},</>
                            )}{" "}
                            👋
                          </h1>
                        </div>
                        <button className="menu-close" onClick={toggleMenu}>
                          &times;
                        </button>
                      </div>
                      {isAuthenticated ? (
                        <button
                          className="menu-drawer-login-button"
                          onClick={() => {
                            localStorage.removeItem("auth");
                            localStorage.removeItem("user_id");
                            glogout();

                            window.location.reload();
                            navigate("/");
                          }}
                        >
                          Logout
                        </button>
                      ) : (
                        <button
                          className="menu-drawer-login-button"
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          Login
                        </button>
                      )}
                      {userData.userFullName &&
                        new Date(userData.premiumEndDate) > new Date() && (
                          <span className="premium-label bg-green">
                            {userData.premiumAccountName ? `${userData.premiumAccountName} Plan Active up to ` : "Premium Account Active up to "}
                            {new Date(
                              userData.premiumEndDate,
                            ).toLocaleDateString()}
                          </span>
                        )}
                    </div>

                    <div className="menu-drawer-cards-container">
                      <a
                        href="/post-property"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div className="menu-drawer-card">
                          <div>
                            Post property
                            <p>Sell/ Rent faster with Milestono</p>
                          </div>
                          <img src={postpropertyImg} />
                        </div>
                      </a>
                      <a
                        href="/myproperty?tab=shortlisted"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div className="menu-drawer-card">
                          <div>
                            Saved Property
                            <p>Saved Properties here, click to see</p>
                          </div>
                          <img src={savepropertyImg} />
                        </div>
                      </a>
                      <a
                        href="/serviceform"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div className="menu-drawer-card">
                          <div>
                            Post Service
                            <p>List your services here</p>
                          </div>
                          <img src={postserviceImg} />
                        </div>
                      </a>
                      <a
                        href="/requestserviceform"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div className="menu-drawer-card">
                          <div>
                            Use Service
                            <p>Browse and use available services</p>
                          </div>
                          <img src={useserviceImg} />
                        </div>
                      </a>
                    </div>
                    <ul>
                      <li>
                        <span
                          className="dropdown-title"
                          onClick={() => toggleSubmenu("myactivities")}
                        >
                          <span
                            style={{
                              display: "flex",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <FaTasks />
                            My Activities
                          </span>
                          <p>
                            {openDropdown === "myactivities" ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </p>
                        </span>
                        <ul
                          className={`submenu ${activeMenu === "myactivities" ? "open" : ""}`}
                          style={{ listStyle: "none" }}
                        >
                          <a href="/myproperty?tab=viewed">
                            <li>
                              <FaEye style={{ marginRight: "5px" }} />
                              Recently Viewed
                            </li>
                          </a>
                          <a href="/myproperty?tab=posted">
                            <li>
                              <FaSearch style={{ marginRight: "5px" }} />
                              Posted Property
                            </li>
                          </a>
                          <a href="/myproperty?tab=shortlisted">
                            <li>
                              <FaBookmark style={{ marginRight: "5px" }} />
                              Shortlisted
                            </li>
                          </a>
                          <a href="/myproperty?tab=contacted">
                            <li>
                              <FaPhoneAlt style={{ marginRight: "5px" }} />
                              Contacted
                            </li>
                          </a>
                        </ul>
                      </li>

                      <li>
                        <span
                          className="dropdown-title"
                          onClick={() => toggleDropdown("buyers")}
                        >
                          <span>
                            <FaHome />
                            For Buyers
                          </span>
                          <p>
                            {openDropdown === "buyers" ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </p>
                        </span>
                        <ul
                          className={`submenu ${openDropdown === "buyers" ? "open" : ""}`}
                        >
                          <li>
                            <span
                              className="dropdown-title"
                              onClick={toggleBuyHome}
                              style={{ width: "50%", justifyContent: "left" }}
                            >
                              <FaBuilding />
                              Buy a Home
                            </span>
                            <ul
                              className={`submenu ${buyHomeOpen ? "open" : ""}`}
                            >
                              <a href="/search">
                                <li>
                                  <FaBuilding />
                                  Flats
                                </li>
                              </a>
                              <a href="/search">
                                <li>
                                  <FaHammer /> Builder Floors
                                </li>
                              </a>
                              <a href="/search">
                                <li>
                                  <FaHome />
                                  Independent House
                                </li>
                              </a>
                              <a href="/search">
                                <li>
                                  <FaMapMarkedAlt />
                                  Plots in Pune
                                </li>
                              </a>
                              <a href="/search">
                                <li>
                                  <FaHotel />
                                  Serviced Apartments
                                </li>
                              </a>
                              <a href="/search">
                                <li>
                                  <FaHouseUser />
                                  Houses
                                </li>
                              </a>
                            </ul>
                          </li>
                          <li>
                            <span
                              className="dropdown-title"
                              onClick={togglePopularAreas}
                              style={{ width: "50%", justifyContent: "left" }}
                            >
                              <FaMapMarkedAlt />
                              Popular Areas
                            </span>
                            <ul
                              className={`submenu ${popularAreasOpen ? "open" : ""}`}
                              style={{
                                overflow: "scroll",
                                scrollbarWidth: "none",
                              }}
                            >
                              {[
                                "Kharadi",
                                "Baner",
                                "Hinjewadi",
                                "Wakad",
                                "Ravet",
                                "Punawale",
                                "Wagholi",
                                "Hadapsar",
                                "NIBM",
                              ].map((area) => (
                                <a
                                  key={area}
                                  href={`/search?location=${encodeURIComponent(area)}`}
                                >
                                  <li>Property in {area}</li>
                                </a>
                              ))}
                            </ul>
                          </li>
                          <li>
                            <a href="/home-loan">
                              <FaMoneyCheck />
                              Home Loan
                            </a>
                          </li>
                          <li>
                            <a href="/insights">
                              <FaLightbulb />
                              Insights
                            </a>
                          </li>
                          <li>
                            <a href="/all-news">
                              <FaNewspaper />
                              Articles & News
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span
                          className="dropdown-title"
                          onClick={() => toggleSubmenu("owners")}
                        >
                          <span>
                            <FaUserTie />
                            For Owners
                          </span>
                          <p>
                            {openDropdown === "owners" ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </p>
                        </span>
                        <ul
                          className={`submenu ${activeMenu === "owners" ? "open" : ""}`}
                        >
                          <a
                            href="/#post-property"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaPenAlt />
                              Post Property
                            </li>
                          </a>
                          <a
                            href="/#exploreService"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaTools />
                              Owner Services
                            </li>
                          </a>
                          <a
                            href="/#view-video"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaInfoCircle />
                              About Milestono
                            </li>
                          </a>
                          <a
                            href="/#view-property"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaEye />
                              View Properties
                            </li>
                          </a>
                          <a
                            href="/AboutUs"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaUser />
                              About Us
                            </li>
                          </a>
                        </ul>
                      </li>

                      <li>
                        <span
                          className="dropdown-title"
                          onClick={() => toggleSubmenu("dealers")}
                        >
                          <span>
                            <FaHardHat />
                            For Dealers / Builders
                          </span>
                          <p>
                            {openDropdown === "dealers" ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </p>
                        </span>
                        <ul
                          className={`submenu ${activeMenu === "dealers" ? "open" : ""}`}
                        >
                          <a
                            href="/property-calculator"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaCalculator />
                              Property Calculator
                            </li>
                          </a>
                          <a
                            href="/#exploreService"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaSearchPlus />
                              Explore our Service
                            </li>
                          </a>
                          <a
                            href="/#post-property"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaClipboardCheck />
                              Register to Property
                            </li>
                          </a>
                          <a
                            href="/#view-video"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaPlayCircle />
                              View Video about Milestono
                            </li>
                          </a>
                        </ul>
                      </li>

                      <li>
                        <span
                          className="dropdown-title"
                          onClick={() => toggleSubmenu("insight")}
                        >
                          <span>
                            <FaChartPie />
                            Insight
                          </span>
                          <p>
                            {openDropdown === "insight" ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </p>
                        </span>
                        <ul
                          className={`submenu ${activeMenu === "insight" ? "open" : ""}`}
                        >
                          <a
                            href="/search?city=delhi"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaLocationArrow />
                              Delhi Overview
                            </li>
                          </a>
                          <a
                            href="/search?city=mumbai"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaLandmark />
                              Mumbai Overview
                            </li>
                          </a>
                          <a
                            href="/search?city=pune"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaRoad />
                              Pune Road Overview
                            </li>
                          </a>
                          <a
                            href="/search?city=hyderabad"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaCity />
                              Hyderabad Overview
                            </li>
                          </a>
                          <a
                            href="/search?city=kolkata"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaSearchPlus />
                              Kolkata Overview
                            </li>
                          </a>
                          <a
                            href="/search?city=bangalore"
                            onClick={() => {
                              setActiveMenu(null);
                              toggleMenu();
                            }}
                          >
                            <li>
                              <FaBuilding />
                              Bangalore Overview
                            </li>
                          </a>
                        </ul>
                      </li>
                      <li>
                        <a
                          style={{ textDecoration: "none" }}
                          onClick={() => toggleMenu()}
                          className="dropdown-title"
                          href="/faqs"
                        >
                          <span>
                            <FaQuestionCircle />
                            FAQs
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="user">
                  <NavBar />
                  <div className="icon-container">
                    <div className="notification-container">
                      <i
                        className="fa-solid fa-bell notification_icon"
                        onClick={toggleNotificationModal}
                        title="click to view notification"
                      ></i>
                      {problems.length +
                        payToProblem.length +
                        verifyProblem.length >
                        0 && (
                          <span className="notification-count">
                            {problems.length +
                              payToProblem.length +
                              verifyProblem.length}
                          </span>
                        )}
                    </div>

                    {isNotificationModalOpen && (
                      <div className="notification-modal" ref={notiModalRef}>
                        <h2>Notifications</h2>
                        <button
                          className="noti-close-btn"
                          onClick={toggleNotificationModal}
                        >
                          X
                        </button>
                        <div className="notification-menu-notifications-container">
                          <div className="tab-buttons">
                            <button
                              onClick={() => setActiveTab("Inbox")}
                              className={`tab-button ${activeTab === "Inbox" ? "active-tab" : ""}`}
                            >
                              Inbox ({problems.length})
                            </button>
                          </div>

                          <div className="menu-section">
                            {problems.map((pr, ind) =>
                              renderNotification({
                                id: ind,
                                textInfo: pr.text,
                                image: pr.image,
                                firstFunction: () => {
                                  window.location.href = pr.redirect;
                                },
                                firstBtn: "Open",
                                secondFunction: () => {
                                  handleMarkAsRead(pr._id);
                                },
                                secondBtn: "Mark as read",
                              }),
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <UserProfieNavbar />
                </div>
              </div>
              {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="modal-close" onClick={closeModal}>
                      ×
                    </button>
                    <h2 className="modal-title">Service Request Details</h2>
                    {selectedProblem && (
                      <div className="modal-body">
                        <div className="modal-left">
                          <div className="modal-image">
                            <img
                              src={selectedProblem.problemImage}
                              alt="Problem"
                            />
                          </div>
                        </div>
                        <div className="modal-right">
                          <div className="modal-details">
                            <p>
                              <strong>Name:</strong> {selectedProblem.name}
                            </p>
                            <p>
                              <strong>Service Category:</strong>{" "}
                              {selectedProblem.serviceCategory}
                            </p>
                            <p>
                              <strong>Problem Type:</strong>{" "}
                              {selectedProblem.problemType}
                            </p>
                            <p>
                              <strong>Problem Description:</strong>{" "}
                              {selectedProblem.problemDescription}
                            </p>
                            <p>
                              <strong>Address:</strong>{" "}
                              {selectedProblem.address}
                            </p>
                            {selectedProblem.expectedPrice && (
                              <p>
                                <strong>Price:</strong>{" "}
                                {selectedProblem.expectedPrice}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedProblem && isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>Enter Expected Price</h2>
                    <div>
                      <label>
                        Expected Price:
                        <input
                          type="number"
                          value={expectedPrice}
                          onChange={(e) => setExpectedPrice(e.target.value)}
                          required
                        />
                      </label>
                      <div className="modal-buttons">
                        <button
                          type="button"
                          className="red-btn"
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="green-btn"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedProblem && isModalOTPOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>Confirm Your OTP</h2>
                    <div>
                      <label>
                        Enter Your OTP:
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOTP(e.target.value)}
                          required
                        />
                      </label>
                      <div className="modal-buttons">
                        <button
                          type="button"
                          className="red-btn"
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="green-btn"
                          onClick={handleVerify}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedProblem && isRejectModalOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>Confirm delete sevice detail?</h2>
                    <div>
                      <div className="modal-buttons">
                        <button
                          type="button"
                          className="grey-btn"
                          onClick={toggleRejectModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="red-btn"
                          onClick={handleReject}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="about-milestono">
                <span className="about-heading">Milestono </span> is an online
                platform offering properties in every city, perfect for sellers
                to reach more buyers and get the best deals.
              </div>

              <div className="sections">
                <div className="section_mode">
                  <Link
                    className={`real_estate ${selected && "page-selected"}`}
                    onClick={() => {
                      setSelected(true);
                    }}
                  >
                    Real Estate
                  </Link>
                  <Link
                    className={`services ${!selected && "page-selected"}`}
                    onClick={() => {
                      setSelected(false);
                    }}
                  >
                    Services
                  </Link>
                </div>

                {selected && (
                  <div className="quick-property">
                    {windowWidth > 768 && (
                      <div className="section_links">
                        <div
                          className="post"
                          onClick={() => {
                            navigate("/post-property");
                          }}
                        >
                          Post
                        </div>
                        <div
                          className={`buy ${selectedType === "Sell"
                            ? "selected-search-type"
                            : ""
                            }`}
                          onClick={() => handleSelection("Sell")}
                        >
                          Buy
                        </div>
                        <div
                          className={`rent ${selectedType === "Rent"
                            ? "selected-search-type"
                            : ""
                            }`}
                          onClick={() => handleSelection("Rent")}
                        >
                          Rent
                        </div>
                        <div
                          className={`commercial ${selectedType === "Commercial"
                            ? "selected-search-type"
                            : ""
                            }`}
                          onClick={() => handleSelection("Commercial")}
                        >
                          Commercial
                        </div>
                        <div
                          className={`pgs ${selectedType === "PG" ? "selected-search-type" : ""
                            }`}
                          onClick={() => handleSelection("PG")}
                        >
                          PGs
                        </div>
                      </div>
                    )}
                    <div className="search_bar">
                      <input
                        type="text"
                        id="propertySearchInput"
                        placeholder={
                          searchByDistrict ? "Search Area" : "Search City"
                        }
                        className="search"
                        value={searchArea}
                        onChange={searchByDistrict ? handleAreaChange : handleCityChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (searchByDistrict && searchArea !== "")
                              navigate(`/search?location=${searchArea}`);
                            else if (searchArea !== "")
                              navigate(`/search?city=${searchArea}`);
                          }
                        }}
                      />

                      {/* Search Mode Toggle */}
                      <div className="search-mode-toggle">
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={searchByDistrict}
                            onChange={() => {
                              setSearchByDistrict(!searchByDistrict);
                              setSearchArea("");
                              setCitySuggestions([]);
                              setAreaSuggestions([]);
                              setShowSearchGuide(true);
                            }}
                          />
                          <span className="toggle-slider"></span>
                          <span
                            className={`toggle-label-span`}
                            style={{ color: "white", textAlign: "center" }}
                          >
                            {searchByDistrict ? (
                              "Area"
                            ) : (
                              <p className="toggle-label-span-city">City</p>
                            )}
                          </span>
                        </label>
                      </div>
                      <svg
                        width="30px"
                        height="64px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        style={{
                          filter: `drop-shadow(3px 5px 3px rgba(0, 0, 0,0.6))`,
                        }}
                        onClick={getAreaName}
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <path fill="none" d="M0 0h24v24H0z"></path>{" "}
                            <path
                              fillRule="nonzero"
                              d="M13 1l.001 3.062A8.004 8.004 0 0 1 19.938 11H23v2l-3.062.001a8.004 8.004 0 0 1-6.937 6.937L13 23h-2v-3.062a8.004 8.004 0 0 1-6.938-6.937L1 13v-2h3.062A8.004 8.004 0 0 1 11 4.062V1h2zm-1 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
                            ></path>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                      <button
                        className=""
                        onClick={() => {
                          if (searchArea !== "")
                            if (searchByDistrict && searchArea !== "")
                              navigate(`/search?location=${searchArea}`);
                            else if (searchArea !== "")
                              navigate(`/search?city=${searchArea}`);
                        }}
                      >
                        Search
                      </button>
                      {areaSuggestions.length > 0 && (
                        <ul className="autocomplete-list">
                          {areaSuggestions.map((suggestion) => (
                            <li
                              key={suggestion.place_id}
                              onClick={() => {
                                setSearchArea(suggestion.description);
                                setAreaSuggestions([]);
                              }}
                            >
                              {suggestion.description}
                            </li>
                          ))}
                        </ul>
                      )}
                      {citySuggestions.length > 0 && (
                        <ul className="autocomplete-list">
                          {citySuggestions.map((suggestion) => (
                            <li
                              key={suggestion.place_id}
                              onClick={() => {
                                setSearchArea(suggestion.description);
                                setCitySuggestions([]);
                              }}
                            >
                              {suggestion.description}
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* {showSearchGuide && (
                        <div
                          className={`search-guide-tooltip ${isGuideExpanded ? "expanded" : "collapsed"
                            }`}
                        >
                          <button
                            className="guide-close-btn"
                            onClick={() => setShowSearchGuide(false)}
                          >
                            ×
                          </button>

                          {!isGuideExpanded && (
                            <button
                              className="guide-info-btn"
                              onClick={() => setIsGuideExpanded(true)}
                            >
                              <FaInnosoft color="white"/>
                            </button>
                          )}

                          {isGuideExpanded && (
                            <>
                              <h3 className="guide-title">
                                {searchByDistrict
                                  ? "Search by District/State"
                                  : "Search by City"}
                              </h3>

                              <p className="guide-description">
                                {searchByDistrict
                                  ? "Search properties by district or state name to find properties across larger regions. Get results from entire areas like Solapur or states like Maharashtra."
                                  : "Search properties by city name to find properties in specific cities. Get precise results for areas like Pune, Mumbai, or Delhi."}
                              </p>

                              <p className="guide-tip">
                                <strong>Tip:</strong>{" "}
                                {searchByDistrict
                                  ? 'Try searching "Solapur" or "Maharashtra" to see all properties in that region.'
                                  : 'Try searching "Shanivar wada, Pune" or "Bandra, Mumbai" to see available properties in exact areas.'}
                              </p>

                              <span
                                className="guide-learn-more"
                                onClick={() => setIsGuideExpanded(false)}
                              >
                                Got it
                              </span>
                            </>
                          )}
                        </div>
                      )} */}
                    </div>
                  </div>
                )}
              </div>
              {windowWidth <= 768 && selected && (
                <>
                  <p className="mob-section-head">
                    Post and search your{" "}
                    <span className="red-txt">Dream Home</span>.
                  </p>
                  <div className="mob-section-link">
                    <div
                      className="mob-section-icon first-mob-section-icon"
                      onClick={() => handleSelection("Sell")}
                    >
                      <i className="fa-solid fa-house"></i>
                      <p>Buy</p>
                    </div>
                    <div
                      className="mob-section-icon"
                      onClick={() => handleSelection("Rent")}
                    >
                      <i className="fa-solid fa-key"></i>
                      <p>Rent</p>
                    </div>
                    <div
                      className="mob-section-icon"
                      onClick={() => handleSelection("PG")}
                    >
                      <i className="fa-solid fa-bed"></i>
                      <p>PG</p>
                    </div>
                    <div
                      className="mob-section-icon"
                      onClick={() => handleSelection("Commercial")}
                    >
                      <i className="fa-solid fa-building"></i>
                      <p>Commercial</p>
                    </div>
                    <div
                      className="mob-section-icon"
                      onClick={() => {
                        navigate("/post-property");
                      }}
                    >
                      <i className="fa-solid fa-pen"></i>
                      <p>Post</p>
                    </div>
                  </div>
                </>
              )}

              {!selected && (
                <>
                  <div className="property_posting">
                    <p
                      onClick={() => {
                        navigate("/serviceform");
                      }}
                    >
                      Are you an Service Provider?{" "}
                      <b>Post your service role here.</b>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

HeroSection.propTypes = {
  selectedType: PropTypes.string,
  setSelectedType: PropTypes.func,
  selected: PropTypes.bool,
  setSelected: PropTypes.func,
};

export default HeroSection;
