

const Hero = () => {
  return (
    <div className="hero-container">
      <video 
        className="hero-video" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/api/placeholder/400/320" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            craftsmanship & class
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;