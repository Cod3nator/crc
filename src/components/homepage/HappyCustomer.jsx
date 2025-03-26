import React, { useState } from 'react'
import bubble1 from "../../assets/bubble1.svg"
import bubble2 from "../../assets/bubble2.svg"

const HappyCustomer = () => {
  const [activeCommentIndex, setActiveCommentIndex] = useState(0);

  const comments = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere est purus maximus vehicula adipiscing elit senectus elementum ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere est purus maximus vehicula adipiscing elit senectus elementum ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere est purus maximus vehicula adipiscing elit senectus elementum ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet"
  ];

  const truncateComment = (comment, maxLength = 90) => {
    return comment.length > maxLength 
      ? comment.substring(0, maxLength) + '....' 
      : comment;
  };

  return (
    <div className="happy-customers">
      <div className="container">

      <div className="customers-section">
        <div className="customers-comments">
        <div className="section-title">
        <h2>Happy Customers</h2>
      </div>
          {comments.map((comment, index) => (
            <div 
              key={index} 
              className={`customer-comment ${activeCommentIndex === index ? 'active' : ''}`}
              onClick={() => setActiveCommentIndex(index)}
            >
              {truncateComment(comment)}
            </div>
          ))}
          <a href="#">see all</a>
        </div>

        <div className="comment-bubble">
          <img src={bubble1} alt="" className="bubble-img1" />
          <img src={bubble2} alt="" className="bubble-img2" />
          <div className="bubble-comment">
            {comments[activeCommentIndex]}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default HappyCustomer