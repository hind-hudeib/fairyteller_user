import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import "../css/quotes.css";
import writer1 from "../images/writer1.jpeg";
import writer2 from "../images/writer2.jpeg";
import writer3 from "../images/writer3.webp";
import axios from "axios";

const QuotesSection = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/messages")
      .then((response) => {
        setQuotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <section className="mt-5">
        {" "}
        <Carousel interval={1000} className="m-5 my-carousel">
          {quotes.map((quote) => {
            return (
              <Carousel.Item className="CarouselItem " key={quote._id}>
                <Container className="p-5 slideContainer">
                  <Row className="m-5">
                    <Col md={4} className="">
                      <img
                        className="d-block w-50 img-fluid rounded-circle"
                        src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300x300.jpg"
                        alt="Slider Image 1"
                      />
                    </Col>
                    <Col md={8}>
                      <div>
                        <h2>- {quote.name}</h2>
                        <p>{quote.messageContent}</p>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </section>
    </>
  );
};

export default QuotesSection;
