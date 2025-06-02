import React, { useRef, useEffect, useState } from 'react';
import dnaVideo from "../../assets/dna.mp4";

const ScrollVideoPlayer = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [animeLoaded, setAnimeLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    // Load Anime.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.onload = () => {
      console.log('Anime.js loaded');
      setAnimeLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!animeLoaded) return;

    const video = videoRef.current;
    const container = containerRef.current;
    const trigger = triggerRef.current;

    if (!video || !container || !trigger) return;

    let isVideoReady = false;
    let currentAnimation = null;
    let isAnimating = false;

    const handleVideoLoaded = () => {
      console.log("Video loaded, duration:", video.duration);
      setVideoLoaded(true);
      isVideoReady = true;
      video.currentTime = 0;
      setupScrollAnimation();
    };

    const setupScrollAnimation = () => {
      if (!isVideoReady || !window.anime) return;

      const handleScroll = () => {
        if (!video.duration) return;

        const rect = trigger.getBoundingClientRect();
        const triggerHeight = trigger.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate scroll progress through the 200vh container
        let progress = 0;
        let inViewport = false;

        if (rect.top <= 0 && rect.bottom >= windowHeight) {
          // Container is in viewport and scrolling
          progress = Math.abs(rect.top) / (triggerHeight - windowHeight);
          inViewport = true;
        } else if (rect.top > 0) {
          // Container hasn't entered yet
          progress = 0;
          inViewport = false;
        } else if (rect.bottom < windowHeight) {
          // Container has passed completely
          progress = 1;
          inViewport = false;
        }

        // Clamp progress
        progress = Math.max(0, Math.min(1, progress));
        setScrollProgress(progress);
        setIsInViewport(inViewport);

        // Handle video playback based on viewport and scroll
        const targetTime = progress * video.duration;
        
        if (inViewport) {
          // Video should play when in viewport
          if (video.paused) {
            video.play().catch(e => console.log('Play prevented:', e));
          }
          
          // Use Anime.js to smoothly animate video currentTime while playing
          if (!isAnimating && Math.abs(targetTime - video.currentTime) > 0.2) {
            isAnimating = true;
            
            if (currentAnimation) {
              currentAnimation.pause();
            }

            currentAnimation = window.anime({
              targets: { time: video.currentTime },
              time: targetTime,
              duration: 300,
              easing: 'easeOutCubic',
              update: function(anim) {
                const newTime = anim.animations[0].currentValue;
                if (Math.abs(video.currentTime - newTime) > 0.1) {
                  video.currentTime = newTime;
                }
              },
              complete: function() {
                isAnimating = false;
              }
            });
          } else if (!isAnimating) {
            // For small changes, update directly
            video.currentTime = targetTime;
          }
        } else {
          // Pause video when not in viewport
          if (!video.paused) {
            video.pause();
          }
          // Still update time for when it comes back into view
          video.currentTime = targetTime;
        }

        // Handle container pinning with CSS
        if (progress > 0 && progress < 1) {
          container.style.position = 'fixed';
          container.style.top = '0';
          container.style.left = '0';
          container.style.right = '0';
          container.style.zIndex = '10';
        } else if (progress >= 1) {
          container.style.position = 'absolute';
          container.style.top = 'auto';
          container.style.bottom = '0';
          container.style.left = '0';
          container.style.right = '0';
          container.style.zIndex = '10';
        } else {
          container.style.position = 'absolute';
          container.style.top = '0';
          container.style.left = '0';
          container.style.right = '0';
          container.style.zIndex = '10';
        }

        console.log(`Progress: ${(progress * 100).toFixed(1)}%, Video Time: ${targetTime.toFixed(2)}s, In Viewport: ${inViewport}, Playing: ${!video.paused}`);
      };

      // Add scroll listener with throttling
      let ticking = false;
      const scrollListener = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', scrollListener, { passive: true });
      
      // Initial call
      handleScroll();

      // Return cleanup function
      return () => {
        window.removeEventListener('scroll', scrollListener);
        if (currentAnimation) {
          currentAnimation.pause();
        }
      };
    };

    // Video event listeners
    video.addEventListener('loadedmetadata', handleVideoLoaded);
    video.addEventListener('canplay', handleVideoLoaded);
    video.addEventListener('error', (e) => {
      console.error("Video error:", e);
    });

    // Prevent default video controls behavior
    video.addEventListener('pause', (e) => {
      if (isInViewport && !isAnimating) {
        // Only allow pause when not in viewport or when animating
        e.preventDefault();
        video.play().catch(console.log);
      }
    });

    // Force load video
    video.load();

    // If video is already loaded
    if (video.readyState >= 1) {
      handleVideoLoaded();
    }

    // Setup scroll animation cleanup
    const cleanup = setupScrollAnimation();

    return () => {
      if (cleanup) cleanup();
      video.removeEventListener('loadedmetadata', handleVideoLoaded);
      video.removeEventListener('canplay', handleVideoLoaded);
      if (currentAnimation) {
        currentAnimation.pause();
      }
    };
  }, [animeLoaded]);

  return (
    <div className="w-full">
      {/* Content before video section */}
      {/* <div className="h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">DNA Animation</h1>
          <p className="text-xl text-gray-600 mb-4">Scroll-Controlled Video Player</p>
          {!animeLoaded && (
            <p className="text-sm text-gray-500">Loading animation library...</p>
          )}
          <div className="mt-8 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Scroll down to see the video play based on your scroll position
          </p>
        </div>
      </div> */}

      {/* 200vh Trigger Container */}
      <div 
        ref={triggerRef}
        className="relative"
        style={{ height: '200vh' }}
      >
        {/* Video Container */}
        <div 
          ref={containerRef}
          className="absolute top-0 left-0 right-0 w-full h-screen bg-black overflow-hidden z-10"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
            style={{
              filter: 'brightness(1.1) contrast(1.05)'
            }}
          >
            <source src={dnaVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Loading State */}
          {(!videoLoaded || !animeLoaded) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg">
                  {!animeLoaded ? 'Loading Anime.js...' : 'Loading DNA sequence...'}
                </p>
              </div>
            </div>
          )}

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white z-20">
              <h2 className="text-4xl md:text-7xl font-bold mb-6 opacity-90 tracking-wide">
                SCROLL VIDEO
              </h2>
              <p className="text-lg md:text-2xl opacity-70 max-w-md mx-auto leading-relaxed">
                Video plays when in viewport
              </p>
              <div className="mt-4 text-sm opacity-60">
                {isInViewport ? '▶ Playing' : '⏸ Paused'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64">
            <div className="bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full h-2 transition-all duration-300 ease-out"
                style={{
                  width: `${scrollProgress * 100}%`
                }}
              ></div>
            </div>
            <p className="text-white text-sm text-center mt-2 opacity-60">
              {Math.round(scrollProgress * 100)}% • {isInViewport ? 'In Viewport' : 'Out of Viewport'}
            </p>
          </div> */}

          {/* Debug Info */}
          {/* <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded text-sm font-mono">
            <div>Anime.js: {animeLoaded ? '✓' : '✗'}</div>
            <div>Video: {videoLoaded ? '✓' : '✗'}</div>
            <div>In Viewport: {isInViewport ? '✓' : '✗'}</div>
            <div>Playing: {videoRef.current && !videoRef.current.paused ? '✓' : '✗'}</div>
            <div>Progress: {(scrollProgress * 100).toFixed(1)}%</div>
            <div>Duration: {videoRef.current?.duration?.toFixed(1) || '—'}s</div>
            <div>Current: {videoRef.current?.currentTime?.toFixed(1) || '0'}s</div>
          </div> */}
        </div>
      </div>

      {/* Content after video section */}
      {/* <div className="h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Video Complete</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The video played smoothly based on your scroll position and paused when out of viewport.
            Anime.js provided smooth easing transitions for enhanced performance.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default ScrollVideoPlayer;