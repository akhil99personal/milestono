import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./SearchUserHeader.css";
import UserProfileNavbar from "../UserProfileNavbar";

const UserHeader = ({
  opposite,
  searchQuery,
  setSearchQuery,
  placePredictions,
  handlePlaceChange,
  handlePlaceSelect,
  handleSearch,
  setSearched,
  setFilters,
  setSearchCity,
  handleCitySelect,
  setCityCoordinates,
  setCoordinates,
  setFilterApplied,
  setPlacePredictions,
  togglePopover,
  searchCity,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const routeNames = {
    "/post-property": "Property Form",
    "/premium": "Premium Account",
    "/serviceform": "Service Form",
    "/requestserviceform": "Select Service",
    "/search": "milestono",
    "/details": "Property Details",
    "/myproperty": "My Property",
    "/myservice": "My Service",
  };

  const basePath = location.pathname.split("/")[1];
  const dynamicName = routeNames[`/${basePath}`] || "Milestono";
  
  const handleStepDec = () => {
    navigate(-1);
  };

  return (
    <div className="search-user-header-navigation-header">
      <div className="search-user-header-logo-section">
        <p
          onClick={handleStepDec}
          className={`search-user-header-back-head ${opposite && "search-user-header-red-text"}`}
        >
          {dynamicName}
        </p>
      </div>
      <div className="search-user-header-property-search-bar">
        <div className="search-user-header-search-input-wrapper">
          <div className="search-user-header-search-input">
            <i className="fa-solid fa-magnifying-glass search-user-header-search-icon"></i>
            <input
              type="text"
              placeholder="Search by city, locality, project name, property type..."
              value={searchQuery}
              onChange={handlePlaceChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearched(searchQuery);
                  handleSearch();
                }
              }}
            />
            {placePredictions.length > 0 && (
              <ul className="search-user-header-autocomplete-list">
                {placePredictions.map((prediction) => (
                  <li
                    key={prediction.place_id}
                    onClick={() => handlePlaceSelect(prediction)}
                  >
                    {prediction.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="search-user-header-action-buttons">
          <button className="search-user-header-button search-user-header-valuation-btn">
            <i className="fa-solid fa-star"></i> Get Valuation
          </button>
          <button className="search-user-header-button search-user-header-compare-btn">
            <i className="fa-solid fa-code-compare"></i> Compare
          </button>
        </div>

        <div className="search-user-header-right-menu">
          <button
            onClick={() => {
              setSearched(searchQuery);
              handleSearch();
            }}
            className="search-user-header-button search-user-header-search-btn"
          >
            <i className="fa-solid fa-search"></i>
          </button>
          <button
            className="search-user-header-button search-user-header-clear-btn"
            onClick={async () => {
              setSearchQuery("");
              setSearched("");
              setPlacePredictions([]);
              setFilters({
                category: "",
                bedrooms: [],
                propertyTypes: [],
                amenities: [],
                constructionStatus: [],
                postedBy: [],
                areaRange: [0, 1000],
                priceRange: [0, 10000000],
                type: "",
              });
              setSearchCity("");
              handleCitySelect("");
              setCityCoordinates([-1, -1]);
              setCoordinates([-1, -1]);
              setFilterApplied(false);
              await new Promise((resolve) => setTimeout(resolve, 0));
            }}
          >
            <i className="fa-solid fa-eraser"></i>
          </button>

          <div className="search-user-header-userHeaderNavbar">
            <button className="search-user-header-post-button search-user-header-button">
              <a
                href="/post-property"
                style={{
                  textDecoration: "none",
                  color: "var(--primary-color)",
                }}
              >
                Post a property
              </a>
            </button>
            <div
              className="user-login-container"
              style={{
                position: "relative",
                display: "inline-block",
                marginLeft: "0px",
              }}
            >
              <svg
                className="userprof"
                fill="#ffffff"
                width="35px"
                height="35px"
                style={{ marginTop: "0px", cursor: "pointer" }}
                viewBox="-1 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-6.24-.064H6.81a2.528 2.528 0 0 0-2.692 2.303v1.51a.794.794 0 0 0 .792.792h7.166a.794.794 0 0 0 .792-.791V11.82a2.528 2.528 0 0 0-2.692-2.302zM6.14 6.374a2.353 2.353 0 1 0 2.353-2.353A2.353 2.353 0 0 0 6.14 6.374z"></path>
                </g>
              </svg>
              <div
                className="user-login-menu"
                style={{ transform: "translateX(25%)" }}
              >
                <h4>My Activity</h4>
                <ul>
                  <li>
                    <a href="/myproperty?tab=viewed">Recently viewed</a>
                  </li>
                  <li>
                    <a href="/myproperty?tab=posted">Posted Property</a>
                  </li>
                  <li>
                    <a href="/myproperty?tab=shortlisted">Shortlisted</a>
                  </li>
                  <li>
                    <a href="/myproperty?tab=contacted">Contacted</a>
                  </li>
                </ul>
              </div>
            </div>

            <UserProfileNavbar />
          </div>
          {windowWidth <= 768 && (
            <button
              className="search-user-header-filter-button search-user-header-button"
              onClick={togglePopover}
            >
              <i className="fa-solid fa-filter"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

UserHeader.propTypes = {
  opposite: PropTypes.bool,
};

export default UserHeader;
