import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  TrendingUp,
  GitCompare,
  MapPin,
  Check,
  Star,
  StarHalf,
  Heart,
  ChevronUp,
} from "lucide-react";
import { LineChart } from "./line-chart.tsx";
import "./InsightsPage.css";
import dummyImg from "../images/dummyImage.webp";

import InsightsImg1 from "../images/insigntPageImg1.jpg";
import InsightsImg2 from "../images/insigntPageImg2.jpg";
import InsightsImg3 from "../images/insigntPageImg3.jpg";

import InsightsImg4 from "../images/AdditionalInfo img7.jpg";
import InsightsImg5 from "../images/insigntPageImg5.jpg";
import InsightsImg6 from "../images/insigntPageImg6.jpg";

const tabs = [
  {
    id: "price",
    title: "Price Trends",
    content:
      "In 2024, real estate prices are rising, particularly for premium properties in urban areas, with an estimated 10% increase. Suburban homes are also seeing a price surge of 12%, driven by demand for more affordable housing. The increase in demand reflects changing preferences, including the search for smaller homes. Urban centers continue to see a steady demand for luxury living, while suburban areas offer more affordable alternatives. These trends highlight a shift in buyer priorities and housing market dynamics.",
    image: InsightsImg1,
    icon: <TrendingUp size={18} />,
  },
  {
    id: "transaction",
    title: "Transaction Prices",
    content:
      "Transaction prices have been fluctuating, with a 5% decrease in overall transaction volume in key cities. However, luxury properties continue to perform well, showing a sharp increase in high-value transactions. This trend indicates a strong demand for high-end real estate despite broader market fluctuations. The increasing interest in luxury homes is contributing to the overall price increase in some areas. Investors looking for high-value properties will find opportunities in this segment.",
    image: InsightsImg2,
    icon: <GitCompare size={18} />,
  },
  {
    id: "reviews",
    title: "Reviews",
    content:
      "Reviews highlight a growing sense of transparency in real estate transactions, fueled by emerging technologies like blockchain. Buyers and agents are reporting smoother, faster, and more secure property deals. The adoption of digital tools has minimized fraud, making the process more reliable. Overall, the real estate industry is becoming more streamlined, benefiting both buyers and sellers. Transparency and technology are transforming how deals are conducted, enhancing trust in the market.",
    image: InsightsImg3,
    icon: <Star size={18} />,
  },
  {
    id: "market",
    title: "Market Trends",
    content:
      "2024 sees a shift towards sustainable, energy-efficient homes, with an increasing demand for eco-friendly living spaces. Urban housing prices have risen by 7%, while suburban developments have surged by 15%, driven by remote work trends. Smart homes are gaining traction, offering automation for comfort and security. These market trends highlight the growing desire for sustainable and technologically advanced properties. Staying informed about these trends is key for making smart investments.",
    image: InsightsImg4,
    icon: <TrendingUp size={18} />,
  },
  {
    id: "expert",
    title: "Expert Opinions",
    content:
      "Smart investing in real estate involves targeting emerging locations with growth potential and securing rental yields of 7%-10%. Diversifying investments across both residential and commercial properties helps mitigate risks. Focus on long-term value, considering factors like infrastructure developments and job growth. Properties in high-demand areas with future potential are strong investment choices. By adopting a strategic approach, investors can maximize returns and minimize risks in 2024.",
    image: InsightsImg5,
    icon: <Search size={18} />,
  },
  {
    id: "investment",
    title: "Investment Tips",
    content:
      "Industry experts predict that 2024 will be a transformative year for real estate. With rising interest rates, buyers are moving toward smaller, affordable properties. At the same time, blockchain technology is revolutionizing property transactions, making them faster and more transparent. Gain valuable insights from professionals who’ve navigated these shifts successfully.",
    image: InsightsImg6,
    icon: <Heart size={18} />,
  },
];

