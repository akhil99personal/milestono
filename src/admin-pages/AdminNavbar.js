import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import "./AdminNavbar.css";
import "./admin-global.css";

const RouteLink = ({ routeLink, Icon, routeName, isMobile, cnt }) => {
  const location = useLocation();
  return (
    <Link
      to={`/${routeLink}`}
      className={`admin-nav-item ${location.pathname === `/${routeLink}` ? "selected" : ""}`}
    >
      <i className={Icon}></i>
      {isMobile && <span>{routeName}</span>}
      {cnt && cnt >= 1 && <span>({cnt})</span>}
    </Link>
  );
};

RouteLink.propTypes = {
  routeLink: PropTypes.string.isRequired,
  Icon: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

function GlobalSidebar() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(true);
  const [srmncnt, setSrmnCnt] = useState(0);
  const [problemCnt, setProblemsCnt] = useState(0);
  const [notiCnt, setNotiCnt] = useState(0);

  const handleGetServiceMan = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/serviceman_details`);
      setSrmnCnt(
        response.data.filter((ele) => ele.status === "pending").length,
      );
    } catch (error) {
      console.error("Error fetching property details:" + error);
    }
  };
  const fetchProblems = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/problem_details`);
      setProblemsCnt(
        response.data.filter((ele) => ele.status === "pending").length,
      );
    } catch (error) {
      console.error("Error fetching problems:" + error);
    }
  };
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/problem_details`);
      setNotiCnt(
        response.data.filter((ele) => ele.status === "adminReview").length,
      );
    } catch (error) {
      console.error("Error fetching problems:" + error);
    }
  };
  useEffect(() => {
    handleGetServiceMan();
    fetchProblems();
    fetchNotifications();
  }, []);
  const toggleShowText = () => setShowText(!showText);

  const adminRoutes = [
    {
      routeLink: "admin-dashboard",
      Icon: "fa-solid fa-house",
      routeName: "Dashboard",
    },
    {
      routeLink: "admin-article",
      Icon: "fa fa-newspaper-o",
      routeName: "Post Articles",
    },
    {
      routeLink: "admin-user-details",
      Icon: "fa-solid fa-user",
      routeName: "Users",
    },
    {
      routeLink: "admin-property",
      Icon: "fa-solid fa-building",
      routeName: "Property",
    },
    {
      routeLink: "admin-pay-requests",
      Icon: "fa-solid fa-dollar-sign",
      routeName: "Pay to Requests",
    },
    {
      routeLink: "admin-service",
      Icon: "fa-solid fa-wrench",
      routeName: "Vendor",
    },
    {
      routeLink: "admin-new-projects",
      Icon: "fa fa-city",
      routeName: "New Projects",
    },
    {
      routeLink: "admin-all-agents",
      Icon: "fa fa-users",
      routeName: "All Agents",
    },
    {
      routeLink: "admin-service-vendors",
      Icon: "fa fa-hard-hat",
      routeName: "Service Vendors",
    },
    {
      routeLink: "admin-new-agents",
      Icon: "fa fa-user-secret",
      routeName: "New Agents",
    },
    {
      routeLink: "admin-feedback",
      Icon: "fa-solid fa-comment",
      routeName: "FeedBack",
    },
    {
      routeLink: "admin-inquries",
      Icon: "fa fa-headset",
      routeName: "Inquired Properties",
    },
    {
      routeLink: "admin-bank-details",
      Icon: "fa fa-university",
      routeName: "Bank Details",
    },
    {
      routeLink: "admin-gallery-images",
      Icon: "fa fa-image",
      routeName: "Desktop Gallery Images",
    },
    {
      routeLink: "admin-mob-gallery-images",
      Icon: "fa fa-image",
      routeName: "Mobile Gallery Images",
    },
    {
      routeLink: "admin-premium-users",
      Icon: "fa-solid fa-file-alt",
      routeName: "Premium Users",
    },
  ];

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setShowText(false);
    }
  }, []);

  return (
    <div className={`admin-sidebar-container ${showText ? "show" : "hide"}`}>
      <div className="admin-sidebar">
        <div className="heading-section admin-nav-item">
          {/* <i className="fa-solid fa-m head-icon"></i> */}
          <span className="heading-name">{showText ? "Milestono" : "M"}</span>
        </div>
        <div className="admin-toggle-button">
          <button
            onClick={toggleShowText}
            className={`admin-toggle-icons ${showText ? "show" : "hide"}`}
            title="Toggle Sidebar"
          >
            {showText ? (
              <i className="fa-solid fa-chevron-left"></i>
            ) : (
              <i className="fa-solid fa-chevron-right"></i>
            )}
          </button>
        </div>

        <nav className="admin-navbar">
          {/* Link Wrapper ensures clean mapping over array elements with badges */}
          {adminRoutes.map(({ routeLink, Icon, routeName }) => {
            const countBadge = routeName === "Vendor" ? (srmncnt > 0 ? srmncnt : null)
              : routeName === "Service Requests" ? (problemCnt > 0 ? problemCnt : null)
                : routeName === "Notifications" ? (notiCnt > 0 ? notiCnt : null)
                  : null;

            return (
              <RouteLink
                key={routeLink}
                routeLink={routeLink}
                Icon={Icon}
                routeName={routeName}
                isMobile={showText}
                cnt={countBadge}
              />
            );
          })}

          <div
            onClick={() => {
              localStorage.removeItem("auth");
              localStorage.removeItem("user_id");
              window.location.href = "/";
            }}
            className="admin-nav-item"
            style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px" }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            {showText && <span>Logout</span>}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default GlobalSidebar;
