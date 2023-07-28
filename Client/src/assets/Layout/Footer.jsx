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
      <footer class="footer p-5">
        <div class="new_footer_top">
          <div class="container">
            <div class="row text-center">
              <div class="col-lg-3 col-md-6">
                <div class="f_widget company_widget wow fadeInLeft">
                  <Link to={"/contactus"}>
                    <button class="btn btn_get btn_get_two" type="submit">
                      Get in Touch
                    </button>
                  </Link>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="d-flex justify-content-center">
                  <div class="">
                    <Link className="links" to={"/About"}>
                      {" "}
                      <h6 class="footer-links p-2">Aboutus</h6>
                    </Link>
                  </div>
                  <span> | </span>
                  <div class="">
                    <Link className="links" to={"/contactus"}>
                      {" "}
                      <h6 class="footer-links p-2"> Contactus</h6>
                    </Link>
                  </div>
                  <span>|</span>

                  <div class="">
                    <Link className="links" to={"/privacyandpolicy"}>
                      {" "}
                      <h6 class="footer-links p-2"> Privacy Policy</h6>
                    </Link>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6">
                <div class="f_widget social-widget pl_70 wow fadeInLeft">
                  <div class="f_social_icon">
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
        <div class="footer_bottom">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-12">
                <p class="mb-0 text-center copyright">© Fairytellers 2023.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
