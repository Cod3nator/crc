// import { IoIosArrowRoundBack } from "react-icons/io";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import FaqAccordion from "../faqaccordion";
import { registeryProcessData } from "../utils/faqData";
import { nriservicesData } from "../utils/faqData";
import { buyersguideData } from "../utils/faqData";
import What_We_Do from "../components/homepage-section/What_We_Do";
import Our_Project from "../components/homepage-section/Our_Project";
import Consultants from "../components/homepage-section/Consultants";
import Visionaries from "../components/homepage-section/Visionaries";
import Happiness_Hub from "../components/homepage-section/Happiness_Hub";
import Media from "../components/homepage-section/Media";
import Our_Team from "../components/homepage-section/Our_Team";
import Faqs from "../components/homepage-section/Faqs";

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const [toggle, setToggle] = useState(1);

  function updateToggle(id) {
    setToggle(id);
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isActive, setIsActive] = useState(false);
  let sliderRef = useRef(null);


  const handleClick = (value) => {
    setIsActive(!isActive);

    var currentindex = value;

    if (null !== currentindex) {
      sliderRef.slickGoTo(currentindex);
    }
  };

  let sliderProject = useRef(null);
  const projectRight = () => {
    sliderProject.slickNext();
  };
  const projectLeft = () => {
    sliderProject.slickPrev();
  };

  ////

  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    const context = el.getContext("2d");

    el.width = 1832;
    el.height = 1132;

    const frameCount = 241;
    const currentFrame = (index) =>
      `images/dna/${(index + 1).toString().padStart(4, "0")}.png`;

    const images = [];
    const airpods = {
      frame: 0,
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    gsap.fromTo(
      airpods,
      { frame: 0 },
      {
        frame: frameCount - 1,
        snap: "frame",
        ease: "power3",

        scrollTrigger: {
          trigger: ".hero-lightpass",
          markers: false,
          start: "top top",
          end: "bottom top",
          duration: 20,
          scrub: true,
          pin: true,
        },
        onUpdate: render,
      }
    );

    images[0].onload = render;

    function render() {
      context.clearRect(0, 0, el.width, el.height);
      context.drawImage(images[airpods.frame], 0, 0);
      //console.log(airpods.frame);
    }
  }, []);

  ////




  return (
    <main className="hero-section1 main">
      <div className="hero-image">
        <img
          alt="world is beauty"
          className="banner-image"
          src="/images/banner.jpg"
        />
      </div>

      <div className="mainsection">
        <div className="overlay"></div>

        <div className="aboutus">
          <div className="container">
            <h2 className="heading rosegold">About us</h2>
            <p>
              CRC Group was built on a simple belief, great spaces come from
              great intent. With roots going back to 1985, we've grown into a
              leading real estate company in Noida by staying true to our
              values: craftsmanship, innovation, and trust. We don't just
              deliver projects; we deliver our word
            </p>
            <img alt="aboutus" src="/images/aboutus.jpg" width="70%" />
          </div>
        </div>

       <Visionaries />
      </div>

    <Consultants />

      <section className="dnasection">
        <div className="container">
          <h2 className="heading skyblue">The DNA of CRC</h2>
        </div>

        <div className="dnaanimation">
          <canvas
            id="hero-lightpass"
            className="hero-lightpass"
            ref={ref}
          ></canvas>
        </div>
      </section>

      <div className="clearfix"></div>

    <What_We_Do />
 
      <section className="wesupport">
        <div className="container">We support low carbon footprint</div>
      </section>
    <Our_Project/>
    <Happiness_Hub/>
    <Media />
    <Our_Team />
    <Faqs />


   
    </main>
  );
};
