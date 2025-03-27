import React, { useEffect, useRef } from "react";
import AboutUsSVG from "../../assets/about_us.jsx";
import "../../styles/Homepage.css";
import anime from "animejs/lib/anime.es.js";

const AboutUs = () => {
  const svgRef = useRef(null);


  return (
    <section className="about-us-section">
      <div className="container">
        <div className="content-wrapper">
          <div className="text-column">
            <h2 className="section-title">about us</h2>
            <p className="section-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              posuere est purus, pellentesque convallis nibh vehicula ut.
              Aliquam maximus nisl sit amet mi suscipit vestibulum a eget dolor.
              Duis in rutrum nulla, eget dictum orci. Pellentesque odio nisi,
              mollis ac turpis vitae, vestibulum sollicitudin dui. Nunc sit amet
              ligula eros. Ut quis risus dui. Maecenas in justo non lacus
              pellentesque sodales et quis eros. Praesent volutpat rutrum
              varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Quisque posuere est purus, pellentesque convallis nibh vehicula
              ut. Aliquam maximus nisl sit amet mi suscipit vestibulum a eget
              dolor. Duis in rutrumnj.
            </p>
          </div>

          <div className="image-column">
            <AboutUsSVG ref={svgRef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
