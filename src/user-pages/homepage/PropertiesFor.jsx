import { React, useEffect, useState } from "react";
import "./PropertiesFor.css";
import ForStudent from "../../images/properties for student.jpg";
import ForBuyers from "../../images/properties for buyers.jpg";
import ForInvesters from "../../images/properties for investers.jpg";
import { useNavigate } from "react-router-dom";
function PropertiesFor() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState("");
  const [inputs, setInputs] = useState({
    location: "",
  });
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const loadScript = (url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleMapsLoaded(true);
      document.head.appendChild(script);
    };

    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    if (googleApiKey) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&v=weekly`,
      );
    }
  }, []);

  const openModal = (card) => {
    setCurrentCard(card);
    setInputs({});
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const cityQuery = `city=${inputs.location}`;

    if (currentCard === "students") {
      const studentQuery = `bedrooms=1RK,1BHK&type=PG`;
      navigate(`/search?${cityQuery}&${studentQuery}`);
    } else {
      navigate(`/search?${cityQuery}`);
    }
  };

  const handleCityChange = async (e) => {
    const query = e.target.value;
    handleInputChange("location", query);
    if (query.length > 2) {
      try {
        const { suggestions } =
          await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            {
              input: query,
              includedPrimaryTypes: ["locality"],
              includedRegionCodes: ["in"],
            }
          );

        // Normalise to { place_id, description, types } for downstream JSX
        const normalised = (suggestions || []).map(({ placePrediction }) => ({
          place_id: placePrediction.placeId,
          description: placePrediction.text.toString(),
          types: placePrediction.types ?? [],
        }));
        setCitySuggestions(normalised);
      } catch (err) {
        console.error("AutocompleteSuggestion (city) error:", err);
        setCitySuggestions([]);
      }
    } else {
      setCitySuggestions([]);
    }
  };

  const renderModalContent = () => {
    const sharedFields = (
      <>
        <label className="relative-class">
          Location Preferences:
          <input
            type="text"
            value={inputs.location || ""}
            onChange={(e) => handleCityChange(e)}
            placeholder="e.g., City center, suburbs"
          />
          {citySuggestions.length > 0 && (
            <ul className="autocomplete-list">
              {citySuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => {
                    handleInputChange("location", suggestion.description);
                    setCitySuggestions([]);
                  }}
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </label>
      </>
    );

    switch (currentCard) {
      case "students":
        return <>{sharedFields}</>;
      case "buyers":
        return <>{sharedFields}</>;
      case "investors":
        return <></>;
      default:
        return null;
    }
  };

  return (
    <div className="property-for-card-container">
      <h2 className="main-heading-for-all-website">Property for</h2>

      <div className="property-for-cards-wrapper">
        <div className="property-for-card">
          <img
            src={ForStudent}
            alt="Student Accommodation"
            className="property-for-card-image"
          />
          <div className="property-for-card-content">
            <h3>For Students</h3>
            <p>Find the best accommodation options tailored for students.</p>
            <button className="btn" onClick={() => openModal("students")}>
              Explore
            </button>
          </div>
        </div>

        <div className="property-for-card">
          <img
            src={ForBuyers}
            alt="Property for Buyers"
            className="property-for-card-image"
          />
          <div className="property-for-card-content">
            <h3>For Buyers</h3>
            <p>Explore a wide variety of properties available for buyers.</p>
            <button className="btn" onClick={() => openModal("buyers")}>
              Explore
            </button>
          </div>
        </div>

        <div className="property-for-card">
          <img
            src={ForInvesters}
            alt="Investment Property"
            className="property-for-card-image"
          />
          <div className="property-for-card-content">
            <h3>For Investors</h3>
            <p>
              Discover lucrative property investment opportunities for long-term
              gains.
            </p>
            <button
              className="btn"
              onClick={() => {
                navigate("/explore-projects");
              }}
            >
              Explore
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="property-for-modal-overlay">
            <div className="property-for-modal-content">
              <h2>{`Find Properties For ${currentCard.charAt(0).toUpperCase() + currentCard.slice(1)}`}</h2>
              {renderModalContent()}
              <div className="property-for-modal-buttons">
                <button onClick={handleSubmit} className="btn-primary">
                  Submit
                </button>
                <button onClick={closeModal} className="btn-secondary">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertiesFor;
