import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container pt-5 ">
      <Container
        className="privacy-policy-container p-5 mb-5 "
        style={{ borderLeft: "4px solid #283244" }}
      >
        <Row className="p-3">
          <Col>
            <h1>Privacy Policy</h1>
            <p>
              Welcome to Your Storytelling Website. This page informs you of our
              policies regarding the collection, use, and disclosure of personal
              data when you use our website.
            </p>
            <p>
              By using our website, you agree to the collection and use of
              information in accordance with this policy. We may update this
              policy from time to time, so please review this page regularly for
              any changes.
            </p>
          </Col>
        </Row>

        {/* Other sections as before */}

        <Row className="p-3">
          <Col>
            <h2>Using Your Stories for Movies</h2>
            <p>
              At Your Storytelling Website, we are passionate about the stories
              you share with us. By submitting your stories to our platform, you
              grant us the right to review and potentially use your stories to
              create movies or other forms of media in the future.
            </p>
            <p>
              Rest assured that if we consider using your story for any
              commercial purpose, we will contact you and seek your explicit
              permission before proceeding. You will have the option to decline
              if you do not wish to have your story adapted for any media
              production.
            </p>
            <p>
              We respect your creative ownership, and any use of your stories
              will be subject to a separate agreement to ensure fairness and
              transparency.
            </p>
          </Col>
        </Row>

        <Row className="p-3">
          <Col>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns regarding this privacy
              policy or our data practices, please{" "}
              <Link to={"/contactus"}>contact us</Link> .
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
