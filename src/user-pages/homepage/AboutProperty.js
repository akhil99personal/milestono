import { useNavigate } from "react-router-dom";
import renthome from "../../images/rent-home.jpg";
import React from "react";
import "./AboutProperty.css";

const AboutProperty = () => {
  const navigate = useNavigate();
  return (
    <section className="servicePage__advantageSection about-property-box">
      <div className="servicePage__container about-property-section">
        <div className="servicePage__advantageImage about-home-image">
          <img src={renthome} alt="Worker" />
        </div>
        <div className="servicePage__advantageContent">
          <p className="servicePage__red-tag">BUY A HOME</p>
          <h3 className="servicePage__advantageTitle mob-head">
            Find, Buy and Own Your Dream Home.
          </h3>
          <p className="servicePage__advantageDescription">
            Explore from Apartments, land, builder floors, villas and more...
          </p>
          <button
            className="servicePage__btn servicePage__btn--primary"
            onClick={() => {
              navigate("/search");
            }}
          >
            Explore Buying <i className="fa-solid fa-angle-right"></i>{" "}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutProperty;
