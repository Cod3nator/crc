import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useTransform, useScroll } from 'framer-motion';
import dnaVideo from "../../assets/dna.mp4";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollVideoPlayer = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const videoInitializedRef = useRef(false);
  const isTouchDeviceRef = useRef(false);
  const lastTouchTimeRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);

  // Framer Motion animation values
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start start", "end end"]
  });

  // Transform values based on scroll progress
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -30]);
  const videoFilter = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "brightness(1.0) contrast(1.0)",
      "brightness(1.1) contrast(1.05)",
      "brightness(1.0) contrast(1.0)"
    ]
  );

  // Function to keep video playing
  const ensureVideoIsPlaying = (video) => {
    if (video && video.paused && isInViewport) {
      video.play().catch(e => console.log('Play attempt failed:', e));
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const trigger = triggerRef.current;

    if (!video || !container || !trigger) return;

    // Prevent duplicate initialization
    if (videoInitializedRef.current) return;

    // Check if this is a touch device
    isTouchDeviceRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    console.log(`Touch device detected: ${isTouchDeviceRef.current}`);

    let lastTime = 0;
    let requestId = null;
    let lastScrollDirection = 0;
    let lastScrollPos = 0;
    let scrollTimeout = null;
    let playAttemptInterval = null;

    // Setup the continuous play attempt interval
    // This will periodically try to play the video whenever it's in viewport
    const setupPlayAttemptInterval = () => {
      // Clear any existing interval first
      if (playAttemptInterval) clearInterval(playAttemptInterval);

      // Create new interval - try to play every second if in viewport
      playAttemptInterval = setInterval(() => {
        if (isInViewport && video && video.paused) {
          video.play().catch(e => console.log('Interval play attempt failed:', e));
        }
      }, 1000);
    };

    // Throttle function for smoother updates
    const throttle = (callback, delay) => {
      let last = 0;
      return function () {
        const now = new Date().getTime();
        if (now - last >= delay) {
          callback.apply(null, arguments);
          last = now;
        }
      };
    };

    // Handle video seek with RAF for smoother playback
    const updateVideoTime = (time) => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }

      requestId = requestAnimationFrame(() => {
        if (Math.abs(video.currentTime - time) > 0.01) {
          video.currentTime = time;
          // Every time we update the time, try to ensure the video is playing
          lastScrollTimeRef.current = Date.now();
          ensureVideoIsPlaying(video);
        }
      });
    };

    // Handle window scroll events directly
    const handleWindowScroll = () => {
      lastScrollTimeRef.current = Date.now();

      // Try to play the video during scroll
      if (isInViewport && video && video.paused) {
        video.play().catch(e => { });
      }

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a timeout to check if video is playing after scroll ends
      scrollTimeout = setTimeout(() => {
        if (isInViewport && video && video.paused) {
          video.play().catch(e => { });
        }
      }, 100);
    };

    // Add touch event handling for all devices
    const handleInteractionStart = () => {
      lastTouchTimeRef.current = Date.now();
      if (isInViewport && video) {
        video.play().catch(() => { });
      }
    };

    const handleInteractionEnd = () => {
      // Keep track of the last interaction time
      lastTouchTimeRef.current = Date.now();

      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Make sure video is playing after interaction ends
      scrollTimeout = setTimeout(() => {
        if (isInViewport && video && video.paused) {
          video.play().catch(() => { });
        }
      }, 50);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (user switched tabs or apps)
        if (!video.paused) video.pause();
      } else {
        // Page is visible again
        if (isInViewport) {
          video.play().catch(e => { });
        }
      }
    };

    const handleVideoLoaded = () => {
      if (videoInitializedRef.current) return;

      console.log("Video loaded, duration:", video.duration);
      setVideoLoaded(true);
      setVideoDuration(video.duration);
      video.currentTime = 0;
      video.muted = true;
      video.loop = true; // Enable looping
      video.playsInline = true;
      videoInitializedRef.current = true;

      // Adjust the scroll height dynamically based on video duration
      // 1 second = 50vh of scrolling space (configurable)
      const scrollMultiplier = 50; // vh per second
      const scrollHeight = Math.max(300, Math.round(video.duration * scrollMultiplier));
      trigger.style.height = `${scrollHeight}vh`;
      console.log(`Set scroll height to ${scrollHeight}vh based on video duration ${video.duration}s`);

      setupScrollAnimation();
      setupPlayAttemptInterval();

      // Try to play immediately when loaded
      video.play().catch(e => console.log('Initial play prevented:', e));
    };

    const setupScrollAnimation = () => {
      // Clear any existing ScrollTrigger instances
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      // Create the GSAP ScrollTrigger
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: isTouchDeviceRef.current ? 0.5 : 0.8, // Adjusted for smoother scrubbing
        markers: false, // Set to true for debugging
        pin: container,
        pinSpacing: true,
        anticipatePin: 1,
        refreshPriority: 1,
        fastScrollEnd: true,
        onEnter: () => {
          setIsInViewport(true);
          video.play().catch(() => { });
        },
        onEnterBack: () => {
          setIsInViewport(true);
          video.play().catch(() => { });
        },
        onLeave: () => {
          setIsInViewport(false);
          video.pause();
        },
        onLeaveBack: () => {
          setIsInViewport(false);
          video.pause();
        },
        onUpdate: throttle((self) => {
          // Get progress from 0 to 1
          const progress = self.progress;
          setScrollProgress(progress);
          lastScrollTimeRef.current = Date.now();

          if (video && video.duration) {
            // Set video currentTime based on scroll progress
            const targetTime = progress * video.duration;

            // Only update if the change is significant
            if (Math.abs(lastTime - targetTime) > 0.01) {
              lastTime = targetTime;
              updateVideoTime(targetTime);
            }

            // Always try to ensure video is playing when in viewport
            if (self.isActive && video.paused) {
              video.play().catch(() => { });
            }
          }
        }, isTouchDeviceRef.current ? 32 : 16)
      });

      ScrollTrigger.refresh();

      return () => {
        if (requestId) {
          cancelAnimationFrame(requestId);
        }
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    };

    // Video event listeners - only add once
    video.addEventListener('loadedmetadata', handleVideoLoaded, { once: true });
    video.addEventListener('canplay', handleVideoLoaded, { once: true });
    video.addEventListener('error', (e) => {
      console.error("Video error:", e);
    }, { once: true });

    // Handle pause events - try to resume playback if we're in viewport
    video.addEventListener('pause', () => {
      const timeSinceScroll = Date.now() - lastScrollTimeRef.current;
      const timeSinceTouch = Date.now() - lastTouchTimeRef.current;

      // If we're in viewport and the pause was automatic (during scroll or right after touch)
      // then try to resume playback
      if (isInViewport && (timeSinceScroll < 1000 || timeSinceTouch < 1000)) {
        // Small timeout to give browser a break before trying to play again
        setTimeout(() => {
          video.play().catch(() => { });
        }, 50);
      }
    });

    // Force video to loop
    video.addEventListener('ended', () => {
      if (isInViewport) {
        video.currentTime = 0;
        video.play().catch(e => { });
      }
    });

    // Add window scroll listener to help keep video playing
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // Add interaction events for both desktop and mobile
    container.addEventListener('mousedown', handleInteractionStart, { passive: true });
    container.addEventListener('mouseup', handleInteractionEnd, { passive: true });
    container.addEventListener('touchstart', handleInteractionStart, { passive: true });
    container.addEventListener('touchend', handleInteractionEnd, { passive: true });

    // Visibility change for tab switching
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Force load video
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.loop = true;
    video.currentTime = 0;

    // Start loading the video
    const loadVideo = async () => {
      try {
        video.load();
        // If video is already loaded
        if (video.readyState >= 3) {
          handleVideoLoaded();
        }
      } catch (err) {
        console.error("Error loading video:", err);
      }
    };

    loadVideo();

    return () => {
      // Clean up event listeners
      video.removeEventListener('loadedmetadata', handleVideoLoaded);
      video.removeEventListener('canplay', handleVideoLoaded);
      video.removeEventListener('pause', () => { });
      video.removeEventListener('ended', () => { });

      window.removeEventListener('scroll', handleWindowScroll);
      container.removeEventListener('mousedown', handleInteractionStart);
      container.removeEventListener('mouseup', handleInteractionEnd);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Clean up intervals and timeouts
      if (playAttemptInterval) {
        clearInterval(playAttemptInterval);
      }

      // Cancel any pending animation frames
      if (requestId) {
        cancelAnimationFrame(requestId);
      }

      // Clean up timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Kill ScrollTrigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []); // Empty dependency array to ensure this only runs once

  return (
    <div className="w-full">
      {/* Trigger Container - height will be adjusted based on video duration */}
      <div
        ref={triggerRef}
        className="relative"
        style={{ height: '300vh' }} // Start with a taller container, will be adjusted dynamically
      >
        {/* Video Container */}
        <div
          ref={containerRef}
          className="w-full h-screen bg-black overflow-hidden z-10"
        >
          {/* Video Element with Framer Motion - removed scale effect */}
          <motion.video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
            loop
            autoPlay
            style={{
              filter: videoFilter
            }}
          >
            <source src={dnaVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>

          {/* Loading State */}
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg">Loading DNA sequence...</p>
              </div>
            </div>
          )}

          {/* Overlay Content with Framer Motion */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white z-20">
              <motion.h2
                className="text-4xl md:text-7xl font-bold mb-6 tracking-wide"
                style={{
                  opacity: titleOpacity,
                  y: titleY
                }}
              >
                DNA SEQUENCE
              </motion.h2>
              <motion.p
                className="text-lg md:text-2xl max-w-md mx-auto leading-relaxed"
                style={{
                  opacity: subtitleOpacity,
                  y: subtitleY
                }}
              >
                Scroll to control video playback
              </motion.p>
              <motion.div
                className="mt-4 text-sm"
                style={{ opacity: subtitleOpacity }}
              >
                {isInViewport ? '▶ Playing' : '⏸ Paused'}
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
          >
            <div className="bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-full h-2"
                style={{
                  width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                  transition: { ease: "easeOut", duration: 0.3 }
                }}
              />
            </div>
            <p className="text-white text-sm text-center mt-2 opacity-60">
              {Math.round(scrollProgress * 100)}% • {videoDuration ? `${Math.round(videoDuration)}s video` : 'Loading...'}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollVideoPlayer;