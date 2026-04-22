import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "./AgentsSection.css";
import dummyImg from "../../images/dummyImage.webp";
import toast from "react-hot-toast";

const mockAgents = [
  {
    id: 1,
    name: "Agent 1",
    fullName: "Sarah Johnson",
    company: "Luxury Homes Realty",
    operatingSince: 2010,
    address: "1234 Main St, New York",
    phone: "(500) 555-1000",
    email: "agent1@luxuryhomes.com",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 3,
    propertiesSold: 10,
    specialization: "Luxury Homes",
    featured: true,
    verified: true,
    experience: 3,
    awards: 1,
    residentialProperties: [
      {
        id: 1,
        name: "Sample Residential 1",
        location: "Sample Location 1",
        propertyimage: dummyImg,
        price: 99999,
        bhk: "1BHK",
      },
      {
        id: 2,
        name: "Sample Residential 2",
        location: "Sample Location 2",
        propertyimage: dummyImg,
        price: 150000,
        bhk: "2BHK",
      },
    ],
    commercialProperties: [
      {
        id: 1,
        name: "Sample Commercial 1",
        location: "Sample Location 3",
        propertyimage: dummyImg,
        price: 200000,
        bhk: "Office Space",
      },
      {
        id: 2,
        name: "Sample Commercial 2",
        location: "Sample Location 4",
        propertyimage: dummyImg,
        price: 250000,
        bhk: "Shop",
      },
    ],
    project: [
      {
        id: "proj-1",
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
        id: "proj-2",
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
    ],
  },
  {
    id: 2,
    name: "Agent 2",
    fullName: "Michael Chen",
    company: "Urban Property Group",
    operatingSince: 2011,
    address: "1235 Broadway Ave, Los Angeles",
    phone: "(501) 555-1001",
    email: "agent2@urbanproperty.com",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 4,
    propertiesSold: 13,
    specialization: "Commercial",
    featured: false,
    verified: false,
    experience: 4,
    awards: 2,
    residentialProperties: [],
    commercialProperties: [],
    project: [],
  },
  {
    id: 3,
    name: "Agent 3",
    fullName: "Emily Rodriguez",
    company: "Coastal Estates",
    operatingSince: 2012,
    address: "1236 Park Rd, Chicago",
    phone: "(502) 555-1002",
    email: "agent3@coastalestates.com",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    propertiesSold: 16,
    specialization: "Residential",
    featured: false,
    verified: false,
    experience: 5,
    awards: 3,
    residentialProperties: [],
    commercialProperties: [],
    project: [],
  },
  {
    id: 4,
    name: "Agent 4",
    fullName: "David Kim",
    company: "Metropolitan Realtors",
    operatingSince: 2013,
    address: "1237 Ocean Blvd, Miami",
    phone: "(503) 555-1003",
    email: "agent4@metropolitan.com",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 3,
    propertiesSold: 19,
    specialization: "Vacation Rentals",
    featured: false,
    verified: true,
    experience: 6,
    awards: 4,
    residentialProperties: [],
    commercialProperties: [],
    project: [],
  },
  {
    id: 5,
    name: "Agent 5",
    fullName: "Jessica Patel",
    company: "Premier Properties",
    operatingSince: 2014,
    address: "1238 Highland Dr, Seattle",
    phone: "(504) 555-1004",
    email: "agent5@premier.com",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 4,
    propertiesSold: 22,
    specialization: "New Developments",
    featured: false,
    verified: false,
    experience: 7,
    awards: 5,
    residentialProperties: [],
    commercialProperties: [],
    project: [],
  },
];

const PropertyCard = ({ property }) => {
  return (
    <div className="agents-page-property-card" key={property._id}>
      <img
        src={property.uploadedPhotos && property.uploadedPhotos.length > 0 ? property.uploadedPhotos[0] : dummyImg}
        className="agents-page-property-image"
        alt={property.heading || "Property"}
      />
      <div className="agents-page-card-content">
        <h3 className="agents-page-property-name">{property.heading || "Property"}</h3>
        <p className="agents-page-location-text">
          Location: {property.city} {property.landmark ? `, ${property.landmark}` : ""}
        </p>
        <div className="agents-page-price-container">
          <span className="agents-page-price-text">Rs {property.expectedPrice || property.pricePerMonth}</span>
          <span className="agents-page-type-text">| {property.bedrooms || property.propertyCategory}</span>
        </div>
        <div className="agents-page-button-container">
          <button className="agents-page-save-button">Save Property</button>
          <a href={`/details?id=${property._id}`} style={{ textDecoration: "none" }}>
            <button className="agents-page-view-button-agent">
              View Details
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onViewDetails, onInquiry }) => {
  return (
    <div className="agents-page-project-card" key={project._id}>
      <div className="agents-page-project-image-container">
        <img
          src={project.images && project.images.length > 0 ? project.images[0] : dummyImg}
          className="agents-page-project-image"
          alt={project.title || "Project"}
        />
        <div className="agents-page-image-gradient"></div>
        {project.status && (
          <div className="agents-page-project-badge">
            <span className="agents-page-project-badge-text">
              {project.status}
            </span>
          </div>
        )}
        {project.rating && (
          <div className="agents-page-rating-badge">
            <span className="agents-page-rating-text">★ {project.rating}</span>
          </div>
        )}
      </div>
      <div className="agents-page-project-info">
        <h3 className="agents-page-project-title">{project.title}</h3>
        <div className="agents-page-location-container">
          <p className="agents-page-project-location">📍 {project.address}</p>
          {(project.minPrice || project.maxPrice) && (
            <p className="agents-page-project-price">{project.minPrice} - {project.maxPrice}</p>
          )}
        </div>
        {project.possession && (
          <p className="agents-page-project-possession">
            🗓️ Possession: {new Date(project.possession).toLocaleString("default", { month: "long", year: "numeric" })}
          </p>
        )}
        <div className="agents-page-project-buttons">
          <button className="agents-page-view-button" onClick={onViewDetails}>
            View Details
          </button>
          <button className="agents-page-inquiry-button" onClick={onInquiry}>
            Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

const AgentsHomepageSection = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("residential");
  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState(null);
  const [inquiryModalVisible, setInquiryModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [agents, setAgents] = useState([]);

  const scrollContainerRef = useRef(null);
  const modalRef = useRef(null);
  const projectModalRef = useRef(null);
  const inquiryModalRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current && agents.length > 0) {
        const nextIndex = (currentIndex + 1) % agents.length;
        setCurrentIndex(nextIndex);

        const cardWidth = scrollContainerRef.current.querySelector(
          ".agents-homepage-card-container",
        )?.offsetWidth;
        scrollContainerRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: "smooth",
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, agents.length]);

  const handleContactPress = (agent) => {
    setSelectedAgent(agent);
    setModalVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handleProjectInquiryClick = async (projectId) => {
    const token = localStorage.getItem("auth");
    if (!token) {
      alert("User must be logged in to send a project enquiry.");
      return;
    }
    try {
      await axios.post(
        `${BASE_URL}/api/project-enquiry`,
        { project_id: projectId },
        { headers: { Authorization: token } },
      );
      window.alert("Project enquiry submitted to agent successfully.");
    } catch (error) {
      window.alert("Error submitting project enquiry:");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAgent(null);
    setSelectedTab("residential");
    document.body.style.overflow = "auto";
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const closeProjectModal = () => {
    setProjectModalVisible(false);
    document.body.style.overflow = "auto";
  };

  const closeInquiryModal = () => {
    setInquiryModalVisible(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        modalVisible &&
        !projectModalVisible &&
        !inquiryModalVisible
      ) {
        closeModal();
      }
      if (
        projectModalRef.current &&
        !projectModalRef.current.contains(event.target) &&
        projectModalVisible
      ) {
        closeProjectModal();
      }
      if (
        inquiryModalRef.current &&
        !inquiryModalRef.current.contains(event.target) &&
        inquiryModalVisible
      ) {
        closeInquiryModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible, projectModalVisible, inquiryModalVisible]);

  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      setCurrentIndex(index);
      const cardWidth = scrollContainerRef.current.querySelector(
        ".agents-homepage-card-container",
      ).offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleAgents = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords || [
            18.52097398044019, 73.86017831259551,
          ];

          const response = await axios.post(
            `${BASE_URL}/api/verified-agents-by-city`,
            {
              latitude,
              longitude,
            },
          );
          setAgents(response.data);
        },
        (error) => {
          console.error("Location error:", error);
          setAgents([]);
        },
        { enableHighAccuracy: true, timeout: 10000 },
      );
    } catch (error) {
      setAgents([]);
      console.error("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    handleAgents();
  }, []);

  return (
    <section className="agents-homepage-section">
      <div className="agents-homepage-header">
        <h1 className="main-heading-for-all-website">
          Milestono Preferred Agents
        </h1>
        <p className="agents-homepage-subtitle">
          Connect with our top-rated real estate professionals
        </p>
      </div>

      <div
        className="agents-homepage-scroll-container"
        ref={scrollContainerRef}
      >
        {agents.map((agent, index) => (
          <div className="agents-homepage-card-container" key={agent._id}>
            <div
              className="agents-page-card"
              style={{ width: "400px", maxWidth: "95%" }}
            >
              <div className="agents-page-card-header">
                <img
                  src={agent.profile || dummyImg}
                  className="agents-page-agent-image"
                  alt={agent.firstName + " " + agent.lastName}
                />
                {agent.branding === "custom" &&
                  (agent.logo ? (
                    <img
                      src={agent.logo || dummyImg}
                      className="agents-page-agent-logo"
                      alt={agent.firstName + " " + agent.lastName}
                    />
                  ) : (
                    <div className="agents-page-featured-badge">
                      <span
                        className="agents-page-featured-icon"
                        style={{ color: "white" }}
                      >
                        ★
                      </span>
                      <span className="agents-page-featured-text">
                        {agent.agency}
                      </span>
                    </div>
                  ))}
                {(agent.branding === "trusted" ||
                  agent.branding === "custom") && (
                    <div className="agents-page-verified-badge">
                      <span
                        className="agents-page-verified-icon"
                        style={{ color: "#fff" }}
                      >
                        ✓
                      </span>
                      <span className="agents-page-verified-text">Verified</span>
                    </div>
                  )}
              </div>
              <div className="agents-page-card-body">
                <div className="agents-page-card-body-top">
                  <div>
                    <h2 className="agents-page-agent-name">
                      {agent.firstName + " " + agent.lastName}
                    </h2>
                    <div className="agents-page-company-container">
                      <span className="agents-page-company-icon">🏢</span>
                      <span className="agents-page-company-text">
                        {agent.agency}
                      </span>
                    </div>
                  </div>
                  <div className="agents-page-rating-container">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span
                          key={i}
                          className={`agents-page-star ${i < Math.floor(4) ? "filled" : ""}`}
                        >
                          {i < Math.floor(agent.rating) ? "★" : "☆"}
                        </span>
                      ))}
                    <span className="agents-page-rating-text-agent">4</span>
                  </div>
                </div>
                <div className="agents-page-stats-container">
                  <div className="agents-page-agent-stat-box">
                    <span className="agents-page-agent-stat-value">{agent.propertiesCount || 0}</span>
                    <span className="agents-page-agent-stat-label">
                      Properties
                    </span>
                  </div>
                  <div className="agents-page-agent-stat-box">
                    <span className="agents-page-agent-stat-value">
                      {agent.yearsOfExperience || 0}
                    </span>
                    <span className="agents-page-agent-stat-label">
                      Years Experience
                    </span>
                  </div>
                  <div className="agents-page-agent-stat-box">
                    <span className="agents-page-agent-stat-value">{agent.projectsCount || 0}</span>
                    <span className="agents-page-agent-stat-label">
                      Projects
                    </span>
                  </div>
                </div>
                <div className="agents-page-info-section">
                  <div className="agents-page-info-row">
                    <span className="agents-page-info-icon">📅</span>
                    <span className="agents-page-info-text">
                      Operating since :{" "}
                      {new Date(agent.createdAt).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="agents-page-info-row">
                    <span className="agents-page-info-icon">📍</span>
                    <span className="agents-page-info-text">
                      {agent.address}
                    </span>
                  </div>
                </div>
                <button
                  className="agents-page-contact-button"
                  onClick={() => handleContactPress(agent)}
                >
                  Contact Now
                </button>
              </div>
            </div>
          </div>
        ))}
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
        <a href="/agents" style={{ textDecoration: "none" }}>
          <button className="cards-page-see-more-button">See More</button>
        </a>
      </div>

      {modalVisible && selectedAgent && (
        <div className="agents-page-modal-overlay">
          <div className="agents-page-modal-content" ref={modalRef}>
            <div className="agents-page-modal-header">
              <h2 className="agents-page-modal-title">Contact Agent</h2>
              <button className="agents-page-close-button" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="agents-page-modal-body">
              <div className="agents-page-modal-agent-info">
                <img
                  src={selectedAgent.profile || dummyImg}
                  className="agents-page-modal-agent-image"
                  alt={selectedAgent.firstName + " " + selectedAgent.lastName}
                />
                <div className="agents-page-modal-agent-details">
                  <h3 className="agents-page-modal-agent-name">
                    {selectedAgent.firstName + " " + selectedAgent.lastName}
                  </h3>
                  <p className="agents-page-modal-agent-company">
                    {selectedAgent.agency}
                  </p>
                  <div className="agents-page-modal-agent-rating">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <span
                          key={i}
                          className={`agents-page-star ${i < Math.floor(4) ? "filled" : ""}`}
                        >
                          {i < Math.floor(4) ? "★" : "☆"}
                        </span>
                      ))}
                    <span className="agents-page-modal-rating-text">({4})</span>
                  </div>
                </div>
              </div>
              <div className="agents-page-stats-container">
                <div className="agents-page-agent-stat-box">
                  <span className="agents-page-agent-stat-value">{selectedAgent.propertiesCount || 0}</span>
                  <span className="agents-page-agent-stat-label">
                    Properties
                  </span>
                </div>
                <div className="agents-page-agent-stat-box">
                  <span className="agents-page-agent-stat-value">
                    {selectedAgent.yearsOfExperience || 0}
                  </span>
                  <span className="agents-page-agent-stat-label">
                    Years Experience
                  </span>
                </div>
                <div className="agents-page-agent-stat-box">
                  <span className="agents-page-agent-stat-value">{selectedAgent.projectsCount || 0}</span>
                  <span className="agents-page-agent-stat-label">Projects</span>
                </div>
              </div>
              <div className="agents-page-modal-section">
                <h3 className="agents-page-modal-section-title">About Agent</h3>
                <p className="agents-page-about-text">
                  {selectedAgent.firstName + " " + selectedAgent.lastName} is a
                  professional real estate agent with{" "}
                  {selectedAgent.yearsOfExperience || 0} years of experience,
                  specializing in {selectedAgent.projectsCount || 0} new projects. With a
                  proven track record of {selectedAgent.propertiesCount || 0} properties ,
                  they are a trusted advisor in the real estate market.
                </p>
              </div>
              <div className="agents-page-modal-section">
                <h3 className="agents-page-modal-section-title">Properties</h3>
                <div className="agents-page-tab-container">
                  <button
                    className={`agents-page-tab-button ${selectedTab === "residential" ? "agents-page-active-tab-button" : ""}`}
                    onClick={() => setSelectedTab("residential")}
                  >
                    Residential
                  </button>
                  <button
                    className={`agents-page-tab-button ${selectedTab === "commercial" ? "agents-page-active-tab-button" : ""}`}
                    onClick={() => setSelectedTab("commercial")}
                  >
                    Commercial
                  </button>
                </div>
                <div className="agents-page-scroll-container">
                  {selectedTab === "residential"
                    ? selectedAgent.residentialProperties?.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                    ))
                    : selectedTab === "commercial"
                      ? selectedAgent.commercialProperties?.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                      ))
                      : ""}
                </div>
              </div>

              <div className="agents-page-modal-section">
                <h3 className="agents-page-modal-section-title">
                  New Projects
                </h3>
                <div className="agents-page-scroll-container">
                  {selectedAgent.project?.map((proj) => (
                    <ProjectCard
                      key={proj._id}
                      project={proj}
                      onViewDetails={() => {
                        setSelectedProjectForModal(proj);
                        setProjectModalVisible(true);
                      }}
                      onInquiry={() => {
                        handleProjectInquiryClick(proj._id);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="agents-page-modal-section">
                <h3 className="agents-page-modal-section-title">
                  Contact Information
                </h3>
                <div className="agents-page-contact-options">
                  <div
                    className="agents-page-contact-option"
                    onClick={() => handleCall(selectedAgent.phone)}
                  >
                    <div className="agents-page-contact-option-icon agents-page-phone-icon">
                      <span>📞</span>
                    </div>
                    <div className="agents-page-contact-option-details">
                      <span className="agents-page-contact-option-label">
                        Phone
                      </span>
                      <span className="agents-page-contact-option-value">
                        {selectedAgent.phone}
                      </span>
                    </div>
                    <div className="agents-page-contact-option-action">
                      <span className="agents-page-contact-option-action-text">
                        Call
                      </span>
                      <span className="agents-page-contact-option-action-icon">
                        &gt;
                      </span>
                    </div>
                  </div>
                  <div
                    className="agents-page-contact-option"
                    onClick={() => handleEmail(selectedAgent.email)}
                  >
                    <div className="agents-page-contact-option-icon agents-page-email-icon">
                      <span>✉️</span>
                    </div>
                    <div className="agents-page-contact-option-details">
                      <span className="agents-page-contact-option-label">
                        Email
                      </span>
                      <span className="agents-page-contact-option-value">
                        {selectedAgent.email}
                      </span>
                    </div>
                    <div className="agents-page-contact-option-action">
                      <span className="agents-page-contact-option-action-text">
                        Email
                      </span>
                      <span className="agents-page-contact-option-action-icon">
                        &gt;
                      </span>
                    </div>
                  </div>
                  <div className="agents-page-contact-option">
                    <div className="agents-page-contact-option-icon agents-page-address-icon">
                      <span>📍</span>
                    </div>
                    <div className="agents-page-contact-option-details">
                      <span className="agents-page-contact-option-label">
                        Office Address
                      </span>
                      <span className="agents-page-contact-option-value">
                        {selectedAgent.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="agents-page-schedule-button">
                Contact Now
              </button>
            </div>
          </div>
        </div>
      )}

      {projectModalVisible && selectedProjectForModal && (
        <div className="agents-page-modal-overlay">
          <div
            className="agents-page-project-modal-container"
            ref={projectModalRef}
          >
            <button
              className="agents-page-modal-close-button"
              onClick={() => setProjectModalVisible(false)}
            >
              ✕
            </button>
            <img
              src={selectedProjectForModal.images && selectedProjectForModal.images.length > 0 ? selectedProjectForModal.images[0] : dummyImg}
              className="agents-page-modal-project-image"
              alt={selectedProjectForModal.title}
            />
            <div className="agents-page-modal-scroll-view">
              <h2 className="agents-page-modal-title">
                {selectedProjectForModal.title}
              </h2>
              <div className="agents-page-modal-info-row">
                <span className="agents-page-modal-location">
                  📍 {selectedProjectForModal.address}
                </span>
                {selectedProjectForModal.rating && (
                  <span className="agents-page-modal-rating">
                    ★ {selectedProjectForModal.rating}
                  </span>
                )}
              </div>
              <p className="agents-page-modal-status">
                {selectedProjectForModal.status}
              </p>
              {(selectedProjectForModal.minPrice || selectedProjectForModal.maxPrice) && (
                <div className="agents-page-price-container-modal">
                  <span className="agents-page-price-label">Price Range:</span>
                  <span className="agents-page-price-value">
                    {selectedProjectForModal.minPrice} - {selectedProjectForModal.maxPrice}
                  </span>
                </div>
              )}
              {selectedProjectForModal.possession && (
                <div className="agents-page-possession-container-modal">
                  <span className="agents-page-possession-label">
                    Possession:
                  </span>
                  <span className="agents-page-possession-value">
                    {new Date(selectedProjectForModal.possession).toLocaleString("default", { month: "long", year: "numeric" })}
                  </span>
                </div>
              )}
              <p className="agents-page-modal-description">
                {selectedProjectForModal.description}
              </p>
            </div>
            <div className="agents-page-modal-buttons">
              <button
                className="agents-page-modal-button"
                onClick={() => setProjectModalVisible(false)}
              >
                Close
              </button>
              <button
                className="agents-page-modal-button agents-page-modal-inquiry-button"
                onClick={() => {
                  handleProjectInquiryClick(selectedProjectForModal._id);
                }}
              >
                Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AgentsHomepageSection;
