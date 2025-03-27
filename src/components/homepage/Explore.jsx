import React, { useState, useRef, useEffect } from "react";
import "../../styles/Homepage.css";
import rect1 from "../../assets/rect1.png";
import rect2 from "../../assets/rect2.png";
import rect3 from "../../assets/rect3.png";
import rect4 from "../../assets/rect4.png";
import rect5 from "../../assets/rect5.png";
import rect6 from "../../assets/rect6.png";
import looseBox from "../../assets/loosebox.svg";

const ScrollingImages = ({ images, direction }) => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollImages = isMobile 
  ? [...images, ...images, ...images]  
  : [...images, ...images];


  return (
    <div 
      ref={containerRef}
      className={`scroll-container ${direction} ${isMobile ? 'mobile-scroll' : ''}`}
    >
      <div className="scroll-content">
        {scrollImages.map((src, index) => (
          <div className="scroll-item" key={index}>
            <img src={src} alt="scrolling-img" className="sketch" />
            <div className="original"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Explore = () => {
  return (
    <div className="main-section">
      <ScrollingImages images={[rect1, rect2, rect3]} direction="up" />

      <div className="text-content">
        <div className="our-projects">
          <img src={looseBox} alt="" />
          <div className="projects-title">
            our projects
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quos, quas amet molestias dolorum officia tenetur adipisci quibusdam unde quasi eligendi nam facilis accusamus vero reprehenderit natus asperiores nostrum minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, voluptatem?</p>
          <a href="#" className="projects-link">see all</a>
        </div>
        <h2>explore spaces built for excellence, designed for life</h2>
      </div>
      <ScrollingImages images={[rect4, rect5, rect6]} direction="down" />
    </div>
  );
};

export default Explore;