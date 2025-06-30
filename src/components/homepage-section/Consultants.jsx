import React, { useRef, useState } from 'react';
import Slider from 'react-slick';

const Consultants = () => {
  const sliderconsRef = useRef(null);
  const [progress, setProgress] = useState(25);

  const settings4 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      const totalSlides = consultantSlides.length;
      const newProgress = ((next + 1) / totalSlides) * 100;
      setProgress(newProgress);
    },
  };

  const consultantSlides = [
    {
 
      mainImage: '/images/consultants/killa.jpg',
      roundImage: '/images/consultants/killap.jpg',
      title: 'Killa Design, Dubai',
      position: 'Principal Architect',
      description: 'A pioneer in Innovative Architecture',
    },
    {
      mainImage: '/images/consultants/benoy.jpg',
      roundImage: '/images/consultants/benoy.png',
      title: 'Killa Design, Dubai',
      position: 'Principal Architect',
      description: 'A pioneer in Innovative Architecture',
    },
    {
      mainImage: '/images/consultants/gensler.jpg',
      roundImage: '/images/consultants/gensler.png',
      title: 'Killa Design, Dubai',
      position: 'Principal Architect',
      description: 'A pioneer in Innovative Architecture',
    },
    {
      mainImage: '/images/consultants/hafeez.jpg',
      roundImage: '/images/consultants/hafeez.png',
      title: 'Killa Design, Dubai',
      position: 'Principal Architect',
      description: 'A pioneer in Innovative Architecture',
    },
    {
      mainImage: '/images/consultants/rockwell.jpg',
      roundImage: '/images/consultants/rockwell.png',
      title: 'Killa Design, Dubai',
      position: 'Principal Architect',
      description: 'A pioneer in Innovative Architecture',
    },
  ];

  return (
    <section className="constultants">
      <div className="container">
        <div className="csubhead">
          <span>Leading</span>
          <span className="cline"></span>
        </div>
        <h2 className="heading skyblue">Constultants</h2>

        <Slider
          ref={sliderconsRef}
          {...settings4}
          className="consultantScroll"
        >
          {consultantSlides.map((slide, index) => (
            <div className="consslide" key={index}>
              <div className="consultant">
                <img className='consultantName' alt="aboutus" src={slide.mainImage} />
                <img
                  alt="aboutus"
                  src={slide.roundImage}
                  className="toprightround consultantProject"
                />
              </div>
              <h2>{slide.title}</h2>
              <h3>{slide.position}</h3>
              <p>{slide.description}</p>
            </div>
          ))}
        </Slider>

        <div className="progress-bar-container">
          <div
            className="progress-bar-inner"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Consultants;
