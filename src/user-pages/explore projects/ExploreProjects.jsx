import React, { useEffect, useState } from "react";
import "./ExploreProjects.css";
import dummyimg from "../../images/properties.jpg";
import MainNavBar from "../MainNavBar";
import Footer from "../homepage/Footer";
import FeedbackOverlay from "../FeedbackOverlay";
import axios from "axios";
import toast from "react-hot-toast";
import PersonImg from "../../images/PersonDummy.png";

const cities = {
  Maharashtra: [
    "Mumbai",
    "Pune",
    "Aurangabad",
    "Nashik",
    "Nagpur",
    "Lonavala",
    "Mahabaleshwar",
    "Shirdi",
    "Kolhapur",
    "Satara",
    "Alibaug",
    "Ratnagiri",
    "Solapur",
    "Ahmednagar",
    "Khandala",
  ],
  UttarPradesh: [
    "Agra",
    "Lucknow",
    "Varanasi",
    "Kanpur",
    "Allahabad",
    "Noida",
    "Ghaziabad",
    "Mathura",
    "Vrindavan",
    "Ayodhya",
    "Jhansi",
    "Aligarh",
    "Bareilly",
    "Meerut",
    "Fatehpur Sikri",
  ],
  Karnataka: [
    "Bangalore",
    "Mysore",
    "Hampi",
    "Coorg",
    "Mangalore",
    "Udupi",
    "Chikmagalur",
    "Hubli",
    "Belgaum",
    "Bijapur",
    "Gokarna",
    "Dandeli",
    "Badami",
    "Shimoga",
    "Hospet",
  ],
  Rajasthan: [
    "Jaipur",
    "Udaipur",
    "Jodhpur",
    "Jaisalmer",
    "Pushkar",
    "Mount Abu",
    "Bikaner",
    "Ajmer",
    "Chittorgarh",
    "Kota",
    "Bundi",
    "Ranthambore",
    "Alwar",
    "Sawai Madhopur",
    "Neemrana",
  ],
  TamilNadu: [
    "Chennai",
    "Madurai",
    "Ooty",
    "Kanyakumari",
    "Coimbatore",
    "Pondicherry",
    "Rameswaram",
    "Thanjavur",
    "Trichy",
    "Velankanni",
    "Yercaud",
    "Hogenakkal",
    "Cuddalore",
    "Salem",
    "Mahabalipuram",
  ],
  WestBengal: [
    "Kolkata",
    "Darjeeling",
    "Siliguri",
    "Kalimpong",
    "Sundarbans",
    "Digha",
    "Howrah",
    "Hooghly",
    "Malda",
    "Asansol",
    "Cooch Behar",
    "Haldia",
    "Jalpaiguri",
    "Bardhaman",
    "Medinipur",
  ],
};

