import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "80vh" }} // Adjust the height to make it bigger
      >
        <Col xs={12} md={8} lg={6} style={{ maxWidth: "400px" }}>
          {" "}
          {/* Adjust the width to make it thinner */}
          <div className="text-center">
            <h1 style={{ fontSize: "8rem", fontWeight: "200" }}>404</h1>{" "}
            {/* Adjust the font size to make it bigger */}
            <h4 style={{ fontSize: "1.5rem", fontWeight: "200" }}>
              Page Not Found
            </h4>{" "}
            {/* Adjust the font size to make it bigger */}
            <p>The page you are looking for does not exist.</p>
            <Link to="/">
              <Button style={{ backgroundColor: "#201e52" }}>
                Go Back to Home
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
