
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import Slider from "react-slick";
const Happiness_Hub = () => {
      const settings3 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidestoshow: 1,
    slidestoscroll: 1,
    arrow: true,
    nextArrow: <IoMdArrowDropright />,
    prevArrow: <IoMdArrowDropleft />,
  };
  return (
         <section className="happinesshub">
           <div className="container">
             <h2 className="heading skyblue">Happiness Hub</h2>
             <p>
               At CRC Group, trust isn't a buzzword, it's a bond. Whether it's
               homeowners settling into their dream space or partners working
               alongside us, every interaction reflects our commitment to genuine
               delight. It's why people stick with us, not just for what we build,
               but how we make them feel.
             </p>
             
             <Slider {...settings3} className="happinessSlider">
               <div className="hslide">
                 <div className="hcontent">
                   <span></span>
                   <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                     do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco
                     laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                     irure dolor in reprehenderit in voluptate velit esse cillum
                     dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                     cupidatat non proident, sunt in culpa qui officia deserunt
                     mollit anim id est laborum.
                   </p>
                 </div>
                 <img alt="" src="/images/Untitled.jpg" />
               </div>
   
               <div className="hslide">
                 <div className="hcontent">
                   <span></span>
                   <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                     do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco
                     laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                     irure dolor in reprehenderit in voluptate velit esse cillum
                     dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                     cupidatat non proident, sunt in culpa qui officia deserunt
                     mollit anim id est laborum.
                   </p>
                 </div>
                 <img alt="" src="/images/Untitled.jpg" />
               </div>
             </Slider>
           </div>
         </section>
  )
}

export default Happiness_Hub