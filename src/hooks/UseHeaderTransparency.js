
import React, { useState, useEffect, useCallback } from 'react'; 
function useHeaderTransparency() {   
  const [isTransparent, setIsTransparent] = useState(true);    
  useEffect(() => {
    const heroContainer = document.querySelector('.hero-container');

    const handleScroll = () => {
      const navTransSection = document.querySelector('.nav-trans');

      if (!navTransSection) return;
      // Check if we're within the .nav-trans section
      const navTransRect = navTransSection.getBoundingClientRect();
      const isWithinNavTrans = (
        navTransRect.top <= 0 && 
        navTransRect.bottom >= 0
      );
      // If we're within .nav-trans, keep transparency
      if (isWithinNavTrans) {
        setIsTransparent(true);
        return;
      }
      // Otherwise, check other sections
      const sections = document.querySelectorAll('section');

      let shouldBeTransparent = false;

      sections.forEach(section => {
        const sectionRect = section.getBoundingClientRect();

        // Check if section is in the first 50% of the viewport
        if (sectionRect.top < window.innerHeight * 0.5 && sectionRect.bottom > 0) {
          // Exclude specific sections or add a condition
          if (!section.classList.contains('no-transparency')) {
            shouldBeTransparent = true;
          }
        }
      });

      setIsTransparent(shouldBeTransparent);     
    }; 
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 
  return isTransparent; 
}

export default useHeaderTransparency;