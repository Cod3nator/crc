import React, { useState, useEffect } from 'react'; 
import useHeaderTransparency from '../../hooks/UseHeaderTransparency.js'; 
import Logo from "../../assets/Logo.png"; 
import '../../styles/Header.css'  

const Header = () => {   
  const [isMenuOpen, setIsMenuOpen] = useState(false);   
  const isTransparent = useHeaderTransparency(); // Use the imported hook   

  const toggleMenu = () => {     
    setIsMenuOpen(!isMenuOpen);   
  };    

  const handleNavLinkClick = (e) => {     
    e.preventDefault();     
    const targetId = e.target.getAttribute('href').substring(1);     
    const targetSection = document.getElementById(targetId);      

    if (targetSection) {       
      setIsMenuOpen(false);        
     
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