import React from "react";
import "../css/navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = ({ isLog, updateIsLog }) => {
  const [userRole, setUserRole] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function verifyToken() {
    const token = localStorage.getItem("token") || false;

    if (token) {
      try {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setUserRole(res.data.role);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    verifyToken();
    window.scrollTo(0, 0);
  }, [isLog]);

  function handleLogOut() {
    localStorage.removeItem("token");
    updateIsLog(false);
    setUserRole("");
  }

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-light p-3"
        style={{ backgroundColor: "white" }}
      >
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Fairytellers
          </Link>
          <button
            className={`navbar-toggler ${isMenuOpen ? "collapsed" : ""}`}
            type="button"
            onClick={handleMenuToggle}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarNavDropdown"
          >
            <ul class="navbar-nav ms-auto ">
              <li class="nav-item">
                <Link
                  class="nav-link mx-2 active"
                  aria-current="page"
                  to="/"
                  style={{ color: "black" }}
                >
                  Home
                </Link>
              </li>
              {isLog && (
                <li className="nav-item">
                  <Link
                    className="nav-link mx-2 active"
                    aria-current="page"
                    to="/write"
                    style={{ color: "black" }}
                  >
                    Share Your Tales
                  </Link>
                </li>
              )}
              <li class="nav-item">
                <Link
                  class="nav-link mx-2 active"
                  aria-current="page"
                  to="/StoriesList"
                  style={{ color: "black" }}
                >
                  Browse
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  class="nav-link mx-2"
                  to="/About"
                  style={{ color: "black" }}
                >
                  Our Story
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link mx-2"
                  to="/contactus"
                  style={{ color: "black" }}
                >
                  Get in Touch
                </Link>
              </li>
              <li class="nav-item dropdown">
                <ul
                  class="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link class="dropdown-item" to="#">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="#">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="#">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto d-none d-lg-inline-flex">
              <li class="nav-item mx-2"></li>
              <li class="nav-item mx-2"></li>
              <li class="nav-item"></li>
            </ul>
          </div>
          {isLog ? (
            <>
              <Link
                onClick={handleLogOut}
                to="/login"
                className="btn navbarBtn rounded-md d-flex align-items-center m-1"
              >
                <span className="mr-1 text-white p-1"> Logout</span>
              </Link>
              <Link
                to="/user"
                className="btn navbarBtn rounded-md d-flex align-items-center m-1"
              >
                <svg
                  viewBox="0 0 512 512"
                  width="30"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current text-gray-800"
                >
                  <path
                    d="M369.5 135.9c0 67.1-50.8 161.3-113.5 161.3S142.5 203 142.5 135.9 193.3 14.3 256 14.3s113.5 54.4 113.5 121.6z"
                    fill="#fff"
                    stroke="#283244"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                  ></path>
                  <path
                    d="M464.1 365.8c-19-18-131.7-51.2-131.7-51.2l-76.3 85.3h0l-76.3-85.3S67.1 347.8 48.1 365.8c-29.3 27.7-31.6 132-31.6 132h479.2c-.1-.1-2.3-104.3-31.6-132z"
                    fill="#283244"
                    stroke="#fff"
                    stroke-width="20"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                  ></path>
                </svg>
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="btn navbarBtn rounded-md d-flex align-items-center m-1"
            >
              <span className="mr-1 text-white"> Login</span>
              <svg
                viewBox="0 0 32 32"
                height="32"
                width="32"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <style>
                    {`.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}`}
                  </style>
                </defs>
                <title />
                <g id="logout">
                  <line
                    className="cls-1"
                    x1="15.92"
                    x2="28.92"
                    y1="16"
                    y2="16"
                  />
                  <path d="M23.93,25v3h-16V4h16V7h2V3a1,1,0,0,0-1-1h-18a1,1,0,0,0-1,1V29a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1V25Z" />
                  <line
                    className="cls-1"
                    x1="28.92"
                    x2="24.92"
                    y1="16"
                    y2="20"
                  />
                  <line
                    className="cls-1"
                    x1="28.92"
                    x2="24.92"
                    y1="16"
                    y2="12"
                  />
                  <line
                    className="cls-1"
                    x1="24.92"
                    x2="24.92"
                    y1="8.09"
                    y2="6.09"
                  />
                  <line
                    className="cls-1"
                    x1="24.92"
                    x2="24.92"
                    y1="26"
                    y2="24"
                  />
                </g>
              </svg>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;