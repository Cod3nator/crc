import React, { useEffect, useRef } from 'react';

const Marquee = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollText = scrollContainer.querySelector('.scroll-text');
    const scrollWidth = scrollText.offsetWidth;
    
    const clone1 = scrollText.cloneNode(true);
    const clone2 = scrollText.cloneNode(true);
    scrollContainer.appendChild(clone1);
    scrollContainer.appendChild(clone2);

    let animationId;
    let position = 0;

    const animate = () => {
      position -= 1; 
      if (position <= -scrollWidth) {
        position = 0;
      }
      
      scrollContainer.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee-wrapper">
        <div ref={scrollContainerRef} className="marquee-scroll-container">
          <div className="scroll-text">
            Designing spaces that inspire and empower, for life and work.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;