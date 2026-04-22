import React from "react";
import "./TaxAndLegalAdvice.css";
import Footer from "./homepage/Footer";

const TaxAndLegalAdviceIndia = () => {
  return (
    <>
      <div className="tax-legal-container">
        <section className="tax-legal-hero-section">
          <div className="tax-legal-hero-content">
            <h1 className="tax-legal-hero-title">Tax & Legal Advice</h1>
            <p className="tax-legal-hero-description">
              Simplify your property investments with expert advice on Indian
              tax laws and legal compliance.
            </p>
            <button className="tax-legal-cta-button">Speak to an Expert</button>
          </div>
        </section>

        <section className="tax-legal-services-section">
          <h2 className="tax-legal-section-title">Our Expertise</h2>
          <div className="tax-legal-services-grid">
            <div className="tax-legal-service-card">
              <div className="tax-legal-service-icon">💼</div>
              <h3>GST on Property</h3>
              <p>
                Navigate through India&rsquo;s Goods and Services Tax (GST)
                implications on real estate transactions.
              </p>
            </div>
            <div className="tax-legal-service-card">
              <div className="tax-legal-service-icon">⚖️</div>
              <h3>Legal Due Diligence</h3>
              <p>
                Verify property ownership and ensure compliance with RERA
                guidelines.
              </p>
            </div>
            <div className="tax-legal-service-card">
              <div className="tax-legal-service-icon">📄</div>
              <h3>Registration Assistance</h3>
              <p>
                Get help with property registration, stamp duty, and mutation
                processes in India.
              </p>
            </div>
            <div className="tax-legal-service-card">
              <div className="tax-legal-service-icon">📊</div>
              <h3>Capital Gains Tax</h3>
              <p>
                Plan for capital gains tax on property sales with expert
                guidance.
              </p>
            </div>
          </div>
        </section>

        <section className="tax-legal-work-process-section">
          <h2 className="tax-legal-section-title">How We Work</h2>
          <div className="tax-legal-work-process-grid">
            <div className="tax-legal-work-step">
              <h3>1. Consultation</h3>
              <p>Book a call with our experts to discuss your requirements.</p>
            </div>
            <div className="tax-legal-work-step">
              <h3>2. Assessment</h3>
              <p>We evaluate your property’s legal and tax documentation.</p>
            </div>
            <div className="tax-legal-work-step">
              <h3>3. Action Plan</h3>
              <p>Receive a detailed report with step-by-step guidance.</p>
            </div>
            <div className="tax-legal-work-step">
              <h3>4. Execution</h3>
              <p>
                We assist in the execution of all legal and tax compliance
                processes.
              </p>
            </div>
          </div>
        </section>

        <section className="tax-legal-blog-section">
          <h2 className="tax-legal-section-title">Latest Insights</h2>
          <div className="tax-legal-blog-grid">
            <div className="tax-legal-blog-card">
              <h3>Understanding Stamp Duty in India</h3>
              <p>
                Learn how to calculate and save on stamp duty for your property.
              </p>
              <a href="#" className="tax-legal-read-more">
                Read More
              </a>
            </div>
            <div className="tax-legal-blog-card">
              <h3>RERA Compliance Checklist</h3>
              <p>
                A complete guide to ensure your property complies with RERA
                regulations.
              </p>
              <a href="#" className="tax-legal-read-more">
                Read More
              </a>
            </div>
            <div className="tax-legal-blog-card">
              <h3>Capital Gains Tax Simplified</h3>
              <p>
                Explore ways to minimize your tax liability on property sales.
              </p>
              <a href="#" className="tax-legal-read-more">
                Read More
              </a>
            </div>
          </div>
        </section>

        <section className="tax-legal-property-tax-section">
          <h2 className="tax-legal-section-title">
            Understanding Property Tax in India
          </h2>
          <p className="tax-legal-section-description">
            Property tax is a mandatory levy imposed by local authorities on
            property owners. Here&rsquo;s how it is calculated:
          </p>
          <ul className="tax-legal-tax-points">
            <li>
              <strong>Residential vs. Commercial:</strong> Different rates for
              property types.
            </li>
            <li>
              <strong>Urban vs. Rural:</strong> Understand how location impacts
              taxation.
            </li>
            <li>
              <strong>Annual Value Importance:</strong> Learn its role in tax
              calculations.
            </li>
          </ul>
          <button className="tax-legal-cta-button">
            Estimate Your Property Tax
          </button>
        </section>

        <section className="tax-legal-legal-compliance-section">
          <h2 className="tax-legal-section-title">
            Checklist for Legal Compliance
          </h2>
          <p className="tax-legal-section-description">
            Ensure your real estate transactions in India are legally compliant
            with this checklist:
          </p>
          <div className="tax-legal-checklist-container">
            <div className="tax-legal-checklist-item">
              <span className="tax-legal-emoji">📜</span>
              <p>Verify the sale deed and encumbrance certificate.</p>
            </div>
            <div className="tax-legal-checklist-item">
              <span className="tax-legal-emoji">🏛️</span>
              <p>Obtain property mutation records from the revenue office.</p>
            </div>
            <div className="tax-legal-checklist-item">
              <span className="tax-legal-emoji">✅</span>
              <p>Check tax clearance certificates for outstanding dues.</p>
            </div>
            <div className="tax-legal-checklist-item">
              <span className="tax-legal-emoji">📋</span>
              <p>Ensure compliance with RERA for new projects.</p>
            </div>
          </div>
        </section>

        <section className="tax-legal-home-loan-benefits-section">
          <h2 className="tax-legal-section-title">
            Tax Benefits on Home Loans
          </h2>
          <p className="tax-legal-section-description">
            Maximize your tax savings with home loan benefits:
          </p>
          <div className="tax-legal-benefits-container">
            <div className="tax-legal-benefit-card">
              <h3>Section 24(b)</h3>
              <p>Deduction of up to ₹2,00,000 on home loan interest.</p>
            </div>
            <div className="tax-legal-benefit-card">
              <h3>Section 80C</h3>
              <p>Deduction of up to ₹1,50,000 on principal repayment.</p>
            </div>
            <div className="tax-legal-benefit-card">
              <h3>Section 80EEA</h3>
              <p>Additional deduction of ₹1,50,000 for first-time buyers.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TaxAndLegalAdviceIndia;
