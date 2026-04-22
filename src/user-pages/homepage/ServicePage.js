import React, { useEffect, useState } from "react";
import "./ServicePage.css";
import workerImage1 from "../../images/worker.png";
import workerImage2 from "../../images/worker2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serviceConstruction from "../../images/service construction.png";
import serviceLegal from "../../images/service legal.png";
import servicePainting from "../../images/service painting.png";
import servicePlumbing from "../../images/service plumbing.png";

const ServicePage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [userServiceData, setUserServiceData] = useState(null);
  const getUserServiceDetail = async () => {
    const token = localStorage.getItem("auth");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/api/userservicedetail`, {
        headers: {
          Authorization: token,
        },
      });
      setUserServiceData(response.data);
    } catch (error) {
      console.error("Error fetching user service details:" + error);
    }
  };
  useEffect(() => {
    getUserServiceDetail();
  }, []);
  return (
    <div className="servicePage">
      <div className="servicePage__heroSection">
        <div className="servicePage__container">
          <div className="servicePage__heroContent">
            <div className="servicePage__sampleServices">
              <p className="servicePage__description">
                Use Our Services like....
              </p>
              <div style={{ display: "flex", marginTop: "-1rem" }}>
                <a
                  className="servicePage__sampleServices__Sarvice"
                  href="/requestserviceform"
                >
                  <img src={serviceConstruction} />
                  <p>Construction</p>
                </a>
                <a
                  className="servicePage__sampleServices__Sarvice"
                  href="/requestserviceform"
                >
                  <img src={servicePlumbing} />
                  <p>Plumbing</p>
                </a>
                <a
                  className="servicePage__sampleServices__Sarvice"
                  href="/requestserviceform"
                >
                  <img src={serviceLegal} />
                  <p>Property Legal</p>
                </a>
                <a
                  className="servicePage__sampleServices__Sarvice"
                  href="/requestserviceform"
                >
                  <img src={servicePainting} />
                  <p>Whitewash & Paint</p>
                </a>
              </div>
            </div>
            <p className="servicePage__red-tag">READY TO HELP YOU</p>
            <h1 className="servicePage__title">
              The best solution for every house problem.
            </h1>
            <p className="servicePage__description">
              Our open, positive, and proactive approach helps us find ways to
              align your work environment with the culture.
            </p>
            <div className="servicePage__buttons">
              <button
                className="servicePage__btn servicePage__btn--primary"
                onClick={() => {
                  navigate("/requestserviceform");
                }}
              >
                Book Now <i className="fa-solid fa-angle-right"></i>{" "}
              </button>
              {!userServiceData && (
                <button
                  className="servicePage__btn servicePage__btn--primary"
                  onClick={() => {
                    navigate("/serviceform");
                  }}
                >
                  Add Service <i className="fa-solid fa-angle-right"></i>{" "}
                </button>
              )}
            </div>
          </div>
          <div className="servicePage__heroImage">
            <img src={workerImage1} alt="Worker" />
          </div>
        </div>
      </div>

      <div className="servicePage__features">
        <div className="servicePage__feature">
          <i className="fa-solid fa-shield-alt"></i>
          <span>Professional Expertise</span>
        </div>
        <div className="servicePage__feature">
          <i className="fa-solid fa-thumbs-up"></i>
          <span>Reliable Service</span>
        </div>
        <div className="servicePage__feature">
          <i className="fa-solid fa-dollar-sign"></i>
          <span>Affordable Rates</span>
        </div>
      </div>

      <section className="servicePage__servicesSection">
        <p className="servicePage__black-tag">SERVICES</p>
        <h2 className="servicePage__servicesTitle">
          Explore our comprehensive range of professional services
        </h2>
        <div className="servicePage__container">
          <div className="servicePage__servicesGrid">
            <div className="servicePage__serviceItem">
              <i className="fa-solid fa-wrench"></i>
              <p className="servicePage__serviceHeading">Plumbing</p>
              <p>
                Resolving leaks, pipe repairs, and faucet installations with
                precision and efficiency. Trusted by households and commercial
                establishments alike.
              </p>
            </div>
            <div className="servicePage__serviceItem">
              <i className="fa-solid fa-tools"></i>
              <p className="servicePage__serviceHeading">Renovation</p>
              <p>
                Transforming spaces with expert craftsmanship and innovative
                design solutions. Enhance your living or work space to meet your
                aspirations.
              </p>
            </div>
            <div className="servicePage__serviceItem">
              <i className="fa-solid fa-paint-roller"></i>
              <p className="servicePage__serviceHeading">Painting</p>
              <p>
                Delivering interiors and exteriors with flawless finishes and a
                spectrum of vibrant colors. High-quality materials for lasting
                beauty and protection.
              </p>
            </div>
            <div className="servicePage__serviceItem">
              <i className="fa-solid fa-bolt"></i>
              <p className="servicePage__serviceHeading">Electrical Work</p>
              <p>
                Ensuring safety and functionality through skilled electrical
                installations and troubleshooting. Expert electricians ready to
                address all your electrical needs.
              </p>
            </div>
            <div className="servicePage__serviceItem">
              <i className="fa-solid fa-hammer"></i>
              <p className="servicePage__serviceHeading">Carpentry</p>
              <p>
                Creating custom solutions and precise installations for
                functional and aesthetic woodworking projects. Crafted with care
                and designed to last.
              </p>
            </div>
            <div className="servicePage__serviceItem">
              <i className="fa-solid fa-home"></i>
              <p className="servicePage__serviceHeading">Roofing</p>
              <p>
                Protecting homes with professional roofing solutions, repairs,
                and maintenance for lasting durability. Comprehensive services
                from installation to repair.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="servicePage__advantageSection">
        <div className="servicePage__container">
          <div className="servicePage__advantageImage">
            <img src={workerImage2} alt="Worker" />
          </div>
          <div className="servicePage__advantageContent">
            <p className="servicePage__red-tag">ABOUT US</p>
            <h3 className="servicePage__advantageTitle">
              The Milestono advantage: reasons to trust our expertise
            </h3>
            <p className="servicePage__advantageDescription">
              Our open, positive, and proactive approach helps us find ways to
              align your work environment with the culture.
            </p>
            <ul className="servicePage__advantageList">
              <li>
                <i className="fa-solid fa-calendar-check"></i> Monthly
                Inspection
              </li>
              <li>
                <i className="fa-solid fa-tools"></i> General Repair Maintenance
              </li>
              <li>
                <i className="fa-solid fa-bolt"></i> Fixing of Faulty Wiring
              </li>
            </ul>
            <button
              className="servicePage__btn servicePage__btn--primary"
              onClick={() => {
                navigate("/requestserviceform");
              }}
            >
              Book Now <i className="fa-solid fa-angle-right"></i>{" "}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
