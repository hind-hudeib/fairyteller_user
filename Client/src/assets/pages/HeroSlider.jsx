import React, { useEffect, useState } from "react";
import "../css/heroslider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
        <div className="container-fluid pt-5 hero-container">
          <div className="row pt-5 mt-5">
            <div className="col-12 d-flex justify-content-center text-center mt-5">
              <h1 className="anim-typewriter heroHeader mt-5">
                Hi, we're fairytellers.
              </h1>
            </div>
          </div>
          <div className="row justify-items-start p-3">
            <div className="col-12 text-center pt-3">
              <div className="m-4">
                <Link className="herobtn m-3" to={"/StoriesList"}>
                  <span className="top-key"></span>
                  <span className="text">Start reading</span>
                  <span className="bottom-key-1"></span>
                  <span className="bottom-key-2"></span>
                </Link>
                {/* Use a regular button for Start writing */}
                <button className="herobtn m-3" onClick={handleStartWrite}>
                  <span className="top-key"></span>
                  <span className="text">Start writing</span>
                  <span className="bottom-key-1"></span>
                  <span className="bottom-key-2"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="row justify-items-start p-3">
            <div className="col-12 text-center pt-5">
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
