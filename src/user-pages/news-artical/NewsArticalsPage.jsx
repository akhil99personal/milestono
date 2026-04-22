import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../homepage/NewsAndArticle.css";

import dummyImage from "../../images/dummyImage.webp";

import newsImg1 from "../../images/newsImg1.jpeg";
import newsImg2 from "../../images/newsImg2.jpg";
import newsImg3 from "../../images/newsImg3.jpg";
import MainNavBar from "../MainNavBar";
import Footer from "../homepage/Footer";
import FeedbackOverlay from "../FeedbackOverlay";

const NewsAndArticle = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [listings, setListings] = useState([]);
  const showcaseRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  const newsArticles = [
    {
      id: 1,
      name: "Gurgaon municipality targets major property tax defaulters",
      category: "Real Estate News",
      author: "Nandini Verma",
      date: "Nov 19, 2024",
      views: 52,
      paragraph:
        "Gurgaon is cracking down on property tax defaulters to increase revenue.",
      imageSrc: newsImg1,
    },
    {
      id: 2,
      name: "All you need to know about the airports in Uttarakhand",
      category: "Infrastructure",
      author: "Nupur Tolia",
      date: "Nov 18, 2024",
      views: 55,
      paragraph:
        "Upgrades to Uttarakhand's Jolly Grant and Pantnagar Airports are underway.",
      imageSrc: newsImg2,
    },
    {
      id: 3,
      name: "Top localities to invest near Biju Patnaik Airport",
      category: "Infrastructure",
      author: "Aditi Aggarwal",
      date: "Nov 18, 2024",
      views: 49,
      paragraph:
        "Explore prime investment opportunities near Biju Patnaik Airport.",
      imageSrc: newsImg3,
    },
    {
      id: 4,
      name: "Gurgaon municipality targets major property tax defaulters",
      category: "Real Estate News",
      author: "Nandini Verma",
      date: "Nov 19, 2024",
      views: 52,
      paragraph:
        "Gurgaon is cracking down on property tax defaulters to increase revenue.",
      imageSrc: dummyImage,
    },
    {
      id: 5,
      name: "All you need to know about the airports in Uttarakhand",
      category: "Infrastructure",
      author: "Nupur Tolia",
      date: "Nov 18, 2024",
      views: 55,
      paragraph:
        "Upgrades to Uttarakhand's Jolly Grant and Pantnagar Airports are underway.",
      imageSrc: dummyImage,
    },
    {
      id: 6,
      name: "Top localities to invest near Biju Patnaik Airport",
      category: "Infrastructure",
      author: "Aditi Aggarwal",
      date: "Nov 18, 2024",
      views: 49,
      paragraph:
        "Explore prime investment opportunities near Biju Patnaik Airport.",
      imageSrc: dummyImage,
    },
    {
      id: 7,
      name: "Gurgaon municipality targets major property tax defaulters",
      category: "Real Estate News",
      author: "Nandini Verma",
      date: "Nov 19, 2024",
      views: 52,
      paragraph:
        "Gurgaon is cracking down on property tax defaulters to increase revenue.",
      imageSrc: newsImg1,
    },
    {
      id: 8,
      name: "All you need to know about the airports in Uttarakhand",
      category: "Infrastructure",
      author: "Nupur Tolia",
      date: "Nov 18, 2024",
      views: 55,
      paragraph:
        "Upgrades to Uttarakhand's Jolly Grant and Pantnagar Airports are underway.",
      imageSrc: newsImg2,
    },
    {
      id: 9,
      name: "Top localities to invest near Biju Patnaik Airport",
      category: "Infrastructure",
      author: "Aditi Aggarwal",
      date: "Nov 18, 2024",
      views: 49,
      paragraph:
        "Explore prime investment opportunities near Biju Patnaik Airport.",
      imageSrc: newsImg3,
    },
    {
      id: 10,
      name: "Gurgaon municipality targets major property tax defaulters",
      category: "Real Estate News",
      author: "Nandini Verma",
      date: "Nov 19, 2024",
      views: 52,
      paragraph:
        "Gurgaon is cracking down on property tax defaulters to increase revenue.",
      imageSrc: newsImg1,
    },
    {
      id: 11,
      name: "All you need to know about the airports in Uttarakhand",
      category: "Infrastructure",
      author: "Nupur Tolia",
      date: "Nov 18, 2024",
      views: 55,
      paragraph:
        "Upgrades to Uttarakhand's Jolly Grant and Pantnagar Airports are underway.",
      imageSrc: newsImg2,
    },
    {
      id: 12,
      name: "Top localities to invest near Biju Patnaik Airport",
      category: "Infrastructure",
      author: "Aditi Aggarwal",
      date: "Nov 18, 2024",
      views: 49,
      paragraph:
        "Explore prime investment opportunities near Biju Patnaik Airport.",
      imageSrc: newsImg3,
    },
    {
      id: 13,
      name: "Gurgaon municipality targets major property tax defaulters",
      category: "Real Estate News",
      author: "Nandini Verma",
      date: "Nov 19, 2024",
      views: 52,
      paragraph:
        "Gurgaon is cracking down on property tax defaulters to increase revenue.",
      imageSrc: newsImg1,
    },
    {
      id: 14,
      name: "All you need to know about the airports in Uttarakhand",
      category: "Infrastructure",
      author: "Nupur Tolia",
      date: "Nov 18, 2024",
      views: 55,
      paragraph:
        "Upgrades to Uttarakhand's Jolly Grant and Pantnagar Airports are underway.",
      imageSrc: newsImg2,
    },
    {
      id: 15,
      name: "Top localities to invest near Biju Patnaik Airport",
      category: "Infrastructure",
      author: "Aditi Aggarwal",
      date: "Nov 18, 2024",
      views: 49,
      paragraph:
        "Explore prime investment opportunities near Biju Patnaik Airport.",
      imageSrc: newsImg3,
    },
    {
      id: 16,
      name: "Top localities to invest near Biju Patnaik Airport",
      category: "Infrastructure",
      author: "Aditi Aggarwal",
      date: "Nov 18, 2024",
      views: 49,
      paragraph:
        "Explore prime investment opportunities near Biju Patnaik Airport.",
      imageSrc: dummyImage,
    },
    {
      id: 17,
      name: "Gurgaon municipality targets major property tax defaulters",
      category: "Real Estate News",
      author: "Nandini Verma",
      date: "Nov 19, 2024",
      views: 52,
      paragraph:
        "Gurgaon is cracking down on property tax defaulters to increase revenue.",
      imageSrc: newsImg1,
    },
    {
      id: 18,
      name: "All you need to know about the airports in Uttarakhand",
      category: "Infrastructure",
      author: "Nupur Tolia",
      date: "Nov 18, 2024",
      views: 55,
      paragraph:
        "Upgrades to Uttarakhand's Jolly Grant and Pantnagar Airports are underway.",
      imageSrc: newsImg2,
    },
    {
      id: 19,
      name: "Top localities to invest near Biju Patnaik Airport",
      category: "Infrastructure",
      author: "Aditi Aggarwal",
      date: "Nov 18, 2024",
      views: 49,
      paragraph:
        "Explore prime investment opportunities near Biju Patnaik Airport.",
      imageSrc: newsImg3,
    },
    {
      id: 20,
      name: "Gurgaon municipality targets major property tax defaulters",
      category: "Real Estate News",
      author: "Nandini Verma",
      date: "Nov 19, 2024",
      views: 52,
      paragraph:
        "Gurgaon is cracking down on property tax defaulters to increase revenue.",
      imageSrc: newsImg1,
    },
    {
      id: 21,
      name: "All you need to know about the airports in Uttarakhand",
      category: "Infrastructure",
      author: "Nupur Tolia",
      date: "Nov 18, 2024",
      views: 55,
      paragraph:
        "Upgrades to Uttarakhand's Jolly Grant and Pantnagar Airports are underway.",
      imageSrc: newsImg2,
    },
    {
      id: 22,
      name: "Top localities to invest near Biju Patnaik Airport",
      category: "Infrastructure",
      author: "Aditi Aggarwal",
      date: "Nov 18, 2024",
      views: 49,
      paragraph:
        "Explore prime investment opportunities near Biju Patnaik Airport.",
      imageSrc: newsImg3,
    },
    {
      id: 23,
      name: "Gurgaon municipality targets major property tax defaulters",
      category: "Real Estate News",
      author: "Nandini Verma",
      date: "Nov 19, 2024",
      views: 52,
      paragraph:
        "Gurgaon is cracking down on property tax defaulters to increase revenue.",
      imageSrc: newsImg1,
    },
    {
      id: 24,
      name: "All you need to know about the airports in Uttarakhand",
      category: "Infrastructure",
      author: "Nupur Tolia",
      date: "Nov 18, 2024",
      views: 55,
      paragraph:
        "Upgrades to Uttarakhand's Jolly Grant and Pantnagar Airports are underway.",
      imageSrc: newsImg2,
    },
    {
      id: 25,
      name: "Top localities to invest near Biju Patnaik Airport",
      category: "Infrastructure",
      author: "Aditi Aggarwal",
      date: "Nov 18, 2024",
      views: 49,
      paragraph:
        "Explore prime investment opportunities near Biju Patnaik Airport.",
      imageSrc: newsImg3,
    },
    {
      id: 26,
      name: "Gurgaon municipality targets major property tax defaulters",
      category: "Real Estate News",
      author: "Nandini Verma",
      date: "Nov 19, 2024",
      views: 52,
      paragraph:
        "Gurgaon is cracking down on property tax defaulters to increase revenue.",
      imageSrc: newsImg1,
    },
  ];

  const containerRef = useRef(null);

  const isMobileView = () => {
    return window.innerWidth <= 768;
  };

  useEffect(() => {
    const checkVisibility = () => {
      if (!isMobileView()) {
        setShowButton(listings.length > 4);
      }
    };

    checkVisibility();
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.removeEventListener("resize", checkVisibility);
    };
  }, [listings]);

  const scrollRight = () => {
    showcaseRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleArticles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/articles`);
      setListings(response.data);
    } catch (error) {
      setListings([]);
      console.error("Error searching properties:", error);
    }
  };

  useEffect(() => {
    handleArticles();
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#news-articles") {
      const element = document.getElementById("scrollNewsArticals");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  );

  const totalPages = Math.ceil(newsArticles.length / articlesPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= 8; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => i <= totalPages && setCurrentPage(i)}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          disabled={i > totalPages}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
    }
  }, [currentArticles]);

  return (
    <>
      <div style={{ position: "fixed", zIndex: "10000000" }}>
        <MainNavBar />
        <FeedbackOverlay />
      </div>
      <div
        className="showcase_container news-page-showcase_container"
        id="scrollNewsArticals"
      >
        <h1 className="main-heading-for-all-website">
          All Real Estate News & Article
        </h1>
        <div
          ref={containerRef}
          className={`news-grid show-all transition-height`}
        >
          {listings.map((article) => (
            <div key={article.id} className="news-articals-news-card">
              <div className="news-articals-image-container">
                <img src={article.imageSrc} alt={article.name} />
              </div>
              <div className="news-articals-content-container">
                <a
                  style={{ textDecoration: "none" }}
                  href={`/news-details?id=${encodeURIComponent(article._id)}`}
                >
                  <h3>{article.name}</h3>
                  <p>{article.paragraph}</p>
                  <button className="news-articals-share-btn">Share</button>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-container">
          <button
            onClick={prevPage}
            className="pagination-button"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            onClick={nextPage}
            className="pagination-button"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsAndArticle;
