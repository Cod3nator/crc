import React, { useState } from "react";
import empPlaceholder from "../../assets/face.png"; // Assume you have placeholder images
import custPlaceholder from "../../assets/face.png";

const HappinesHub = () => {
  const [activeEmpIndex, setActiveEmpIndex] = useState(null);
  const [activeCustIndex, setActiveCustIndex] = useState(null);

  // Placeholder data - replace with your actual data
  const employeeImages = [
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder


    
  ];

  const customerImages = [
    custPlaceholder,
    custPlaceholder,
    custPlaceholder,
    custPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,
    empPlaceholder,




  ];

  return (
    <div className="happiness-hub">
<div className="container">
<div className="section-title">
        <h2>happiness hub!</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          posuere est purus, pellentesque convallis nibh vehicula ut.
          Aliquam maximus nisl sit amet mi suscipit vestibulum a eget dolor.
          Duis in rutrum nulla, eget dictum orci. Pellentesque odio nisi,
          mollis ac turpis vitae, vestibulum sollicitudin dui. Nunc sit amet
          ligula eros. Ut quis risus dui. Maecenas in justo non lacus
          pellentesque sodales et quis eros. Praesent volutpat rutrum
          varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Quisque posuere est purus, pellentesque convallis nibh vehicula
          ut. Aliquam maximus nisl sit amet mi suscipit vestibulum a eget
          dolor. Duis in rutrumnj.
        </p>
      </div>
</div>

      <div className="emp-cust-imgWall">
        <div className="employ">
          <div className="emp-title">employees</div>
          <div className="emp-grid">
            {employeeImages.map((img, index) => (
              <div 
                key={index} 
                className={`emp-img-container ${activeEmpIndex === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveEmpIndex(index)}
                onMouseLeave={() => setActiveEmpIndex(null)}
              >
                <img src={img} alt={`Employee ${index + 1}`} />
              </div>
            ))}
          </div>
          
          {activeEmpIndex !== null && (
            <div className="active-emp">
              <img src={employeeImages[activeEmpIndex]} alt="Active Employee" />
              <div className="emp-comment">
                "I feel truly valued and motivated every day because of the
                incredible appreciation and support from my company. It's
                inspiring to be part of a workplace that recognizes efforts
                and nurtures growth!"
              </div>
            </div>
          )}
        </div>

        <div className="divider"></div>

        <div className="cust">
          <div className="cust-title">customers/partners</div>
          <div className="cust-grid">
            {customerImages.map((img, index) => (
              <div 
                key={index} 
                className={`cust-img-container ${activeCustIndex === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveCustIndex(index)}
                onMouseLeave={() => setActiveCustIndex(null)}
              >
                <img src={img} alt={`Customer ${index + 1}`} />
              </div>
            ))}
          </div>
          
          {true !== null && (
            <div className="active-cust">
              <img src={customerImages[activeCustIndex]} alt="Active Customer" />
              <div className="cust-comment">
                "I feel truly valued and motivated every day because of the
                incredible appreciation and support from my company. It's
                inspiring to be part of a workplace that recognizes efforts
                and nurtures growth!"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HappinesHub;