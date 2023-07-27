import React, { useEffect, useState } from "react";
import "../css/heroslider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  faPen,
  faBookOpenReader,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

const HowItWorkSection = () => {
  return (
    <section id="howItWork">
      <div class="container p-5">
        <div class="row text-center">
          <div class="col-12 mb-5">
            <h3 class="darkBgTitel">How fairytellers Works</h3>
          </div>
        </div>
        <div class="row justify-items-center">
          <div class="col-lg-4 col-sm-6 col-12">
            <div class="card " data-aos="fade-up-right">
              <div class="card-content">
                <div class="card-body" data-aos="fade-up-right">
                  <div class="media d-flex">
                    <div class="align-self-center"></div>
                    <div class="media-body" data-aos="fade-up-right">
                      <h3 className="d-inline-block m-2 ">Create</h3>
                      <FontAwesomeIcon
                        icon={faPen}
                        size="2x"
                        style={{ color: "#283244" }}
                      />
                      <p>
                        Share your unique voice and original story with others
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6 col-12">
            <div class="card " data-aos="zoom-out-up">
              <div class="card-content">
                <div class="card-body" data-aos="zoom-out-up">
                  <div class="media d-flex">
                    <div class="align-self-center">
                      <i class="icon-speech warning font-large-2 float-left"></i>
                    </div>
                    <div class="media-body text-right " data-aos="zoom-out-up">
                      <h3 className="d-inline-block m-2">Build</h3>
                      <FontAwesomeIcon
                        icon={faBookOpenReader}
                        size="2x"
                        style={{ color: "#283244" }}
                      />
                      <p>
                        Establish a global fan base as your story gains
                        readership
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-6 col-12">
            <div class="card " data-aos="fade-up-left">
              <div class="card-content">
                <div class="card-body" data-aos="fade-up-left">
                  <div class="media d-flex">
                    <div class="align-self-center">
                      <div
                        class="media-body text-right"
                        data-aos="fade-up-left"
                      >
                        <h3 className="d-inline-block m-2">compete</h3>
                        <FontAwesomeIcon
                          icon={faTrophy}
                          size="2x"
                          style={{ color: "#283244" }}
                        />
                        <p>
                          Share your work in with others and win competitions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
