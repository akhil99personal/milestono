"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./FeedbackSection.css";
import dummyPerson from "../../images/PersonDummy.png";
import axios from "axios";

export default function UserFeedbackSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === feedbacks.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        left: currentIndex * (cardWidth + cardGap),
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleCardPress = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
  };

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [feedbacks, setFeedbacks] = useState([]);

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

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <section className="home-page-section-outer-container">
        <div className="home-page-section-pattern-background"></div>
        <div className="home-page-section-container">
          <div className="home-page-section-header-container">
            <div className="home-page-section-header-left-section">
              <h1 className="main-heading-for-all-website">
                Client Testimonials
              </h1>
            </div>
          </div>

          <div
            className={`home-page-section-animated-container home-page-section-animating`}
          >
            <div
              ref={scrollViewRef}
              className="home-page-section-scroll-view"
              onScroll={(e) => { }}
            >
              {feedbacks.map((feedback, index) => (
                <div
                  key={feedback._id || feedback.id}
                  className={`home-page-section-card ${index === currentIndex
                      ? "home-page-section-active-card"
                      : ""
                    }`}
                  style={{ width: cardWidth }}
                  onClick={() => handleCardPress(index)}
                >
                  <CardContent
                    feedback={feedback}
                    isActive={index === currentIndex}
                    formatDate={formatDate}
                    renderRating={renderRating}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          textDecoration: "none",
          display: "flex",
          justifyContent: "end",
          paddingRight: "2rem",
        }}
        className="see-more-container-home-page-section"
      >
        <a href="/user-feedbacks" style={{ textDecoration: "none" }}>
          <button className="cards-page-see-more-button">See More</button>
        </a>
      </div>
    </div>
  );
}

function CardContent({ feedback, isActive, formatDate, renderRating }) {
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
          className={`home-page-section-message ${isActive ? "home-page-section-active-message" : ""}`}
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
            className={`home-page-section-avatar-container ${isActive ? "home-page-section-active-avatar-container" : ""}`}
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
              className={`home-page-section-user-name ${isActive ? "home-page-section-active-user-name" : ""}`}
            >
              {feedback.user}
            </h3>
            <p className="home-page-section-user-position">
              {feedback.position}
            </p>
            <p
              className={`home-page-section-date ${isActive ? "home-page-section-active-date" : ""}`}
            >
              {formatDate(feedback.date)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
