import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./NewsAndArticle.css";

import dummyImage from "../../images/dummyImage.webp";

import newsImg1 from "../../images/newsImg1.jpeg";
import newsImg2 from "../../images/newsImg2.jpg";
import newsImg3 from "../../images/newsImg3.jpg";
import { useNavigate } from "react-router-dom";

const NewsAndArticle = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [listings, setListings] = useState([]);
  const showcaseRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  const navigate = useNavigate();

  const handleNewsClick = (article) => {
    navigate(`/news/${article._id}`, { state: { article } });
  };
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
      setListings(response.data.slice(0, 3));
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
  ];

  const [showAll, setShowAll] = useState(false);

  const toggleRows = () => setShowAll(!showAll);

  return (
    <div className="showcase_container" id="scrollNewsArticals">
      <h1 className="main-heading-for-all-website">News & Article</h1>
      <p>Read what&apos;s happening in Real Estate</p>

      <div className={`news-grid ${showAll ? "show-all" : ""}`}>
        {listings.map((article) => (
          <div key={article._id} className="news-articals-news-card">
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
                <button className="news-articals-share-btn">Read More</button>
              </a>
            </div>
          </div>
        ))}
      </div>
      <a href="/all-news">
        <button className="news-articals-toggle-btn">See More</button>
      </a>
    </div>
  );
};

export default NewsAndArticle;
