import React, { useState, useEffect, useCallback } from 'react'; 
import Logo from "../../assets/Logo.png"; 
import '../../styles/Header.css'  

function useHeaderTransparency() {   
  const [isTransparent, setIsTransparent] = useState(true);    

  useEffect(() => {
    const heroContainer = document.querySelector('.hero-container');
    
    const handleScroll = () => {
      if (!heroContainer) return;

      const heroRect = heroContainer.getBoundingClientRect();
      const sections = document.querySelectorAll('section');
      
      // Check if any section is in the viewport
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

const Header = () => {   
  const [isMenuOpen, setIsMenuOpen] = useState(false);   
  const isTransparent = useHeaderTransparency();    

  const toggleMenu = () => {     
    setIsMenuOpen(!isMenuOpen);   
  };    

  const handleNavLinkClick = (e) => {     
    e.preventDefault();     
    const targetId = e.target.getAttribute('href').substring(1);     
    const targetSection = document.getElementById(targetId);      

    if (targetSection) {       
      // Close menu first       
      setIsMenuOpen(false);        

      // Scroll to section       
      targetSection.scrollIntoView({ behavior: 'smooth' });     
    }   
  };    

  useEffect(() => {     
    if (isMenuOpen) {       
      document.body.style.overflow = 'hidden';     
    } else {       
      document.body.style.overflow = 'unset';     
    }      

    return () => {       
      document.body.style.overflow = 'unset';     
    };   
  }, [isMenuOpen]);     

  return (     
    <header 
      style={{        
        backgroundColor: isTransparent          
          ? 'rgba(255, 255, 255, 0)'          
          : 'rgba(255, 255, 255, 1)',       
        boxShadow: isTransparent          
          ? 'none'          
          : '0 2px 4px rgba(0, 0, 0, 0.1)'     
      }}
    >       
      <div className="container header">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={handleNavLinkClick}>about us</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link" onClick={handleNavLinkClick}>projects</a>
            </li>
            <li className="nav-item">
              <a href="#success-smiles" className="nav-link" onClick={handleNavLinkClick}>success smiles</a>
            </li>
            <li className="nav-item">
              <a href="#media-hub" className="nav-link" onClick={handleNavLinkClick}>media hub</a>
            </li>
            <li className="nav-item">
              <a href="#our-journal" className="nav-link" onClick={handleNavLinkClick}>our journal</a>
            </li>
            <li className="nav-item">
              <a href="#faqs" className="nav-link" onClick={handleNavLinkClick}>FAQs</a>
            </li>
          </ul>
        </nav>
        
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span className="bar blue-bar"></span>
          <span className="bar green-bar"></span>
          <span className="bar blue-bar"></span>
        </button>
      </div>
    </header>   
  ); 
};  

export default Header;