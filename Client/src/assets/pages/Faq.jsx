import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/faq.css";
const Faq = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/faq_messages")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleAccordionClick = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  return (
    <div>
      {" "}
      <div className="faq_area section_padding_130" id="faq">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-lg-6">
              {/* Section Heading */}
              <div
                className="section_heading text-center wow fadeInUp mb-5"
                data-wow-delay="0.2s"
              >
                <h3>
                  <span>Frequently </span> Asked Questions
                </h3>
                <div className="line"></div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {/* FAQ Area */}
            <div className="col-12 col-sm-10 col-lg-8">
              <div className="accordion faq-accordian" id="faqAccordion">
                {questions.map((question, index) => (
                  <div
                    className="card border-0 wow fadeInUp"
                    data-wow-delay={`${0.2 + index * 0.1}s`}
                    key={index}
                  >
                    <div
                      className="card-header"
                      id={`heading${index}`}
                      onClick={() => handleAccordionClick(index)}
                    >
                      <h6
                        className={`mb-0 ${
                          activeAccordion === index ? "" : "collapsed"
                        }`}
                      >
                        {question.messageContent}
                        <span className="lni-chevron-up"></span>
                      </h6>
                    </div>
                    <div
                      className={`collapse ${
                        activeAccordion === index ? "show" : ""
                      }`}
                      id={`collapse${index}`}
                      aria-labelledby={`heading${index}`}
                      data-parent="#faqAccordion"
                    >
                      <div className="card-body">
                        <p>{question.reply}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Support Button */}
              <div
                className="support-button text-center d-flex align-items-center justify-content-center mt-4 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <i className="lni-emoji-sad"></i>
                <p className="mb-0 px-2">Can't find your answers?</p>
                <Link to={"/contactus"}>Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
