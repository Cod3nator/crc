import React from 'react';
import "../../styles/Header.css"
import logo from "../../assets/Logo.png"
import face from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.png";
import insta from "../../assets/insta.svg";
import link from  "../../assets/link.svg";

const Footer = () => {
    return (
        <footer >
          <div className="container">
            <div className="footer-content">
                <div className="footer-logo">
                  <img src={logo} alt="" />
                </div>

                <div className="social-icons-and-disclaimer">
                  <div className="social-icons">
                  <div className="social-icon"><img src={face} alt="" /></div>
                    <div className="social-icon">
                    <img src={insta} alt="" />
                    </div>
                    <div className="social-icon">
                    <img src={youtube} alt="" />
                    </div>
                    <div className="social-icon">
                    <img src={link} alt="" />
                    </div>
                  </div>
                    <div className="footer-copyright">
                    © 2024 CRC Group. All Rights Reserved.
                </div>
                </div>


            </div>
            </div>
        </footer>
    )
}

export default Footer