import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./AdvertisementSection.css";
import dummyImg from "../../images/dummyImage.webp";
import toast from "react-hot-toast";

const residentialProjects = [
  {
    id: "2",
    name: "Green Valley",
    location: "Bangalore",
    status: "Under Construction",
    image: dummyImg,
    description:
      "Eco-friendly residential complex with sustainable features and green spaces throughout the property.",
    price: "₹ 85L - 1.5Cr",
    possession: "December 2025",
    rating: 4.5,
  },
  {
    id: "4",
    name: "Riverside Residences",
    location: "Pune",
    status: "Under Construction",
    image: dummyImg,
    description:
      "Elegant apartments along the riverside with beautiful views and tranquil environment.",
    price: "₹ 65L - 1.1Cr",
    possession: "June 2025",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Serene Meadows",
    location: "Chennai",
    status: "Under Construction",
    image: dummyImg,
    description:
      "Peaceful residential community surrounded by nature yet close to urban amenities.",
    price: "₹ 60L - 95L",
    possession: "December 2025",
    rating: 4.4,
  },
];

const commercialProjects = [
  {
    id: "com-1",
    name: "Project 1",
    location: "Mumbai",
    status: "Under Construction",
    possession: "March 2025",
    image: dummyImg,
    description:
      "Premium office spaces designed for modern businesses with state-of-the-art facilities.",
    price: "₹ 1.5Cr - 3Cr",
    rating: 4.7,
  },
  {
    id: "com-3",
    name: "Retail Plaza",
    location: "Delhi",
    status: "Under Construction",
    possession: "September 2025",
    image: dummyImg,
    description:
      "Prime retail spaces in high-footfall area with excellent visibility and accessibility.",
    price: "₹ 1.2Cr - 2.5Cr",
    rating: 4.6,
  },
  {
    id: "com-5",
    name: "Industrial Park",
    location: "Pune",
    status: "Under Construction",
    possession: "December 2025",
    image: dummyImg,
    description:
      "Industrial spaces with robust infrastructure for manufacturing and warehousing.",
    price: "₹ 1Cr - 2.2Cr",
    rating: 4.5,
  },
];

