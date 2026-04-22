import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";

function Footer() {
  let Address = "Dwarka, New Delhi";
  return (
    <footer className="footer">
      <h2>
        <span>MILESTONO</span>.COM
      </h2>
      <div className="pre_footer">
        <div className="high_school">
          <h4>Address</h4>
          <a
            href={`https://www.google.com/maps?q=${Address}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <p>
              <i className="ri-map-pin-2-fill"></i># {Address}
            </p>
          </a>
          <p>
            <a href="mailto:info@milestono.in">
              <i className="ri-mail-fill"></i>
              info@milestono.in
            </a>
          </p>
          <p>
            <a style={{ textDecoration: "none", color: "white" }}></a>
          </p>
        </div>

        <div className="quick_links">
          <h4>Quick Links</h4>
          <p>
            <a href="/">Home</a>
          </p>
          <p>
            <a href="/requestserviceform">Services</a>
          </p>
          <p>
            <a href="/search">Properties</a>
          </p>
          <p>
            <a href="/contact-us">Contact Us</a>
          </p>
          <p>
            <a href="/faqs">FAQs</a>
          </p>
        </div>

        <div className="quick_links">
          <h4>Legals</h4>
          <p>
            <a href="/privacy-policy">Privacy Policy</a>
          </p>
          <p>
            <a href="/terms-service">Terms of Service</a>
          </p>
          <p>
            <a href="/terms-condition">Terms and Conditions</a>
          </p>
          <p>
            <a href="/delivery-timeline">Delivery Timeline</a>
          </p>
          <p>
            <a href="/desclaimer">Desclaimer</a>
          </p>
          <p>
            <a href="/refund-policy">Refund and Cancellation Policy</a>
          </p>
        </div>

        <div className="quick_links">
          <h4>Follow Us</h4>
          <p>
            <a href="/">
              <i className="fa-brands fa-x-twitter"></i> Twitter
            </a>
          </p>
          <p>
            <a href="/">
              <i className="fa-brands fa-linkedin-in"></i> LinkedIn
            </a>
          </p>
          <p>
            <a href="/">
              <i className="fa-brands fa-instagram"></i> Instagram
            </a>
          </p>
          <p>
            <a href="/">
              <i className="fa-brands fa-facebook-f"></i> Facebook
            </a>
          </p>
          <p>
            <a href="/">
              <i className="fa-brands fa-telegram"></i> Telegram
            </a>
          </p>
        </div>
      </div>

      <div className="main_footer">
        <p>
          <span id="currentYear"></span>
          Copyright &#169; 2024 | <Link to="/"> MILESTONO.com </Link> |
          Developed by
          <Link to="https://vishwalatarati.in/" target="_blank">
            Vishwalatarati Digital Solutions Pvt Ltd, Solapur
          </Link>
          | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
