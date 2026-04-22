import { React, useState } from "react";
import "./PrivacyPolicy.css";
import Footer from "../homepage/Footer";
import MainNavBar from "../MainNavBar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FeedbackOverlay from "../FeedbackOverlay";

function RefundCancellationPaymentPolicy() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <FeedbackOverlay />
      <article className="privacy-policy-container">
        <header className="privacy-policy-header">
          <h1 className="privacy-policy-title">
            Refund, Cancellation, and Payment Policy
          </h1>
          <p className="privacy-policy-lastUpdated">
            Last updated December 26, 2024
          </p>
        </header>

        <section className="privacy-policy-section">
          <h1 className="privacy-policy-sectionTitle">Introduction</h1>
          <p>
            At Milestono.com, we prioritize customer satisfaction and aim to
            provide a seamless experience. Our payment process is secure, and we
            accept various payment methods for your convenience. If you wish to
            cancel or modify a booking, please notify us within 24 hours of
            making the reservation to ensure eligibility for a full refund.
            Cancellations made after this time may be subject to a partial
            refund, depending on the service provided. Refund requests will be
            processed within 7 business days, and payments will be refunded to
            the original method of payment. We reserve the right to deny refunds
            if the service has already been fulfilled or the cancellation was
            made under specific non-refundable terms. For any disputes or
            clarifications, please reach out to our customer support team.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">1. Scope</h2>
          <p>
            This policy governs all transactions, including payments, refunds,
            and cancellations, made on Milestono.com. It applies to users of the
            Real Estate and Service sections, including premium account holders,
            vendors, and service users.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">2. Payment Methods</h2>
          <h3 className="privacy-policy-subsectionTitle">
            2.1 Payment Modes Supported
          </h3>
          <p>
            ● UPI Payments Only: All transactions on Milestono.com are processed
            exclusively through Unified Payments Interface (UPI).
            <br />● Users must link a valid UPI ID during payment. Other payment
            methods such as credit/debit cards or digital wallets are not
            supported.<br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            2.2 Payment Confirmation
          </h3>
          <p>
            ● Payments are considered confirmed once successfully processed
            through UPI.
            <br />● A receipt will be sent to the registered email address or
            displayed in the user’s account dashboard.<br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">2.3 Taxes and Fees</h3>
          <p>
            ● Payments are inclusive of applicable taxes as mandated by law.
            <br />● Platform fees may apply and are transparently communicated
            at the time of payment.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            3. Real Estate Services
          </h2>
          <h3 className="privacy-policy-subsectionTitle">
            3.1 Premium Account Plans
          </h3>
          <p>
            Premium account holders gain access to exclusive features, such as:
            <br />
            ● Enhanced property visibility through highlighted listings.
            <br />
            ● Advanced analytics and marketing tools.
            <br />● Priority customer support for account-related queries.
            <br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">3.2 Payment Terms</h3>
          <p>
            ● Premium plans are charged upfront, and payment must be completed
            through UPI.<br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            3.3 Refund and Cancellation Policy
          </h3>
          <p>
            ● Once a user purchases a premium account plan, the payment is
            non-refundable under any circumstances.
            <br />
            ● Users are responsible for reviewing the plan details thoroughly
            before making a purchase.
            <br />● Cancellation of premium accounts is allowed, but benefits
            will continue until the plan’s expiration date.<br></br>
            <br></br>
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            4. Service Transactions
          </h2>
          <h3 className="privacy-policy-subsectionTitle">
            4.1 Workflow for Services
          </h3>
          <p>
            For Service Users:
            <br />
            ● Service users can submit requests to vendors listed on
            Milestono.com.
            <br />
            ● Vendors respond with the cost of the requested service.
            <br />
            ● The service user can either:
            <br />
            ● Accept the Cost: Make the payment to the platform’s account via
            UPI.
            <br />
            ● Reject the Cost: No payment is made, and the request is closed.
            <br />
            <br></br>
          </p>
          <p>
            For Vendors:
            <br />
            ● Vendors are paid after the service is delivered, verified, and
            approved. Payments are processed:
            <br />
            ● Manually: The admin confirms service completion and releases
            funds.
            <br />● Automatically: Funds are released once the service delivery
            is verified.<br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            4.2 Refund and Cancellation Policy
          </h3>
          <p>
            ● No Refund After Cost Acceptance: Once a service user accepts the
            vendor’s quoted cost and makes the payment, the amount becomes
            non-refundable.
            <br />
            ● Refund Exceptions: Refunds will only be processed under the
            following conditions:
            <br />
            ● The vendor fails to provide the agreed-upon service.
            <br />
            ● The delivered service is unsatisfactory, and valid evidence is
            provided.
            <br />
            ● Dispute Resolution: Users may raise disputes within 3 days of
            service completion.
            <br />● The platform will mediate and make a final decision based on
            evidence submitted by both parties.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">5. General Policies</h2>
          <h3 className="privacy-policy-subsectionTitle">
            5.1 User Responsibility
          </h3>
          <br></br>
          <p>
            ● Users must provide accurate information during registration and
            payment processes.
            <br />● Service users and vendors must adhere to the platform’s
            terms of service and ensure compliance with all applicable laws.
            <br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            5.2 Platform Responsibility
          </h3>
          <br></br>
          <p>
            ● Milestono.com ensures secure payment processing using
            industry-standard encryption.
            <br />● The platform holds payments in escrow until service
            verification to protect both parties.<br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            5.3 Fraud Prevention
          </h3>
          <br></br>
          <p>
            ● Transactions flagged as suspicious may be temporarily held for
            review.
            <br />● Users involved in fraudulent activity will face account
            suspension or termination.<br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            5.4 Updates to Policies
          </h3>
          <br></br>
          <p>
            ● Milestono.com reserves the right to update this policy as needed.
            Changes will be communicated via email or notifications.
            <br />● Continued use of the platform constitutes acceptance of the
            revised policy.<br></br>
            <br></br>
          </p>
        </section>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">6. Legal Compliance</h2>
          <h3 className="privacy-policy-subsectionTitle">6.1 Governing Law</h3>
          <br></br>
          <p>
            ● This policy complies with the laws of India and is subject to
            jurisdiction in Solapur.<br></br>
            <br></br>
          </p>
          <h3 className="privacy-policy-subsectionTitle">
            6.2 Contact Information
          </h3>
          <br></br>
          <p>
            For inquiries or concerns, users may contact:
            <br />● Phone Number:
          </p>
        </section>
      </article>

      <Footer />
    </div>
  );
}

export default RefundCancellationPaymentPolicy;
