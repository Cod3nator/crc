import React, { useState, useEffect } from 'react';
import bubble1 from "../../assets/bubble1.svg";
import bubble2 from "../../assets/bubble2.svg";

const HappyCustomer = () => {
  const [activeCommentIndex, setActiveCommentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 968);

  const comments = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse...",
    "Excepteur sint occaecat cupidatat non proident...",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur...",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem...",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet"
  ];

  const truncateComment = (comment, maxLength = 90) => {
    return comment.length > maxLength ? comment.substring(0, maxLength) + '...' : comment;
  };

  // Handle window resize to update mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 968);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="happy-customers">
      <div className="container">
      <h2 className="section-title">Happy Customers</h2>

      {isMobile ? (
        <>
          {/* Show Active Comment First on Mobile */}
          <div className="customer-comment active">
            {truncateComment(comments[activeCommentIndex])}
          </div>

          {/* Bubble with Active Comment */}
          <div className="comment-bubble">
            <img src={bubble1} alt="bubble" className="bubble-img1" />
            <img src={bubble2} alt="bubble" className="bubble-img2" />
            <p className="bubble-comment">{comments[activeCommentIndex]}</p>
          </div>

          {/* Remaining Comments */}
          <div className="customers-comments">
            {comments.map((comment, index) =>
              index !== activeCommentIndex ? (
                <p
                  key={index}
                  className="customer-comment"
                  onClick={() => setActiveCommentIndex(index)}
                >
                  {truncateComment(comment)}
                </p>
              ) : null
            )}
          </div>
        </>
      ) : (
        <div className="customers-section">
          {/* Comments List */}
          <div className="customers-comments">
            {comments.map((comment, index) => (
              <p
                key={index}
                className={`customer-comment ${index === activeCommentIndex ? "active" : ""}`}
                onClick={() => setActiveCommentIndex(index)}
              >
                {truncateComment(comment)}
              </p>
            ))}
            <a href="#">see all</a>
          </div>

          <div className="comment-bubble">
            <img src={bubble1} alt="bubble" className="bubble-img1" />
            <img src={bubble2} alt="bubble" className="bubble-img2" />
            <p className="bubble-comment">{comments[activeCommentIndex]}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default HappyCustomer;
