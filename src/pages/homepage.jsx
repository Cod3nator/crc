import React from "react";
import Hero from "../components/homepage/Hero";
import AboutUs from "../components/homepage/AboutUs";
import Marquee from "../components/homepage/Marquee";
import Trust from "../components/homepage/Trust";
import DNA from "../components/homepage/DNA";
import Explore from "../components/homepage/Explore";
import HappyCustomer from "../components/homepage/HappyCustomer";
import HappinesHub from "../components/homepage/HappinesHub";
import Media from "../components/homepage/Media";
import FAQ from "../components/homepage/FAQ";

const Homepage = () => {
  return (
    <>
      <Hero />
      <div className="nav-trans">
      <AboutUs />
      <Marquee />
      <Trust />
      <DNA />
      <Explore />
      <HappyCustomer />
      <HappinesHub />
      <Media />
      <FAQ />
      </div>
    </>
  );
};

export default Homepage;
