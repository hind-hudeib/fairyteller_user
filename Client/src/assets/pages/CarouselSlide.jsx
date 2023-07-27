import React, { useEffect } from "react";
import sliderImg1 from "../images/moveeeis.webp";
import sliderImg2 from "../images/storyonline.webp";
import sliderImg3 from "../images/witestory.jpeg";
import { Link } from "react-router-dom";

export const CarouselSlide = () => {
  useEffect(() => {
    const carousel = document.querySelector("#carouselExampleIndicators");
    const carouselInstance = new window.bootstrap.Carousel(carousel, {
      interval: 4000, // Set the interval (in milliseconds) between slide transitions
      pause: "hover", // Pause the auto slide when hovering over the carousel
      wrap: true, // Enable continuous looping of slides
    });

    return () => {
      carouselInstance.dispose(); // Dispose the carousel instance when the component unmounts
    };
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={sliderImg1}
            className="d-block w-100 sliderImg"
            alt="Slide 1"
          />
          <div className="carousel-caption">
            <div className="text-center">
              <div class="row ">
                <div class="col-12 d-flex justify-content-center text-center">
                  <h1 class="anim-typewriter heroHeader pt-5">
                    Hi, we're fairytellers.
                  </h1>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex justify-content-center text-center">
                  <p class="mt-2 subTittle">
                    A platform that allows you to share your stories and ideas
                    with others
                    <br />
                    and read their stories!
                  </p>
                </div>
                <div class="col-2"></div>
              </div>{" "}
              <div class="row justify-items-start p-3">
                <div class="col-12 text-center pt-3">
                  <div class="m-4">
                    <Link class="fancy m-3" to={"/StoriesList"}>
                      <span class="top-key"></span>
                      <span class="text">Start reading</span>
                      <span class="bottom-key-1"></span>
                      <span class="bottom-key-2"></span>
                    </Link>
                    <Link class="fancy m-3" to={"/write"}>
                      <span class="top-key"></span>
                      <span class="text">Start writing</span>
                      <span class="bottom-key-1"></span>
                      <span class="bottom-key-2"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={sliderImg2}
            className="d-block w-100 sliderImg"
            alt="Slide 2"
          />
          <div className="carousel-caption">
            <div className="text-center">
              <div class="row">
                <div class="col-12 d-flex justify-content-center text-center">
                  <h1 class="anim-typewriter heroHeader pt-5">
                    Hi, we're fairytellers.
                  </h1>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex justify-content-center text-center">
                  <p class="mt-2 subTittle">
                    A platform that allows you to share your stories and ideas
                    with others
                    <br />
                    and read their stories!
                  </p>
                </div>
                <div class="col-2"></div>
              </div>{" "}
              <div class="row justify-items-start p-3">
                <div class="col-12 text-center pt-3">
                  <div class="m-4">
                    <Link class="fancy m-3" to={"/StoriesList"}>
                      <span class="top-key"></span>
                      <span class="text">Start reading</span>
                      <span class="bottom-key-1"></span>
                      <span class="bottom-key-2"></span>
                    </Link>
                    <Link class="fancy m-3" to={"/write"}>
                      <span class="top-key"></span>
                      <span class="text">Start writing</span>
                      <span class="bottom-key-1"></span>
                      <span class="bottom-key-2"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={sliderImg3}
            className="d-block w-100 sliderImg"
            alt="Slide 3"
          />
          <div className="carousel-caption">
            <div className="text-center">
              <div class="row">
                <div class="col-12 d-flex justify-content-center text-center">
                  <h1 class="anim-typewriter heroHeader pt-5">
                    Hi, we're fairytellers.
                  </h1>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex justify-content-center text-center">
                  <p class="mt-2 subTittle">
                    A platform that allows you to share your stories and ideas
                    with others
                    <br />
                    and read their stories!
                  </p>
                </div>
                <div class="col-2"></div>
              </div>{" "}
              <div class="row justify-items-start p-3">
                <div class="col-12 text-center pt-3">
                  <div class="m-4">
                    <Link class="fancy m-3" to={"/StoriesList"}>
                      <span class="top-key"></span>
                      <span class="text">Start reading</span>
                      <span class="bottom-key-1"></span>
                      <span class="bottom-key-2"></span>
                    </Link>
                    <Link class="fancy m-3" to={"/write"}>
                      <span class="top-key"></span>
                      <span class="text">Start writing</span>
                      <span class="bottom-key-1"></span>
                      <span class="bottom-key-2"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
