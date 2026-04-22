import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "./AgentsPage.css";
import dummyImg from "../images/dummyImage.webp";


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

const AgentsPage = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("residential");
  const [projectModalVisible, setProjectModalVisible] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState(null);
  const [inquiryModalVisible, setInquiryModalVisible] = useState(false);

  const agentsPerPage = 9;
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);

  const modalRef = useRef(null);
  const projectModalRef = useRef(null);
  const inquiryModalRef = useRef(null);

  const handleAgents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/verified-all-agents`);
      setAgents(response.data);
    } catch (error) {
      setAgents([]);
      console.error("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    handleAgents();
  }, []);

  const filterAgents = () => {
    if (!searchQuery.trim()) {
      setFilteredAgents(agents);
      return;
    }
    const query = searchQuery?.toLowerCase();
    const filtered = agents.filter((agent) => {
      if (searchBy === "name") {
        return (agent.firstName + agent.lastName).toLowerCase().includes(query);
      } else if (searchBy === "company") {
        return agent.agency.toLowerCase().includes(query);
      } else if (searchBy === "all") {
        return (
          (agent.firstName + agent.lastName).toLowerCase().includes(query) ||
          agent.agency.toLowerCase().includes(query) ||
          agent.address.toLowerCase().includes(query)
        );
      }
      return true;
    });
    setFilteredAgents(filtered);
    setCurrentPage(1);
  };

  const getCurrentPageAgents = () => {
    const startIndex = (currentPage - 1) * agentsPerPage;
    const endIndex = startIndex + agentsPerPage;
    return filteredAgents.slice(startIndex, endIndex);
  };

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    filterAgents();
  }, [agents, searchQuery, searchBy]);

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

  return (
    <div className="agents-page-agents-container">
      <div className="agents-page-sticky-header">
        <h1 className="agents-page-header-title">Real Estate Agents</h1>
        <p className="agents-page-header-subtitle">
          Find the perfect agent for your needs
        </p>
      </div>

      <div className="agents-page-search-container">
        <div className="agents-page-search-input-container">
          <i className="agents-page-search-icon">🔍</i>
          <input
            className="agents-page-search-input"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery.length > 0 && (
            <button
              className="agents-page-clear-button"
              onClick={() => setSearchQuery("")}
            >
              ✕
            </button>
          )}
        </div>
        <div className="agents-page-filter-container">
          <span className="agents-page-filter-label">Search by:</span>
          <div className="agents-page-filter-options">
            <button
              className={`agents-page-filter-option ${searchBy === "name" ? "agents-page-filter-option-active" : ""}`}
              onClick={() => setSearchBy("name")}
            >
              Name
            </button>
            <button
              className={`agents-page-filter-option ${searchBy === "company" ? "agents-page-filter-option-active" : ""}`}
              onClick={() => setSearchBy("company")}
            >
              Company
            </button>
            <button
              className={`agents-page-filter-option ${searchBy === "all" ? "agents-page-filter-option-active" : ""}`}
              onClick={() => setSearchBy("all")}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="agents-page-results-info">
        <p className="agents-page-results-text">
          {filteredAgents.length} agents found
        </p>
      </div>

      <div className="agents-page-agents-grid">
        {getCurrentPageAgents().map((agent) => (
          <div className="agents-page-card-container" key={agent.id}>
            <div className="agents-page-card">
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

      <div className="agents-page-pagination-container">
        <button
          className={`agents-page-pagination-button ${currentPage === 1 ? "agents-page-pagination-button-disabled" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </button>

        <div className="agents-page-pagination-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                className={`agents-page-page-number ${pageNum === currentPage ? "active-page" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ),
          )}
        </div>

        <button
          className={`agents-page-pagination-button ${currentPage === totalPages ? "agents-page-pagination-button-disabled" : ""}`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>

      <div className="agents-page-sticky-footer">
        <button
          className={`agents-page-pagination-button ${currentPage === 1 ? "agents-page-pagination-button-disabled" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <div className="agents-page-pagination-info">
          <span className="agents-page-pagination-text">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <button
          className={`agents-page-pagination-button ${currentPage === totalPages ? "agents-page-pagination-button-disabled" : ""}`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
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
    </div>
  );
};

export default AgentsPage;
