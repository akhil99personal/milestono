import { React, useEffect, useState } from "react";
import "./PropertyRegistration.css";
import faCall from "react-icons";
import MegaMenuImg from "../../images/post-property-homepage-bgBanner.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PropertyRegistration = () => {
  const location = useLocation();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState({
    users: 0,
    projects: 0,
    properties: 0,
  });
  const navigate = useNavigate();

  const handleData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/home-count`);
      setData(response.data);
    } catch (error) {
      console.error("Error searching properties:", error);
    }
  };

  useEffect(() => {
    handleData();
    if (location.hash === "#post-property") {
      const element = document.getElementById("scrollpostproperty");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <section className="property-registration" id="scrollpostproperty">
      <div className="property-registration-content-wrapper">
        <div className="property-registration-left-content">
          <p className="property-registration-subtitle">
            SELL OR RENT YOUR PROPERTY
          </p>

          <h1 className="property-registration-main-heading">
            Register to post your property
          </h1>
          <br></br>

          <p className="property-registration-description">
            Post your residential / commercial property
          </p>

          <div className="property-registration-stats-container">
            <div className="property-registration-stat-item">
              <h2>{String(data.properties).padStart(2, "0")}</h2>
              <p>Property Listings</p>
            </div>
            <div className="property-registration-stat-item">
              <h2>{String(data.projects).padStart(2, "0")}</h2>
              <p>Projects</p>
            </div>
            <div className="property-registration-stat-item">
              <h2>{String(data.users).padStart(2, "0")}</h2>
              <p>Total Users</p>
            </div>
          </div>

          <a href="/post-property">
            <button className="property-registration-cta-button">
              Post your property
            </button>
          </a>

          <div className="property-registration-whatsapp-section">
            <p>Or post via</p>
            <div className="property-registration-whatsapp-link">
              <span>Whatsapp, send a &quot;hi&quot; to</span>
            </div>
          </div>
        </div>

        <div
          className="property-registration-right-content"
          style={{ borderRadius: "9px" }}
        >
          <img
            src={MegaMenuImg}
            alt="People looking at property listings"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyRegistration;
