import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Our_Project = () => {
  const sliderProject = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const projectRight = () => {
    sliderProject.current?.slickNext();
  };

  const projectLeft = () => {
    sliderProject.current?.slickPrev();
  };

  const projectSlides = [
    {
      image: "/images/our-projects/joyous.jpg",
      logo: "/images/our-projects/joyous.png",
    },
    {
      image: "/images/our-projects/flagship.jpg",
      logo: "/images/our-projects/flagship.png",
    },
    {
      image: "/images/our-projects/mantara.jpg",
      logo: "/images/our-projects/mantra.png",
    },
    {
      image: "/images/our-projects/sublimis.jpg",
      logo: "/images/our-projects/sublimis.png",
    },
  ];

  return (
    <section className="ourprojects">
      <div className="container">
        <h2 className="heading skyblue">Our Projects</h2>
      </div>
      <div className="projectscontainer">
        <div className="projectcontent">
          <p>
            Step inside a CRC space and you'll feel it. The difference is in the
            detail. Our residential, retail, and commercial projects are
            thoughtfully planned, beautifully executed, and designed for the way
            people actually live and work. It's more than luxury; it's living,
            elevated.
          </p>
          <h3>Explore spaces built for excellence, designed for life.</h3>
        </div>
        <div className="sliderproject">
          <div className="slider-container">
            <Slider
              ref={sliderProject}
              {...settings2}
              className="projectslider"
            >
              {projectSlides.map((slide, index) => (
                <div className="projectslide" key={index}>
                  <img alt="" src={slide.image} />
                  {/* Remove prologo from here since it's now outside */}
                </div>
              ))}
            </Slider>
            <div className="prologo">
              <img alt="" src={projectSlides[currentSlide]?.logo} />
            </div>
            <div className="projectarrows">
              <button className="projectLeft" onClick={projectLeft}>
                <GoArrowLeft />
              </button>
              <button className="projectRight" onClick={projectRight}>
                <GoArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Our_Project;
