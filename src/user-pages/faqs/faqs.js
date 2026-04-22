import { React, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import "./faqs.css";

import Footer from "../homepage/Footer";

import QAbannerimg from "../../images/contactbanner2.jpg";
import FeedBackOverlay from "../FeedbackOverlay";
function QAPage() {
  const isMobileView = window.innerWidth <= 768;

  const productQA = [
    {
      title: "How do I search for properties on your platform?",
      description:
        "To search for properties, simply enter your desired location, budget, and property type in the search bar. You can further filter your search based on criteria such as the number of bedrooms, amenities, and property size.",
      content: [],
      firstcard: "first-accordion-item",
    },
    {
      title: "Can I list my property on the platform?",
      description:
        "Yes, you can list your property. Create an account, fill out the property details, upload high-quality images, and set your asking price. Once submitted, your listing will be reviewed and published.",
      content: [],
    },
    {
      title: "How do I contact a seller or buyer?",
      description:
        "Once you’ve found a property you're interested in, you can contact the seller or buyer directly through the messaging feature or by using the provided contact details on the listing page.",
      content: [],
    },
    {
      title: "Are the listings on your site verified?",
      description:
        "We work closely with property owners and agents to ensure that all listings are legitimate. However, we recommend visiting the property in person or consulting with a verified agent to confirm the details before making any decisions.",
      content: [],
    },
    {
      title: "What types of properties can I find on your platform?",
      description:
        "You can find a wide range of properties including residential homes, apartments, commercial properties, and land. We also offer options for renting and buying.",
      content: [],
      lastcard: "last-accordion-item",
    },
  ];

  const managementQA = [
    {
      title: "Do you provide real estate agent services?",
      description:
        "Yes, we offer access to a network of professional real estate agents who can assist you in buying, selling, or renting properties. Simply reach out to our support team for recommendations.",
      content: [],
      firstcard: "first-accordion-item",
    },
    {
      title: "How do I schedule a property viewing?",
      description: `Once you find a property you’re interested in, you can schedule a viewing directly with the seller or agent using the "Schedule Viewing" option on the property listing page.`,
      content: [],
    },
    {
      title: "How can I get home loan assistance?",
      description:
        "We partner with leading financial institutions to provide home loan assistance. You can apply for a loan through our website or contact our customer support for more details on loan eligibility and terms.",
      content: [],
    },
    {
      title:
        "Can I also find home services (e.g., maintenance, interior design) through your platform?",
      description:
        "Yes, in addition to properties, we offer a variety of home services. You can find trusted service providers for repairs, renovations, cleaning, and interior design through our platform.",
      content: [],
    },
    {
      title: "Is my personal information secure on your website?",
      description:
        "Yes, we take your privacy seriously. All personal information is stored securely and encrypted. We adhere to industry standards to ensure your data remains private and protected.",
      content: [],
      lastcard: "last-accordion-item",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <main>
        <section
          id="getintouch-hero-header"
          style={{ backgroundImage: `url(${QAbannerimg})` }}
        >
          <FeedBackOverlay />
          <section className="getintouch-hero">
            <div className="getintouch-hero-content">
              <h2>
                Milestono <span className="highlight-red">Q&A : </span>
                <br />
                Your Questions Answered!
              </h2>
            </div>
          </section>
        </section>

        <section className="accordion-container qasection hostQA">
          <section className="faq-section">
            <h1 style={{ fontSize: "3rem" }}>All FAQs</h1>
            <br></br>
            <br></br>
          </section>

          <section>
            <h1 className="FAQ-header" style={{ fontSize: "2rem" }}>
              Property Search and Listings
            </h1>
            <br></br>
            <br></br>
            <br></br>
            <div className="accordion-item-container">
              {productQA.map((item, index) => (
                <div
                  key={index}
                  className={`accordion-item ${item.firstcard} ${item.lastcard} ${activeIndex === index ? "active" : ""}`}
                >
                  <div
                    className="accordion-header"
                    onClick={() => handleToggle(index)}
                  >
                    <span className="driversQAheader">{item.title}</span>
                    <span className="accordion-item-icon">
                      {activeIndex === index ? (
                        isMobileView ? (
                          <FiX size={15} />
                        ) : (
                          <FiX size={20} />
                        )
                      ) : isMobileView ? (
                        <FiPlus size={15} />
                      ) : (
                        <FiPlus size={20} />
                      )}
                    </span>
                  </div>
                  <div className="accordion-content">
                    <p>{item.description}</p>
                    <p>{item.description2}</p>
                    <ul>
                      {item.content.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <h4 className="FAQ-sub-header" style={{ fontSize: "2rem" }}>
              Additional Services and Security
            </h4>
            <br></br>
            <br></br>
            <br></br>
            <div className="accordion-item-container">
              {managementQA.map((item, index) => (
                <div
                  key={index}
                  className={`accordion-item ${item.firstcard} ${item.lastcard} ${activeIndex === index ? "active" : ""}`}
                >
                  <div
                    className="accordion-header driversQA"
                    onClick={() => handleToggle(index)}
                  >
                    <span className="driversQAheader">{item.title}</span>
                    <span className="accordion-item-icon">
                      {activeIndex === index ? (
                        isMobileView ? (
                          <FiX size={15} />
                        ) : (
                          <FiX size={20} />
                        )
                      ) : isMobileView ? (
                        <FiPlus size={15} />
                      ) : (
                        <FiPlus size={20} />
                      )}
                    </span>
                  </div>
                  <div className="accordion-content">
                    <p>{item.description}</p>
                    <p>{item.description2}</p>
                    <ul>
                      {item.content.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>

        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
}

export default QAPage;
