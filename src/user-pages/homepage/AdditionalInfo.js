import { React, useState, useEffect } from "react";

import "./AdditionalInfo.css";

import reducecost from "../../images/AdditionalInfo img1.jpg";
import efficient from "../../images/AdditionalInfo img2.jpg";
import supports from "../../images/AdditionalInfo img3.jpg";
import powerful from "../../images/AdditionalInfo img4.jpg";

import multifamily from "../../images/AdditionalInfoimg5.webp";
import workplace from "../../images/AdditionalInfoimg6.webp";
import retail from "../../images/AdditionalInfoimg7.webp";

function AdditionalInfo() {
  const [activeSection, setActiveSection] = useState("reduce");
  const [slideDirection, setSlideDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const sections = [
    { id: "reduce", title: "Cut Your Expenses" },
    { id: "efficient", title: "High-Quality Properties" },
    { id: "supports", title: "Advanced Technology" },
    { id: "software", title: "Expert Guidance" },
  ];

  const [activeTab, setActiveTab] = useState("multi-family");

  const tabs = [
    {
      id: "multi-family",
      title: "Residential",
      content:
        "Explore a wide range of residential properties designed to suit every lifestyle. From urban apartments to spacious family homes, each property offers comfort, modern amenities, and easy access to schools, parks, and shopping centers. Perfect for creating a place you’ll love to call home.",
      image: multifamily,
    },
    {
      id: "workplace",
      title: "Commercial",
      content:
        "Find the ideal location for your business with our commercial spaces, offering high visibility and prime accessibility. From retail storefronts to corporate offices, these properties are situated in vibrant, bustling areas, making them ideal for businesses of all sizes aiming for growth and success.",
      image: workplace,
    },
    {
      id: "public-retail",
      title: "Investment",
      content:
        "Unlock real estate investment opportunities with high potential for growth and long-term returns. Our curated selection of properties includes residential and commercial spaces, carefully evaluated for their market value and future appreciation. Build wealth with real estate that works for you.",
      image: retail,
    },
  ];

  const content = {
    reduce: {
      text: "Optimize your investments by reducing unnecessary expenses. Our property management solutions help you lower operational costs while maximizing your returns, ensuring every dollar goes further.",
      image: reducecost,
      alt: "EV Charging Station",
      specialImgCost: "specialImgCost",
    },
    efficient: {
      text: "Explore a wide range of properties that align with your investment goals and lifestyle preferences. Our platform showcases reliable listings with verified details to give you peace of mind.",
      image: efficient,
      alt: "Graph showing cost reduction and income increase",
    },
    supports: {
      text: "Leverage cutting-edge tools and resources to stay ahead in the real estate market. Our platform offers valuable insights, analytics, and property management solutions, empowering you to make smarter, data-driven decisions.",
      image: supports,
      alt: "Customer support representative",
    },
    software: {
      text: "Get unmatched support from our experienced team. From property insights to investment advice, we’re here to guide you at every step and make your real estate journey seamless and rewarding.",
      image: powerful,
      alt: "Laptop with software interface",
    },
  };

  const handleSectionClick = (sectionId) => {
    if (isAnimating) return;
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection,
    );
    const newIndex = sections.findIndex((section) => section.id === sectionId);
    setSlideDirection(newIndex > currentIndex ? "slide-left" : "slide-right");
    setActiveSection(sectionId);
  };

  useEffect(() => {
    if (slideDirection) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setSlideDirection("");
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [slideDirection]);

  return (
    <>
      <section className="cost-benefit">
        <div className="cost-benefit-home">
          <h1 className="main-heading-for-all-website cost-benefit-title">
            Optimize Costs and{" "}
            <span style={{ color: "#36c83c" }}>Maximize Property Value</span>{" "}
            with Our <span className="">Real Estate Solutions</span>
          </h1>
          <div className="cost-benefit-sections">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`cost-section ${activeSection === section.id ? "active" : ""}`}
                onClick={() => handleSectionClick(section.id)}
              >
                {section.title} {activeSection === section.id ? "-" : "+"}
              </button>
            ))}
          </div>
          <div className="cost-benefit-content-wrapper">
            <div className={`cost-benefit-content ${slideDirection}`}>
              <div className="cost-benefit-text">
                <p>{content[activeSection].text}</p>
                <a href="/faqs">
                  <button className="learn-more transperant">
                    <span>Learn More</span>
                  </button>
                </a>
              </div>
              <div className="cost-benefit-image-container">
                <img
                  src={content[activeSection].image}
                  alt={content[activeSection].alt}
                  className={content[activeSection].specialImgCost}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="family-section">
        <div className="family-container">
          <div className="family-section-sidebar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`family-section-tab-buttonmob family-section-tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="family-content">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`family-section-tab-content ${activeTab === tab.id ? "active" : ""}`}
                style={{ backgroundImage: `url(${tab.image})` }}
              >
                <div className="family-section-overlay">
                  <h2>{tab.title}</h2>
                  <p>{tab.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdditionalInfo;
