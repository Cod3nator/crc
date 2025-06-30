import { useRef, useState } from "react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import Slider from "react-slick";

const Visionaries = () => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0); // Track active slide
  const CustomNextArrow = ({ onClick }) => (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <img src="/images/right-arrow.png" alt="Next" />
    </div>
  );

  const CustomPrevArrow = ({ onClick }) => (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <img src="/images/left-arrow.png" alt="Previous" />
    </div>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
     arrows: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const visionariesData = [
        {
      name: "Mr. Satish Garg",
      position: "Founder & MD",
      description:
        "Mr. Satish is a visionary leader, driving CRC's growth through innovation and excellence, consistently creating value and inspiring teams and stakeholders to aim higher every day.",
      image: "/images/visionaries/satish.png",
      face: "/images/visionaries/satish_s.png",
    },
    {
      name: "Kunal Bhalla",
      position: "Founder & CEO",
      description:
        "Mr. Kunal is a visionary leader, driving CRC's growth through innovation and excellence, consistently creating value and inspiring teams and stakeholders to aim higher every day.",
      image: "/images/visionaries/kunal.png",
      face: "/images/visionaries/kunal_s.png",
    },
    {
      name: "Mr. Vipul K. Maheshwari",
      position: "Executive Director",
      description:
        "Mr. Vipul is a visionary leader, driving CRC's growth through innovation and excellence, consistently creating value and inspiring teams and stakeholders to aim higher every day.",
      image: "/images/visionaries/vipul.png",
      face: "/images/visionaries/vipul_s.png",
    },
    {
      name: "Mr. Salil Kumar",
      position: "Director",
      description:
        "Mr. Salil is a visionary leader, driving CRC's growth through innovation and excellence, consistently creating value and inspiring teams and stakeholders to aim higher every day.",
      image: "/images/visionaries/salil.png",
      face: "/images/visionaries/salil.png",
    },
  ];

  const handleClick = (index) => {
    sliderRef.current?.slickGoTo(index);
    setActiveSlide(index); // Update active slide when clicked
  };

  return (
    <div className="visionaries">
      <div className="overlay1"></div>
      <div className="container">
        <h2 className="heading skyblue">Visionaries</h2>
        <div className="vsubhead">
          <span className="vline"></span>
          <span>Who Set Us Apart</span>
        </div>

        <Slider ref={sliderRef} {...settings} className="vsSlider">
          {visionariesData.map((person, index) => (
            <div
              className="vslide"
              key={index}
              data-target={`#vs-${index + 1}`}
            >
              <div className="vslidecontent">
                <h2>{person.name}</h2>
                <h3>{person.position}</h3>
                <p>{person.description}</p>
              </div>
              <div className="vslideimage">
                <img alt="aboutus" src={person.image} />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="visionaryoption">
        {visionariesData.map((person, index) => (
          <div
            key={index}
            className={`face ${activeSlide === index ? "active" : ""}`}
            id={`vs-${index + 1}`}
            onClick={() => handleClick(index)}
          >
            <div className="face-wrap">
              <img alt="face" src={person.face} width="100" height="100" />
            </div>
            <h2>{person.name}</h2>
            <p>{person.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visionaries;
