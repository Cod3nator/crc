import React from 'react'
import heroImg from "../../assets/dna_banner.svg"
import "../../styles/DNApage.css"

const DNA_Hero = () => {
  return (
    <>
        <div className="dna-hero">
            <div className="container">
             <div className="dna-hero-content">
             <h1>
            Designing Sustainable & Smart Commercial Spaces
            </h1>
            <img src={heroImg} alt="Designing Sustainable & Smart Commercial Spaces" />
             </div>
            </div>
        </div>
    </>
  )
}

export default DNA_Hero