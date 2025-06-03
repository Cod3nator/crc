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

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const trigger = triggerRef.current;

    if (!video || !container || !trigger) return;

    // Prevent duplicate initialization
    if (videoInitializedRef.current) return;

    let lastTime = 0;
    let requestId = null;
    let lastScrollDirection = 0;
    let lastScrollPos = 0;

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
        }
      });
    };

    const handleVideoLoaded = () => {
      if (videoInitializedRef.current) return;

      console.log("Video loaded, duration:", video.duration);
      setVideoLoaded(true);
      setVideoDuration(video.duration);
      video.currentTime = 0;
      video.muted = true;
      videoInitializedRef.current = true;

      // Adjust the scroll height dynamically based on video duration
      // 1 second = 50vh of scrolling space (configurable)
      const scrollMultiplier = 50; // vh per second
      const scrollHeight = Math.max(300, Math.round(video.duration * scrollMultiplier));
      trigger.style.height = `${scrollHeight}vh`;
      console.log(`Set scroll height to ${scrollHeight}vh based on video duration ${video.duration}s`);

      setupScrollAnimation();
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
        scrub: 1, // Smoother scrubbing effect (higher value = smoother but more delay)
        markers: false, // Set to true for debugging
        pin: container,
        pinSpacing: true,
        anticipatePin: 1,
        refreshPriority: 1,
        fastScrollEnd: true,
        onUpdate: throttle((self) => {
          // Get progress from 0 to 1
          const progress = self.progress;
          setScrollProgress(progress);
          setIsInViewport(self.isActive);

          // Determine scroll direction
          const currentScrollPos = window.scrollY;
          const scrollDirection = currentScrollPos > lastScrollPos ? 1 : -1;
          lastScrollPos = currentScrollPos;

          if (scrollDirection !== lastScrollDirection) {
            lastScrollDirection = scrollDirection;
          }

          if (video && video.duration) {
            // Set video currentTime based on scroll progress
            const targetTime = progress * video.duration;

            // Only update if the change is significant
            if (Math.abs(lastTime - targetTime) > 0.01) {
              updateVideoTime(targetTime);
              lastTime = targetTime;
            }

            // Ensure video is always playing when in viewport
            if (self.isActive) {
              if (video.paused) {
                video.play().catch(e => console.log('Play prevented:', e));
              }
            } else {
              if (!video.paused) {
                video.pause();
              }
            }
          }
        }, 16) // ~60fps throttling
      });

      ScrollTrigger.refresh();
      return () => {
        if (requestId) {
          cancelAnimationFrame(requestId);
        }
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
      };
    };

    // Video event listeners - only add once
    video.addEventListener('loadedmetadata', handleVideoLoaded, { once: true });
    video.addEventListener('canplay', handleVideoLoaded, { once: true });
    video.addEventListener('error', (e) => {
      console.error("Video error:", e);
    }, { once: true });

    // Force load video
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
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

      // Cancel any pending animation frames
      if (requestId) {
        cancelAnimationFrame(requestId);
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