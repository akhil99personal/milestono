import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./WatchVideo.css";

const WatchVideo = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [adLink, setAdLink] = useState(
    "https://www.youtube.com/embed/y9j-BL5ocW8?si=NuERE3A8fjY16WCX",
  );
  const fetchAdLink = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/advertise`);
      setAdLink(response.data.ad || "");
    } catch (error) {
      console.error("Error fetching ad link:", error);
    }
  };
  useEffect(() => {
    fetchAdLink();
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#view-video") {
      const element = document.getElementById("scrollWatchVideo");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="watch_milestono" id="scrollWatchVideo">
      <h2>
        Watch Video About <span>Milestono</span>
      </h2>
      <p>Watch the video what is milestono</p>
      <iframe
        src={adLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default WatchVideo;
