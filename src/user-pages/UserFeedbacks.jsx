import React, { useEffect, useState } from "react";
import "./UserFeedbacks.css";
import dummyPerson from "../images/PersonDummy.png";
import MainNavBar from "./MainNavBar";
import axios from "axios";

const UserFeedbacks = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [feedbacks, setFeedbacks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = feedbacks.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(feedbacks.length / cardsPerPage);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/feedback`);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectChange = (event) => {
    setCardsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };



  const cardWidth = 320;
  const cardGap = 20;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const renderRating = (rating) => {
    return (
      <div className="home-page-section-rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`home-page-section-star ${star <= rating
                ? "home-page-section-filled"
                : "home-page-section-empty"
              }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <MainNavBar />
      <div className="feedback-page-container" style={{ paddingTop: "100px" }}>
        <div className="feedback-page-controls">
          <h1 className="feedback-page-controls-h1">Users Feedbacks</h1>
          <select
            onChange={handleSelectChange}
            value={cardsPerPage}
            className="filter-dropdown"
          >
            <option value={5} selected disabled>
              Feedbacks per page
            </option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={1000000}>All</option>
          </select>
        </div>
        <div className="feedback-page-cards">
          {currentCards.map((feedback, index) => (
            <div
              key={feedback.id || feedback._id}
              className={`home-page-section-card home-page-section-active-card`}
              style={{ width: cardWidth }}
            >
              <CardContent
                feedback={feedback}
                formatDate={formatDate}
                renderRating={renderRating}
              />
            </div>
          ))}
        </div>
        <div className="pagination feedback-page-pagination">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="page-button prev-next"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="page-button prev-next"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

function CardContent({ feedback, formatDate, renderRating }) {
  return (
    <>
      <div
        className={`home-page-section-card-header home-page-section-active-header`}
      >
        <div className="home-page-section-quote-icon-container">&quot;</div>
        {renderRating(feedback.rating)}
      </div>

      <div className="home-page-section-message-container">
        <p
          className={`home-page-section-message home-page-section-active-message`}
        >
          {feedback.message}
        </p>

        {feedback.message.length > 120 && (
          <button className="home-page-section-read-more-button">
            Read more
          </button>
        )}
      </div>

      <div className="home-page-section-card-footer">
        <div className="home-page-section-user-info">
          <div
            className={`home-page-section-avatar-container home-page-section-active-avatar-container `}
          >
            <img
              src={dummyPerson}
              alt={feedback.user}
              width={50}
              height={50}
              className="home-page-section-avatar"
            />
            {feedback.verified && (
              <div className="home-page-section-verified-badge">
                <span className="home-page-section-verified-text">✓</span>
              </div>
            )}
          </div>
          <div className="home-page-section-user-text-container">
            <h3
              className={`home-page-section-user-name home-page-section-active-user-name`}
            >
              {feedback.user}
            </h3>
            <p className="home-page-section-user-position">
              {feedback.position}
            </p>
            <p
              className={`home-page-section-date home-page-section-active-date`}
            >
              {formatDate(feedback.date)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserFeedbacks;