const topSearchesData = [
  {
    id: 1,
    area: "Bandra West",
    city: "Mumbai",
    searches: 12500,
    growth: "+15%",
    trend: "up",
    image:
      "https://media.istockphoto.com/id/531864277/photo/bandra-worli-sea-link.webp?a=1&b=1&s=612x612&w=0&k=20&c=aTlDRxWe4mwjYLnWeBMbiIlX2nmx3CC3C0JZHLr27Ck=",
  },
  {
    id: 2,
    area: "Connaught Place",
    city: "New Delhi",
    searches: 15000,
    growth: "+20%",
    trend: "up",
    image:
      "https://media.istockphoto.com/id/1253875335/photo/connaught-place-with-national-flag.webp?a=1&b=1&s=612x612&w=0&k=20&c=aAEr-aDjcz_z-teW575dSM0hgolqBNiZp96kyBCERh4=",
  },
  {
    id: 3,
    area: "MG Road",
    city: "Bengaluru",
    searches: 14000,
    growth: "+18%",
    trend: "up",
    image:
      "https://media.istockphoto.com/id/497287527/photo/bangalore-city-scape.jpg?s=612x612&w=0&k=20&c=Cj7xK-Yn_NnsbU_D2IwPOezjUbuWxNd13HbgWP140Pc=",
  },
  {
    id: 4,
    area: "Howrah Bridge",
    city: "Kolkata",
    searches: 13000,
    growth: "+10%",
    trend: "up",
    image:
      "https://media.istockphoto.com/id/1164517176/photo/historic-howrah-bridge-with-boat-on-river-ganges-at-kolkata-india.jpg?s=612x612&w=0&k=20&c=aZX8zvFV5O1qtoWnv-gPtiW1eRPlUHeK_vjh87qLMU8=",
  },
  {
    id: 5,
    area: "Marina Beach",
    city: "Chennai",
    searches: 12000,
    growth: "+12%",
    trend: "up",
    image:
      "https://media.istockphoto.com/id/1211952929/photo/marina-beach-chennai-city-tamil-nadu-india-bay-of-bengal-chennai-tourism-east-coast-road.jpg?s=612x612&w=0&k=20&c=kpAeGGwy3TyyD97PJYULLBhxZV9bM_zVP0CU7f1HIZc=",
  },
];

const priceData = [
  {
    city: "Mumbai",
    price: 18000,
    change: "+5.2%",
    demand: "High",
    forecast: "Rising",
    investmentRating: 4.5,
  },
  {
    city: "Pune",
    price: 8500,
    change: "+2.8%",
    demand: "High",
    forecast: "Stable",
    investmentRating: 4.2,
  },
  {
    city: "Bangalore",
    price: 12000,
    change: "+3.1%",
    demand: "Medium",
    forecast: "Rising",
    investmentRating: 4.3,
  },
  {
    city: "Solapur",
    price: 4500,
    change: "-1.2%",
    demand: "Low",
    forecast: "Falling",
    investmentRating: 2.8,
  },
  {
    city: "Delhi",
    price: 15000,
    change: "+4.5%",
    demand: "High",
    forecast: "Rising",
    investmentRating: 4.4,
  },
  {
    city: "Chennai",
    price: 7800,
    change: "+1.8%",
    demand: "Medium",
    forecast: "Stable",
    investmentRating: 3.9,
  },
  {
    city: "Hyderabad",
    price: 9500,
    change: "+3.7%",
    demand: "High",
    forecast: "Rising",
    investmentRating: 4.4,
  },
  {
    city: "Kolkata",
    price: 6300,
    change: "+0.5%",
    demand: "Medium",
    forecast: "Stable",
    investmentRating: 3.5,
  },
];

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Mumbai",
      data: [18000, 18200, 18500, 18700, 18900, 19000],
      borderColor: "rgba(52, 152, 219, 0.8)",
      backgroundColor: "rgba(52, 152, 219, 0.1)",
    },
    {
      label: "Pune",
      data: [8500, 8600, 8700, 8750, 8800, 8900],
      borderColor: "rgba(46, 204, 113, 0.8)",
      backgroundColor: "rgba(46, 204, 113, 0.1)",
    },
    {
      label: "Bangalore",
      data: [12000, 12100, 12200, 12300, 12400, 12500],
      borderColor: "rgba(243, 156, 18, 0.8)",
      backgroundColor: "rgba(243, 156, 18, 0.1)",
    },
  ],
};

