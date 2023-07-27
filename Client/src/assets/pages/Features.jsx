import React, { useEffect, useState } from "react";
import "../css/heroslider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "aos/dist/aos.css";

import { faFilm, faTv, faBook } from "@fortawesome/free-solid-svg-icons";
const Features = () => {
  return (
    <section id="features">
      <div class="container">
        <div class="row text-center pt-5">
          <div class="col-12 p-5">
            <h3>See Your Story...</h3>
          </div>
        </div>
        <div class="row text-center mb-5">
          <div class="col-lg-4 ">
            <FontAwesomeIcon
              icon={faFilm}
              size="2x"
              style={{ color: "#283244" }}
            />
            <p className="mt-4">Get produced to movie or film</p>
          </div>
          <div class="col-lg-4">
            <FontAwesomeIcon
              icon={faTv}
              size="2x"
              style={{ color: "#283244" }}
            />
            <p className="mt-4">Get adapted to a TV series</p>
          </div>
          <div class="col-lg-4 ">
            <FontAwesomeIcon
              icon={faBook}
              size="2x"
              style={{ color: "#283244" }}
            />
            <p className="mt-4">Get published</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
