import { React, useEffect, useState } from "react";
import "./LoanPage.css";

import LoanCalculator from "./LoanCalculator";
import HomeLoanBg from "../../images/homeloanbgtransperant.png";
import { LoanDetailsDialog } from "./LoanDialog.jsx";

import Kotak from "../../images/kotakbank.png";
import hdfc from "../../images/hdfcbank.png";
import lic from "../../images/LIC.png";
import sbi from "../../images/SBIBank.png";
import icici from "../../images/ICICIBank.png";
import axis from "../../images/AXISBank.png";
import pnb from "../../images/PNBBank.png";
import LoanPageQA from "./LoanPageQA.jsx";
import Footer from "../homepage/Footer.js";
import FeedbackOverlay from "../FeedbackOverlay.jsx";
import MainNavBar from "../MainNavBar.jsx";
import axios from "axios";

function LoanPage() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [banks, setBanks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loanDetails] = useState({
    loanAmount: "30,00,000",
    tenure: "20",
    age: "35",
  });

  const fetchBanks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/bank`);
      setBanks(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);
  return (
    <div className="loan-page">
      <FeedbackOverlay />
      <MainNavBar />
      <section className="loan-page-home-section">
        <div className="loan-page-container">
          <div className="loan-page-content">
            <h1 className="loan-page-heading">
              Let&rsquo;s find you the best
              <span className="loan-page-accent"> home loan </span>
              deal.
            </h1>

            <div className="loan-page-form-group">
              <div className="loan-page-cta-button-container">
                <button
                  className="loan-page-loan-page-cta-button"
                  onClick={() => setDialogOpen(true)}
                >
                  Let's get started
                </button>
              </div>
            </div>
          </div>

          <div className="loan-page-illustration">
            <img
              src={HomeLoanBg}
              alt="Family with pet illustration"
              className="loan-page-illustration-image"
            />
          </div>
        </div>
      </section>

      <section className="loan-comparison">
        <div className="loan-comparison-container">
          <h1 className="loan-comparison-title">
            Hi ! We have 7 offers for you to compare and choose the best
          </h1>

          <div className="loan-comparison-comparison-table">
            <div className="loan-comparison-table-header">
              <div className="loan-comparison-header-cell">Bank Name</div>
              <div className="loan-comparison-header-cell">
                Rate of interest
              </div>
              <div className="loan-comparison-header-cell">Processing fees</div>
              <div className="loan-comparison-header-cell">EMI</div>
              <div className="loan-comparison-header-cell">
                Max. loan amount
              </div>
              <div className="loan-comparison-header-cell"></div>
            </div>

            <div className="loan-comparison-table-body">
              {banks.map((bank, index) => (
                <div key={index} className="loan-comparison-table-row">
                  {bank.featured && (
                    <div className="loan-comparison-featured-tag">FEATURED</div>
                  )}
                  <div className="loan-comparison-bank-info">
                    <img
                      src={bank.bankImage}
                      alt={bank.bankName}
                      className="loan-comparison-bank-logo"
                    />
                    <span className="loan-comparison-bank-name">
                      {bank.bankName}
                    </span>
                  </div>
                  <div className="loan-comparison-interest-rate">
                    {bank.interestRate}
                    <span className="loan-comparison-percentage">%</span>
                  </div>
                  <div className="loan-comparison-processing-fee">
                    ₹{bank.processingFees}
                    <span className="loan-comparison-gst">+ GST</span>
                  </div>
                  <div className="loan-comparison-emi-amount">₹{bank.emi}</div>
                  <div className="loan-comparison-max-loan">
                    {bank.maxLoanAmount}
                    <span className="loan-comparison-percentage">%</span>
                    <span className="loan-comparison-subtitle">
                      Loan to value ratio
                    </span>
                  </div>
                  <div className="loan-comparison-actions">
                    <button className="loan-comparison-email-button">
                      <span className="loan-comparison-email-icon">✉️</span>
                      Email me
                    </button>
                    <button
                      className="loan-comparison-deal-button"
                      onClick={() => setDialogOpen(true)}
                    >
                      Get me this deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LoanCalculator />

      <section className="loan-callback">
        <div className="loan-callback-container">
          <div className="loan-callback-content">
            <h2 className="loan-callback-title">
              Can&rsquo;t find any deal matching your criteria?
            </h2>
            <p className="loan-callback-subtitle">
              Provide your details, we&rsquo;ll connect you to a bank who can
              provide you a customized home loan solution
            </p>

            <div className="loan-callback-form-wrapper">
              <form className="loan-callback-callback-form">
                <div className="loan-callback-form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="loan-callback-form-input"
                  />
                </div>
                <div className="loan-callback-form-group">
                  <input
                    type="email"
                    placeholder="Your Email Id"
                    className="loan-callback-form-input"
                  />
                </div>
                <div className="loan-callback-form-group">
                  <input
                    type="tel"
                    placeholder="Mobile Number(OTP verification req)"
                    className="loan-callback-form-input"
                  />
                </div>
                <div className="loan-callback-form-group loan-callback-button-group">
                  <button type="submit" className="loan-callback-submit-button">
                    Request Callback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <LoanPageQA />

      <Footer />

      <LoanDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultValues={loanDetails}
      />
    </div>
  );
}

export default LoanPage;