const propertyData = [
  {
    id: "1",
    name: "Luxury Apartment",
    location: "Bandra West, Mumbai",
    price: "₹1.8 Cr",
    size: "1200 sq.ft",
    pricePerSqFt: "₹15,000",
    bedrooms: 3,
    bathrooms: 2,
    type: "Residential",
    status: "Ready to Move",
    amenities: ["Pool", "Gym", "Security", "Parking", "Garden", "Clubhouse"],
    furniture: ["Modular Kitchen", "Wardrobes", "AC"],
    rating: 4.8,
    image: dummyImg,
    bhk: "3 BHK",
  },
  {
    id: "2",
    name: "Sea View Condo",
    location: "Marine Drive, Mumbai",
    price: "₹2.5 Cr",
    size: "1500 sq.ft",
    pricePerSqFt: "₹16,666",
    bedrooms: 3,
    bathrooms: 3,
    type: "Residential",
    status: "Ready to Move",
    amenities: ["Pool", "Gym", "Security", "Parking", "Garden", "Sea View"],
    furniture: ["Fully Furnished", "Modular Kitchen", "ACs"],
    rating: 4.9,
    image: dummyImg,
    bhk: "3 BHK",
  },
  {
    id: "3",
    name: "Garden Villa",
    location: "Koramangala, Bangalore",
    price: "₹1.2 Cr",
    size: "2000 sq.ft",
    pricePerSqFt: "₹6,000",
    bedrooms: 4,
    bathrooms: 3,
    type: "Residential",
    status: "Ready to Move",
    amenities: ["Garden", "Security", "Parking", "Private Terrace"],
    furniture: ["Semi-Furnished", "Modular Kitchen"],
    rating: 4.5,
    image: dummyImg,
    bhk: "4 BHK",
  },
  {
    id: "4",
    name: "Modern Apartment",
    location: "Viman Nagar, Pune",
    price: "₹85 Lakh",
    size: "1100 sq.ft",
    pricePerSqFt: "₹7,727",
    bedrooms: 2,
    bathrooms: 2,
    type: "Residential",
    status: "Ready to Move",
    amenities: ["Pool", "Gym", "Security", "Community Hall"],
    furniture: ["Unfurnished"],
    rating: 4.3,
    image: dummyImg,
    bhk: "2 BHK",
  },
  {
    id: "5",
    name: "Luxury Penthouse",
    location: "Jubilee Hills, Hyderabad",
    price: "₹3.5 Cr",
    size: "2500 sq.ft",
    pricePerSqFt: "₹14,000",
    bedrooms: 4,
    bathrooms: 4,
    type: "Residential",
    status: "Ready to Move",
    amenities: [
      "Private Pool",
      "Gym",
      "Security",
      "Parking",
      "Terrace Garden",
      "Home Theater",
    ],
    furniture: ["Fully Furnished", "Imported Fittings", "Smart Home"],
    rating: 4.9,
    image: dummyImg,
    bhk: "4 BHK",
  },
  {
    id: "6",
    name: "Commercial Space",
    location: "Whitefield, Bangalore",
    price: "₹1.5 Cr",
    size: "1800 sq.ft",
    pricePerSqFt: "₹8,333",
    type: "Commercial",
    status: "Ready to Move",
    amenities: [
      "24/7 Access",
      "Security",
      "Parking",
      "Conference Room",
      "Cafeteria",
    ],
    furniture: ["Office Cubicles", "Reception Area"],
    rating: 4.2,
    image: dummyImg,
    bhk: "NA",
  },
  {
    id: "7",
    name: "Budget Apartment",
    location: "Wakad, Pune",
    price: "₹45 Lakh",
    size: "650 sq.ft",
    pricePerSqFt: "₹6,923",
    bedrooms: 1,
    bathrooms: 1,
    type: "Residential",
    status: "Ready to Move",
    amenities: ["Security", "Parking", "Park"],
    furniture: ["Unfurnished"],
    rating: 4.0,
    image: dummyImg,
    bhk: "1 BHK",
  },
  {
    id: "8",
    name: "Premium Farmhouse",
    location: "Lonavala, Maharashtra",
    price: "₹4.5 Cr",
    size: "5000 sq.ft",
    pricePerSqFt: "₹9,000",
    bedrooms: 5,
    bathrooms: 5,
    type: "Residential",
    status: "Ready to Move",
    amenities: [
      "Private Pool",
      "Garden",
      "Parking",
      "Mountain View",
      "Party Lawn",
    ],
    furniture: ["Fully Furnished", "Imported Furniture", "BBQ Area"],
    rating: 4.7,
    image: dummyImg,
    bhk: "5 BHK",
  },
];

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const Accordion = ({
  title,
  children,
  isOpen,
  onToggle,
  gradientClass = "insight-page-bg-primary",
}) => {
  return (
    <div className="insight-page-accordion">
      <div
        className={`insight-page-accordion-header ${gradientClass}`}
        onClick={onToggle}
      >
        <div className="insight-page-accordion-title-container">
          <span className="insight-page-accordion-title">{title}</span>
          <span className="insight-page-accordion-icon">
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </span>
        </div>
      </div>
      <div
        className={`insight-page-accordion-content ${isOpen ? "insight-page-open" : ""}`}
      >
        <div className="insight-page-accordion-body">{children}</div>
      </div>
    </div>
  );
};

