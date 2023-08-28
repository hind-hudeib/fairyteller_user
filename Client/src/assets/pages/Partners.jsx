import React from "react";
import "../css/partners.css";
import partner1 from "../images/logo5.jfif";
import partner2 from "../images/logo6.jfif";
import partner3 from "../images/logo3.png";
import partner4 from "../images/logo4.png";

const Partners = () => {
  return (
    <div>
      <section id="partnersSection">
        <div class="container p-5 mb-5">
          <div class="row ">
            <div class="col-12 text-center p-5">
              <h3 class="darkBgTitel">
                Fairytellers works with partners such as
              </h3>
            </div>
          </div>
          <div class="row  d-flex justify-content-center align-items-center">
            <div class="col-3">
              <img
                src={partner1}
                alt="partner 1"
                class="logosImg rounded-circle "
              />
            </div>
            <div class="col-3">
              <img
                src={partner2}
                alt="partner 2"
                class="logosImg rounded-circle"
              />
            </div>
            <div class="col-3">
              <img
                src={partner3}
                alt="partner 3"
                class="logosImg rounded-circle"
              />
            </div>
            <div class="col-3">
              <img
                src={partner4}
                alt="partner 4"
                class="logosImg rounded-circle"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
