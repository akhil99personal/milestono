import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

import MegaMenuImg from "../images/megamenuimg.png";
import MegaMenuImg1 from "../images/megamenuimg2.png";
import MegaMenuImg2 from "../images/megamenuimg3.png";

import MegaMenuInsightImg from "../images/megamenuinsightimg.png";
import MegaMenuAreasImg from "../images/house4.jpg";
import MegaMenuBuyHomeImg from "../images/home.png";

import { Navigate } from "react-router-dom";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {},
    {},
    {
      title: "For Dealers / Builders",
      megaMenu: {
        image: MegaMenuImg,
        ClassNamefor: "forbuilders",
        dealerOfferings: {
          title: "DEALER OFFERINGS",
          items: ["TAX AND LEGAL ADVICE", "About Us"],
          links: ["/tax-legal-advice", "/AboutUs"],
        },
        researchAdvice: {
          title: "",
          items: ["", ""],
          links: ["#", "#"],
        },
        propertyServices: {
          title: "PROPERTY SERVICES",
          items: [
            "Property Calculator",
            "Explore our Service",
            "Register to property",
            "View Home Loan Deal",
            "View Video about Milestono",
          ],
          links: [
            "/property-calculator",
            "/#exploreService",
            "/#post-property",
            "/home-loan",
            "/#view-video",
          ],
        },
      },
    },
    {
      title: "Insights",
      megaMenu: {
        image: MegaMenuInsightImg,
        ClassNamefor: "forinsight",
        dealerOfferings: {
          title: "LOCALITY INSIGHTS",
          items: ["PRICE TRENDS", "TRANSACTION PRICES", "REVIEWS"],
          links: [
            "/insights?selectedSection=priceTrends",
            "/insights?selectedSection=transactionPrices",
            "/user-feedbacks",
          ],
        },
        researchAdvice: {
          title: "",
          items: [""],
          links: [""],
        },
        propertyServices: {
          title: "MOST POPULAR LOCALITIES",
          items: [
            "Delhi Overview",
            "Mumbai Overview",
            "Pune Road Overview",
            "Hyderabad Overview",
            "Kolkata Overview",
            "Bangalore Overview",
          ],
          links: [
            "/search?city=delhi",
            "/search?city=mumbai",
            "/search?city=pune",
            "/search?city=hyderabad",
            "/search?city=kolkata",
            "/search?city=bangalore",
          ],
        },
      },
    },
  ];

  const [hoveredSection, setHoveredSection] = useState(null);
  const [forbuyersImg, setForbuyersImg] = useState(MegaMenuImg2);

  const handleHover = (section) => {
    setHoveredSection(section);
    switch (section) {
      case "buyHome":
        setForbuyersImg(MegaMenuBuyHomeImg);
        break;
      case "popularAreas":
        setForbuyersImg(MegaMenuAreasImg);
        break;
      case "insights":
        setForbuyersImg(MegaMenuInsightImg);
        break;
      case "articlesNews":
        setForbuyersImg(MegaMenuImg);
        break;
      default:
        setForbuyersImg(MegaMenuImg2);
    }
  };

  const [forOwnersImg, setForOwnersImg] = useState(MegaMenuImg1);

  const handleHoverForOwners = (section) => {
    setHoveredSection(section);
    switch (section) {
      case "insights":
        setForOwnersImg(MegaMenuInsightImg);
        break;
      case "articlesNews":
        setForOwnersImg(MegaMenuImg1);
        break;
      case "aboutUs":
        setForOwnersImg(MegaMenuBuyHomeImg);
        break;
      case "viewProperties":
        setForOwnersImg(MegaMenuAreasImg);
        break;
      default:
        setForOwnersImg(MegaMenuImg1);
        break;
    }
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="nav-container">
        <ul className="nav-list">
          <li
            className="nav-item"
            style={{ marginRight: "0px" }}
            onMouseEnter={() => setActiveMenu(0)}
            onMouseLeave={() => {
              setActiveMenu(null);
              setHoveredSection(null);
              setForbuyersImg(MegaMenuImg2);
            }}
          >
            <button className="nav-link" aria-haspopup="true">
              For Buyers
            </button>

            {activeMenu === 0 && (
              <div className="mega-menu forowners" role="menu">
                <div className="mega-menu-container">
                  <div className="mega-menu-sidebar">
                    <div className="menu-section">
                      <h3>BUYERS OFFERING</h3>
                      <ul>
                        <li>
                          <a
                            role="menuitem"
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => handleHover("buyHome")}
                          >
                            BUY A HOME
                          </a>
                        </li>
                        <li>
                          <a
                            role="menuitem"
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => handleHover("popularAreas")}
                          >
                            POPULAR AREAS
                          </a>
                        </li>
                        <li>
                          <a
                            role="menuitem"
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => handleHover("insights")}
                          >
                            INSIGHTS
                          </a>
                        </li>
                        <li>
                          <a
                            role="menuitem"
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => handleHover("articlesNews")}
                          >
                            ARTICLES & NEWS
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mega-menu-content">
                    <h3>
                      {hoveredSection === "insights"
                        ? "City Overview"
                        : hoveredSection === "articlesNews"
                          ? "Articles & News"
                          : hoveredSection === "buyHome"
                            ? "Properties nearby"
                            : hoveredSection === "popularAreas"
                              ? "Popular Areas"
                              : ""}
                    </h3>
                    <ul>
                      {hoveredSection === "insights" ? (
                        <>
                          <li>
                            <a href="/search?city=delhi">Delhi Overview</a>
                          </li>
                          <li>
                            <a href="/search?city=mumbai">Mumbai Overview</a>
                          </li>
                          <li>
                            <a href="/search?city=pune">Pune Road Overview</a>
                          </li>
                          <li>
                            <a href="/search?city=hyderabad">
                              Hyderabad Overview
                            </a>
                          </li>
                          <li>
                            <a href="/search?city=kolkata">Kolkata Overview</a>
                          </li>
                          <li>
                            <a href="/search?city=bangalore">
                              Bangalore Overview
                            </a>
                          </li>
                        </>
                      ) : hoveredSection === "articlesNews" ? (
                        <>
                          <li>
                            <a href="/all-news">Articles For Buyers</a>
                          </li>
                          <li>
                            <a href="/all-news">Real Estate News</a>
                          </li>
                          <li>
                            <a href="/all-news">Buyer Guide</a>
                          </li>
                          <li>
                            <a href="/all-news">Home Interior Guides</a>
                          </li>
                          <li>
                            <a href="/all-news">
                              Policies (GST, RERA, PMAY, Budget)
                            </a>
                          </li>
                        </>
                      ) : hoveredSection === "buyHome" ? (
                        <>
                          <li>
                            <a href="/search">Flats</a>
                          </li>
                          <li>
                            <a href="/search">Builder Floors</a>
                          </li>
                          <li>
                            <a href="/search">Independent House</a>
                          </li>
                          <li>
                            <a href="/search">Plots in Pune</a>
                          </li>
                          <li>
                            <a href="/search">Serviced Apartments</a>
                          </li>
                          <li>
                            <a href="/search">Houses</a>
                          </li>
                        </>
                      ) : hoveredSection === "popularAreas" ? (
                        <>
                          <li>
                            <a href="/search?location=Kharadi">
                              Property in Kharadi
                            </a>
                          </li>
                          <li>
                            <a href="/search?location=Baner">
                              Property in Baner
                            </a>
                          </li>
                          <li>
                            <a href="/search?location=Hinjewadi">
                              Property in Hinjewadi
                            </a>
                          </li>
                          <li>
                            <a href="/search?location=Wakad">
                              Property in Wakad
                            </a>
                          </li>
                          <li>
                            <a href="/search?location=Ravet">
                              Property in Ravet
                            </a>
                          </li>
                          <li>
                            <a href="/search?location=Punawale">
                              Property in Punawale
                            </a>
                          </li>
                          <li>
                            <a href="/search?location=Wagholi">
                              Property in Wagholi
                            </a>
                          </li>
                          <li>
                            <a href="/search?location=Hadapsar">
                              Property in Hadapsar
                            </a>
                          </li>
                          <li>
                            <a href="/search?location=NIBM">Property in NIBM</a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <a href="/#post-property">Post Property</a>
                          </li>
                          <li>
                            <a href="/#exploreService">Owner Services</a>
                          </li>
                          <li>
                            <a href="/home-loan">Home Loan</a>
                          </li>
                          <li>
                            <a href="/#view-video">About Milestono</a>
                          </li>
                          <li>
                            <a href="/#view-property">View Properties</a>
                          </li>
                          <li>
                            <a href="/AboutUs">About Us</a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="mega-menu-image">
                    <img src={forbuyersImg} alt="Property Services" />
                  </div>
                </div>
                <div className="mega-menu-footer">
                  <p>
                    Email us at{" "}
                    <a href="mailto:info@milestono.in">
                      info@milestono.in
                    </a>{" "}
                    or call us at (IND Toll-Free)
                  </p>
                </div>
              </div>
            )}
          </li>

          <li
            className="nav-item"
            style={{ marginRight: "0px", marginLeft: "0px" }}
            onMouseEnter={() => setActiveMenu(1)}
            onMouseLeave={() => {
              setActiveMenu(null);
              setHoveredSection(null);
              setForOwnersImg(MegaMenuImg1);
            }}
          >
            <button className="nav-link" aria-haspopup="true">
              For Owners
            </button>

            {activeMenu === 1 && (
              <div className="mega-menu forowners" role="menu">
                <div className="mega-menu-container">
                  <div className="mega-menu-sidebar">
                    <div className="menu-section">
                      <h3>OWNER OFFERING</h3>
                      <ul>
                        <li>
                          <a
                            role="menuitem"
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() =>
                              handleHoverForOwners("insights")
                            }
                          >
                            INSIGHTS
                          </a>
                        </li>
                        <li>
                          <a
                            role="menuitem"
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() =>
                              handleHoverForOwners("articlesNews")
                            }
                          >
                            ARTICLES & NEWS
                          </a>
                        </li>
                        <li>
                          <a
                            role="menuitem"
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => handleHoverForOwners("aboutUs")}
                          >
                            ABOUT US
                          </a>
                        </li>
                        <li>
                          <a
                            role="menuitem"
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() =>
                              handleHoverForOwners("viewProperties")
                            }
                          >
                            VIEW PROPERTIES
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mega-menu-content">
                    <h3>
                      {hoveredSection === "insights"
                        ? "INSIGHTS"
                        : hoveredSection === "articlesNews"
                          ? "Articles & News"
                          : hoveredSection === "aboutUs"
                            ? "About Us"
                            : hoveredSection === "viewProperties"
                              ? "View Properties"
                              : ""}
                    </h3>
                    <ul>
                      {hoveredSection === "insights" ? (
                        <>
                          <li>
                            <a href="/insights?selectedSection=priceTrends">
                              Price Trends
                            </a>
                          </li>
                          <li>
                            <a href="/insights?selectedSection=transactionPrices">
                              Transaction Prices
                            </a>
                          </li>
                          <li>
                            <a href="/insights?selectedSection=reviews">
                              Reviews
                            </a>
                          </li>
                          <li>
                            <a href="/insights?selectedSection=marketTrends">
                              Market rends
                            </a>
                          </li>
                          <li>
                            <a href="/insights?selectedSection=investmentTips">
                              Investment ipss
                            </a>
                          </li>
                          <li>
                            <a href="/insights?selectedSection=expertOpinions">
                              Expert pinions
                            </a>
                          </li>
                        </>
                      ) : hoveredSection === "articlesNews" ? (
                        <>
                          <li>
                            <a href="/all-news">Articles For Buyers</a>
                          </li>
                          <li>
                            <a href="/all-news">Real Estate News</a>
                          </li>
                          <li>
                            <a href="/all-news">Buyer Guide</a>
                          </li>
                          <li>
                            <a href="/all-news">Home Interior Guides</a>
                          </li>
                          <li>
                            <a href="/all-news">
                              Policies (GST, RERA, PMAY, Budget)
                            </a>
                          </li>
                        </>
                      ) : hoveredSection === "aboutUs" ? (
                        <>
                          <li>
                            <a href="/aboutUs">Company Info</a>
                          </li>
                          <li>
                            <a href="/aboutUs">Our Team</a>
                          </li>
                          <li>
                            <a href="/contact-us">Contact Us</a>
                          </li>
                        </>
                      ) : hoveredSection === "viewProperties" ? (
                        <>
                          <li>
                            <a href="/search">Browse Properties</a>
                          </li>
                          <li>
                            <a href="/search">Property Map</a>
                          </li>
                          <li>
                            <a href="/#view-video">Property Videos</a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <a href="/#post-property">Post Property</a>
                          </li>
                          <li>
                            <a href="/#exploreService">Owner Services</a>
                          </li>
                          <li>
                            <a href="/home-loan">Home Loan</a>
                          </li>
                          <li>
                            <a href="/#view-video">About Milestono</a>
                          </li>
                          <li>
                            <a href="/#view-property">View Properties</a>
                          </li>
                          <li>
                            <a href="/AboutUs">About Us</a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="mega-menu-image">
                    <img src={forOwnersImg} alt="For Owners Section" />
                  </div>
                </div>
                <div className="mega-menu-footer">
                  <p>
                    Email us at{" "}
                    <a href="mailto:info@milestono.in">
                      info@milestono.in
                    </a>{" "}
                    or call us at (IND Toll-Free)
                  </p>
                </div>
              </div>
            )}
          </li>

          {menuItems.map((item, index) => (
            <li
              key={index}
              className="nav-item"
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className="nav-link"
                aria-haspopup={item.megaMenu ? "true" : "false"}
              >
                {item.title}
              </button>

              {activeMenu === index && item.megaMenu && (
                <div
                  className={`mega-menu ${item.megaMenu.ClassNamefor}`}
                  role="menu"
                >
                  <div className="mega-menu-container">
                    <div className="mega-menu-sidebar">
                      <div className="menu-section">
                        <h3>{item.megaMenu.dealerOfferings.title}</h3>
                        <ul>
                          {item.megaMenu.dealerOfferings.items.map(
                            (subItem, idx) => (
                              <li key={idx}>
                                <a
                                  href={
                                    item.megaMenu.dealerOfferings.links[idx]
                                  }
                                  role="menuitem"
                                >
                                  {subItem}
                                </a>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                      <div className="menu-section">
                        <h3>{item.megaMenu.researchAdvice.title}</h3>
                        <ul>
                          {item.megaMenu.researchAdvice.items.map(
                            (subItem, idx) => (
                              <li key={idx}>
                                <a
                                  href={item.megaMenu.researchAdvice.links[idx]}
                                  role="menuitem"
                                >
                                  {subItem}
                                </a>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mega-menu-content">
                      <h3>{item.megaMenu.propertyServices.title}</h3>
                      <ul>
                        {item.megaMenu.propertyServices.items.map(
                          (subItem, idx) => (
                            <li key={idx}>
                              <a
                                href={item.megaMenu.propertyServices.links[idx]}
                                role="menuitem"
                              >
                                {subItem}
                              </a>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div className="mega-menu-image">
                      <img src={item.megaMenu.image} alt="Property Services" />
                    </div>
                  </div>

                  <div className="mega-menu-footer">
                    <p>
                      Email us at{" "}
                      <a href="mailto:info@milestono.in">
                        info@milestono.in
                      </a>{" "}
                      or call us at (IND Toll-Free)
                    </p>
                  </div>
                </div>
              )}
            </li>
          ))}
          <button className="post-button">
            <a
              href="/post-property"
              style={{ textDecoration: "none", color: "black" }}
            >
              Post a property
            </a>
          </button>

          <div
            className="customer-care-container"
            style={{
              position: "relative",
              display: "inline-block",
              marginLeft: "0px",
            }}
          >
            <svg
              className="customercare"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="3"
              stroke="#000000"
              fill="none"
              width="30px"
              height="30px"
              style={{ marginTop: "10px", cursor: "pointer" }}
            >
              <g>
                <path
                  d="M12.91,31.8V26.1a19.09,19.09,0,0,1,38.18,0v5.7"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M12.06,31.8h4.7v14.38h-4.7a3,3,0,0,1-3-3V34.8A3,3,0,0,1,12.06,31.8Z"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M50.24,31.8h4.7v14.38h-4.7a3,3,0,0,1-3-3V34.8A3,3,0,0,1,50.24,31.8Z"
                  transform="translate(102.18 76.98) rotate(180)"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M51.7,45.56v5a4,4,0,0,1-4,4H36.56"
                  strokeLinecap="round"
                ></path>
                <rect
                  x="28.45"
                  y="51.92"
                  width="8.1"
                  height="5.07"
                  rx="2"
                  strokeLinecap="round"
                ></rect>
              </g>
            </svg>

            <div className="customer-care-menu">
              <h4>CONTACT US</h4>
              <span>Toll Free | 9:30 AM to 6:30 PM (Mon-Sun)</span>

              <button
                className="request-call-btn"
                onClick={() => {
                  navigate("/contact-us");
                }}
              >
                Request a Call Back
              </button>
              <br></br>
              <br></br>
              <p>
                To check all the FAQ <a href="/faqs">click here</a>
              </p>
            </div>
          </div>

          <div
            className="user-login-container"
            style={{
              position: "relative",
              display: "inline-block",
              marginLeft: "0px",
            }}
          >
            <svg
              className="userprof"
              fill="#ffffff"
              width="35px"
              height="35px"
              style={{ marginTop: "6px", cursor: "pointer" }}
              viewBox="-1 0 19 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-6.24-.064H6.81a2.528 2.528 0 0 0-2.692 2.303v1.51a.794.794 0 0 0 .792.792h7.166a.794.794 0 0 0 .792-.791V11.82a2.528 2.528 0 0 0-2.692-2.302zM6.14 6.374a2.353 2.353 0 1 0 2.353-2.353A2.353 2.353 0 0 0 6.14 6.374z"></path>
              </g>
            </svg>

            <div className="user-login-menu">
              <h4>My Activity</h4>
              <ul>
                <li>
                  <a href="/myproperty?tab=viewed">Recently viewed</a>
                </li>
                <li>
                  <a href="/myproperty?tab=posted">Posted Property</a>
                </li>
                <li>
                  <a href="/myproperty?tab=shortlisted">Shortlisted</a>
                </li>
                <li>
                  <a href="/myproperty?tab=contacted">Contacted</a>
                </li>
              </ul>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
