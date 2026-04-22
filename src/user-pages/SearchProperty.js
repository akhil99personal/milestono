import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import UserHeader from "./searchpage/SearchUserHeader";
import { Range, getTrackBackground } from "react-range";
import PropTypes from "prop-types";
import PropertyCard from "./searchpage/PropertyCard";
import "./SearchProperty.css";
import BottomNavBar from "./BottomNavBar";
import FeedbackOverlay from "./FeedbackOverlay";
import FadeLoader from "react-spinners/FadeLoader";

function SearchProperty({ handleMarkAsRead, problems, setProblems }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [allListings, setAllListings] = useState([]); // Store all fetched properties
  const [filteredListings, setFilteredListings] = useState([]); // Properties after filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState("");
  const [placePredictions, setPlacePredictions] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: -1, lng: -1 });
  const [cityCoordinates, setCityCoordinates] = useState({ lat: -1, lng: -1 });
  const radius = 5;
  // No longer need autocompleteServiceRef — using the new static
  // AutocompleteSuggestion.fetchAutocompleteSuggestions() API instead.
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid", "list", "map"
  const [quickFilters, setQuickFilters] = useState({
    all: true,
    buy: false,
    sell: false,
    rent: false,
    lease: false,
    commercial: false,
    pg: false,
  });
  const [filters, setFilters] = useState({
    category: "",
    bedrooms: [],
    propertyTypes: [],
    amenities: [],
    constructionStatus: [],
    postedBy: [],
    areaRange: [0, 20000],
    priceRange: [0, 1000000000],
    type: "",
  });
  const popoverRef = useRef(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [locatedCity, setLocatedCity] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const searchInProgress = useRef(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setGoogleMapsLoaded(true);
      return;
    }

    const loadScript = (url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleMapsLoaded(true);
      document.head.appendChild(script);
    };

    const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    if (googleApiKey && !window.google) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&v=weekly`
      );
    } else if (window.google) {
      setGoogleMapsLoaded(true);
    }
  }, []);



  const handleCitySelect = useCallback(async (city = searchCity) => {
    if (!city) return;

    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;

      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCityCoordinates({ lat: location.lat, lng: location.lng });
      } else {
        console.error("Geocode failed:", data.status);
        setCityCoordinates({ lat: -1, lng: -1 });
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setCityCoordinates({ lat: -1, lng: -1 });
    } finally {
      setLoading(false);
    }
  }, [searchCity]);

  const handleAreaSelect = useCallback(async (areaName) => {
    setSearchQuery(areaName);
    setPlacePredictions([]);
    setLoading(true);

    try {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(areaName)}&key=${apiKey}`;

      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordinates({ lat: location.lat, lng: location.lng });
        setSearched(areaName);
      } else {
        console.error("Geocode failed:", data.status);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const type = queryParams.get("type");
    const city = queryParams.get("city");
    const area = queryParams.get("location");
    const bedrooms = queryParams.get("bedrooms")?.split(",") || [];

    if (city || area || category || type || bedrooms.length > 0) {
      if (city) {
        setCoordinates({ lat: -1, lng: -1 });
        setSearchQuery("");
        setSearched("");
        setSearchCity(city);
        setLocatedCity(city);
      }

      if (area) {
        handleAreaSelect(area);
      }

      setFilters(prev => ({
        ...prev,
        category: category || "",
        type: type || "",
        bedrooms: bedrooms.length > 0 ? bedrooms : [],
      }));

      window.history.replaceState({}, "", "/search");
    } else {
      const storedSearchCity = sessionStorage.getItem("searchCity");
      const storedCityCoordinates = sessionStorage.getItem("cityCoordinates");
      const storedCoordinates = sessionStorage.getItem("coordinates");
      const storedSearchQuery = sessionStorage.getItem("searchQuery");
      const storedSearched = sessionStorage.getItem("searched");

      if (storedSearchCity) setSearchCity(storedSearchCity);
      if (storedCityCoordinates) {
        try {
          setCityCoordinates(JSON.parse(storedCityCoordinates));
        } catch (e) { }
      }
      if (storedCoordinates) {
        try {
          setCoordinates(JSON.parse(storedCoordinates));
        } catch (e) { }
      }
      if (storedSearchQuery) setSearchQuery(storedSearchQuery);
      if (storedSearched) setSearched(storedSearched);
    }
  }, [location.search, handleAreaSelect]);

  useEffect(() => {
    sessionStorage.setItem("searchCity", searchCity);
    sessionStorage.setItem("cityCoordinates", JSON.stringify(cityCoordinates));
    sessionStorage.setItem("coordinates", JSON.stringify(coordinates));
    sessionStorage.setItem("searchQuery", searchQuery);
    sessionStorage.setItem("searched", searched);
  }, [searchCity, cityCoordinates, coordinates, searchQuery, searched]);

  const handleSearch = useCallback(async () => {
    if (searchInProgress.current) return;

    searchInProgress.current = true;
    setLoading(true);

    try {
      let searchLat, searchLng, searchRadius;
      if (coordinates.lat !== -1 && coordinates.lng !== -1) {
        searchLat = coordinates.lat;
        searchLng = coordinates.lng;
        searchRadius = radius;
      } else if (cityCoordinates.lat !== -1 && cityCoordinates.lng !== -1) {
        searchLat = cityCoordinates.lat;
        searchLng = cityCoordinates.lng;
        searchRadius = 50;
      } else {
        setAllListings([]);
        return;
      }

      const response = await axios.post(`${BASE_URL}/api/search_properties`, {
        latitude: searchLat,
        longitude: searchLng,
        radius: searchRadius,
      });

      setAllListings(response.data);
    } catch (error) {
      console.error("Error searching properties:", error);
      setAllListings([]);
    } finally {
      setLoading(false);
      searchInProgress.current = false;
    }
  }, [BASE_URL, coordinates, cityCoordinates, radius]);

  const applyFilters = useCallback(() => {
    if (allListings.length === 0) {
      setFilteredListings([]);
      return;
    }

    const filtered = allListings.filter((property) => {
      if (filters.category && property.propertyCategory !== filters.category) {
        return false;
      }
      if (filters.bedrooms.length > 0) {
        const matches = filters.bedrooms.some(filterBedroom => {
          if (filterBedroom === "1RK") return property.bedrooms === "1RK";
          return filterBedroom.includes(property.bedrooms);
        });
        if (!matches) return false;
      }
      const areaSqft = parseInt(property.areaSqft) || 0;
      if (areaSqft < filters.areaRange[0] || areaSqft > filters.areaRange[1]) {
        return false;
      }
      const expectedPrice = parseInt(property.expectedPrice) || 0;
      if (
        expectedPrice < filters.priceRange[0] ||
        expectedPrice > filters.priceRange[1]
      ) {
        return false;
      }
      if (
        filters.type &&
        property.sellType.toLowerCase() !== filters.type.toLowerCase()
      ) {
        return false;
      }
      if (
        filters.propertyTypes.length > 0 &&
        !filters.propertyTypes.some(type =>
          property.propertyContains.includes(type)
        )
      ) {
        return false;
      }
      if (
        filters.amenities.length > 0 &&
        !filters.amenities.some(amenity =>
          property.amenities.includes(amenity)
        )
      ) {
        return false;
      }
      if (
        filters.constructionStatus.length > 0 &&
        !filters.constructionStatus.includes(property.oldProperty)
      ) {
        return false;
      }
      if (
        filters.postedBy.length > 0 &&
        !filters.postedBy.includes(property.sellerType)
      ) {
        return false;
      }

      return true;
    });

    setFilteredListings(filtered);
    setFilterApplied(true);
  }, [allListings, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    if ((coordinates.lat !== -1 && coordinates.lng !== -1) ||
      (cityCoordinates.lat !== -1 && cityCoordinates.lng !== -1)) {
      handleSearch();
    }
  }, [coordinates, cityCoordinates, handleSearch]);

  useEffect(() => {
    if (locatedCity) {
      handleCitySelect(locatedCity);
    }
  }, [locatedCity, handleCitySelect]);

  const handlePlaceChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!googleMapsLoaded || query.length <= 2) {
      setPlacePredictions([]);
      return;
    }

    setLoading(true);
    try {
      const { suggestions } =
        await window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
          { input: query }
        );

      // Normalise to the same shape the JSX downstream expects:
      // { place_id, description, types }
      const normalised = (suggestions || []).map(({ placePrediction }) => ({
        place_id: placePrediction.placeId,
        description: placePrediction.text.toString(),
        types: placePrediction.types ?? [],
      }));
      setPlacePredictions(normalised);
    } catch (err) {
      console.error("AutocompleteSuggestion error:", err);
      setPlacePredictions([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceSelect = async (place) => {
    setSearchQuery(place.description);
    setPlacePredictions([]);
    setLoading(true);

    try {
      const { Place } = window.google.maps.places;
      const placeObj = new Place({ id: place.place_id });
      await placeObj.fetchFields({ fields: ["location"] });

      const lat = placeObj.location.lat();
      const lng = placeObj.location.lng();
      setCoordinates({ lat, lng });
      setSearched(place.description);
    } catch (err) {
      console.error("Error fetching place details:", err);
    } finally {
      setLoading(false);
    }
  };

  const togglePopover = () => {
    if (windowWidth < 768) {
      setIsPopoverOpen(prev => !prev);
    }
  };

  const handleBoxClick = (field, value) => {
    setFilters((prevFilters) => {
      const updatedField = prevFilters[field].includes(value)
        ? prevFilters[field].filter((item) => item !== value)
        : [...prevFilters[field], value];
      return { ...prevFilters, [field]: updatedField };
    });
  };

  const handleRangeChange = (values, key) => {
    setFilters(prev => ({
      ...prev,
      [key]: values,
    }));
  };

  const handleToggleClick = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: prevFilters[field] === value ? "" : value,
    }));
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return (price / 10000000).toFixed(1) + "CR";
    } else if (price >= 100000) {
      return (price / 100000).toFixed(1) + "L";
    } else {
      return price.toString();
    }
  };

  const handleSelectChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = Number(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: newPriceRange,
    }));
  };

  const handleAreaSelectChange = (e, type, index) => {
    const value = parseInt(e.target.value, 10) || 0;
    const updatedRange = [...filters[type]];
    updatedRange[index] = value;
    setFilters(prev => ({ ...prev, [type]: updatedRange }));
  };

  const toggleSelection = (value, field) => {
    setFilters((prevFilters) => {
      const updatedField = prevFilters[field].includes(value)
        ? prevFilters[field].filter((item) => item !== value)
        : [...prevFilters[field], value];
      return { ...prevFilters, [field]: updatedField };
    });
  };

  const handleQuickFilterChange = (filterKey) => {
    setQuickFilters((prev) => {
      const newFilters = { ...prev };
      
      if (filterKey === "all") {
        // If "all" is clicked, reset all other filters
        Object.keys(newFilters).forEach((key) => {
          newFilters[key] = key === "all";
        });
      } else {
        // If any other filter is clicked, disable "all"
        newFilters.all = false;
        newFilters[filterKey] = !newFilters[filterKey];
        
        // If all other filters are deselected, enable "all"
        const anyOtherSelected = Object.keys(newFilters)
          .filter((k) => k !== "all")
          .some((k) => newFilters[k]);
        if (!anyOtherSelected) {
          newFilters.all = true;
        }
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: "",
      bedrooms: [],
      propertyTypes: [],
      amenities: [],
      constructionStatus: [],
      postedBy: [],
      areaRange: [0, 20000],
      priceRange: [0, 1000000000],
      type: "",
    });
    setQuickFilters({
      all: true,
      buy: false,
      sell: false,
      rent: false,
      lease: false,
      commercial: false,
      pg: false,
    });
    setSearchCity("");
    setCityCoordinates({ lat: -1, lng: -1 });
    setCoordinates({ lat: -1, lng: -1 });
    setSearchQuery("");
    setSearched("");
    setFilterApplied(false);
    setAllListings([]);
  };

  const propertyTypes = [
    "Flats/Apartment",
    "Independent House/Villa",
    "Independent/Builder Floor",
    "Plot/Land",
    "1RK/Studio Apartment",
    "Serviced Apartment",
    "Farmhouse",
  ];

  const Amenities = [
    "Car Parking",
    "CCTV",
    "Guard",
    "Gym",
    "Club House",
    "Water Supply",
    "Lift",
  ];
  const constructionStatus = [
    "New Launch",
    "Under Construction",
    "Ready to move",
  ];
  const postedBy = ["Owner", "Builder", "Dealer", "Feature Dealer"];

  const FilterSection = ({ isMobile = false }) => (
    <div className={`search-property-filter-box ${isMobile ? 'mobile' : ''}`} ref={popoverRef}>
      {isMobile && (
        <div
          onClick={() => setIsPopoverOpen(false)}
          className="search-property-close-filter"
        >
          X
        </div>
      )}

      <input
        type="text"
        placeholder="Search City"
        className="search-property-search"
        value={searched ? "" : searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        readOnly
      />

      <div className="search-property-filter-group">
        <label>Category</label>
        <div className="search-property-box-container">
          {["Commercial", "Residential"].map((category) => (
            <div
              key={category}
              className={`search-property-box ${filters.category === category ? "search-property-selected" : ""
                }`}
              onClick={() => handleToggleClick("category", category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <div className="search-property-filter-group">
        <label>Bedrooms</label>
        <div className="search-property-box-container">
          {["1RK", "1BHK", "2BHK", "3BHK", "4BHK", "5+BHK"].map((bedroom) => (
            <div
              key={bedroom}
              className={`search-property-box ${filters.bedrooms.includes(bedroom) ? "search-property-selected" : ""
                }`}
              onClick={() => handleBoxClick("bedrooms", bedroom)}
            >
              {bedroom}
            </div>
          ))}
        </div>
      </div>

      <div className="search-property-filter-group">
        <label>Area Range (sq ft)</label>
        <Range
          values={filters.areaRange}
          step={100}
          min={0}
          max={20000}
          onChange={(values) => handleRangeChange(values, "areaRange")}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: getTrackBackground({
                  values: filters.areaRange,
                  colors: ["#ccc", "#222761", "#ccc"],
                  min: 0,
                  max: 20000,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "16px",
                width: "16px",
                borderRadius: "50%",
                backgroundColor: "#222761",
              }}
            />
          )}
        />
        <div className="search-property-range-values">
          <span>{filters.areaRange[0]} sq ft</span>
          <span>{filters.areaRange[1]} sq ft</span>
        </div>
        <div className="search-property-price-range-selects">
          <input
            type="number"
            value={filters.areaRange[0]}
            onChange={(e) => handleAreaSelectChange(e, "areaRange", 0)}
            min={0}
            max={filters.areaRange[1] || 20000}
            placeholder="min area"
          />
          <input
            type="number"
            value={filters.areaRange[1]}
            onChange={(e) => handleAreaSelectChange(e, "areaRange", 1)}
            min={filters.areaRange[0] || 0}
            max={20000}
            placeholder="max area"
          />
        </div>
      </div>

      <div className="search-property-filter-group">
        <label>Price Range</label>
        <Range
          values={filters.priceRange}
          step={1000}
          min={0}
          max={1000000000}
          onChange={(values) => handleRangeChange(values, "priceRange")}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: getTrackBackground({
                  values: filters.priceRange,
                  colors: ["#ccc", "#222761", "#ccc"],
                  min: 0,
                  max: 1000000000,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "16px",
                width: "16px",
                borderRadius: "50%",
                backgroundColor: "#222761",
              }}
            />
          )}
        />
        <div className="search-property-range-values">
          <span>{formatPrice(filters.priceRange[0])}</span>
          <span>{formatPrice(filters.priceRange[1])}</span>
        </div>
        <div className="search-property-price-range-selects">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => handleSelectChange(e, 0)}
            min={0}
            max={filters.priceRange[1] || 1000000000}
            placeholder="min price"
          />
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => handleSelectChange(e, 1)}
            min={filters.priceRange[0] || 0}
            max={1000000000}
            placeholder="max price"
          />
        </div>
      </div>

      <div className="search-property-property-type-section">
        <h3 className="search-property-property-type-section-title">Type of property</h3>
        <ul className="search-property-property-type-section-list">
          {propertyTypes.map((type) => (
            <li key={type}>
              <button
                className={`search-property-property-type-section-item ${filters.propertyTypes.includes(type)
                    ? "search-property-selected"
                    : "search-property-notSelected"
                  }`}
                onClick={() => toggleSelection(type, "propertyTypes")}
              >
                {filters.propertyTypes.includes(type) ? "- " : "+ "} {type}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="search-property-property-type-section">
        <h3 className="search-property-property-type-section-title">Construction Status</h3>
        <ul className="search-property-property-type-section-list">
          {constructionStatus.map((status) => (
            <li key={status}>
              <button
                className={`search-property-property-type-section-item ${filters.constructionStatus.includes(status)
                    ? "search-property-selected"
                    : "search-property-notSelected"
                  }`}
                onClick={() => toggleSelection(status, "constructionStatus")}
              >
                {filters.constructionStatus.includes(status) ? "- " : "+ "} {status}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="search-property-property-type-section">
        <h3 className="search-property-property-type-section-title">Posted by</h3>
        <ul className="search-property-property-type-section-list">
          {postedBy.map((poster) => (
            <li key={poster}>
              <button
                className={`search-property-property-type-section-item ${filters.postedBy.includes(poster)
                    ? "search-property-selected"
                    : "search-property-notSelected"
                  }`}
                onClick={() => toggleSelection(poster, "postedBy")}
              >
                {filters.postedBy.includes(poster) ? "- " : "+ "} {poster}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="search-property-property-type-section">
        <h3 className="search-property-property-type-section-title">Amenities</h3>
        <ul className="search-property-property-type-section-list">
          {Amenities.map((amenity) => (
            <li key={amenity}>
              <button
                className={`search-property-property-type-section-item ${filters.amenities.includes(amenity)
                    ? "search-property-selected"
                    : "search-property-notSelected"
                  }`}
                onClick={() => toggleSelection(amenity, "amenities")}
              >
                {filters.amenities.includes(amenity) ? "- " : "+ "} {amenity}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="search-property-filter-group">
        <label>Type</label>
        <div className="search-property-box-container">
          {["Sell", "Rent", "PG"].map((type) => (
            <div
              key={type}
              className={`search-property-box ${filters.type === type ? "search-property-selected" : ""
                }`}
              onClick={() => handleToggleClick("type", type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      <div className="search-property-filter-btns">
        <button
          className="search-property-apply-filter-button"
          onClick={() => {
            handleCitySelect();
            handleSearch();
            if (isMobile) setIsPopoverOpen(false);
          }}
        >
          Apply Filters
        </button>
        <button
          className="search-property-clear-filter-button"
          onClick={clearAllFilters}
        >
          Clear All
        </button>
      </div>
    </div>
  );

  FilterSection.propTypes = {
    isMobile: PropTypes.bool,
  };

  return (
    <>
      <UserHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placePredictions={placePredictions}
        handlePlaceChange={handlePlaceChange}
        handlePlaceSelect={handlePlaceSelect}
        handleSearch={handleSearch}
        setSearched={setSearched}
        setFilters={setFilters}
        setSearchCity={setSearchCity}
        handleCitySelect={handleCitySelect}
        setCityCoordinates={setCityCoordinates}
        setCoordinates={setCoordinates}
        setFilterApplied={setFilterApplied}
        setPlacePredictions={setPlacePredictions}
        togglePopover={togglePopover}
        searchCity={searchCity}
      />
      <FeedbackOverlay />
      <div className="search-property-property-search-container">
        <div className="search-property-search-page">
          <div className="search-property-filter-section">
            <FilterSection />
          </div>

          {isPopoverOpen && (
            <div className="search-property-modal-overlay">
              <div className="search-property-popover">
                <FilterSection isMobile={true} />
              </div>
            </div>
          )}

          <div className="search-property-search-section">
            {loading ? (
              <div className="loader-container">
                <FadeLoader color="var(--primary-color)" />
              </div>
            ) : (
              <>
                <div className="search-property-updates">
                  <p>
                    {filteredListings.length} {filterApplied && filters.category}{" "}
                    Properties
                    {searched
                      ? " in " + searched
                      : searchCity
                        ? " in " + searchCity
                        : ""}
                  </p>
                  <p>Updated: {formatDate(new Date())}</p>
                </div>

                {/* Quick Filter Pills */}
                <div className="search-property-quick-filters">
                  <button
                    className={`search-property-filter-pill ${quickFilters.all ? "active" : ""}`}
                    onClick={() => handleQuickFilterChange("all")}
                  >
                    All
                  </button>
                  <button
                    className={`search-property-filter-pill ${quickFilters.buy ? "active" : ""}`}
                    onClick={() => handleQuickFilterChange("buy")}
                  >
                    Buy
                  </button>
                  <button
                    className={`search-property-filter-pill ${quickFilters.sell ? "active" : ""}`}
                    onClick={() => handleQuickFilterChange("sell")}
                  >
                    Sell
                  </button>
                  <button
                    className={`search-property-filter-pill ${quickFilters.rent ? "active" : ""}`}
                    onClick={() => handleQuickFilterChange("rent")}
                  >
                    Rent
                  </button>
                  <button
                    className={`search-property-filter-pill ${quickFilters.lease ? "active" : ""}`}
                    onClick={() => handleQuickFilterChange("lease")}
                  >
                    Lease
                  </button>
                  <button
                    className={`search-property-filter-pill ${quickFilters.commercial ? "active" : ""}`}
                    onClick={() => handleQuickFilterChange("commercial")}
                  >
                    Commercial
                  </button>
                  <button
                    className={`search-property-filter-pill ${quickFilters.pg ? "active" : ""}`}
                    onClick={() => handleQuickFilterChange("pg")}
                  >
                    PG / Co-living
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="search-property-view-toggle">
                  <button
                    className={`search-property-view-btn ${viewMode === "grid" ? "active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <i className="fa-solid fa-grip"></i>
                  </button>
                  <button
                    className={`search-property-view-btn ${viewMode === "list" ? "active" : ""}`}
                    onClick={() => setViewMode("list")}
                    title="List View"
                  >
                    <i className="fa-solid fa-list"></i>
                  </button>
                  <button
                    className={`search-property-view-btn ${viewMode === "map" ? "active" : ""}`}
                    onClick={() => setViewMode("map")}
                    title="Map View"
                  >
                    <i className="fa-solid fa-map"></i>
                  </button>
                </div>

                {/* Property Listings or Map */}
                {viewMode === "map" ? (
                  <div className="search-property-map-view">
                    <div className="search-property-map-placeholder">
                      <p>Map view coming soon</p>
                      <p>Your {filteredListings.length} properties will be displayed on the map</p>
                    </div>
                  </div>
                ) : (
                  <div className={`search-property-property-list search-property-property-list-${viewMode}`}>
                    {filteredListings.map((property) => (
                      <PropertyCard key={property._id} property={property} viewMode={viewMode} />
                    ))}

                    {filteredListings.length === 0 && !loading && (
                      <div className="search-property-no-results">
                        <p>No properties found matching your criteria.</p>
                        <p>Try adjusting your filters or search location.</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <BottomNavBar
        handleMarkAsRead={handleMarkAsRead}
        problems={problems}
        setProblems={setProblems} />
    </>
  );
}

SearchProperty.propTypes = {
  style: PropTypes.object,
};

export default SearchProperty;
