import React from "react";
import { motion } from "framer-motion";
import faqSVG from "../../assets/faq_img.jsx";

const FAQ = () => {
  let questAnswers = [
    {
      ques: "How do I know if the project is RERA registered?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere est purus, pellentesque convallis nibh vehicula ut. Aliquam maximus nisl sit amet mi suscipit vestibulum a eget dolor.",
    },
    {
      ques: "What is the RERA act and how will this change Real Estate industry prospects?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere est purus, pellentesque convallis nibh vehicula ut. Aliquam maximus nisl sit amet mi suscipit vestibulum a eget dolor. Duis in rutrum nulla, eget dictum orci.",
    },
    {
      ques: "How does the RERA act affect homebuyers?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere est purus, pellentesque convallis nibh vehicula ut. Aliquam maximus nisl sit amet mi suscipit vestibulum a eget dolor. Duis in rutrum nulla, eget dictum orci.",
    },
  ];

  return (
    <div className="faq-container">
      <div className="container">
        <motion.div
          className="faq-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.7 } },
          }}
        >
          {/* Section Title Animation */}
          <motion.div
            className="faqs-division"
            variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              }}
          >
            <div className="section-title">
              <h2>Find the answers you need, with ease.</h2>
            </div>

            {/* FAQ List */}
            <motion.div className="faqs">
              {questAnswers.map((item, index) => (
                <motion.div
                  key={index}
                  className="faq"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8, ease: "easeOut" },
                    },
                  }}
                >
                  <div className="faq-ques">{item.ques}</div>
                  <div className="faq-ans">{item.answer}</div>
                </motion.div>
              ))}
              <motion.a
                href="#"
                className="see-all"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                See All
              </motion.a>
            </motion.div>
          </motion.div>

          {/* FAQ Image Animation */}
          <motion.div
            className="faq-img"
            variants={{ hidden: { opacity: 0, x: -50 }, visible: {    opacity: 1,
                x: 0,
                transition: { duration: 1.2 },} }}
          >
            {faqSVG()}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
