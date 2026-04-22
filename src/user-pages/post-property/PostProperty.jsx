import React, { useState } from "react";
import "./PostProperty.css";
import propertyImage from "../../images/postpropertyPage.gif";
import Footer from "../homepage/Footer";
import MainNavBar from "../MainNavBar";

import propertyDetailsIcon from "../../images/property-details-icon.png";
import uploadPhotosIcon from "../../images/upload-photos-icon.png";
import pricingOwnershipIcon from "../../images/pricing-ownership-icon.png";

import buildingBackground from "../../images/post-property-section3-bgBanner.jpg";
import FeedbackOverlay from "../FeedbackOverlay";

const PostProperty = () => {
  const [selectedListingType, setSelectedListingType] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState([]);
  const [propertyCategory, setPropertyCategory] = useState("Residential");
  const [contactDetails, setContactDetails] = useState("");
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);

  const handleListingTypeClick = (type) => {
    setSelectedListingType(type);
  };

  const handlePropertyTypeClick = (type) => {
    setSelectedPropertyType((prevState) =>
      prevState.includes(type)
        ? prevState.filter((item) => item !== type)
        : [...prevState, type],
    );
  };

  const handleCategoryChange = (event) => {
    setPropertyCategory(event.target.value);
    setSelectedPropertyType([]);
  };

  const handleContactChange = (event) => {
    setContactDetails(event.target.value);
  };

  const handleLoginToggle = () => {
    setIsRegisteredUser(!isRegisteredUser);
  };

  return (
    <>
      <MainNavBar />
      <FeedbackOverlay />
      <div
        className="post-property-page-container"
        style={{ paddingTop: "100px" }}
      >
        <div className="post-property-page-left">
          <h1 className="main-heading-for-all-website">
            Sell or Rent your Property
          </h1>
          <h2>
            Online faster with <span>Milestono.com</span>
          </h2>
          <ul className="post-property-page-benefits">
            <li>✓ Advertise for FREE</li>
            <li>✓ Get unlimited enquiries</li>
            <li>✓ Get shortlisted buyers and tenants</li>
            <li>✓ Assistance in co-ordinating site visits</li>
          </ul>
          <img
            src={propertyImage}
            alt="Property"
            className="post-property-page-image"
          />
        </div>

        <div className="post-property-page-right">
          <h3>Start posting your property, it’s free</h3>
          <form className="post-property-page-form">
            <div className="post-property-page-form-group">
              <label htmlFor="listingType">You&rsquo;re looking to ...</label>
              <div className="post-property-page-selection-group">
                <div
                  style={{ borderRadius: "29px" }}
                  className={`post-property-page-selection ${selectedListingType === "Sell" ? "selected" : ""}`}
                  onClick={() => handleListingTypeClick("Sell")}
                >
                  Sell
                </div>
                <div
                  style={{ borderRadius: "29px" }}
                  className={`post-property-page-selection ${selectedListingType === "Rent" ? "selected" : ""}`}
                  onClick={() => handleListingTypeClick("Rent")}
                >
                  Rent / Lease
                </div>
                <div
                  style={{ borderRadius: "29px" }}
                  className={`post-property-page-selection ${selectedListingType === "PG" ? "selected" : ""}`}
                  onClick={() => handleListingTypeClick("PG")}
                >
                  PG
                </div>
              </div>
            </div>

            <div className="post-property-page-form-group">
              <label htmlFor="propertyType">And it&rsquo;s a ...</label>
              <div style={{ display: "flex", gap: "25px" }}>
                <div style={{ display: "flex" }}>
                  <input
                    type="radio"
                    style={{ marginTop: "-5px" }}
                    id="residential"
                    name="propertyCategory"
                    value="Residential"
                    checked={propertyCategory === "Residential"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="residential">Residential</label>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="radio"
                    style={{ marginTop: "-5px" }}
                    id="commercial"
                    name="propertyCategory"
                    value="Commercial"
                    checked={propertyCategory === "Commercial"}
                    onChange={handleCategoryChange}
                  />
                  <label htmlFor="commercial">Commercial</label>
                </div>
              </div>

              {propertyCategory === "Residential" && (
                <div className="post-property-page-selection-group">
                  <div
                    className={`post-property-page-selection ${selectedPropertyType.includes("Flat/Apartment") ? "selected" : ""}`}
                    onClick={() => handlePropertyTypeClick("Flat/Apartment")}
                  >
                    Flat/Apartment
                  </div>
                  <div
                    className={`post-property-page-selection ${selectedPropertyType.includes("Independent House") ? "selected" : ""}`}
                    onClick={() => handlePropertyTypeClick("Independent House")}
                  >
                    Independent House / Villa
                  </div>
                  <div
                    className={`post-property-page-selection ${selectedPropertyType.includes("Builder Floor") ? "selected" : ""}`}
                    onClick={() => handlePropertyTypeClick("Builder Floor")}
                  >
                    Independent / Builder Floor
                  </div>
                  <div
                    className={`post-property-page-selection ${selectedPropertyType.includes("Plot/Land") ? "selected" : ""}`}
                    onClick={() => handlePropertyTypeClick("Plot/Land")}
                  >
                    Plot / Land
                  </div>
                </div>
              )}

              {propertyCategory === "Commercial" && (
                <div className="post-property-page-selection-group">
                  <div
                    className={`post-property-page-selection ${selectedPropertyType.includes("Office") ? "selected" : ""}`}
                    onClick={() => handlePropertyTypeClick("Office")}
                  >
                    Office
                  </div>
                  <div
                    className={`post-property-page-selection ${selectedPropertyType.includes("Retail") ? "selected" : ""}`}
                    onClick={() => handlePropertyTypeClick("Retail")}
                  >
                    Retail
                  </div>
                  <div
                    className={`post-property-page-selection ${selectedPropertyType.includes("Plot/Land") ? "selected" : ""}`}
                    onClick={() => handlePropertyTypeClick("Plot/Land")}
                  >
                    Plot / Land
                  </div>
                  <div
                    className={`post-property-page-selection ${selectedPropertyType.includes("Storage") ? "selected" : ""}`}
                    onClick={() => handlePropertyTypeClick("Storage")}
                  >
                    Storage
                  </div>
                </div>
              )}
            </div>

            <div className="post-property-page-form-group">
              <label htmlFor="contactDetails">
                Your contact details for the buyer to reach you
              </label>
              <input
                type="text"
                id="contactDetails"
                placeholder="Enter your phone number"
                value={contactDetails}
                onChange={handleContactChange}
              />
            </div>

            <div className="post-property-page-form-group">
              <label>
                Are you a registered user?{" "}
                <a
                  style={{ textDecoration: "none", color: "blue" }}
                  href="/login"
                >
                  Login
                </a>
              </label>
            </div>
          </form>
          <div className="post-property-page-form-group">
            <a href="/post-property">
              <button className="post-property-page-start-now-btn">
                Start now
              </button>
            </a>
          </div>
        </div>
      </div>

      <section className="post-property-steps-container">
        <h4 className="post-property-steps-subtitle">HOW TO POST</h4>
        <h2 className="post-property-steps-title">
          Post Your Property in
          <br />3 Simple Steps
        </h2>
        <div className="post-property-steps-cards">
          <div className="post-property-steps-card">
            <img
              src={propertyDetailsIcon}
              alt="Add details of your property"
              className="post-property-steps-icon"
            />
            <h3>01. Add details of your property</h3>
            <p>
              Begin by telling us the few basic details about your property like
              your property type, location, No. of rooms etc.
            </p>
          </div>
          <div className="post-property-steps-card">
            <img
              src={uploadPhotosIcon}
              alt="Upload photos & videos"
              className="post-property-steps-icon"
            />
            <h3>02. Upload Photos & Videos</h3>
            <p>
              Upload photos and videos of your property either via your desktop
              device or from your mobile phone.
            </p>
          </div>
          <div className="post-property-steps-card">
            <img
              src={pricingOwnershipIcon}
              alt="Add pricing & ownership"
              className="post-property-steps-icon"
            />
            <h3>03. Add Pricing & Ownership</h3>
            <p>
              Just update your property’s ownership details and your expected
              price and your property is ready for posting.
            </p>
          </div>
        </div>
        <a href="/post-property">
          <button className="post-property-steps-button">
            Begin to Post your Property
          </button>
        </a>
      </section>

      <section
        className="visibility-section-container"
        style={{ backgroundImage: `url(${buildingBackground})` }}
      >
        <div className="visibility-section-content">
          <h2 className="visibility-section-heading">
            With over 7 million unique visitors monthly, your property gets
            maximum visibility on Milestono
          </h2>
          <div className="visibility-section-stats">
            <div className="visibility-stat-item">
              <p className="visibility-stat-over">OVER</p>
              <h3 className="visibility-stat-value">1M</h3>
              <p className="visibility-stat-label">Property Listings</p>
            </div>
            <div className="visibility-stat-item">
              <p className="visibility-stat-over">OVER</p>
              <h3 className="visibility-stat-value">5.5M</h3>
              <p className="visibility-stat-label">Monthly Searches</p>
            </div>
            <div className="visibility-stat-item">
              <p className="visibility-stat-over">OVER</p>
              <h3 className="visibility-stat-value">200K</h3>
              <p className="visibility-stat-label">
                Owners advertising monthly
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PostProperty;
