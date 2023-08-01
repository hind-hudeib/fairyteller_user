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
    <section id="howItWork" className="">
      <div className="container p-5">
        <div className="row text-center">
          <div className="col-12 mb-5">
            <h3 className="darkBgTitel">How fairytellers Works</h3>
          </div>
        </div>
        <div className="row justify-items-center">
          <div className="col-lg-4 col-sm-12 col-12 mt-3">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center"></div>
                    <div className="media-body">
                      <h3 className="d-inline-block m-2">Create</h3>
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
          <div className="col-lg-4 col-sm-12 col-12 mt-3">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-speech warning font-large-2 float-left"></i>
                    </div>
                    <div className="media-body text-right">
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
          <div className="col-lg-4 col-sm-12 col-12 mt-3">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <div className="media-body text-right">
                        <h3 className="d-inline-block m-2">Compete</h3>
                        <FontAwesomeIcon
                          icon={faTrophy}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
