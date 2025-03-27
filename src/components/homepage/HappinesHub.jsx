import React, { useEffect, useState, useRef } from "react";
import empPlaceholder from "../../assets/face.png";
import custPlaceholder from "../../assets/face.png";

const HappinesHub = () => {
  const [activeEmpIndex, setActiveEmpIndex] = useState(0);
  const [activeCustIndex, setActiveCustIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const employeeContainerRef = useRef(null);
  const customerContainerRef = useRef(null);
  const activeEmpRef = useRef(null);
  const activeCustRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const employeeImages = Array(isMobile ? 15 : 24).fill(empPlaceholder);
  const customerImages = Array(isMobile ? 15 : 24).fill(custPlaceholder);

  const handleEmpHover = (index) => {
    setActiveEmpIndex(index);
  };

  const handleCustHover = (index) => {
    setActiveCustIndex(index);
  };

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (
        employeeContainerRef.current &&
        !employeeContainerRef.current.contains(e.relatedTarget) &&
        activeEmpRef.current &&
        !activeEmpRef.current.contains(e.relatedTarget)
      ) {
        setActiveEmpIndex(0);
      }
    };

    const employeeContainer = employeeContainerRef.current;
    if (employeeContainer) {
      employeeContainer.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        employeeContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (
        customerContainerRef.current &&
        !customerContainerRef.current.contains(e.relatedTarget) &&
        activeCustRef.current &&
        !activeCustRef.current.contains(e.relatedTarget)
      ) {
        setActiveCustIndex(0);
      }
    };

    const customerContainer = customerContainerRef.current;
    if (customerContainer) {
      customerContainer.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        customerContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

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
        <div className="employ" ref={employeeContainerRef}>
          <div className="emp-title">employees</div>
          <div className="emp-grid">
            {employeeImages.map((img, index) => (
              <div
                key={index}
                className={`emp-img-container ${
                  activeEmpIndex === index ? "active" : ""
                }`}
                onMouseEnter={() => handleEmpHover(index)}
              >
                <img src={img} alt={`Employee ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="active-emp" ref={activeEmpRef}>
            <img src={employeeImages[activeEmpIndex]} alt="Active Employee" />
            <div className="emp-comment">
              "I feel truly valued and motivated every day because of the
              incredible appreciation and support from my company. It's
              inspiring to be part of a workplace that recognizes efforts
              and nurtures growth!"
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="cust" ref={customerContainerRef}>
          <div className="cust-title">partners</div>
          <div className="cust-grid">
            {customerImages.map((img, index) => (
              <div
                key={index}
                className={`cust-img-container ${
                  activeCustIndex === index ? "active" : ""
                }`}
                onMouseEnter={() => handleCustHover(index)}
              >
                <img src={img} alt={`Customer ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="active-cust" ref={activeCustRef}>
            <img src={customerImages[activeCustIndex]} alt="Active Customer" />
            <div className="cust-comment">
              "I feel truly valued and motivated every day because of the
              incredible appreciation and support from my company. It's
              inspiring to be part of a workplace that recognizes efforts
              and nurtures growth!"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappinesHub;
