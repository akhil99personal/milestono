import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Headphones,
} from "lucide-react";
import "./PricingPage.css";
import MainNavBar from "./MainNavBar";
import Footer from "./homepage/Footer";
import axios from "axios";
import diamondplanimg from "../images/diamondplanimg.png";
import ProfileModal from "../agent-pages/ProfileModal";
import { handlePayment } from "../others/Payment";

export default function PricingPage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [PLANS, setPlans] = useState({
    starterRealty: {
      name: "Starter Realty",
      current: true,
      price: 0,
      yearPrice: 0,
      pricePerMonth: "Free",
      subtitle: "For First-Time Sellers",
      color: "basic",
      responseText: "Get Started for Free",
      features: [
        "Post up to 3 properties (buy/sell/rent)",
        "Basic listing with 5 images per property",
        "Unlock 3 Contacts",
        "Standard visibility in search results",
        "Access to basic analytics (views, inquiries)",
      ],
      benefits: [
        "Ideal for homeowners selling/renting without investment",
        "No cost to list properties",
        "Standard exposure in search results",
      ],
      numOfProperties: 100,
      numOfContactDetails: 3,
      numOfImages: 5,
      numOfVideos: 0,
      numOfFeaturedProperties: 0,
      crmAccess: false,
      whatsappIntegration: false,
      exportCustomers: "no",
      bulkUpload: false,
      branding: "no",
    },
    smartSeller: {
      name: "Smart Seller",
      current: true,
      price: 999,
      yearPrice: 8999,
      pricePerMonth: "₹999 per month (or ₹8,999 annually with 10% discount)",
      subtitle: "For Frequent Sellers & Small Property Managers",
      color: "basic",
      responseText: "Upgrade for Better Leads",
      features: [
        "Post up to 10 properties",
        "Enhanced listing with 10 images per property",
        "Unlock 12 Contacts",
        "WhatsApp chat integration for instant communication",
        "Basic CRM dashboard for lead management",
        "Export leads in Excel/CSV format",
        "Monthly performance report",
      ],
      benefits: [
        "Higher visibility than free listings",
        "Better lead management with CRM tools",
        "Direct WhatsApp communication for faster conversions",
      ],
      numOfProperties: 10,
      numOfContactDetails: 12,
      numOfImages: 10,
      numOfVideos: 0,
      numOfFeaturedProperties: 0,
      crmAccess: true,
      whatsappIntegration: true,
      exportCustomers: "email",
      bulkUpload: false,
      branding: "no",
    },
    eliteAgent: {
      name: "Elite Agent",
      current: true,
      price: 2499,
      yearPrice: 22499,
      pricePerMonth: "₹2,499 per month (or ₹22,499 annually with 20% discount)",
      subtitle: "For Professional Agents & Brokers",
      color: "pro",
      responseText: "Boost Your Real Estate Business",
      features: [
        "Post up to 50 properties",
        "Featured badge for 5 properties (highlighted in search results)",
        "Rich media support (20 images, 2 videos)",
        "Unlock 24 Contacts",
        "Verified agent profile with 'Trusted Badge'",
        "Advanced CRM dashboard with lead tracking & reminders",
        "Export leads in Excel/CSV format",
        "SEO optimization tips for better rankings",
        "Dedicated account manager for onboarding & support",
      ],
      benefits: [
        "Increased property exposure with featured listings",
        "Enhanced credibility with a verified agent profile",
        "Advanced CRM and lead management for higher conversions",
      ],
      numOfProperties: 50,
      numOfContactDetails: 24,
      numOfImages: 20,
      numOfVideos: 2,
      numOfFeaturedProperties: 5,
      crmAccess: true,
      whatsappIntegration: true,
      exportCustomers: "email",
      bulkUpload: false,
      branding: "trusted",
    },
    developerPro: {
      name: "Developer Pro",
      current: true,
      price: 4999,
      yearPrice: 44999,
      pricePerMonth: "₹4,999 per month (or ₹44,999 annually with 20% discount)",
      subtitle: "For Developers & Large-Scale Property Managers",
      color: "premium",
      responseText: "Maximize Your Real Estate Reach",
      features: [
        "Unlimited property listings",
        "Featured badge for 10 properties",
        "Custom branding (logo, banner) on profile",
        "Bulk upload feature for quick multiple listings",
        "Access to Milestono’s exclusive developer network",
        "Advanced analytics",
        "Export leads with Contact Number in Excel/CSV format",
        "Discounted virtual staging service (₹1,999 per property)",
        "Legal assistance (₹99/month add-on available)",
        "Priority placement in locality-specific searches",
      ],
      benefits: [
        "Unlimited listings for large-scale property managers",
        "Increased brand visibility with custom branding",
        "Comprehensive analytics for data-driven decision-making",
        "Exclusive access to a premium developer network",
      ],
      numOfProperties: -1,
      numOfContactDetails: -1,
      numOfImages: -1,
      numOfVideos: -1,
      numOfFeaturedProperties: 10,
      crmAccess: true,
      whatsappIntegration: true,
      exportCustomers: "mobile",
      bulkUpload: true,
      branding: "custom",
    },
  });
  const [expandedBenefits, setExpandedBenefits] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("smartSeller");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "documents") {
          Array.from(value).forEach((doc) => formData.append("documents", doc));
        } else if (key === "specializations") {
          value.forEach((spec) => formData.append("specializations", spec));
        } else {
          formData.append(key, value);
        }
      });
      const response = await axios.post(
        `${BASE_URL}/api/verified-agent`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("auth"),
          },
        },
      );
      setShowModal(false);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const handleDurationChange = (planId, boolVal) => {
    const updatedPlans = { ...PLANS };
    updatedPlans[planId].current = boolVal;
    setPlans(updatedPlans);
  };

  const toggleBenefits = (plan) => {
    setExpandedBenefits((prev) =>
      prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan],
    );
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("auth");

    if (!token) {
      alert("Unauthorized: No token found.");
      return;
    }
    const plan = PLANS[selectedPlan];
    const userProfile = {
      numOfProperties: plan.numOfProperties,
      numOfContactDetails: plan.numOfContactDetails,
      numOfImages: plan.numOfImages,
      numOfVideos: plan.numOfVideos,
      numOfFeaturedProperties: plan.numOfFeaturedProperties,
      crmAccess: plan.crmAccess,
      whatsappIntegration: plan.whatsappIntegration,
      exportCustomers: plan.exportCustomers,
      bulkUpload: plan.bulkUpload,
      branding: plan.branding,
      current: plan.current,
      accountName : plan.name,
      price : plan.current ? parseInt(plan.price) : parseInt(plan.yearPrice)
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/accounts`,
        userProfile,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setShowModal(true);
      alert("Account created successfully");
    } catch (error) {
      console.error("Error creating account", error);
      alert("Failed to create account");
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="pricing-page" style={{ paddingTop: "100px" }}>
      <MainNavBar />
      <div className="pricing-page-pricing-container">
        <h1 className="pricing-page-pricing-offer">
          Exclusive Milestono Launch Offer: Available for the next 45 days only!
        </h1>
        <br />
        <br />
        <div className="pricing-page-pricing-header">
          <h1 className="pricing-page-pricing-title">Choose your plan</h1>
          <h2 className="pricing-page-pricing-subtitle">
            Select the perfect plan for your needs
          </h2>
        </div>

        <div className="pricing-page-pricing-grid">
          {Object.entries(PLANS).map(([planId, plan]) => (
            <div
              key={planId}
              className={`pricing-page-pricing-card ${plan.color}`}
            >
              <div className="pricing-page-card-content">
                <div className="pricing-page-card-header">
                  <h3 className="pricing-page-card-title">{plan.name}</h3>
                  <p className="pricing-page-card-subtitle">{plan.subtitle}</p>
                </div>
                <p className={`pricing-page-response-text ${plan.color}`}>
                  {plan.responseText}
                </p>
                <ul className="pricing-page-features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="pricing-page-feature-item">
                      <Check />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pricing-page-card-footer">
                <div
                  className={`pricing-page-duration-select ${selectedPlan === planId ? "selected" : ""}`}
                  onClick={() => handlePlanSelect(planId)}
                >
                  <input
                    type="radio"
                    className="pricing-page-radio-input"
                    name="plan-duration"
                    onChange={() => handleDurationChange(planId, true)}
                  />
                  <span style={{ paddingLeft: "5px", alignItems: "center" }}>
                    Monthly
                  </span>
                  <input
                    type="radio"
                    className="pricing-page-radio-input"
                    name="plan-duration"
                    onChange={() => handleDurationChange(planId, false)}
                  />
                  <span style={{ paddingLeft: "5px", alignItems: "center" }}>
                    Yearly
                  </span>
                  <div>
                    <p className="pricing-page-price">
                      ₹
                      <span className="pricing-page-og-price">
                        {!plan.current ? plan.yearPrice : plan.price}
                      </span>
                      {!plan.current && plan.price && (
                        <>
                          <span style={{ textDecoration: "line-through" }}>
                            {plan.price}
                          </span>
                          <> </>
                          <span>{Math.floor(plan.yearPrice / 12)}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  className="pricing-page-benefits-toggle"
                  onClick={() => toggleBenefits(planId)}
                >
                  ALL BENEFITS
                  {expandedBenefits.includes(planId) ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </button>
                {expandedBenefits.includes(planId) && (
                  <div className="pricing-page-benefits-content">
                    {plan.benefits.map((benefit, index) => (
                      <div key={index} className="pricing-page-benefit-item">
                        <Check />
                        <span
                          style={{ maxWidth: "90%" }}
                          dangerouslySetInnerHTML={{ __html: benefit }}
                        ></span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pricing-page-diamond-plan-container">
          <div className="pricing-page-diamond-card">
            <div className="pricing-page-diamond-card-content">
              <h1 className="pricing-page-diamond-card-title">Diamond Plan</h1>
              <ul className="pricing-page-diamond-card-features">
                <li>All Gold Plan features</li>
                <li>Top-priority visibility for all listings</li>
                <li>
                  Targeted marketing campaigns on Google, Facebook, and
                  Instagram
                </li>
                <li>Advanced analytics with demand heatmaps</li>
                <li>
                  Call service to connect potential buyers with agents directly
                </li>
                <li>Verified leads (filtered and spam-free)</li>
                <li>
                  Exclusive branding options (dealer/agent logo on listings)
                </li>
              </ul>
              <button
                className="pricing-page-diamond-card-button"
                onClick={() => setModalOpen(true)}
              >
                Request Callback
              </button>
            </div>
            <div className="pricing-page-diamond-card-image">
              <img
                src={diamondplanimg}
                alt="Diamond/Platinum Plan"
                className="pricing-page-diamond-card-img"
              />
            </div>
          </div>
        </div>

        <div className="pricing-page-bottom-bar">
          <div className="pricing-page-bottom-bar-content">
            <div>
              <p className="pricing-page-price" style={{ fontWeight: "700" }}>
                {PLANS[selectedPlan].name} • ₹
                {PLANS[selectedPlan].current
                  ? PLANS[selectedPlan].price.toLocaleString()
                  : PLANS[selectedPlan].yearPrice.toLocaleString()}
              </p>
            </div>
            <button
              className="pricing-page-buy-now-button"
              onClick={() => {
                handlePayment({
                  amount: PLANS[selectedPlan].current
                    ? parseInt(PLANS[selectedPlan].price)
                    : parseInt(PLANS[selectedPlan].yearPrice),
                  callback: () => handleBuyNow(),
                  description:
                    "Payment for " + PLANS[selectedPlan].name + " Taken",
                });
              }}
              disabled={parseInt(PLANS[selectedPlan].price) <= 0}
            >
              Buy Now
              <ChevronRight />
            </button>
          </div>
        </div>
        {showModal && (
          <ProfileModal
            onSubmit={handleSubmit}
            onClose={() => setShowModal(false)}
          />
        )}

        {isModalOpen && (
          <div className="pricing-page-overlay">
            <div className="pricing-page-modal">
              <button
                className="pricing-page-close-button"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>
              <h2>Want us to call you back?</h2>
              <p>Get a callback from our customer service team</p>
              <form>
                <div className="pricing-page-form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" />
                </div>
                <div className="pricing-page-form-group">
                  <label>Phone Number</label>
                  <div className="pricing-page-phone-input">
                    <select>
                      <option value="+91">IND (+91)</option>
                      <option value="+1">USA (+1)</option>
                      <option value="+44">UK (+44)</option>
                    </select>
                    <input type="tel" placeholder="Enter your phone number" />
                  </div>
                </div>
                <div className="pricing-page-form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="pricing-page-form-group">
                  <label>Owner</label>
                  <select>
                    <option value="owner">Owner</option>
                    <option value="Broker">Broker</option>
                    <option value="Builder">Builder</option>
                    <option value="Buyer">Buyer</option>
                  </select>
                </div>
                <div className="pricing-page-form-group">
                  <label>Preferred Time</label>
                  <select>
                    <option value="3-7">3 PM to 7 PM</option>
                    <option value="7-9">7 PM to 9 PM</option>
                  </select>
                </div>
                <button type="submit" className="pricing-page-submit-button">
                  Request a callback
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
