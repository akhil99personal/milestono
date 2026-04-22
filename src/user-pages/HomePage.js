import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "./homepage/HeroSection";
import FeaturedCollection from "./homepage/FeaturedCollection";
import Cities from "./homepage/Cities";
import AboutProperty from "./homepage/AboutProperty";
import NewsAndArticle from "./homepage/NewsAndArticle";
import WatchVideo from "./homepage/WatchVideo";
import ServicePage from "./homepage/NewServicesPage";
import Footer from "./homepage/Footer";
import ExploreServices from "./homepage/ExploreServices";
import PropertyRegistration from "./homepage/PropertyRegistration";
import BottomNavBar from "./BottomNavBar";
import AdditionalInfo from "./homepage/AdditionalInfo";
import ExploreProjectsSection from "./explore projects/ExploreProjectsSection";
import PropertiesFor from "./homepage/PropertiesFor";
import FeedbacksSection from "./homepage/FeedbacksSection";
import FadeLoader from "react-spinners/FadeLoader";
import AgentsSection from "../user-pages/homepage/AgentsSection";
import AdvertisementPage from "./homepage/AdvertisementSection";
export default function HomePage({handleMarkAsRead, problems, setProblems}) {
  const [selectedType, setSelectedType] = useState("Rent");
  const [selected, setSelected] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("auth");
        if (!token) {
          console.error("No auth token found");
          setLoading(false);
          return;
        }
        const response = await axios.get(`${BASE_URL}/api/authenticate`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.data.role === "admin") {
          navigate("/admin-dashboard");
        }
        if (response.data.role === "user" && response.data.addPhone) {
          navigate("/add-number");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  return (
    <div className="home_page">
      {loading ? (
        <div className="loader-container">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <>
          <HeroSection
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selected={selected}
            setSelected={setSelected}
            handleMarkAsRead={handleMarkAsRead}
            problems={problems} 
            setProblems={setProblems}
          />

          {selected ? (
            <>
              <FeaturedCollection />
              <AdvertisementPage />
              <PropertiesFor />
              <PropertyRegistration />
              <AgentsSection />
              <ExploreProjectsSection />
              <ExploreServices />
              <Cities />
              <AdditionalInfo />

              <NewsAndArticle />
              <WatchVideo />
              <FeedbacksSection />
            </>
          ) : (
            <ServicePage />
          )}
          <Footer />
          <BottomNavBar 
            handleMarkAsRead={handleMarkAsRead}
            problems={problems} 
            setProblems={setProblems}/>
        </>
      )}
    </div>
  );
}