const CardsPage = () => {
  const [activeTab, setActiveTab] = useState("residential");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [allProjects, setAllProjects] = useState([]);
  const [commercialProjects, setCommercialProjects] = useState([]);
  const [residentialProjects, setResidentialProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 5;
  const adminNo = "1234567890";
  const adminEmail = "admin@sample.com";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    propertyType: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/api/enquiries`, formData);
      toast.success("Enquiry submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        propertyType: "",
        description: "",
      });
    } catch (error) {
      toast.error("Error submitting enquiry: " + error.message);
    }
  };

  const projects =
    activeTab === "residential" ? residentialProjects : commercialProjects;

  const totalListings = projects.length;
  const totalPages = Math.ceil(totalListings / listingsPerPage);

  const currentListings = projects.slice(
    (currentPage - 1) * listingsPerPage,
    currentPage * listingsPerPage,
  );

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/projects`);
      setAllProjects(response.data);
      setCommercialProjects(
        response.data.filter((project) => project.type === "commercial"),
      );
      setResidentialProjects(
        response.data.filter((project) => project.type === "residential"),
      );
    } catch (error) {
      console.error("Error fetching problems:" + error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handlePageChange = (page) => {
    window.scrollBy({
      top: -500,
      behavior: "smooth",
    });
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  const [selectedListing, setSelectedListing] = useState(null);

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
  };

  const closeModal = () => {
    setSelectedListing(null);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);
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
  const closePopup = () => setPopupOpen(false);

  return (
    <div
      style={{ backgroundColor: "var(--background-color)", paddingTop: "5rem" }}
    >
      <MainNavBar />
      <FeedbackOverlay />
      <div className="marquee-container">
        <marquee className="marquee-text" scrollamount="15">
          🏡 Hot Properties Available! | Book Your Dream Home Now! | Contact Us
          for Exclusive Offers! 🏘️
        </marquee>
      </div>

      <div className="enquiry-section">
        <div className="enquiry-box">
          <div className="enquiry-header">Property Inquiry</div>
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="enquiry-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              className="enquiry-input"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="enquiry-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Preferred Location"
              className="enquiry-input"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <select
              className="enquiry-input"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Property Type
              </option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
            </select>
            <textarea
              placeholder="Enter a Description (e.g., specific requirements)"
              className="enquiry-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="enquiry-button">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="cards-page">
        <h1>Explore Projects</h1>

        <div className="tabs" style={{ marginLeft: "0", marginBottom: "4rem" }}>
          <button
            className={`tab-button ${activeTab === "residential" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("residential");
              setCurrentPage(1);
            }}
          >
            🏠︎ Residential Projects
          </button>
          <button
            className={`tab-button ${activeTab === "commercial" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("commercial");
              setCurrentPage(1);
            }}
          >
            🏙 Commercial Projects
          </button>
        </div>

        <div className="listing-container">
          {currentListings.map((listing, index) => (
            <div className="listing-card" key={index}>
              <div className="listing-image">
                <img src={listing.images[0]} alt={listing.title} />
              </div>
              <div className="listing-content">
                <div className="listing-title">{listing.title}</div>
                <div className="listing-location">{listing.address}</div>
              </div>
              <div className="listing-content">
                {new Date(listing.possession) > new Date() ? (
                  <>
                    <div className="listing-status">Under Construction</div>
                    <div className="listing-possession">
                      Possession:{" "}
                      {new Date(listing.possession).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </>
                ) : (
                  <div className="listing-status">Construction Completed</div>
                )}
              </div>
              <div className="listing-actions">
                <button
                  className="view-details-btn"
                  onClick={() => handleViewDetails(listing)}
                >
                  View Details
                </button>
                <button
                  className="view-details-btn"
                  onClick={() => handleInquiryClick(listing._id)}
                >
                  Inquiry
                </button>
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
                        <a href={`mailto:${adminEmail}`}>Email: {adminEmail}</a>
                      </p>
                      <p>
                        <a href={`tel:${adminNo}`}>Phone: {adminNo}</a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {selectedListing && (
            <div className="cards-page-modal-overlay" onClick={closeModal}>
              <div
                className="cards-page-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="cards-page-close-button" onClick={closeModal}>
                  X
                </p>

                <img
                  src={selectedListing.images[0]}
                  alt={selectedListing.title}
                />
                <div className="cards-page-modal-content-div">
                  <h2>{selectedListing.title}</h2>
                  <p>{selectedListing.description}</p>
                  <br />
                  <p>
                    {selectedListing.address} <br />
                    <span className="status">
                      {selectedListing.status}
                    </span>{" "}
                    <br />
                    {new Date(selectedListing.possession).toLocaleString(
                      "default",
                      {
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </p>
                  <button
                    onClick={() => handleInquiryClick(selectedListing._id)}
                  >
                    Inquiry
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pagination-container">
          <button
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => {
              handlePageChange(currentPage - 1);
            }}
          >
            Previous
          </button>
          {renderPagination()}
          <button
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => {
              handlePageChange(currentPage + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>

      <section className="cards-page-famous-places-section">
        <h2 className="cards-page-section-title">FAMOUS PLACES IN INDIA</h2>
        <p className="cards-page-section-description">
          Explore India&rsquo;s most famous cities, each offering unique
          attractions and cultural experiences.
        </p>
        <div className="cards-page-places-container">
          {Object.entries(cities).map(([state, cityList]) => (
            <div className="cards-page-places-column" key={state}>
              <h3 className="cards-page-column-title">{state.toUpperCase()}</h3>
              <ul className="cards-page-places-list">
                {cityList.map((city) => {
                  const cityName = city.split(" - ")[0];
                  return (
                    <li key={cityName}>
                      <a
                        href={`/search?city=${encodeURIComponent(cityName)}`}
                        className="cards-page-city-link"
                      >
                        {city}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CardsPage;
