// import { IoIosArrowRoundBack } from "react-icons/io";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import React, {useEffect, useRef } from "react";
import { useState } from 'react';
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import FaqAccordion from '../faqaccordion';
import { registeryProcessData } from '../utils/faqData';
import { nriservicesData } from '../utils/faqData';
import { buyersguideData } from '../utils/faqData';





gsap.registerPlugin(ScrollTrigger);

export const Home = () => {

  const [toggle, setToggle] = useState(1)

  function updateToggle(id) {
    setToggle(id)
  }

  const [isOpen, setIsOpen] = useState(false);   

  const toggleMenu = () => {     
    setIsOpen(!isOpen);   
  };    

  const [progress, setProgress] = useState(25);


  const [isActive, setIsActive] = useState(false);
  let sliderRef = useRef(null);
  let sliderconsRef = useRef(null);
  
  const handleClick = (value) => {
    setIsActive(!isActive);

      var currentindex = value; 


      if ( null !== currentindex ) {
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
        const currentFrame = index => (
          `images/dna/${(index + 1).toString().padStart(4, '0')}.png`
        );

        const images = []
        const airpods = {
          frame: 0
        };

        for (let i = 0; i < frameCount; i++) {
          const img = new Image();
          img.src = currentFrame(i);
          images.push(img);
        }

        gsap.fromTo(airpods, {frame: 0},{
          frame: frameCount - 1,
          snap: "frame",
          ease: "power3",
          
          scrollTrigger: {
                trigger: ".hero-lightpass",
                markers:false,
                start: "top top",
                end: "bottom top",
                duration: 20,
                scrub: true,
                pin: true,
          },
          onUpdate: render
        });

        images[0].onload = render;

        function render() {
          context.clearRect(0, 0, el.width, el.height);
          context.drawImage(images[airpods.frame], 0, 0); 
          //console.log(airpods.frame);
        }

    }, [])

////

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  


  const settings3 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidestoshow: 1,
    slidestoscroll: 1,
    arrow: true,
    nextArrow: <IoMdArrowDropright />,
    prevArrow: <IoMdArrowDropleft />
  };
  

  const settings4 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
        const totalSlides = 4;
        const newProgress = ((next + 1) / totalSlides) * 100;
        setProgress(newProgress);
        console.log(newProgress);
    },
  };

	return (
    <main className="hero-section1 main">
            <div className="hero-image">
              <img alt="world is beauty" className="banner-image" src="/images/banner.jpg" />
            </div>

            <div className="mainsection">
                    <div className="overlay">

                    </div>

                  <div className="aboutus">
                    <div className="container">
                        <h2 className="heading rosegold">About us</h2>
                        <p>CRC Group was built on a simple belief, great spaces come from great intent. With roots going back to 1985, we've grown into a leading real estate company in Noida by staying true to our values: craftsmanship, innovation, and trust. We don't just deliver projects; we deliver our word</p>
                        <img alt="aboutus" src="/images/aboutus.jpg" width="70%" />
                    </div>
                  </div>

                  <div className="visionaries">
                    <div className="overlay1"></div>
                      <div className="container">
                        <h2 className="heading skyblue">Visionaries</h2>
                        <div className="vsubhead"><span className="vline"></span><span>Who Set Us Apart</span></div>

                        <Slider ref={slider => {sliderRef = slider;}} {...settings} className="vsSlider">
                          <div className="vslide" data-target="#vs-1">
                            <div className="vslidecontent">
                              <h2>Kunal Bhalla 1</h2>
                              <h3>Founder & CEO</h3>
                              <p>Mr. Kunal is a visionary leader, driving CRC's growth through innovation and excellence, consistently creating value and inspiring teams and stakeholders to aim higher every day.</p>
                            </div>

                            <div className="vslideimage">
                              <img alt="aboutus" src="/images/Untitled.jpg" />
                            </div>
                          </div>

                          <div className="vslide" data-target="#vs-2">
                            <div className="vslidecontent">
                              <h2>Kunal Bhalla 2</h2>
                              <h3>Founder & CEO</h3>
                              <p>Mr. Kunal is a visionary leader, driving CRC's growth through innovation and excellence, consistently creating value and inspiring teams and stakeholders to aim higher every day.</p>
                            </div>

                            <div className="vslideimage">
                              <img alt="aboutus" src="/images/Untitled.jpg" />
                            </div>
                          </div>

                          <div className="vslide" data-target="#vs-3">
                            <div className="vslidecontent">
                              <h2>Kunal Bhalla 3</h2>
                              <h3>Founder & CEO</h3>
                              <p>Mr. Kunal is a visionary leader, driving CRC's growth through innovation and excellence, consistently creating value and inspiring teams and stakeholders to aim higher every day.</p>
                            </div>

                            <div className="vslideimage">
                              <img alt="aboutus" src="/images/Untitled.jpg" />
                            </div>
                          </div>

                          <div className="vslide" data-target="#vs-4">
                            <div className="vslidecontent">
                              <h2>Kunal Bhalla 4</h2>
                              <h3>Founder & CEO</h3>
                              <p>Mr. Kunal is a visionary leader, driving CRC's growth through innovation and excellence, consistently creating value and inspiring teams and stakeholders to aim higher every day.</p>
                            </div>

                            <div className="vslideimage">
                              <img alt="aboutus" src="/images/Untitled.jpg" />
                            </div>
                          </div>
                        </Slider>
                      </div>

                      <div className="visionaryoption">
                        <div className="face" id="vs-1" onClick={() => handleClick("0")} value="0">
                          <img alt="face" src="/images/face1.png" width="100" height="100" value="0"/>
                          <h2>Kunal Bhalla 1</h2>
                          <p>Founder & CEO</p>
                        </div>
                        <div className="face" id="vs-2" onClick={() => handleClick("1")}><img alt="face" src="/images/face1.png" width="100" height="100"/>
                          <h2>Kunal Bhalla 2</h2>
                          <p>Founder & CEO</p>
                        </div>

                        <div className="face" id="vs-3" onClick={() => handleClick("2")}><img alt="face" src="/images/face1.png" width="100" height="100"/>
                          <h2>Kunal Bhalla 3</h2>
                          <p>Founder & CEO</p>
                        </div>

                        <div className="face" id="vs-4" onClick={() => handleClick("3")}><img alt="face" src="/images/face1.png" width="100" height="100"/>
                          <h2>Kunal Bhalla 4</h2>
                          <p>Founder & CEO</p>
                        </div>
                      </div>
                  </div>
            </div>



            <section className="constultants">
              <div className="container">
                        <div className="csubhead"><span>Leading</span><span className="cline"></span></div>
                        <h2 className="heading skyblue">Constultants</h2>
                        
                      <Slider ref={slider => {sliderconsRef = slider;}} {...settings4} className="consultantScroll">
                        <div className="consslide">
                          <div className="consultant">
                            <img alt="aboutus" src="/images/Conculant1.jpg" />
                            <img alt="aboutus" src="/images/Conculant2.jpg"  className="toprightround"/>
                          </div>
                          <h2>Killa Design, Dubai</h2>
                          <h3>Principal Architect</h3>
                          <p>A pioneer in Innovative Architecture</p>
                        </div>
                        <div className="consslide">
                          <div className="consultant">
                            <img alt="aboutus" src="/images/Conculant1.jpg" />
                            <img alt="aboutus" src="/images/Conculant2.jpg"  className="toprightround"/>
                          </div>
                          <h2>Killa Design, Dubai</h2>
                          <h3>Principal Architect</h3>
                          <p>A pioneer in Innovative Architecture</p>
                        </div>
                        <div className="consslide">
                          <div className="consultant">
                            <img alt="aboutus" src="/images/Conculant1.jpg" />
                            <img alt="aboutus" src="/images/Conculant2.jpg"  className="toprightround"/>
                          </div>
                          <h2>Killa Design, Dubai</h2>
                          <h3>Principal Architect</h3>
                          <p>A pioneer in Innovative Architecture</p>
                        </div>
                        <div className="consslide">
                          <div className="consultant">
                            <img alt="aboutus" src="/images/Conculant1.jpg" />
                            <img alt="aboutus" src="/images/Conculant2.jpg"  className="toprightround"/>
                          </div>
                          <h2>Killa Design, Dubai</h2>
                          <h3>Principal Architect</h3>
                          <p>A pioneer in Innovative Architecture</p>
                        </div>
                      </Slider>  

                      <div className="progress-bar-container">
                        <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
                      </div>
              </div>

            </section>



            <section className="dnasection">
              <div className="container">
                <h2 className="heading skyblue">The DNA of CRC</h2>
              </div>

              <div className="dnaanimation">
                <canvas id="hero-lightpass" className="hero-lightpass" ref={ref}>
                  
                </canvas>
              </div>
            </section>

            <div className="clearfix"></div>

            <section className="wwd">
              <div className="container">
                <h2 className="heading green">What We Do</h2>

                <div className="wwdcontainer">
                  <div className="wwditem">
                    <div className="wwditemcontainer">
                      <img alt="" src="/images/wwd1.jpg" />
                      <div className="overlay3">
                        <NavLink to="/">Know More</NavLink>
                      </div>
                    </div>
                    
                    <NavLink to="/">Commercial</NavLink>
                    
                  </div>
                  <div className="wwditem">
                    <div className="wwditemcontainer">
                      <img alt="" src="/images/wwd2.jpg" />
                      <div className="overlay3">
                        <NavLink to="/">Know More</NavLink>
                      </div>
                    </div>
                    <NavLink to="/">Residential</NavLink>
                    
                  </div>

                  <div className="wwditem">
                    <div className="wwditemcontainer">
                      <img alt="" src="/images/wwd3.jpg" />
                      <div className="overlay3">
                        <NavLink to="/">Know More</NavLink>
                      </div>
                    </div>
                    <NavLink to="/">Retails</NavLink>
                    
                  </div>
                  <div className="wwditem">
                    <div className="wwditemcontainer">
                      <img alt="" src="/images/wwd4.jpg" />
                      <div className="overlay3">
                        <NavLink to="/">Know More</NavLink>
                      </div>
                    </div>
                    <NavLink to="/">Hospitality</NavLink>
                    
                  </div> 
                </div>
              </div>
            </section>

            <section className="wesupport">
              <div className="container">
                We support low carbon footprint
              </div>
            </section>

<section className="ourprojects">
  <div className="container">
      <h2 className="heading skyblue">Our Projects</h2>
  </div>
  <div className="projectscontainer">
    <div className="projectcontent">
      <p>Step inside a CRC space and you'll feel it. The difference is in the detail. Our residential, retail, and commercial projects are thoughtfully planned, beautifully executed, and designed for the way people actually live and work. It's more than luxury; it's living, elevated.</p>
      <h3>Explore spaces built for excellence, designed for life.</h3>
    </div>

    <div className="sliderproject">
        <Slider ref={slider => {sliderProject = slider;}} {...settings2} className="projectslider">
          <div className="projectslide">
            <img alt="" src="/images/project2.png" />
              <div className="prologo"><img alt="" src="/images/logo.jpg"/></div>
          </div>

          <div className="projectslide">
            <img alt="" src="/images/project2.png" />
          
            <div className="prologo">
  <img alt="" src="/images/logo.jpg" />
            </div>
          </div>

          <div className="projectslide">
            <img alt="" src="/images/project2.png" />
            <div className="prologo">
              <img alt="" src="/images/logo.jpg" />
            </div>
          </div>

          <div className="projectslide">
            <img alt="" src="/images/project2.png" />
            <div className="prologo">
              <img alt="" src="/images/logo.jpg" />
            </div>

          </div>
        </Slider>

        <div className="projectarrows">
          <button className="projectLeft" onClick={projectLeft}><GoArrowLeft /></button>
          <button className="projectRight" onClick={projectRight}><GoArrowRight /></button>

        </div>
    </div>
  </div> 
</section>

<section className="happinesshub">
  <div className="container">
      <h2 className="heading skyblue">Happiness Hub</h2>
      <p>At CRC Group, trust isn't a buzzword, it's a bond. Whether it's homeowners settling into their dream space or partners working alongside us, every interaction reflects our commitment to genuine delight. It's why people stick with us, not just for what we build, but how we make them feel.</p>

      <Slider {...settings3} className="happinessSlider">
        <div className="hslide">
          <div className="hcontent">
            <span></span>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
          </div>
          <img alt="" src="/images/Untitled.jpg" />
        </div>

        <div className="hslide">
          <div className="hcontent">
            <span></span>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> 
          </div>
          <img alt="" src="/images/Untitled.jpg" />
        </div>
      </Slider>


  </div>
</section>

<section className="media">
  <div className="container">
     <div className="msubhead msubhead2"><span>See what the </span><h2 className="heading skyblue">Media</h2></div> 
      <div className="msubhead"><span className="mline"></span><span>has to say about us</span></div>
      
      <div className="mediaslider">
        <div className="mediaslide">
          <img alt="Team" src="/images/media1.jpg"/>
          <p>Discussion between Bhagyashree and Mr. Kunal Bhalla on Woman Leading Growth!</p>
        </div>
        <div className="mediaslide">
          <img alt="Team" src="/images/media2.jpg"/>
          <p>Discussion between Bhagyashree and Mr. Kunal Bhalla on Woman Leading Growth!</p>
        </div>
        <div className="mediaslide">
          <img alt="Team" src="/images/media3.jpg"/>
          <p>Discussion between Bhagyashree and Mr. Kunal Bhalla on Woman Leading Growth!</p>
        </div>
      </div>

      <NavLink className={"read"} to="/">Read More</NavLink>
  </div>
</section>

<section className="ourteam">
  <div className="container">
      <div className="otsubhead"><span className="otline"></span><span>Join</span></div>
      <h2 className="heading green">Our Team</h2>

      <p>At CRC Group, we don't just hire, we empower. If you're passionate about design, innovation, and making an impact, this is where you bring your ideas to life. Build the future with one of Noida's most forward-thinking real estate companies.</p>
      <img alt="Team" src="/images/team.jpg"/>
  </div>

</section>


    <section className="Faqs">
              <div className="container">
                        <div className="fsubhead"><span>Frequently Asked</span><span className="fline"></span></div>
                        <h2 className="heading skyblue">Questions</h2>
                        <div className="downarrow" onClick={toggleMenu}>
                          {/* <SlArrowDown /> */}
                          {isOpen ? <SlArrowUp /> : <SlArrowDown />}
                        </div>

                        <div className={`faqcontent ${isOpen ? 'active' : ''}`}>
                          
                          <ul>
                            <li onClick={()=>updateToggle(1)} className={toggle === 1 ? "active" : ""}>Registery Process</li>
                            <li onClick={()=>updateToggle(2)} className={toggle === 2 ? "active" : ""}>Nri Services</li>
                            <li onClick={()=>updateToggle(3)} className={toggle === 3 ? "active" : ""}>Buyers Guide</li>
                          </ul>

                            <FaqAccordion items={registeryProcessData} toggle={toggle} faqcount={1} />
                            <FaqAccordion items={nriservicesData} toggle={toggle} faqcount={2}/>
                            <FaqAccordion items={buyersguideData} toggle={toggle} faqcount={3}/>
                        </div>
                     
              </div>
    </section>          

    </main>

   

     
  );
};