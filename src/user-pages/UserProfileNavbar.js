import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import "./UserProfileNavbar.css";
import PropTypes from "prop-types";

import "./homepage/HeroSection.css";
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
} from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const UserProfileNavbar = ({ svgColor, opposite }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [crm, setCrm] = useState(false);
  const [userData, setUserData] = useState({
    userFullName: "",
    premiumEndDate: "",
    premiumAccountName: "",
    countOfContactedProperty: 0,
    countOfSavedProperty: 0,
    countOfPostedProperty: 0,
    countOfRequestedService: 0,
    countOfProvidedService: 0,
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

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

  const authenticateAgent = async () => {
    try {
      const token = localStorage.getItem("auth");
      if (!token) {
        console.error("No auth token found");
        return;
      }
      const response = await axios.get(`${BASE_URL}/api/crm-access`, {
        headers: {
          Authorization: token,
        },
      });
      setCrm(response.data.crmAccess);
    } catch (error) {
      setCrm(false);
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
    authenticateAgent();
    getUserData();
  }, []);

  const glogout = () => {
    window.open(`${BASE_URL}/auth/logout`, "_self");
  };

  var isMobileView = window.innerWidth <= 786;

  const [activeMenu, setActiveMenu] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    toggleSidebar();
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

  return (
    <>
      {!isMobileView ? (
        <>
          <svg
            onClick={toggleSidebar}
            width="35px"
            height="35px"
            className="userProfileNavbar"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                fill="white"
              ></path>{" "}
            </g>
          </svg>
        </>
      ) : (
        <svg
          onClick={toggleSidebar}
          width="45px"
          height="45px"
          className="userProfileNavbar"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              fill="var(--primary-color)"
              d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-6.24-.064H6.81a2.528 2.528 0 0 0-2.692 2.303v1.51a.794.794 0 0 0 .792.792h7.166a.794.794 0 0 0 .792-.791V11.82a2.528 2.528 0 0 0-2.692-2.302zM6.14 6.374a2.353 2.353 0 1 0 2.353-2.353A2.353 2.353 0 0 0 6.14 6.374z"
            ></path>
          </g>
        </svg>
      )}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <button className="close-button" onClick={toggleSidebar}>
              <i className="fa-solid fa-times arrow-back-icon"></i>
            </button>
          </div>
          <div className="header">
            <span>
              Hello
              {userData.userFullName && (
                <> {userData.userFullName.split(" ")[0]},</>
              )}{" "}
              👋
            </span>
            {isAuthenticated ? (
              <button
                className="logout-btn"
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
                className="login-btn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            )}
          </div>
          {userData.userFullName &&
            new Date(userData.premiumEndDate) > new Date() && (
              <span className="premium-label">
                {userData.premiumAccountName ? `${userData.premiumAccountName} Plan Active up to ` : "Premium Account Active up to "}
                {new Date(userData.premiumEndDate).toLocaleDateString()}
              </span>
            )}

          <p className="sidebar-grey-color-text">My Property</p>
          <hr className="sidebar-grey-color-line" />

          <div className="activity-count-tabs">
            <div className="count-tab">
              Saved Properties{" "}
              <p className="count">{userData.countOfSavedProperty}</p>
            </div>
            <div className="count-tab">
              Contacted Properties{" "}
              <p className="count">{userData.countOfContactedProperty}</p>
            </div>
            <div className="count-tab">
              Posted Properties{" "}
              <p className="count">{userData.countOfPostedProperty}</p>
            </div>
          </div>

          <div className="sidebar-property-actions">
            <div className="sidebar-action-container">
              <div className="sidebar-action-card">
                <i className="fa-solid fa-search sidebar-action-icon search-icon"></i>
                <button
                  className="sidebar-action-btn sidebar-post"
                  onClick={() => {
                    navigate("/search");
                  }}
                >
                  Search Property
                </button>
              </div>
              <span className="or-text">Or</span>
              <div className="sidebar-action-card">
                <i className="fa-solid fa-plus sidebar-action-icon post-icon"></i>
                <button
                  className="sidebar-action-btn sidebar-post"
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate("/post-property");
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  Post your property
                </button>
              </div>
            </div>
          </div>

          <p className="sidebar-grey-color-text">My Service</p>
          <hr className="sidebar-grey-color-line" />
          <div className="activity-count-tabs">
            <div className="count-tab">
              Used Services{" "}
              <p className="count">{userData.countOfRequestedService}</p>
            </div>
            <div className="count-tab">
              Provided Services{" "}
              <p className="count">{userData.countOfProvidedService}</p>
            </div>
          </div>

          <div className="sidebar-property-actions">
            <div className="sidebar-action-container">
              <div className="sidebar-use-service-action-card">
                <i className="fa-solid fa-hands-helping sidebar-action-icon use-service-icon"></i>
                <button
                  className="sidebar-action-btn sidebar-search"
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate("/requestserviceform");
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  Use Service
                </button>
              </div>

              <>
                <span className="or-text">Or</span>
                <div className="sidebar-add-service-action-card">
                  <i className="fa-solid fa-cogs sidebar-action-icon add-service-icon"></i>
                  <button
                    className="sidebar-action-btn sidebar-search"
                    onClick={() => {
                      if (isAuthenticated) {
                        navigate("/receivedservicerequests");
                      } else {
                        navigate("/receivedservicerequests");
                      }
                    }}
                  >
                    Received Service Requests
                  </button>
                </div>
              </>
            </div>
          </div>
          <br />
          <hr />

          <ul
            style={{
              listStyle: "none",
              display: "grid",
              gap: "15px",
              margin: "1rem .5rem",
            }}
          >
            <li>
              <span
                className="dropdown-title"
                onClick={() => toggleSubmenu("myactivities")}
              >
                <span
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
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
                <span
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
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
                style={{ listStyle: "none" }}
              >
                <li>
                  <span
                    className="dropdown-title"
                    onClick={toggleBuyHome}
                    style={{
                      width: "50%",
                      justifyContent: "left",
                      gap: "10px",
                    }}
                  >
                    <FaBuilding />
                    Buy a Home
                  </span>
                  <ul
                    className={`submenu ${buyHomeOpen ? "open" : ""}`}
                    style={{ listStyle: "none" }}
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
                    style={{
                      width: "60%",
                      justifyContent: "left",
                      gap: "10px",
                    }}
                  >
                    <FaMapMarkedAlt />
                    Popular Areas
                  </span>
                  <ul
                    className={`submenu ${popularAreasOpen ? "open" : ""}`}
                    style={{
                      overflow: "scroll",
                      scrollbarWidth: "none",
                      listStyle: "none",
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
                      <li key={area}>
                        <a
                          href={`/search?location=${encodeURIComponent(area)}`}
                        >
                          Property in {area}
                        </a>
                      </li>
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
                <span
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
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
                style={{ listStyle: "none" }}
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
                <span
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
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
                style={{ listStyle: "none" }}
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
                <span
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
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
                style={{ listStyle: "none" }}
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
                <span
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <FaQuestionCircle />
                  FAQs
                </span>
              </a>
            </li>
          </ul>

          {isAuthenticated && (
            <div className="menu-item" onClick={toggleModal}>
              <i className="fa-solid fa-user-circle"></i> Profile
            </div>
          )}
          {crm && (
            <div
              className="menu-item"
              onClick={() => {
                navigate("/agent-dashboard");
              }}
            >
              <i className="fa-solid fa-user-secret"></i> Agent Dashboard
            </div>
          )}

          {isAuthenticated && (
            <div
              className="menu-item"
              onClick={() => {
                navigate("/myproperty");
              }}
            >
              <i className="fa-solid fa-building"></i> My Property
            </div>
          )}
          {isAuthenticated && (
            <div
              className="menu-item"
              onClick={() => {
                navigate("/myservice");
              }}
            >
              <i className="fa-solid fa-wrench"></i> My Service
            </div>
          )}

          {isAuthenticated && (
            <div
              className="menu-item"
              onClick={() => {
                navigate("/premium");
              }}
            >
              <i className="fa-solid fa-gem"></i> Premium Account
            </div>
          )}
          <div
            className="menu-item"
            onClick={() => {
              navigate("/contact-us");
            }}
          >
            <i className="fa-solid fa-envelope"></i> Contact Us
          </div>
          <div
            className="menu-item"
            onClick={() => {
              navigate("/contact-us");
            }}
          >
            <i className="fa-solid fa-question-circle"></i> Help & Support
          </div>
          <a
            className="menu-item"
            href="/all-news"
            style={{ textDecoration: "none" }}
          >
            <i className="fa-solid fa-newspaper"></i> News & Articles
          </a>
          <div
            className="menu-item"
            onClick={() => {
              localStorage.removeItem("auth");
              localStorage.removeItem("user_id");
              glogout();

              window.location.reload();
              navigate("/");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>Log Out
          </div>
        </div>
      </div>
      {modalOpen && <ProfileModal onClose={toggleModal} />}
    </>
  );
};

UserProfileNavbar.propTypes = {
  opposite: PropTypes.bool,
};

export default UserProfileNavbar;