const TopSearchesSection = () => {
  return (
    <div className="insight-page-top-searches-section">
      <h2 className="insight-page-section-title">
        Most Searched Areas on Milestono
      </h2>
      <p className="insight-page-section-description">
        Discover the most popular localities that users are searching for. Use
        this data to make informed investment decisions.
      </p>
      <div className="insight-page-stats-container">
        <div className="insight-page-stat-item">
          <p className="insight-page-stat-value">45k+</p>
          <p className="insight-page-stat-label">Daily Searches</p>
        </div>
        <div className="insight-page-stat-item">
          <p className="insight-page-stat-value">12%</p>
          <p className="insight-page-stat-label">Monthly Growth</p>
        </div>
        <div className="insight-page-stat-item">
          <p className="insight-page-stat-value">8</p>
          <p className="insight-page-stat-label">Top Cities</p>
        </div>
      </div>
      <div className="insight-page-search-cards-container">
        {topSearchesData.map((item) => (
          <div key={item.id} className="insight-page-search-card">
            <div className="insight-page-search-card-image-container">
              <img
                src={item.image || dummyImg}
                alt={item.area}
                fill
                className="insight-page-search-card-image"
              />
              <div className="insight-page-search-card-overlay">
                <div className="insight-page-search-card-content">
                  <div className="insight-page-search-card-info">
                    <p className="insight-page-search-card-area">{item.area}</p>
                    <p className="insight-page-search-card-city">{item.city}</p>
                  </div>
                  <div className="insight-page-search-card-stats">
                    <p className="insight-page-search-card-searches">
                      {item.searches.toLocaleString()}
                    </p>
                    <div className="insight-page-search-card-trend">
                      <span
                        className={`insight-page-trend-arrow ${item.trend === "up" ? "insight-page-up" : "insight-page-down"}`}
                      >
                        {item.trend === "up" ? "▲" : "▼"}
                      </span>
                      <span
                        className={`insight-page-trend-value ${item.trend === "up" ? "insight-page-up" : "insight-page-down"}`}
                      >
                        {item.growth}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PriceTrendsSection = () => {
  const [selectedCity, setSelectedCity] = useState("Mumbai");

  return (
    <div className="insight-page-price-trends-section">
      <div className="insight-page-price-stats-container">
        <div className="insight-page-price-stat-item">
          <div className="insight-page-price-stat-icon">
            <TrendingUp size={20} className="insight-page-blue-icon" />
          </div>
          <p className="insight-page-price-stat-value">+4.8%</p>
          <p className="insight-page-price-stat-label">National Avg</p>
        </div>
        <div className="insight-page-price-stat-item">
          <div className="insight-page-price-stat-icon">
            <TrendingUp size={20} className="insight-page-red-icon" />
          </div>
          <p className="insight-page-price-stat-value">6 Months</p>
          <p className="insight-page-price-stat-label">Historical Data</p>
        </div>
        <div className="insight-page-price-stat-item">
          <div className="insight-page-price-stat-icon">
            <TrendingUp size={20} className="insight-page-green-icon" />
          </div>
          <p className="insight-page-price-stat-value">+3.2%</p>
          <p className="insight-page-price-stat-label">Forecast</p>
        </div>
      </div>
      <h2 className="insight-page-section-title">
        Price Movement (Last 6 Months)
      </h2>
      <div className="insight-page-city-filter">
        {["Mumbai", "Pune", "Bangalore"].map((city) => (
          <button
            key={city}
            className={`insight-page-city-filter-button ${selectedCity === city ? "insight-page-active" : ""}`}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
      <div className="insight-page-chart-container">
        <div className="insight-page-chart-wrapper">
          <LineChart data={chartData} />
        </div>
      </div>
      <h2 className="insight-page-section-title">City-wise Price Insights</h2>
      <div className="insight-page-price-cards-grid">
        {priceData.map((item, index) => (
          <div key={index} className="insight-page-price-card">
            <div className="insight-page-price-card-header">
              <h3 className="insight-page-price-card-title">{item.city}</h3>
              <span
                className={`insight-page-price-change-badge ${item.change.includes("+") ? "insight-page-positive" : "insight-page-negative"}`}
              >
                {item.change}
              </span>
            </div>
            <div className="insight-page-price-value-container">
              <span className="insight-page-price-value">₹{item.price}</span>
              <span className="insight-page-price-unit">per sq.ft</span>
            </div>
            <div className="insight-page-price-details">
              <div className="insight-page-price-detail-grid">
                <div className="insight-page-price-detail-item">
                  <p className="insight-page-detail-label">Demand</p>
                  <div className="insight-page-demand-indicator">
                    <span
                      className={`insight-page-demand-dot insight-page-${item.demand.toLowerCase()}`}
                    ></span>
                    <p className="insight-page-demand-text">{item.demand}</p>
                  </div>
                </div>
                <div className="insight-page-price-detail-item">
                  <p className="insight-page-detail-label">Forecast</p>
                  <p
                    className={`insight-page-forecast-text insight-page-${item.forecast.toLowerCase()}`}
                  >
                    {item.forecast}
                  </p>
                </div>
                <div className="insight-page-price-detail-item">
                  <p className="insight-page-detail-label">Investment</p>
                  <div className="insight-page-rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => {
                      if (star <= Math.floor(item.investmentRating)) {
                        return (
                          <Star
                            key={star}
                            size={12}
                            className="insight-page-star-filled"
                          />
                        );
                      } else if (star <= item.investmentRating) {
                        return (
                          <StarHalf
                            key={star}
                            size={12}
                            className="insight-page-star-filled"
                          />
                        );
                      } else {
                        return (
                          <Star
                            key={star}
                            size={12}
                            className="insight-page-star-empty"
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PropertyCompareSection = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(propertyData);
  const [compareFeatures, setCompareFeatures] = useState([
    { id: "price", name: "Price", enabled: true },
    { id: "size", name: "Plot Area", enabled: true },
    { id: "type", name: "Type", enabled: true },
    { id: "status", name: "Status", enabled: true },
    { id: "location", name: "Location", enabled: true },
    { id: "amenities", name: "Amenities", enabled: true },
    { id: "furniture", name: "Included Furniture", enabled: true },
    { id: "rating", name: "Rating", enabled: true },
  ]);

  useEffect(() => {
    if (searchText) {
      const filtered = propertyData.filter(
        (property) =>
          property.name.toLowerCase().includes(searchText.toLowerCase()) ||
          property.location.toLowerCase().includes(searchText.toLowerCase()) ||
          property.price.toLowerCase().includes(searchText.toLowerCase()) ||
          (property.bhk &&
            property.bhk.toLowerCase().includes(searchText.toLowerCase())),
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(propertyData);
    }
  }, [searchText]);

  const selectProperty = (property) => {
    if (selectedProperties.some((p) => p.id === property.id)) {
      setSelectedProperties(
        selectedProperties.filter((p) => p.id !== property.id),
      );
    } else if (selectedProperties.length < 2) {
      setSelectedProperties([...selectedProperties, property]);
    } else {
      setSelectedProperties([selectedProperties[1], property]);
    }
  };

  const compareProperties = () => {
    if (selectedProperties.length < 2) {
      const remainingProperties = propertyData.filter(
        (p) => !selectedProperties.some((sp) => sp.id === p.id),
      );
      if (remainingProperties.length > 0 && selectedProperties.length === 1) {
        const bestMatch = [...remainingProperties].sort(
          (a, b) => b.rating - a.rating,
        )[0];
        setSelectedProperties([selectedProperties[0], bestMatch]);
      }
    }
  };

  const toggleFeature = (featureId) => {
    setCompareFeatures(
      compareFeatures.map((feature) =>
        feature.id === featureId
          ? { ...feature, enabled: !feature.enabled }
          : feature,
      ),
    );
  };

  return (
    <div className="insight-page-property-compare-section">
      <h2 className="insight-page-section-title">
        Compare Properties Side by Side
      </h2>
      <p className="insight-page-section-description">
        Select any two properties to compare their features and find your
        perfect match.
      </p>
      <div className="insight-page-search-container">
        <div className="insight-page-search-input-container">
          <div className="insight-page-search-icon">
            <Search className="insight-page-search-icon-svg" />
          </div>
          <input
            type="text"
            placeholder="Search by name, location, price or BHK"
            className="insight-page-search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <button
          className={`insight-page-compare-button ${selectedProperties.length === 0 ? "insight-page-disabled" : ""}`}
          onClick={compareProperties}
          disabled={selectedProperties.length === 0}
        >
          {selectedProperties.length < 2 ? "Auto Compare" : "Compare"}
        </button>
      </div>
      <div className="insight-page-selection-status">
        <p className="insight-page-selection-text">
          {selectedProperties.length === 0
            ? "Select up to 2 properties to compare"
            : `Selected ${selectedProperties.length}/2 properties`}
        </p>
        {selectedProperties.length > 0 && (
          <button
            className="insight-page-clear-selection"
            onClick={() => setSelectedProperties([])}
          >
            Clear Selection
          </button>
        )}
      </div>
      <div className="insight-page-property-cards-container">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className={`insight-page-property-card ${selectedProperties.some((p) => p.id === property.id) ? "insight-page-selected" : ""}`}
            onClick={() => selectProperty(property)}
          >
            <div className="insight-page-property-image-container">
              <img
                src={property.image || dummyImg}
                alt={property.name}
                fill
                width={400}
                height={150}
                className="insight-page-property-image"
              />
              {property.bhk !== "NA" && (
                <div className="insight-page-property-bhk-badge">
                  <span className="insight-page-property-bhk-text">
                    {property.bhk}
                  </span>
                </div>
              )}
              {selectedProperties.some((p) => p.id === property.id) && (
                <div className="insight-page-property-selected-badge">
                  <Check className="insight-page-check-icon" />
                </div>
              )}
            </div>
            <div className="insight-page-property-details">
              <h3 className="insight-page-property-name">{property.name}</h3>
              <p className="insight-page-property-location">
                <MapPin className="insight-page-location-icon" />{" "}
                {property.location}
              </p>
              <p className="insight-page-property-price">{property.price}</p>
            </div>
            <div className="insight-page-property-actions">
              <button className="insight-page-property-action-button insight-page-save">
                Save Property
              </button>
              <button className="insight-page-property-action-button insight-page-view">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProperties.length === 2 && (
        <div className="insight-page-comparison-results">
          <div className="insight-page-comparison-header">
            <h3 className="insight-page-comparison-title">
              Comparison Results
            </h3>
            <div className="insight-page-feature-toggles">
              <p className="insight-page-toggle-label">Toggle Features:</p>
              <div className="insight-page-toggle-buttons">
                {compareFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    className={`insight-page-feature-toggle ${feature.enabled ? "insight-page-active" : ""}`}
                    onClick={() => toggleFeature(feature.id)}
                  >
                    {feature.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="insight-page-comparison-table">
            <div className="insight-page-table-header">
              <div className="insight-page-feature-column">
                <p className="insight-page-column-title">Feature</p>
              </div>
              <div className="insight-page-property-column">
                <div className="insight-page-property-thumbnail-container">
                  <div className="insight-page-property-thumbnail">
                    <img
                      src={selectedProperties[0].image || dummyImg}
                      alt={selectedProperties[0].name}
                      fill
                      className="insight-page-thumbnail-image"
                    />
                  </div>
                </div>
                <p className="insight-page-property-column-name">
                  {selectedProperties[0].name}
                </p>
              </div>
              <div className="insight-page-property-column">
                <div className="insight-page-property-thumbnail-container">
                  <div className="insight-page-property-thumbnail">
                    <img
                      src={selectedProperties[1].image || dummyImg}
                      alt={selectedProperties[1].name}
                      fill
                      className="insight-page-thumbnail-image"
                    />
                  </div>
                </div>
                <p className="insight-page-property-column-name">
                  {selectedProperties[1].name}
                </p>
              </div>
            </div>
            {compareFeatures.find((f) => f.id === "price" && f.enabled) && (
              <div className="insight-page-table-row">
                <div className="insight-page-feature-column">Price</div>
                <div className="insight-page-property-column">
                  {selectedProperties[0].price}
                </div>
                <div className="insight-page-property-column">
                  {selectedProperties[1].price}
                </div>
              </div>
            )}
            {compareFeatures.find((f) => f.id === "size" && f.enabled) && (
              <div className="insight-page-table-row">
                <div className="insight-page-feature-column">Plot Area</div>
                <div className="insight-page-property-column">
                  {selectedProperties[0].size}
                </div>
                <div className="insight-page-property-column">
                  {selectedProperties[1].size}
                </div>
              </div>
            )}
            {compareFeatures.find((f) => f.id === "type" && f.enabled) && (
              <div className="insight-page-table-row">
                <div className="insight-page-feature-column">Type</div>
                <div className="insight-page-property-column">
                  {selectedProperties[0].type || "N/A"}
                </div>
                <div className="insight-page-property-column">
                  {selectedProperties[1].type || "N/A"}
                </div>
              </div>
            )}
            {compareFeatures.find((f) => f.id === "status" && f.enabled) && (
              <div className="insight-page-table-row">
                <div className="insight-page-feature-column">Status</div>
                <div className="insight-page-property-column">
                  {selectedProperties[0].status || "N/A"}
                </div>
                <div className="insight-page-property-column">
                  {selectedProperties[1].status || "N/A"}
                </div>
              </div>
            )}
            {compareFeatures.find((f) => f.id === "location" && f.enabled) && (
              <div className="insight-page-table-row">
                <div className="insight-page-feature-column">Location</div>
                <div className="insight-page-property-column insight-page-location-cell">
                  {selectedProperties[0].location}
                </div>
                <div className="insight-page-property-column insight-page-location-cell">
                  {selectedProperties[1].location}
                </div>
              </div>
            )}
            {compareFeatures.find((f) => f.id === "amenities" && f.enabled) && (
              <div className="insight-page-table-row">
                <div className="insight-page-feature-column">Amenities</div>
                <div
                  className={`insight-page-property-column ${(selectedProperties[0].amenities?.length || 0) >
                      (selectedProperties[1].amenities?.length || 0)
                      ? "insight-page-highlight"
                      : ""
                    }`}
                >
                  <p>{selectedProperties[0].amenities?.length || 0}</p>
                  <p className="insight-page-amenities-list">
                    {selectedProperties[0].amenities?.slice(0, 3).join(", ")}
                    {(selectedProperties[0].amenities?.length || 0) > 3
                      ? "..."
                      : ""}
                  </p>
                </div>
                <div
                  className={`insight-page-property-column ${(selectedProperties[1].amenities?.length || 0) >
                      (selectedProperties[0].amenities?.length || 0)
                      ? "insight-page-highlight"
                      : ""
                    }`}
                >
                  <p>{selectedProperties[1].amenities?.length || 0}</p>
                  <p className="insight-page-amenities-list">
                    {selectedProperties[1].amenities?.slice(0, 3).join(", ")}
                    {(selectedProperties[1].amenities?.length || 0) > 3
                      ? "..."
                      : ""}
                  </p>
                </div>
              </div>
            )}
            {compareFeatures.find((f) => f.id === "furniture" && f.enabled) && (
              <div className="insight-page-table-row">
                <div className="insight-page-feature-column">Furniture</div>
                <div
                  className={`insight-page-property-column ${(selectedProperties[0].furniture?.length || 0) >
                      (selectedProperties[1].furniture?.length || 0)
                      ? "insight-page-highlight"
                      : ""
                    }`}
                >
                  <p>{selectedProperties[0].furniture?.length || 0} items</p>
                  <p className="insight-page-furniture-list">
                    {selectedProperties[0].furniture?.slice(0, 2).join(", ")}
                    {(selectedProperties[0].furniture?.length || 0) > 2
                      ? "..."
                      : ""}
                  </p>
                </div>
                <div
                  className={`insight-page-property-column ${(selectedProperties[1].furniture?.length || 0) >
                      (selectedProperties[0].furniture?.length || 0)
                      ? "insight-page-highlight"
                      : ""
                    }`}
                >
                  <p>{selectedProperties[1].furniture?.length || 0} items</p>
                  <p className="insight-page-furniture-list">
                    {selectedProperties[1].furniture?.slice(0, 2).join(", ")}
                    {(selectedProperties[1].furniture?.length || 0) > 2
                      ? "..."
                      : ""}
                  </p>
                </div>
              </div>
            )}
            {compareFeatures.find((f) => f.id === "rating" && f.enabled) && (
              <div className="insight-page-table-row">
                <div className="insight-page-feature-column">Rating</div>
                <div
                  className={`insight-page-property-column ${selectedProperties[0].rating > selectedProperties[1].rating
                      ? "insight-page-highlight"
                      : ""
                    }`}
                >
                  <p className="insight-page-rating-value">
                    {selectedProperties[0].rating}
                  </p>
                  <div className="insight-page-rating-stars-container">
                    {[1, 2, 3, 4, 5].map((star) => {
                      if (star <= Math.floor(selectedProperties[0].rating)) {
                        return (
                          <Star
                            key={star}
                            size={14}
                            className="insight-page-star-filled"
                          />
                        );
                      } else if (star <= selectedProperties[0].rating) {
                        return (
                          <StarHalf
                            key={star}
                            size={14}
                            className="insight-page-star-filled"
                          />
                        );
                      } else {
                        return (
                          <Star
                            key={star}
                            size={14}
                            className="insight-page-star-empty"
                          />
                        );
                      }
                    })}
                  </div>
                </div>
                <div
                  className={`insight-page-property-column ${selectedProperties[1].rating > selectedProperties[0].rating
                      ? "insight-page-highlight"
                      : ""
                    }`}
                >
                  <p className="insight-page-rating-value">
                    {selectedProperties[1].rating}
                  </p>
                  <div className="insight-page-rating-stars-container">
                    {[1, 2, 3, 4, 5].map((star) => {
                      if (star <= Math.floor(selectedProperties[1].rating)) {
                        return (
                          <Star
                            key={star}
                            size={14}
                            className="insight-page-star-filled"
                          />
                        );
                      } else if (star <= selectedProperties[1].rating) {
                        return (
                          <StarHalf
                            key={star}
                            size={14}
                            className="insight-page-star-filled"
                          />
                        );
                      } else {
                        return (
                          <Star
                            key={star}
                            size={14}
                            className="insight-page-star-empty"
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="insight-page-comparison-actions">
            <button className="insight-page-save-property-button">
              <Heart size={16} className="insight-page-heart-icon" />
              <span>Save {selectedProperties[0].name}</span>
            </button>
            <button className="insight-page-save-property-button">
              <Heart size={16} className="insight-page-heart-icon" />
              <span>Save {selectedProperties[1].name}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TabContent = ({ tab }) => {
  return (
    <div className="insight-page-tab-content">
      <p className="insight-page-tab-description">{tab.content}</p>
      <div className="insight-page-tab-image-container">
        <img
          src={tab.image || dummyImg}
          alt={tab.title}
          fill
          className="insight-page-tab-image"
        />
      </div>
    </div>
  );
};

const CustomTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="insight-page-custom-tabs-container">
      <div className="insight-page-custom-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`insight-page-custom-tab ${activeTab === tab.id ? "insight-page-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="insight-page-tab-icon">{tab.icon}</span>
            <span className="insight-page-tab-title">{tab.title}</span>
          </button>
        ))}
      </div>
      <div className="insight-page-custom-tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`insight-page-tab-panel ${activeTab === tab.id ? "insight-page-active" : ""}`}
          >
            <TabContent tab={tab} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function RealEstateInsights() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeTab, setActiveTab] = useState("price");
  const isMobile = useMobile();

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="insight-page-real-estate-insights">
      <div className="insight-page-header-section">
        <div className="insight-page-header-container">
          <h1 className="insight-page-main-title">Milestono Insights</h1>
          <p className="insight-page-main-subtitle">
            Make informed real estate decisions
          </p>
        </div>
      </div>
      <div className="insight-page-main-container">
        <div className="insight-page-navigation-card">
          <div className="insight-page-nav-buttons">
            <button
              className={`insight-page-nav-button ${activeAccordion === "topSearches" ? "insight-page-active" : ""}`}
              onClick={() => toggleAccordion("topSearches")}
            >
              <Search size={18} className="insight-page-nav-icon" />
              <span className="insight-page-nav-text">Top Searches</span>
            </button>
            <button
              className={`insight-page-nav-button ${activeAccordion === "priceTrends" ? "insight-page-active" : ""}`}
              onClick={() => toggleAccordion("priceTrends")}
            >
              <TrendingUp size={18} className="insight-page-nav-icon" />
              <span className="insight-page-nav-text">Price Trends</span>
            </button>
            <button
              className={`insight-page-nav-button ${activeAccordion === "propertyCompare" ? "insight-page-active" : ""}`}
              onClick={() => toggleAccordion("propertyCompare")}
            >
              <GitCompare size={18} className="insight-page-nav-icon" />
              <span className="insight-page-nav-text">Compare</span>
            </button>
          </div>
        </div>
        <div className="insight-page-content-section">
          {isMobile ? (
            <>
              <Accordion
                title="Top Searches Area"
                isOpen={activeAccordion === "topSearches"}
                onToggle={() => toggleAccordion("topSearches")}
                gradientClass="insight-page-purple-gradient"
              >
                <TopSearchesSection />
              </Accordion>
              <Accordion
                title="Property Price Trends"
                isOpen={activeAccordion === "priceTrends"}
                onToggle={() => toggleAccordion("priceTrends")}
                gradientClass="insight-page-green-gradient"
              >
                <PriceTrendsSection />
              </Accordion>
              <Accordion
                title="Property Compare"
                isOpen={activeAccordion === "propertyCompare"}
                onToggle={() => toggleAccordion("propertyCompare")}
                gradientClass="insight-page-red-gradient"
              >
                <PropertyCompareSection />
              </Accordion>
              {tabs.map((tab) => (
                <Accordion
                  key={tab.id}
                  title={tab.title}
                  isOpen={activeAccordion === tab.id}
                  onToggle={() => toggleAccordion(tab.id)}
                  gradientClass="insight-page-indigo-gradient"
                >
                  <TabContent tab={tab} />
                </Accordion>
              ))}
            </>
          ) : (
            <>
              {activeAccordion === "topSearches" && (
                <div className="insight-page-content-card">
                  <h2 className="insight-page-content-title insight-page-purple">
                    Top Searches Area
                  </h2>
                  <TopSearchesSection />
                </div>
              )}
              {activeAccordion === "priceTrends" && (
                <div className="insight-page-content-card">
                  <h2 className="insight-page-content-title insight-page-green">
                    Property Price Trends
                  </h2>
                  <PriceTrendsSection />
                </div>
              )}
              {activeAccordion === "propertyCompare" && (
                <div className="insight-page-content-card">
                  <h2 className="insight-page-content-title insight-page-red">
                    Property Compare
                  </h2>
                  <PropertyCompareSection />
                </div>
              )}
              {!activeAccordion && (
                <div className="insight-page-content-card">
                  <CustomTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
