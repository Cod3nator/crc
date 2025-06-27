import React, { useState } from 'react';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

export const faqaccordion = ({ items, toggle, faqcount }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className={`faqaccordian ${toggle === faqcount ? "show-content" : ""}`}>
      {items.map((item, index) => (
        <div key={index} className="card">
          <div className="card-header" onClick={() => handleToggle(index)} >
            {item.title}
            {activeIndex === index ? <SlArrowUp /> : <SlArrowDown />}
          </div>
          {activeIndex === index && (
            <div className="card-body card-body1">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default faqaccordion;
