import { React, useEffect, useState } from "react";
import "./ExploreProjects.css";
import dummyimg from "../../images/properties.jpg";
import axios from "axios";
import toast from "react-hot-toast";

function ExploreProjectsSection() {
  var isMobileView = window.innerWidth <= 786;

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [allProjects, setAllProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/projects`);
      setAllProjects(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allProjects.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(allProjects.length / cardsPerPage);
  const adminNo = "1234567890";
  const adminEmail = "admin@sample.com";

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const handleSubmit = async (id) => {
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

  return (
    <div
      className="cards-page"
      style={{ padding: "2rem 0", backgroundColor: "transparent" }}
    >
      <h2
        className={"main-heading-for-all-website cards-pages-section-header-h2"}
      >
        Explore our Projects
      </h2>
      <div className="cards-page-card-container cards-page-card-container-in-homepage">
        {currentCards.map((card, index) => (
          <div
            className="cards-page-card cards-page-card-in-homepage"
            key={`${card.title}-${index}`}
            onClick={() => openModal(card)}
          >
            <img src={card.images[0] || dummyimg} alt={card.title} />
            <div className="cards-page-card-title">{card.title}</div>
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
      >
        <a href="/explore-projects" style={{ textDecoration: "none" }}>
          <button className="cards-page-see-more-button">See More</button>
        </a>
      </div>
      {selectedCard && (
        <div className="cards-page-modal-overlay" onClick={closeModal}>
          <div
            className="cards-page-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="cards-page-close-button" onClick={closeModal}>
              X
            </p>

            <img
              src={selectedCard.images[0] || dummyimg}
              alt={selectedCard.title}
            />
            <div className="cards-page-modal-content-div">
              <h2>{selectedCard.title}</h2>
              <p>{selectedCard.description}</p>
              <br />
              <p>
                {selectedCard.address} <br />
                <span className="status">
                  {new Date(selectedCard.possession) > new Date()
                    ? "Under Construction"
                    : "Construction Completed"}
                </span>{" "}
                <br />
                {new Date(selectedCard.possession) > new Date() &&
                  new Date(selectedCard.possession).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
              </p>
              <button onClick={openPopup}>Inquiry</button>
              {isPopupOpen && (
                <div className="cards-page-modal-popup">
                  <div className="cards-page-modal-popup-content">
                    <p
                      className="cards-page-modal-close-popup"
                      onClick={closePopup}
                    >
                      X
                    </p>
                    <h3>Contact for Inquiry</h3>
                    <p>
                      <a href={`mailto:${selectedCard.email}`}>
                        Email: {selectedCard.email}
                      </a>
                    </p>
                    <p>
                      <a href={`tel:${selectedCard.phone}`}>Phone: {selectedCard.phone}</a>
                    </p>
                    <p>
                      <button onClick={() => handleSubmit(selectedCard._id)}>Submit Inquiry</button>
                    </p>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreProjectsSection;
