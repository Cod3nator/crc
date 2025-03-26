import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-96 md:h-screen max-h-[650px] w-full overflow-hidden">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/api/placeholder/400/320" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-1 flex items-center justify-center h-full w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
            craftsmanship & class
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;