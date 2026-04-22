import { React, useState } from "react";

import "./contact.css";
import Footer from "../homepage/Footer";

import contactbannerimg from "../../images/contactbanner1.jpg";
import FeedbackOverlay from "../FeedbackOverlay";

const GetInTouch = () => {
  return (
    <>
      <main>
        <FeedbackOverlay />
        <div className="getintouch-hero-bg">
          <section
            id="getintouch-hero-header"
            style={{ backgroundImage: `url(${contactbannerimg})` }}
          >
            <section className="getintouch-hero">
              <div className="getintouch-hero-content">
                <h1>Get in Touch with Milestono: We&rsquo;re Here to Help!</h1>
              </div>
            </section>
          </section>
        </div>
        <section className="reach-us">
          <div className="reach-us-container">
            <h2>Reach Us</h2>
            <div className="reach-us-content">
              <div className="reach-us-contact-info">
                <div className="reach-us-info-block">
                  <h3>Email Us</h3>
                  <p>info@milestono.in</p>
                </div>
                <div className="reach-us-info-block">
                  <h3>Call Us</h3>
                </div>
                <div className="reach-us-info-block">
                  <h3>Office</h3>
                  <p>Mahavir Enclave, Palam, New Delhi-110045</p>
                </div>
              </div>
              <form className="reach-us-contact-form">
                <div className="reach-us-form-row">
                  <input
                    className="reach-us-input"
                    type="text"
                    placeholder="Full Name"
                  />
                  <input
                    className="reach-us-input"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="reach-us-form-row">
                  <input
                    className="reach-us-input"
                    type="tel"
                    placeholder="Phone No."
                  />
                </div>
                <textarea placeholder="Please provide all pertinent details about your inquiry"></textarea>
                <button>
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </>
  );
};

export default GetInTouch;
