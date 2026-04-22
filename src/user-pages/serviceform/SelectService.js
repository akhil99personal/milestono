import React, { useState } from "react";
import ProblemForm from "./RequestServiceForm";
import offer from "../../images/courier-service.png";
import property_legal_service from "../../images/property_legal_service.png";
import electician from "../../images/electician.png";
import construction from "../../images/construction.png";
import interiaor from "../../images/interiaor.png";
import paint from "../../images/paint.png";
import cleaning from "../../images/cleaning.png";
import plumber from "../../images/plumber.png";
import pestControl from "../../images/pest-control.avif"
import applianceRepair from "../../images/appliance-repair.jpg"
import carpentry from "../../images/carpentry.webp"
import landscaping from "../../images/landscaping.jpeg"
import "./SelectService.css";
import UserHeader from "../MainNavBar";

import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../homepage/Footer";
import MainNavBar from "../MainNavBar";
AOS.init();

function SelectService() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      img: property_legal_service,
      title: "Property Legal",
      subTitle:
        "Expert legal advice on property matters. Hassle-free documentation and smooth consultation.",
    },
    {
      img: plumber,
      title: "Plumbing",
      subTitle:
        "Quick and reliable plumbing solutions. From leak repairs to pipe installations, we handle it all.",
    },
    {
      img: electician,
      title: "Electrician",
      subTitle:
        "Certified professionals for all electrical installations, repairs, and safety checks at your doorstep.",
    },
    {
      img: construction,
      title: "Construction",
      subTitle:
        "Building your dreams with reliable construction services. From planning to execution, we've got you covered.",
    },
    {
      img: paint,
      title: "Painting",
      subTitle:
        "Refresh your walls with vibrant colors and finishes. Professional painting services for a spotless look.",
    },
    {
      img: cleaning,
      title: "Cleaning",
      subTitle:
        "Deep cleaning services for homes and offices. Enjoy a spotless, hygienic, and fresh living environment.",
    },
    {
      img: interiaor,
      title: "Interior Designing",
      subTitle:
        "Transform your space with modern, functional, and aesthetic interior designs tailored to your style.",
    },
    {
      img: pestControl,
      title: "Pest Control",
      subTitle:
        "Eliminate pests and ensure a safe, hygienic environment with expert pest control services.",
    },
    {
      img: applianceRepair,
      title: "Appliance Repair",
      subTitle:
        "Quick and reliable repair of home appliances to restore convenience and comfort.",
    },
    {
      img: carpentry,
      title: "Carpentry",
      subTitle:
        "Expert carpentry solutions for furniture repair, customization, and installation.",
    },
    {
      img: landscaping,
      title: "Landscaping",
      subTitle:
        "Beautify your outdoor spaces with professional landscaping design and maintenance.",
    },
    {
      img: offer,
      title: "Courier",
      subTitle:
        "Fast and reliable delivery services for your packages. Send and receive with care, anytime, anywhere.",
    },
  ];

  const handleServiceClick = (title) => {
    setSelectedService(title);
  };

  if (selectedService) {
    return <ProblemForm serviceCategory={selectedService} />;
  }

  return (
    <div className="select-service-request-service">
      <MainNavBar />
      <div className="select-service-all_services">
        <h1>Services At Your Doorstep</h1>
        <div className="select-service-services_container">
          {services.map((service, index) => (
            <div className="select-service-service" key={index}>
              <img src={service.img} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.subTitle}</p>
              <button onClick={() => handleServiceClick(service.title)}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectService;
