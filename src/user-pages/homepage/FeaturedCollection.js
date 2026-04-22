import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./FeaturedCollection.css";

import dummyImg from "../../images/dummyImage.webp";

const FeaturedCollection = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const showcaseRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  const isMobileView = () => {
    return window.innerWidth <= 768;
  };

  useEffect(() => {
    const checkVisibility = () => {
      if (!isMobileView()) {
        setShowButton(listings.length > 3);
      }
    };

    checkVisibility();
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.removeEventListener("resize", checkVisibility);
    };
  }, [listings]);

  const scrollRight = () => {
    showcaseRef.current.scrollBy({ left: 325, behavior: "smooth" });
  };

  const handleSearch = async (latitude, longitude, radius) => {
    const token = localStorage.getItem("auth");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/home-properties`,
        {
          latitude,
          longitude,
          radius,
        },
        { headers: { Authorization: token } },
      );
      setListings(response.data);
    } catch (error) {
      setListings([]);
      console.error("Error searching properties:", error);
    }
  };

  const handleSaveClick = async (id) => {
    const token = localStorage.getItem("auth");
    if (!token) {
      if (window.confirm("If you want to unlock, login first.")) {
        navigate("/login");
      }
      return;
    }
    try {
      await axios.post(
        `${BASE_URL}/api/save-property`,
        { property_id: id },
        { headers: { Authorization: token } },
      );
      getProperties();
    } catch (error) {
      console.error("Error marking property as saved:", error);
    }
  };

  const getProperties = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleSearch(latitude, longitude, 50);
      },
      (error) => {
        console.error("Error getting location", error);
        handleSearch(18.52097398044019, 73.86017831259551, 50);
      },
    );
  };

  useEffect(() => {
    getProperties();
  }, []);

  function SampleProperties({ property, idx }) {
    return (
      <div className="recommened-property-card" key={idx}>
        <div className="recommened-property-header">
          <img
            src={property.uploadedPhotos[0]}
            alt="Property"
            className="recommened-property-image"
          />
        </div>
        {property.bulkCount && property.bulkCount > 1 && (
          <div className="bulk-home-container">X {property.bulkCount}</div>
        )}
        <div className="recommened-property-info">
          <h3>
            {property.heading} ({property.sellerType})
          </h3>
          <p>
            Location:{" "}
            {property.landmark.replace(/\b\w/g, (char) => char.toUpperCase())},{" "}
            {property.city}
          </p>
          <p>
            {property.sellType === "Sell" ? "Price: " : "Rent: "}
            Rs{" "}
            <span className="recommened-highlight-price">
              {property.sellType === "Sell"
                ? property.expectedPrice
                : property.pricePerMonth}
            </span>{" "}
            | {property.bedrooms}
            {property.bedrooms !== "1RK" && <>BHK</>}
          </p>

          <div className="recommened-property-actions">
            <button
              className="recommened-save-btn"
              onClick={() => {
                handleSaveClick(property._id);
              }}
            >
              {property.saved ? "Saved" : "Save Property"}
            </button>
            <button
              className="recommened-contact-btn"
              onClick={() => {
                navigate(`/details/${property._id}`);
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scrollShowcase = (direction) => {
    const showcaseElement = document.querySelector(".showcase_elements");
    const scrollAmount = showcaseElement.firstChild.offsetWidth + 20;
    showcaseElement.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#view-property") {
      const element = document.getElementById("scrollViewProperty");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <div className="showcase_container top-margin" id="scrollViewProperty">
        <h1 className="main-heading-for-all-website">
          <span>Featured</span> Properties
        </h1>

        <p>Properties only for you</p>
        {listings.length > 3 && (
          <div className="showcase_controls">
            <button
              className="propertyprevBtn"
              onClick={() => scrollShowcase(-1)}
            >
              &lt;
            </button>
            <button
              className="propertynextBtn"
              onClick={() => scrollShowcase(1)}
            >
              &gt;
            </button>
          </div>
        )}

        {
          <div className="showcase_elements">
            {listings.map((_, idx) => (
              <SampleProperties
                property={_}
                idx={idx}
                handleSaveClick={handleSaveClick}
              />
            ))}
          </div>
        }
        <br></br>
        <br></br>
      </div>
    </>
  );
};

export default FeaturedCollection;
