import React from "react";
import "./ExploreServices.css";
import { useLocation, Link } from "react-router-dom";
import dummyImg from "../../images/dummyImage.webp";
import { useEffect } from "react";
import ExploreImg1 from "../../images/exploreimg1.webp";
import ExploreImg2 from "../../images/exploreimg2.webp";
import ExploreImg3 from "../../images/exploreimg3.webp";
import ExploreImg4 from "../../images/exploreimg4.webp";
import ExploreImg5 from "../../images/exploreimg5.webp";

const ExploreServices = () => {
  const services = [
    {
      title: "Buying a commercial property",
      description: "Shops, offices, land, factories, warehouses and more",
      icon: ExploreImg1,
    },
    {
      title: "Leasing a commercial property",
      description: "Shops, offices, land, factories, warehouses and more",
      icon: ExploreImg2,
    },
    {
      title: "Buy Plots/Land",
      description:
        "Residential Plots, Agricultural Farm lands, Inst. Lands and more",
      icon: ExploreImg3,
    },
    {
      title: "Renting a home",
      description: "Apartments, builder floors, villas and more",
      icon: ExploreImg4,
    },
    {
      title: "PG and co-living",
      description: "Organised, owner and broker listed PGs",
      icon: ExploreImg5,
    },
  ];

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#exploreService") {
      const element = document.getElementById("scrollexploreSection");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <section className="exploreSection" id="scrollexploreSection">
      <div className={"exploreSection-container"}>
        <div className={"exploreSection-brand"}>Milestono</div>
        <h2 className={"exploreSection-heading"}>Explore our services</h2>
        <div className={"exploreSection-servicesCard"}>
          <div className={"exploreSection-servicesGrid"}>
            {services.map((service, index) => (
              <div key={index} className={"exploreSection-serviceItem"}>
                <div className={"exploreSection-iconWrapper"}>
                  <img src={service.icon} width={60} height={60} />
                </div>
                <div className={"exploreSection-content"}>
                  <h3 className={"exploreSection-title"}>{service.title}</h3>
                  <p className={"exploreSection-description"}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreServices;
