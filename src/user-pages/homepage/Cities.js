import { useNavigate } from "react-router-dom";
import delhi from "../../images/delhi.jpg";
import pune from "../../images/pune.jpeg";
import mumbai from "../../images/mumbai.jpg";
import hydrabad from "../../images/hydrabad.jpg";
import bengalore from "../../images/benglore.jpg";
import kolkata from "../../images/kolkata.webp";
import Ahmedabad from "../../images/ahmedabadImage.jpg";
import Chennai from "../../images/chennaiImage.jpg";
import React from "react";
import "./Cities.css";

const Cities = () => {
  const navigate = useNavigate();
  return (
    <div className="indian-city">
      <h1 className="main-heading-for-all-website" style={{ margin: 0 }}>
        Explore Real Estate in Popular Indian Cities
      </h1>
      <br />
      <div className="icities">
        <div
          className="icity firstCity"
          onClick={() => {
            navigate(`/search?city=delhi`);
          }}
        >
          <img src={delhi} alt="With Gradient" />
          <div>
            <p>Delhi</p>
            <p className="availableProperties">128,000+ Properties</p>
          </div>
        </div>
        <div
          className="icity"
          onClick={() => {
            navigate(`/search?city=mumbai`);
          }}
        >
          <img src={mumbai} alt="With Gradient" />
          <div>
            <p>Mumbai</p>
            <p className="availableProperties">27,000+ Properties</p>
          </div>
        </div>
        <div
          className="icity"
          onClick={() => {
            navigate(`/search?city=pune`);
          }}
        >
          <img src={pune} alt="With Gradient" />
          <div>
            <p>Pune</p>
            <p className="availableProperties">29,000+ Properties</p>
          </div>
        </div>
        <div
          className="icity"
          onClick={() => {
            navigate(`/search?city=hyderabad`);
          }}
        >
          <img src={hydrabad} alt="With Gradient" />
          <div>
            <p>Hyderabad</p>
            <p className="availableProperties">16,000+ Properties</p>
          </div>
        </div>
        <div
          className="icity"
          onClick={() => {
            navigate(`/search?city=kolkata`);
          }}
        >
          <img src={kolkata} alt="With Gradient" />
          <div>
            <p>Kolkata</p>
            <p className="availableProperties">19,000+ Properties</p>
          </div>
        </div>
        <div
          className="icity"
          onClick={() => {
            navigate(`/search?city=bengalore`);
          }}
        >
          <img src={bengalore} alt="With Gradient" />
          <div>
            <p>Bangalore</p>
            <p className="availableProperties">29,000+ Properties</p>
          </div>
        </div>
        <div
          className="icity"
          onClick={() => {
            navigate(`/search?city=chennai`);
          }}
        >
          <img src={Chennai} alt="With Gradient" />
          <div>
            <p>Chennai</p>
            <p className="availableProperties">18,000+ Properties</p>
          </div>
        </div>
        <div
          className="icity"
          onClick={() => {
            navigate(`/search?city=ahmedabad`);
          }}
        >
          <img src={Ahmedabad} alt="With Gradient" />
          <div>
            <p>Ahmedabad</p>
            <p className="availableProperties">31,000+ Properties</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cities;
