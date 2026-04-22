import { React, useState } from "react";
import "./PrivacyPolicy.css";
import Footer from "../homepage/Footer";
import MainNavBar from "../MainNavBar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FeedbackOverlay from "../FeedbackOverlay";
function TermsService() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <FeedbackOverlay />
      <article className="privacy-policy-container">
        <header className="privacy-policy-header">
          <h1 className="privacy-policy-title">TERMS OF SERVICE</h1>
          <p className="privacy-policy-lastUpdated">
            Last updated December 26, 2024
          </p>
        </header>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">Introduction</h2>
          <p>
            Welcome to Milestono.com! These Terms of Service (&quot;Terms&quot;)
            govern your access to and use of our website, platform, services,
            and associated tools (collectively referred to as the
            &quot;Services&quot;). By accessing or using our Services, you agree
            to comply with and be bound by these Terms. If you do not agree to
            these Terms, you must not use our Services. Our mission is to
            provide a seamless and user-friendly experience for all our users.
            Whether you are exploring our platform for personal use or business
            purposes, we strive to ensure that your journey with Milestono.com
            is secure, efficient, and rewarding. These Terms outline your rights
            and responsibilities as a user of our platform, including your
            obligations, the scope of permissible use, and the limitations of
            liability. Additionally, we have detailed the processes related to
            payments, content submissions, and account management to ensure
            transparency and clarity. Please take the time to read these Terms
            carefully. Your use of the Services signifies your acceptance and
            understanding of all provisions outlined here. If you have any
            questions, feel free to reach out to us at [Insert Contact
            Information]. Thank you for choosing Milestono.com! We look forward
            to serving your needs and helping you achieve your goals.
          </p>
        </section>

        <section className="privacy-policy-section section-tableOfContents">
          <div
            className={`privacy-policy-header ${isOpen ? "open" : ""}`}
            onClick={toggleDropdown}
          >
            <h2 className="privacy-policy-sectionTitle title-tableOfContents">
              Contents{" "}
              <span className="arrow">
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </h2>
          </div>
          {isOpen && (
            <ol className="privacy-policy-tableOfContents">
              <li>
                <a href="#section-1" className="privacy-policy-link">
                  Definitions
                </a>
              </li>
              <li>
                <a href="#section-2" className="privacy-policy-link">
                  Eligibility and Registration
                </a>
              </li>
              <li>
                <a href="#section-3" className="privacy-policy-link">
                  User Accounts
                </a>
              </li>
              <li>
                <a href="#section-4" className="privacy-policy-link">
                  Payment Terms
                </a>
              </li>
              <li>
                <a href="#section-5" className="privacy-policy-link">
                  Refunds and Cancellations
                </a>
              </li>
              <li>
                <a href="#section-6" className="privacy-policy-link">
                  Vendor Responsibilities
                </a>
              </li>
              <li>
                <a href="#section-7" className="privacy-policy-link">
                  Platform Rights
                </a>
              </li>
              <li>
                <a href="#section-8" className="privacy-policy-link">
                  Limitations of Liability
                </a>
              </li>
              <li>
                <a href="#section-9" className="privacy-policy-link">
                  Governing Law and Jurisdiction
                </a>
              </li>
            </ol>
          )}
        </section>

        <section id="section-1" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">1. Definition</h2>
          <p>
            Platform: Refers to Milestono.com, including its website and mobile
            applications.<br></br>
            User: Includes any individual or entity registering on
            Milestono.com, including Real Estate Premium Users, Service Users,
            and Vendors.<br></br>
            Vendor: Service providers registered on the platform to offer
            services to users.<br></br>
            Premium Account: A paid membership offering enhanced features in the
            Real Estate section.<br></br>
            Service Charges: Fees paid by Service Users for engaging vendors.
            <br></br>
          </p>
        </section>

        <section id="section-2" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            2. Eligibility and Registration
          </h2>
          <p>
            2.1 General Eligibility:<br></br>
            Milestono.com is open to all users, including vendors, real estate
            users, and service seekers.<br></br>
            <br></br>
            2.2 Vendor Registration:<br></br>
            To register as a vendor, you must:<br></br>
            Provide your full name, contact information, and service details.
            <br></br>
            Upload clear images of your PAN card and Aadhaar card for identity
            verification and security purposes.<br></br>
            Provide your PAN card and Aadhaar card numbers during the
            registration process.<br></br>
            Consent to the verification of your documents by Milestono.com for
            security and compliance purposes.<br></br>
            Failure to provide accurate and verifiable information may result in
            rejection or suspension of your vendor account.<br></br>
          </p>
        </section>

        <section id="section-3" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">3. User Accounts</h2>
          <p>
            3.1 Account Registration:<br></br>
            Users must provide accurate information during registration and
            update their details when required.<br></br>
            All accounts are personal and non-transferable.<br></br>
            <br></br>
            3.2 Account Security:<br></br>
            Users are responsible for keeping their account credentials secure.
            <br></br>
            Notify Milestono.com immediately if you suspect unauthorized account
            activity.<br></br>
            <br></br>
            3.3 Termination of Accounts:<br></br>
            Milestono.com reserves the right to suspend or terminate accounts
            for policy violations or fraudulent activities.
          </p>
        </section>

        <section id="section-4" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">4. Payment Terms</h2>
          <p>
            4.1 Payment Methods:<br></br>
            UPI Payments Only: All transactions on Milestono.com are conducted
            through UPI payment systems.<br></br>
            <br></br>
            4.2 Service Charges:<br></br>
            Service Users must pay service fees to the platform when engaging
            vendors.<br></br>
            Payments are held in escrow until service completion or mutual
            agreement.<br></br>
            <br></br>
            4.3 Vendor Payments:<br></br>
            Vendors receive service payments after service verification by the
            user or as per the platform’s payout schedule (manual or automatic).
            <br></br>
            <br></br>
            4.4 Premium Account Plans:<br></br>
            Premium accounts in the Real Estate section require full upfront
            payment.<br></br>
            Refunds for premium accounts are not permitted under any
            circumstances.<br></br>
          </p>
        </section>

        <section id="section-5" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            5. Refunds and Cancellations
          </h2>
          <p>
            5.1 Real Estate Premium Accounts:<br></br>
            Payments for premium accounts are final and non-refundable.<br></br>
            <br></br>
            5.2 Services Section:<br></br>
            Once a Service User accepts a vendor’s cost proposal, the service
            charge becomes non-refundable.<br></br>
            Refunds will only be processed in cases of verified fraud or
            significant service discrepancies.<br></br>
            <br></br>
            5.3 Dispute Resolution:<br></br>
            Users must raise disputes within 3 days of service completion.
            <br></br>
            Milestono.com will review disputes and make final decisions.
            <br></br>
          </p>
        </section>

        <section id="section-6" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            6. Vendor Responsibilities
          </h2>
          <p>
            Vendors must provide accurate service details and maintain the
            quality of services offered.<br></br>
            Vendors are required to upload valid PAN card and Aadhaar card
            images and numbers for account verification.<br></br>
            Vendors must comply with all applicable legal and tax regulations.
            <br />
          </p>
        </section>

        <section id="section-7" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">7. Platform Rights</h2>
          <p>
            Milestono.com reserves the right to modify or discontinue services
            without prior notice.<br></br>
            The platform may update these terms as needed. Users will be
            notified of significant updates.<br></br>
          </p>
        </section>

        <section id="section-8" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            8. Limitations of Liability
          </h2>
          <p>
            Milestono.com is not responsible for disputes or disagreements
            between users and vendors.<br></br>
            The platform is not liable for losses caused by technical issues,
            unauthorized access, or external factors beyond its control.
            <br></br>
          </p>
        </section>

        <section id="section-9" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            9. Governing Law and Jurisdiction
          </h2>
          <p>
            These terms are governed by the laws of India and fall under the
            jurisdiction of courts in Solapur.{" "}
          </p>
        </section>

        <section id="section-10" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            10. Contact Information
          </h2>
          <p>
            For questions or concerns, please contact us:
            <br />
            Phone:
          </p>
        </section>
      </article>

      <Footer />
    </div>
  );
}

export default TermsService;
