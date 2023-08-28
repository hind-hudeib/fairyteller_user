import React from "react";
import { useEffect, useState, useReducer } from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import "../css/quotes.css";
import axios from "axios";

const QuotesSection = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/opinion_messages")
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
        <Carousel interval={1000} className="m-5 my-carousel ">
          {quotes.map((quote) => {
            return (
              <Carousel.Item className="CarouselItem " key={quote._id}>
                <Container className="p-0 p-sm-0 p-md-4 p-lg-5 slideContainer rounded">
                  <Row className="m-5">
                    <Col sm={12} md={4} className="text-center mb-4">
                      <img
                        className="d-block w-50 img-fluid rounded-circle mx-auto"
                        src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                        alt="Slider Image 1"
                      />
                    </Col>
                    <Col sm={12} md={8}>
                      <div>
                        <h2>- {quote.name}</h2>
                        <p className="text-md-left">{quote.messageContent}</p>
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
