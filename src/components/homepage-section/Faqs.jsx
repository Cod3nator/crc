import { useState } from "react";
import FaqAccordion from "../../faqaccordion";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { registeryProcessData, nriservicesData, buyersguideData } from "../../utils/faqData";
const Faqs = () => {
const [isOpen, setIsOpen] = useState(false);
      const [toggle, setToggle] = useState(1);
      const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
      function updateToggle(id) {
        setToggle(id);
      }
  return (
      <section className="Faqs">
        <div className="container">
          <div className="fsubhead">
            <span>Frequently Asked</span>
            <span className="fline"></span>
          </div>
          <h2 className="heading skyblue">Questions</h2>
          <div className="downarrow" onClick={toggleMenu}>
            {/* <SlArrowDown /> */}
            {isOpen ? <SlArrowUp /> : <SlArrowDown />}
          </div>

          <div className={`faqcontent ${isOpen ? "active" : ""}`}>
            <ul>
              <li
                onClick={() => updateToggle(1)}
                className={toggle === 1 ? "active" : ""}
              >
                Registery Process
              </li>
              <li
                onClick={() => updateToggle(2)}
                className={toggle === 2 ? "active" : ""}
              >
                Nri Services
              </li>
              <li
                onClick={() => updateToggle(3)}
                className={toggle === 3 ? "active" : ""}
              >
                Buyers Guide
              </li>
            </ul>

            <FaqAccordion
              items={registeryProcessData}
              toggle={toggle}
              faqcount={1}
            />
            <FaqAccordion
              items={nriservicesData}
              toggle={toggle}
              faqcount={2}
            />
            <FaqAccordion
              items={buyersguideData}
              toggle={toggle}
              faqcount={3}
            />
          </div>
        </div>
      </section>
  )
}

export default Faqs