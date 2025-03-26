import React, { useEffect, useRef } from "react";
import AboutUsSVG from "../../assets/about_us.jsx";
import "../../styles/Homepage.css";
import anime from "animejs/lib/anime.es.js";

const AboutUs = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Select all paths within the phases
    const paths = document.querySelectorAll(
      "#phase1 path, #phase2 path, #phase3 path, #phase4 path, #phase5 path"
    );

    // Animate paths with drawing effect
    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0], // Draw the path
      easing: "easeInOutSine",
      duration: 1000,
      delay: anime.stagger(10, { start: 10 }), // Stagger the animation
      begin: (anim) => {
        // Set initial stroke properties
        paths.forEach((path) => {
          path.style.stroke = "#6A87C3"; // Use the fill color as stroke
          path.style.strokeWidth = "2";
          path.style.fill = "none"; // Make fill transparent during animation
          path.style.strokeDasharray = path.getTotalLength();
          path.style.strokeDashoffset = path.getTotalLength();
        });
      },
      complete: (anim) => {
        // Restore original fill after animation
        paths.forEach((path) => {
          path.style.fill = "#6A87C3";
          path.style.stroke = "none";
        });
      },
    });
  }, []);

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
