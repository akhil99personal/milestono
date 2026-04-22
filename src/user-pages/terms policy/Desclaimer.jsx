import { React, useState } from "react";
import "./PrivacyPolicy.css";
import Footer from "../homepage/Footer";
import MainNavBar from "../MainNavBar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FeedbackOverlay from "../FeedbackOverlay";

function Disclaimer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <FeedbackOverlay />
      <article className="privacy-policy-container">
        <header className="privacy-policy-header">
          <h1 className="privacy-policy-title">Disclaimer</h1>
          <p className="privacy-policy-lastUpdated">
            Last updated December 26, 2024
          </p>
        </header>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">Introduction</h2>
          <p>
            Welcome to Milestono.com (referred to as the &quot;Platform&quot;).
            By accessing or using the Platform, you acknowledge and agree to the
            terms outlined in this Disclaimer. This Disclaimer applies to all
            users, including property buyers, renters, vendors, brokers, service
            providers, and service users.
          </p>
          <p>
            Milestono.com serves as an online marketplace facilitating real
            estate transactions and service connections. While we strive to
            ensure the quality and accuracy of information, the Platform
            operates on an &quot;as-is&quot; basis and does not guarantee the
            reliability, legality, or quality of any content, service, or
            transaction conducted through the Platform.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">1. General Disclaimer</h2>
          <p>
            The information and services provided on the Platform are for
            general informational purposes only. While Milestono.com makes every
            effort to maintain accurate and updated information, it does not
            warrant or guarantee the completeness, reliability, or suitability
            of any property listing, vendor service, or transaction available on
            the Platform.
          </p>
          <p>
            Any reliance placed on the information provided is strictly at the
            user’s own risk.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            2. Real Estate-Specific Disclaimer
          </h2>
          <h3 className="privacy-policy-subsectionTitle">
            2.1 Property Listings
          </h3>
          <br></br>
          <p>
            Property listings are created and managed by third-party users,
            including dealers, brokers, and property owners. Milestono.com does
            not verify the accuracy, authenticity, or legality of the property
            details or documents provided.
          </p>
          <p>
            Users are solely responsible for conducting due diligence before
            entering into any agreements or transactions. This includes
            verifying ownership, property conditions, and legal compliance.
            <br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            2.2 Property Transactions
          </h3>
          <br></br>
          <p>
            The Platform is a facilitator and does not mediate or participate in
            property transactions. All disputes related to property dealings
            must be resolved between the concerned parties without involving
            Milestono.com.
          </p>
          <p>
            Milestono.com is not liable for any loss, damages, fraud, or breach
            of contract arising out of property transactions.<br></br>
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            3. Services-Specific Disclaimer
          </h2>
          <h3 className="privacy-policy-subsectionTitle">
            3.1 Vendor and Service User Interactions
          </h3>
          <br></br>
          <p>
            The Platform connects vendors and service users but does not endorse
            or verify the quality, reliability, or suitability of services
            offered by vendors. Users are responsible for verifying the
            credentials, authenticity, and capabilities of vendors before
            availing their services.<br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            3.2 Payment and Refunds
          </h3>
          <br></br>
          <p>
            Service users are required to make payments through the Platform’s
            payment gateway. Payments are transferred to vendors either manually
            or through an automated system. Once a vendor accepts the service
            cost, payments are final and non-refundable.<br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            3.3 Vendor Registration
          </h3>
          <br></br>
          <p>
            Vendors must provide valid identification, including PAN Card and
            Aadhaar Card, during registration. The Platform reserves the right
            to verify and approve vendor accounts at its discretion.<br></br>
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            4. Payments and Financial Transactions
          </h2>
          <p>
            Payments made through the Platform are processed via a third-party
            payment gateway (e.g., Razorpay). Milestono.com does not store
            sensitive payment information such as UPI IDs or card details. Users
            must review the terms of the payment gateway provider to understand
            their policies on refunds, chargebacks, and disputes.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            5. Account and Data Management
          </h2>
          <h3 className="privacy-policy-subsectionTitle">
            5.1 Account Deletion
          </h3>
          <br></br>
          <p>
            Users can delete their accounts at any time through the
            &quot;Account Settings&quot; section. Deleted accounts cannot be
            recovered. Upon deletion, personal data will be permanently removed
            from active systems, except as required for legal or regulatory
            compliance.
            <br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            5.2 Property Deletion
          </h3>
          <br></br>
          <p>
            Users can delete property listings they have added to the Platform.
            Deleted listings will no longer be visible publicly but may be
            retained in archived form for legal or audit purposes.<br></br>
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            6. Third-Party Links and Tools
          </h2>
          <p>
            The Platform may include links to third-party websites,
            applications, or tools for payment, verification, or additional
            services. Milestono.com does not control or endorse these external
            services and shall not be responsible for their performance,
            content, or security.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            7. Limitation of Liability
          </h2>
          <p>
            Milestono.com, its affiliates, employees, and partners shall not be
            liable for any direct, indirect, incidental, or consequential
            damages, including but not limited to:
            <br />
            <br></br>
            ● Loss of data or business opportunities.
            <br />
            ● Fraud, disputes, or misrepresentation in transactions.
            <br />
            ● Technical errors, service disruptions, or unauthorized access.
            <br />
            <br></br>
            The total liability of Milestono.com for any claims arising from
            Platform use shall not exceed the amount paid by the user for
            accessing premium features or services.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            8. Platform Modifications
          </h2>
          <p>
            Milestono.com reserves the right to modify, suspend, or discontinue
            any part of the Platform or its services at any time without prior
            notice.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">9. Legal Compliance</h2>
          <p>
            Users must comply with all applicable laws, regulations, and
            guidelines while using the Platform. Any unlawful activities,
            including fraudulent property listings, fake service registrations,
            or unauthorized financial transactions, will be reported to the
            appropriate authorities.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            10. No Guarantees or Endorsements
          </h2>
          <p>
            Milestono.com does not endorse or guarantee the accuracy,
            authenticity, or legality of any content, property listing, or
            service offered on the Platform. Users acknowledge that the Platform
            merely facilitates interactions and does not mediate or guarantee
            outcomes.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            11. Updates to This Disclaimer
          </h2>
          <p>
            Milestono.com reserves the right to update or modify this Disclaimer
            at any time. Users are encouraged to review this Disclaimer
            periodically to stay informed about the terms governing their use of
            the Platform.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            12. Contact Information
          </h2>
          <p>
            For questions or concerns regarding this Disclaimer, please contact
            us:
            <br />
            <br />● Phone:
          </p>
        </section>
      </article>

      <Footer />
    </div>
  );
}

export default Disclaimer;
