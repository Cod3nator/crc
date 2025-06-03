import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useTransform, useScroll } from 'framer-motion';
import dnaVideo from "../../assets/dna-5sec.mp4";
import './DnaSection.css';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollVideoPlayer = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoAspect, setVideoAspect] = useState(16 / 9); // Default aspect ratio
  const scrollInstanceRef = useRef(null);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Playback speed factor - slower value = slower playback
  // This effectively makes the video play at 0.5x speed (shows only half the video over the same scroll distance)
  const playbackSpeedFactor = 0.4;

  // Check mobile on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Framer Motion animation values - smaller movements on mobile
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start start", "end end"]
  });

  // Adjust animations for mobile
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    isMobile ? [25, 0, 0, -25] : [50, 0, 0, -50]
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const subtitleY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    isMobile ? [15, 0, 0, -15] : [30, 0, 0, -30]
  );

  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  // Function to maintain aspect ratio when rendering to canvas
  const renderVideoFrameToCanvas = () => {
    if (!videoRef.current || !canvasRef.current || !contextRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = contextRef.current;

      // Clear the canvas first
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Get canvas dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate dimensions for fitting the video properly
      let drawWidth, drawHeight, offsetX, offsetY;

      // Fit to cover (like background-size: cover)
      // This ensures the video fills the entire canvas with no empty space
      if (videoAspect > canvasWidth / canvasHeight) {
        // Video is wider than canvas (in aspect ratio terms)
        // Match height and allow width to extend beyond canvas edges
        drawHeight = canvasHeight;
        drawWidth = drawHeight * videoAspect;
        offsetX = (canvasWidth - drawWidth) / 2; // Center horizontally
        offsetY = 0;
      } else {
        // Video is taller than canvas (in aspect ratio terms)
        // Match width and allow height to extend beyond canvas edges
        drawWidth = canvasWidth;
        drawHeight = drawWidth / videoAspect;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2; // Center vertically
      }

      // Apply custom scaling based on device and aspect ratio
      const isExtremelyWide = videoAspect > 2.5; // For extremely wide videos

      if (isExtremelyWide) {
        // For extremely wide videos, scale them down a bit
        const scaleDown = isMobile ? 0.85 : 0.9;
        drawWidth *= scaleDown;
        drawHeight *= scaleDown;
        // Recenter
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      // Apply smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw the video frame
      ctx.drawImage(
        video,
        offsetX, offsetY,
        drawWidth, drawHeight
      );

      // Count rendered frames for debugging
      frameCountRef.current++;
    } catch (error) {
      console.log("Error rendering video frame:", error);
    }
  };

  // Initialize the canvas and context
  const initCanvas = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    // Calculate video aspect ratio
    const videoWidth = video.videoWidth || 16;
    const videoHeight = video.videoHeight || 9;
    const aspect = videoWidth / videoHeight;
    setVideoAspect(aspect);
    console.log("Video dimensions:", videoWidth, "x", videoHeight, "Aspect ratio:", aspect.toFixed(2));

    // Use higher quality on desktop, lower on mobile for performance
    const dpr = isMobile ?
      Math.min(window.devicePixelRatio, 1) :  // Use 1x on mobile for better performance
      Math.min(window.devicePixelRatio, 2);   // Cap at 2x on desktop for reasonable performance

    // Get the actual size of the container
    const container = canvas.parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Set canvas size based on container size and DPR
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;

    // Create and store the context
    const ctx = canvas.getContext('2d', {
      alpha: false, // Optimization for non-transparent canvas
      desynchronized: true, // Potential performance improvement
      willReadFrequently: false // Performance hint
    });

    // Scale the drawing operations by DPR
    ctx.scale(dpr, dpr);
    contextRef.current = ctx;

    // Set canvas CSS size to match container
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;

    // Render initial frame
    renderVideoFrameToCanvas();

    console.log("Canvas initialized with dimensions:",
      canvas.width, "x", canvas.height,
      "(display size:", containerWidth, "x", containerHeight, ")");
  };

  // Calculate adjusted video duration based on playback speed factor
  const getAdjustedDuration = (actualDuration) => {
    // We make the scroll distance cover only a portion of the video
    // This effectively slows down the playback rate
    return actualDuration * (1 / playbackSpeedFactor);
  };

  useEffect(() => {
    // Initialize once container is available
    if (!containerRef.current || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const container = containerRef.current;
    const trigger = triggerRef.current;

    // Initial scroll height - smaller for mobile
    const initialHeight = isMobile ? window.innerHeight * 2 : window.innerHeight * 3;
    trigger.style.height = `${initialHeight}px`;

    // Handle video load
    const handleVideoLoad = () => {
      console.log("Video loaded, dimensions:", video.videoWidth, "x", video.videoHeight);

      // Set video aspect ratio
      const aspect = video.videoWidth / video.videoHeight;
      setVideoAspect(aspect);

      const actualDuration = video.duration || 0;
      setIsLoaded(true);
      setVideoDuration(actualDuration);
      console.log("Video duration:", actualDuration);

      // Adjust scroll height based on video duration - less scroll space on mobile
      // We're also factoring in the playback speed to make the scroll distance appropriate
      const scrollMultiplier = isMobile ? 80 : 120; // vh per second (increased for smoother playback)
      const scrollHeight = Math.max(isMobile ? 200 : 300,
        Math.round(getAdjustedDuration(actualDuration) * scrollMultiplier));
      trigger.style.height = `${scrollHeight}vh`;
      console.log(`Set scroll height to ${scrollHeight}vh based on video duration ${actualDuration}s, adjusted duration: ${getAdjustedDuration(actualDuration)}s`);

      // Initialize canvas once video is loaded
      initCanvas();

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();

      // Pre-render first frame
      renderVideoFrameToCanvas();
    };

    // Add video event listeners
    video.addEventListener('loadedmetadata', handleVideoLoad, { once: true });
    video.addEventListener('error', (e) => {
      console.error("Video error:", e);
    });

    // Use requestAnimationFrame for smooth rendering
    // On mobile, render at a lower framerate for better performance
    let animationFrameId;
    let lastRenderTime = 0;
    const renderInterval = isMobile ? 33 : 16; // 30fps on mobile, 60fps on desktop

    const renderLoop = (timestamp) => {
      if (isLoaded) {
        // Limit frame rate for smoother appearance
        if (!lastRenderTime || timestamp - lastRenderTime > renderInterval) {
          renderVideoFrameToCanvas();
          lastRenderTime = timestamp;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Apply frame interpolation by pre-loading and buffering frames
    const preloadFrames = () => {
      if (video.readyState >= 3) {
        // Seek to a few key frames and render to "warm up" the video
        const keyPoints = [0, 0.25, 0.5, 0.75, 1.0];
        keyPoints.forEach(point => {
          const time = point * video.duration;
          video.currentTime = time;
        });
        // Reset to beginning
        video.currentTime = 0;
      }
    };

    // Create and configure ScrollTrigger with better settings for smoother scrolling
    scrollInstanceRef.current = ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: isMobile ? 0.3 : 0.2, // Adjusted scrub values for smoother playback
      pin: container,
      pinSpacing: true,
      anticipatePin: 1,
      refreshPriority: 1,
      fastScrollEnd: true,
      onEnter: () => {
        console.log("Video section entered viewport");
      },
      onEnterBack: () => {
        console.log("Video section re-entered viewport from bottom");
      },
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Update scroll progress
        setScrollProgress(self.progress);

        // Calculate target time with playback speed factor
        // This is the key change - we only show a portion of the video over the full scroll distance
        // This makes the video appear to play slower
        if (video && video.duration) {
          const targetTime = self.progress * video.duration * playbackSpeedFactor;

          // Only update video time if change is significant
          const threshold = isMobile ? 0.05 : 0.01;
          if (Math.abs(video.currentTime - targetTime) > threshold) {
            try {
              // For better performance especially on mobile, directly set the time
              // instead of using GSAP animation which can be heavier
              if (isMobile) {
                video.currentTime = targetTime;
              } else {
                // On desktop, use GSAP for smoother transitions between frames
                gsap.to(video, {
                  currentTime: targetTime,
                  duration: 0.1,
                  overwrite: true,
                  ease: "power1.out"
                });
              }
            } catch (err) {
              // Handle any potential errors
              console.log("Error updating video time:", err);
            }
          }
        }
      }
    });

    // Try to preload frames
    if (video.readyState >= 3) {
      preloadFrames();
    } else {
      video.addEventListener('canplaythrough', preloadFrames, { once: true });
    }

    // Start animation loop
    animationFrameId = requestAnimationFrame(renderLoop);

    // Preload the video
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous"; // Avoid CORS issues if needed
    video.load();

    return () => {
      // Clean up
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (scrollInstanceRef.current) {
        scrollInstanceRef.current.kill();
      }
      video.removeEventListener('loadedmetadata', handleVideoLoad);
      video.removeEventListener('canplaythrough', preloadFrames);
    };
  }, [isLoaded, isMobile]);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const dpr = isMobile ? Math.min(window.devicePixelRatio, 1.5) : (window.devicePixelRatio || 1);

        canvas.width = container.offsetWidth * dpr;
        canvas.height = container.offsetHeight * dpr;

        if (contextRef.current) {
          contextRef.current.scale(dpr, dpr);
          renderVideoFrameToCanvas(); // Re-render on resize
        }
      }

      // Refresh ScrollTrigger on resize
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <div className="w-full">
      {/* Trigger Container */}
      <div
        ref={triggerRef}
        className="relative"
        style={{ height: '300vh' }}
      >
        {/* Video Container */}
        <div
          ref={containerRef}
          className="w-full h-screen bg-black overflow-hidden z-10"
        >
          {/* Hidden Video Element - drives the canvas rendering */}
          <video
            ref={videoRef}
            className="hidden"
            muted
            playsInline
            preload="auto"
          >
            <source src={dnaVideo} type="video/mp4" />
          </video>

          {/* Canvas for rendering video frames */}
          <canvas
            ref={canvasRef}
            className="video-canvas"
          />

          {/* Loading State */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-lg">Loading DNA sequence...</p>
              </div>
            </div>
          )}

          {/* Overlay Content with Framer Motion - adjusted for mobile */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white z-20">
              <motion.h2
                className="text-4xl md:text-7xl font-bold mb-6 tracking-wide motion-h2"
                style={{
                  opacity: titleOpacity,
                  y: titleY
                }}
              >
                DNA SEQUENCE
              </motion.h2>
              <motion.p
                className="text-lg md:text-2xl max-w-md mx-auto leading-relaxed motion-p"
                style={{
                  opacity: subtitleOpacity,
                  y: subtitleY
                }}
              >
                Scroll to control video playback
              </motion.p>
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