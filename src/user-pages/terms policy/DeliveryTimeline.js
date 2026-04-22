import React from "react";
import "./PrivacyPolicy.css";
import Footer from "../homepage/Footer";
import MainNavBar from "../MainNavBar";
import FeedbackOverlay from "../FeedbackOverlay";

function PrivacyPolicy() {
  return (
    <div>
      <FeedbackOverlay />
      <article className="privacy-policy-container">
        <header className="privacy-policy-header">
          <h1 className="privacy-policy-title">Delivery Timeline</h1>
          <p className="privacy-policy-lastUpdated">
            Last updated 1 January, 2025
          </p>
        </header>

        <section>
          <h2>Service Vendor Shipping Time Policy</h2>

          <p>
            <strong>Introduction</strong>
          </p>
          <p>
            This policy outlines the service delivery expectations for vendors
            registered on our platform. It ensures transparency and
            accountability in fulfilling user service requests within the
            stipulated timeline.
          </p>

          <p>
            <strong>Delivery Timeline</strong>
          </p>
          <ul>
            <li>
              <strong>Standard Delivery Window:</strong> Service vendors are
              expected to fulfill requests within 4 hours to 48 hours of
              assignment.
            </li>
          </ul>

          <p>
            <strong>Key Points</strong>
          </p>
          <ul>
            <li>
              <strong>Initial Confirmation:</strong>
              <ul>
                <li>
                  Vendors must confirm their availability for the service
                  request immediately upon assignment.
                </li>
                <li>
                  Estimated delivery time must be communicated to the admin.
                </li>
              </ul>
            </li>

            <li>
              <strong>Service Fulfillment:</strong>
              <ul>
                <li>
                  All service requests should be initiated within 4 hours of
                  confirmation.
                </li>
                <li>
                  Completion of service should not exceed 48 hours unless
                  explicitly approved by the admin.
                </li>
              </ul>
            </li>

            <li>
              <strong>Communication:</strong>
              <ul>
                <li>
                  Vendors must update the admin on the progress of the service.
                </li>
                <li>
                  Delays or unforeseen issues should be reported promptly to
                  arrange alternatives.
                </li>
              </ul>
            </li>
          </ul>

          <p>
            <strong>Responsibilities of Vendors</strong>
          </p>
          <ul>
            <li>
              <strong>Punctuality:</strong> Adhere to the assigned delivery
              timeline.
            </li>
            <li>
              <strong>Transparency:</strong> Provide accurate updates regarding
              service progress.
            </li>
            <li>
              <strong>Accountability:</strong> Ensure high-quality service
              delivery within the agreed time frame.
            </li>
          </ul>

          <p>
            <strong>Admin Oversight</strong>
          </p>
          <ul>
            <li>
              The admin reserves the right to reassign service requests if
              vendors fail to confirm availability or meet the delivery
              deadlines.
            </li>
            <li>
              Performance of vendors will be periodically reviewed based on
              adherence to the shipping policy.
            </li>
          </ul>

          <p>
            <strong>Consequences of Non-Compliance</strong>
          </p>
          <ul>
            <li>
              <strong>First Instance:</strong> Warning issued to the vendor.
            </li>
            <li>
              <strong>Repeated Instances:</strong> Temporary suspension or
              permanent removal from the platform.
            </li>
          </ul>

          <p>
            <strong>Contact for Queries</strong>
          </p>
          <ul>
            <li>
              If vendors have questions or concerns about this shipping policy,
              they may contact:
            </li>
            <li>
              <strong>Support Email:</strong>
            </li>
            <li>
              <strong>Support Phone:</strong> info@milestono.in
            </li>
          </ul>
        </section>
      </article>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
