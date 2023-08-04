import React from "react";
import "../css/footer.css";
import { Link } from "react-router-dom";

import {
  AiOutlineCopyrightCircle,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiFillTwitterCircle,
} from "react-icons/ai";
const Footer = () => {
  return (
    <>
      <footer className="footer p-5">
        <div className="new_footer_top">
          <div className="container">
            <div className="row text-center">
              <div className="col-12">
                <div className="d-flex justify-content-center">
                  <div className="">
                    <Link className="links" to={"/About"}>
                      {" "}
                      <h6 className="footer-links p-2">Aboutus</h6>
                    </Link>
                  </div>
                  <span> | </span>
                  <div className="">
                    <Link className="links" to={"/contactus"}>
                      {" "}
                      <h6 className="footer-links p-2"> Contactus</h6>
                    </Link>
                  </div>
                  <span>|</span>

                  <div className="">
                    <Link className="links" to={"/privacyandpolicy"}>
                      {" "}
                      <h6 className="footer-links p-2"> Privacy Policy</h6>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-12 ">
                <div className="f_widget social-widget fadeInLeft">
                  <div className="f_social_icon">
                    <a href="#" className="p-2 footerLink">
                      <AiOutlineInstagram />
                    </a>
                    <a href="#" className="p-2 footerLink">
                      <AiOutlineFacebook />
                    </a>
                    <a href="#" className="p-2 footerLink">
                      <AiFillTwitterCircle />{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="footer_bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12">
                <p className="mb-0 text-center copyright">
                  © Fairytellers 2023.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
