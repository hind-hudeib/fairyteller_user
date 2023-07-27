import React, { useEffect, useState } from "react";
import "../css/heroslider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  faFilm,
  faTv,
  faBook,
  faPen,
  faBookOpenReader,
  faTrophy,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { MDBCardLink } from "mdb-react-ui-kit";

const HeroSlider = ({ isLog, updateIsLog }) => {
  const navigate = useNavigate();

  async function verifyToken() {
    const token = localStorage.getItem("token") || false;

    if (token) {
      try {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    }
    return false;
  }
  const handleStartWrite = async () => {
    const isLoggedIn = await verifyToken();
    if (isLoggedIn) {
      // User is logged in, navigate to the Write page
      navigate("/write");
    } else {
      // User is not logged in, navigate to the Login page
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyToken();
    window.scrollTo(0, 0);
  }, [isLog]);

  function handleLogOut() {
    localStorage.removeItem("token");
    updateIsLog(false);
  }

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-out",
      delay: 20,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector(".section-after-hero");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="landing"
        style={{
          backgroundPosition: "50%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "46rem",
          backgroundAttachment: "fixed",
        }}
      >
        <div class="container-fluid pt-5 hero-container">
          <div class="row pt-5 mt-5">
            <div class="col-12 d-flex justify-content-center text-center">
              <h1 class="anim-typewriter heroHeader mt-5">
                Hi, we're fairytellers.
              </h1>
            </div>
          </div>

          <div class="row">
            <div class="col-12 d-flex justify-content-center text-center">
              <p class="mt-2 subTittle">
                A platform that allows you to share your stories and ideas with
                others
                <br />
                and read their stories!
              </p>
            </div>
          </div>
          <div class="row justify-items-start p-3">
            <div class="col-12 text-center pt-3">
              <div class="m-4">
                <Link class="fancy m-3" to={"/StoriesList"}>
                  <span class="top-key"></span>
                  <span class="text">Start reading</span>
                  <span class="bottom-key-1"></span>
                  <span class="bottom-key-2"></span>
                </Link>
                {/* Use a regular button for Start writing */}
                <button class="fancy m-3" onClick={handleStartWrite}>
                  <span class="top-key"></span>
                  <span class="text">Start writing</span>
                  <span class="bottom-key-1"></span>
                  <span class="bottom-key-2"></span>
                </button>
              </div>
            </div>
          </div>
          <div class="row justify-items-start p-3">
            <div class="col-12 text-center pt-5">
              <a href="#features" onClick={scrollToNextSection}>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="3x"
                  style={{ color: "#ffffff" }}
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSlider;
