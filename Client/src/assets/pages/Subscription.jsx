import React from "react";
import { Link } from "react-router-dom";
import "../css/subscription.css";
import subImage from "../images/subscription1.jpg";
const Subscription = () => {
  return (
    <>
      <section
        className="aboutSection"
        style={{
          backgroundPosition: "50%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container-fluid pt-5">
          <div className="row p-5">
            <div className="col-2"></div>
            <div className="col-8 text-center p-5">
              <h3 className="display-4"> Subscribe and Share Your Stories</h3>
              <p className="subscription-header__description">
                Join our premium membership and unlock a world of exclusive
                benefits for writers like you.
              </p>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </section>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="card-deck mb-3  d-flex justify-content-center mt-5">
              <div className="plan">
                <div className="inner p-5">
                  <span className="pricing p-2">
                    <span className="">
                      $10 <small>/ month</small>
                    </span>
                  </span>
                  <p className="title">Professional Writer</p>
                  <p className="info">
                    This plan is for writers who want to share their stories and
                    reach a wide audience.
                  </p>
                  <ul className="features">
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                          ></path>
                        </svg>
                      </span>
                      <span>
                        <strong>Unlimited</strong> story submissions
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                          ></path>
                        </svg>
                      </span>
                      <span>
                        Get <strong>detailed feedback</strong> on your stories
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                          ></path>
                        </svg>
                      </span>
                      <span>
                        Connect with a community of <strong>writers</strong>
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="action text-center d-flex align-items-end">
                  <Link className="button planButton mt-5" to="/payment">
                    Subscribe
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 p-5">
            <img className="w-100" src={subImage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
