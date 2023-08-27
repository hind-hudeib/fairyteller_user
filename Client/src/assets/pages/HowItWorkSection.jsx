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
    <>
      <section id="howItWork" className="">
        <div className="container p-5">
          <div className="row text-center">
            <div className="col-12 ">
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#eee"
          fill-opacity="1"
          d="M0,128L120,138.7C240,149,480,171,720,165.3C960,160,1200,128,1320,112L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default HowItWorkSection;
