import React from "react";
import "./AboutUsPage.css";
import Footer from "./Footer";

const AboutPage = () => {
  return (
    <>
      <div className="about-page">
        <section className="about-page-hero-section">
          <h1 className="about-page-hero-heading">Welcome to Milestono</h1>
          <p className="about-page-hero-subheading">
            Your trusted partner in real estate solutions. At Milestono, we
            bring your property dreams to life.
          </p>
        </section>

        <section className="about-page-info-section">
          <div className="about-page-container">
            <h2 className="about-page-section-title">Who We Are</h2>
            <p className="about-page-info-text">
              Milestono is committed to revolutionizing the real estate
              landscape with innovative solutions and personalized service. We
              offer a wide range of services, from luxury property sales to
              affordable rentals, ensuring every client finds their perfect
              match. With our expertise, dedication, and client-first approach,
              we aim to redefine your property journey.
            </p>
          </div>
        </section>

        <section className="about-page-mission-vision-section">
          <div className="about-page-container about-page-grid">
            <div className="about-page-mission-card">
              <h3>Our Mission</h3>
              <p>
                To provide seamless and innovative real estate experiences by
                combining cutting-edge technology with a deep understanding of
                the market.
              </p>
            </div>
            <div className="about-page-vision-card">
              <h3>Our Vision</h3>
              <p>
                To be the most trusted and innovative real estate partner,
                helping clients achieve their milestones while creating
                long-term value.
              </p>
            </div>
          </div>
        </section>

        <section className="about-page-why-choose-section">
          <div className="about-page-container">
            <h2 className="about-page-section-title">Why Choose Milestono?</h2>
            <div className="about-page-grid">
              <div className="about-page-why-card">
                <h4>Expertise</h4>
                <p>
                  Decades of combined experience make us your go-to experts in
                  real estate.
                </p>
              </div>
              <div className="about-page-why-card">
                <h4>Customer Focus</h4>
                <p>
                  We prioritize your needs, ensuring tailored solutions for
                  every client.
                </p>
              </div>
              <div className="about-page-why-card">
                <h4>Innovative Technology</h4>
                <p>
                  Leveraging advanced tools to simplify the buying and selling
                  process.
                </p>
              </div>
              <div className="about-page-why-card">
                <h4>Trust & Transparency</h4>
                <p>
                  Integrity is at the core of our operations, ensuring a
                  stress-free journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-page-services-section">
          <div className="about-page-container">
            <h2 className="about-page-section-title">Our Services</h2>
            <div className="about-page-grid">
              <div className="about-page-service-card">
                Luxury Property Sales
              </div>
              <div className="about-page-service-card">Affordable Rentals</div>
              <div className="about-page-service-card">Commercial Spaces</div>
              <div className="about-page-service-card">Property Management</div>
              <div className="about-page-service-card">Legal Assistance</div>
              <div className="about-page-service-card">Market Analysis</div>
            </div>
          </div>
        </section>

        <section className="about-page-testimonials-section">
          <div className="about-page-container">
            <h2 className="about-page-section-title">What Our Clients Say</h2>
            <div className="about-page-testimonials-grid">
              <div className="about-page-testimonial-card">
                <p>
                  &quot;Milestono guided us every step of the way. Their
                  professionalism and personalized service are second to
                  none.&quot;
                </p>
                <h4>- Elvish Y.</h4>
              </div>
              <div className="about-page-testimonial-card">
                <p>
                  &quot;Selling my property was so easy with Milestono. Their
                  expertise and transparency are truly commendable.&quot;
                </p>
                <h4>- Rajat D.</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
