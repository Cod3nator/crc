import React, { useState } from "react";
import { motion } from "framer-motion";
import micSVG from "../../assets/mics.jsx";
import videoPlaceholder1 from "../../assets/video-placeholder1.png";
import videoPlaceholder2 from "../../assets/video-placeholder1.png";
import videoPlaceholder3 from "../../assets/video-placeholder1.png";

const Media = () => {
  const [videoUrl, setVideoUrl] = useState(null);

  const videoCards = [
    {
      image: videoPlaceholder1,
      title: "Innovative Solutions Transforming Industries",
      link: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      image: videoPlaceholder2,
      title: "Breakthrough Technologies Reshaping Future",
      link: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    },
    {
      image: videoPlaceholder3,
      title: "Sustainable Strategies for Modern Challenges",
      link: "https://www.youtube.com/embed/TY3C1k82zaU",
    },
  ];

  const openVideo = (url) => {
    setVideoUrl(url);
  };

  const closeVideo = () => {
    setVideoUrl(null);
  };

  return (
    <div className="media">
      <div className="container">
        <div className="media-box">
          {/* Media Image Section */}
          <motion.div
            className="media-img"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div className="section-title">
              <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                See what the media has to say about us
              </motion.h2>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere est purus, pellentesque
                convallis nibh vehicula ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque delectus libero mollitia, quisquam vel in totam quos laudantium sit labore ducimus aliquam possimus blanditiis ad eum. Voluptatum explicabo veniam qui!
              </motion.p>
              <motion.a href="#" className="see-all-link" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                see all
              </motion.a>
            </motion.div>

            <motion.div className="media-main-image" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              {micSVG()}
            </motion.div>
          </motion.div>

          {/* Media Video Section */}
          <motion.div
            className="media-video"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
          >
            {videoCards.map((card, index) => (
              <motion.a
                key={index}
                className="media-video-card"
                onClick={() => openVideo(card.link)}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <img src={card.image} alt={card.title} />
                <div className="media-video-title">{card.title}</div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      {videoUrl && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-container" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="100%"
              src={`${videoUrl}?autoplay=1`}
              title="Video Player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
