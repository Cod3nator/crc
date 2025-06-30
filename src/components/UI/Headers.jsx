import React, { useState, useEffect } from "react";

const useHeaderTransparency = () => {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsTransparent(scrollTop < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isTransparent;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isTransparent = useHeaderTransparency();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      setIsMenuOpen(false);
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
   
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0;
          position: relative;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo {
          height: 50px;
          width: auto;
          font-size: 1.5rem;
          font-weight: bold;
          color: #2c5aa0;
          text-decoration: none;
        }

        .nav {
          display: flex;
          align-items: center;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2rem;
          align-items: center;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link:hover {
          color: #4f9570;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #4f9570, #2c5aa0);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
        }

        .bar {
          width: 25px;
          height: 3px;
          margin: 3px 0;
          transition: all 0.3s ease;
          border-radius: 3px;
        }

        .blue-bar {
          background-color: #2c5aa0;
        }

        .green-bar {
          background-color: #4f9570;
        }

        .hamburger.active .bar:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active .bar:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .bar:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Always show hamburger */
        .hamburger {
          display: flex;
        }

        /* Hide default nav menu */
        .nav {
          position: fixed;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100vh;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          transition: left 0.3s ease;
          z-index: 1000;
          justify-content: center;
          align-items: center;
        }

        .nav.active {
          left: 0;
        }

        .nav-menu {
          flex-direction: column;
          gap: 3rem;
          text-align: center;
        }

        .nav-link {
          font-size: 1.2rem;
          padding: 1rem;
        }

        /* Desktop specific styles */
        @media (min-width: 769px) {
          .nav-menu {
            gap: 4rem;
          }
          
          .nav-link {
            font-size: 1.5rem;
          }
        }

        /* Demo sections for scrolling */
        .demo-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
        }

        .demo-section:nth-child(even) {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          color: #333;
        }

        .demo-section:nth-child(odd) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .hero {
          background: linear-gradient(135deg, #4f9570 0%, #2c5aa0 100%);
          color: white;
          padding-top: 80px;
        }
      `}</style>

      <header
        style={{
          backgroundColor: isTransparent
            ? "rgba(255, 255, 255, 0)"
            : "rgba(255, 255, 255, 0.9)",
          backdropFilter: isTransparent ? "none" : "blur(20px)",
          boxShadow: isTransparent ? "none" : "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container">
          <div className="header">
            <div className="logo-container">
              <div className="logo">
                <img src="/src/assets/crc.png" alt="" />
              </div>
            </div>

            <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
              <ul className="nav-menu">
                <li className="nav-item">
                  <a
                    href="#about"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    about us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#projects"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    projects
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#success-smiles"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    success smiles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#media-hub"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    media hub
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#our-journal"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    our journal
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#faqs"
                    className="nav-link"
                    onClick={handleNavLinkClick}
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </nav>

            <button
              className={`hamburger ${isMenuOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span className="bar blue-bar"></span>
              <span className="bar green-bar"></span>
              <span className="bar blue-bar"></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;