export default function RecommendedProjectsSection() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const cardWidth = 320;
  const cardGap = 20;

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const handleInquiryClick = async (id) => {
    const token = localStorage.getItem("auth");

    if (!token) {
      alert("User must be logged in to send a project enquiry.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/project-enquiry`,
        { project_id: id },
        { headers: { Authorization: token } },
      );
      toast.success("Project enquiry submitted to agent successfully.");
    } catch (error) {
      toast.error("Error submitting project enquiry:");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < projects.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, projects.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentIndex * (cardWidth + cardGap),
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleScroll = (e) => {
    setScrollX(e.currentTarget.scrollLeft);
  };

  const handleScrollEnd = (e) => {
    const newIndex = Math.round(
      e.currentTarget.scrollLeft / (cardWidth + cardGap),
    );
    setCurrentIndex(newIndex);
  };

  const renderCard = (proj) => (
    <div
      key={proj._id}
      className="project-card-home-page-section"
      style={{ width: cardWidth }}
    >
      <div className="project-image-container-home-page-section">
        <img
          src={proj.images[0] || dummyImg}
          alt={proj.title}
          fill
          className="project-image-home-page-section"
        />

        {proj.status && (
          <div className="project-badge-home-page-section">
            <span className="project-badge-text-home-page-section">
              {proj.status}
            </span>
          </div>
        )}

        {proj.rating && (
          <div className="rating-badge-home-page-section">
            <span className="rating-text-home-page-section">
              ★ {proj.rating}
            </span>
          </div>
        )}
      </div>
      <div className="project-info-home-page-section">
        <h3 className="project-title-home-page-section">{proj.name}</h3>
        <div className="location-container-home-page-section">
          <span className="project-location-home-page-section">
            📍 {proj.address}
          </span>
          {proj.minPrice && (
            <span className="project-price-home-page-section">
              {proj.minPrice}-{proj.maxPrice}
            </span>
          )}
        </div>
        {proj.possession && (
          <p className="project-possession-home-page-section">
            🗓️ Possession:{" "}
            {new Date(proj.possession).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
        )}

        <div className="project-buttons-home-page-section">
          <button
            className="view-button-home-page-section"
            onClick={() => setSelectedProject(proj)}
          >
            View Details
          </button>
          <button
            className="inquiry-button-home-page-section"
            onClick={() => handleInquiryClick(proj._id)}
          >
            Inquiry
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="container-home-page-section">
      <div className="header-container-home-page-section">
        <div className="header-left-section-home-page-section">
          <h1 className="main-heading-for-all-website">Recommended Projects</h1>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scroll-view-home-page-section"
        onScroll={handleScroll}
        onScrollEndCapture={handleScrollEnd}
      >
        {projects.map((proj) => renderCard(proj))}
      </div>

      <div
        style={{
          textDecoration: "none",
          display: "flex",
          justifyContent: "end",
          paddingRight: "2rem",
        }}
        className="see-more-container-home-page-section"
      >
        <a href="/explore-projects" style={{ textDecoration: "none" }}>
          <button className="cards-page-see-more-button">See More</button>
        </a>
      </div>

      {selectedProject && (
        <div className="modal-overlay-home-page-section">
          <div className="modal-container-home-page-section">
            <button
              className="close-button-home-page-section"
              onClick={() => setSelectedProject(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-image-container-home-page-section">
              <img
                src={selectedProject.images[0] || dummyImg}
                alt={selectedProject.title}
                fill
                className="modal-image-home-page-section"
              />
            </div>

            <div className="modal-scroll-view-home-page-section">
              <h3 className="modal-title-home-page-section">
                {selectedProject.title}
              </h3>
              <div className="modal-info-row-home-page-section">
                <span className="modal-location-home-page-section">
                  📍 {selectedProject.address}
                </span>
                {selectedProject.rating && (
                  <span className="modal-rating-home-page-section">
                    ★ {selectedProject.rating}
                  </span>
                )}
              </div>
              <p className="modal-status-home-page-section">
                {selectedProject.status}
              </p>

              {selectedProject.price && (
                <div className="price-container-home-page-section">
                  <span className="price-label-home-page-section">
                    Price Range:
                  </span>
                  <span className="price-value-home-page-section">
                    {selectedProject.minPrice}-{selectedProject.maxPrice}
                  </span>
                </div>
              )}

              {selectedProject.possession && (
                <div className="possession-container-home-page-section">
                  <span className="possession-label-home-page-section">
                    Possession:
                  </span>
                  <span className="possession-value-home-page-section">
                    {new Date(selectedProject.possession).toLocaleString(
                      "default",
                      {
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
              )}

              <p className="modal-description-home-page-section">
                {selectedProject.description}
              </p>
            </div>

            <div className="modal-buttons-home-page-section">
              <button
                className="modal-button-home-page-section"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
              <button
                className="modal-button-home-page-section modal-inquiry-button-home-page-section"
                onClick={() => handleInquiryClick(selectedProject._id)}
              >
                Inquiry
              </button>
            </div>
          </div>
        </div>
      )}

      {inquiryModalOpen && (
        <div className="property-details-inquiry-modal-overlay">
          <div className="property-details-inquiry-modal-content">
            <button
              className="property-details-inquiry-modal-close"
              onClick={() => setInquiryModalOpen(false)}
            >
              &times;
            </button>
            <h2>You are requesting to view advertiser details</h2>

            <p className="property-details-modal-label">POSTED BY OWNER:</p>
            <p className="property-details-modal-details">
              +91 988** **** | i******@gmail.com
            </p>
            <p className="property-details-modal-details">VISHAL KATE</p>

            <p className="property-details-modal-label">
              POSTED ON 17th DEC, 2024
            </p>
            <p className="property-details-modal-details">
              ₹ 15 Lac | Phule Nagar Akkuj
            </p>
            <p className="property-details-modal-details">
              2 Guntha | Residential Land
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
