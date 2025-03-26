import React from "react";
import { motion } from "framer-motion";
import residentialSVG from "../../assets/residential.jsx";
import commercialSVG from "../../assets/commercial.jsx";
import retailSVG from "../../assets/retail.jsx";
import "../../styles/Homepage.css";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.5, duration: 2, ease: "easeOut" }
  })
};

const DNA = () => {
  const services = [
    { title: "commercial", image: commercialSVG },
    { title: "residential", image: residentialSVG },
    { title: "retail", image: retailSVG },
  ];

  return (
    <section className="dna-section">
      <div className="container">
        <div className="dna-header">
          <h2 className="dna-title">
            the dna of CRC: smart space planning meets sustainable innovation
          </h2>
          <p className="dna-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, lobortis posuere est porta, pellentesque convallis nisl vehicula ut...
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <h3 className="service-title">{service.title}</h3>
              <div className="service-image">{service.image()}</div>
              <a href="#" className="service-link">know more</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DNA;
