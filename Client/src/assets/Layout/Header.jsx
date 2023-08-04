import React from "react";
import "../css/navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const Header = ({ isLog, updateIsLog }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  async function verifyToken() {
    const token = localStorage.getItem("token") || false;

    if (token) {
      try {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
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
    localStorage.removeItem("auth"); // Clear "auth" item from local storage
    updateIsLog(false);
  }

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const navbarCollapseStyle = {
    display: isNavCollapsed ? "none" : "block",
    maxHeight: isNavCollapsed ? "0px" : "500px", // Adjust the max height as needed
    opacity: isNavCollapsed ? "1" : "1",
    transition: "max-height 0.3s ease, opacity 0.3s ease",
  };
  const navbarTogglerIconStyle = {
    transition: "transform 0.3s ease", // Add smooth transition to the navbar-toggler-icon
    transform: isNavCollapsed ? "rotate(0deg)" : "rotate(90deg)", // Rotate the icon when the navbar is expanded
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-2 fixed-top">
        <a className="navbar-brand p-3" href="/">
          Fairytellers
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span
            className="navbar-toggler-icon"
            style={navbarTogglerIconStyle}
          ></span>
        </button>
        <div
          className={`navbar-collapse ${isNavCollapsed ? "collapse" : ""}`}
          id="navbarNav"
          style={navbarCollapseStyle}
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link mx-2">
                Home
              </NavLink>
            </li>
            {isLog && (
              <li className="nav-item">
                <NavLink to="/write" className="nav-link mx-2">
                  Share Your Tales
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink to="/StoriesList" className="nav-link mx-2">
                Browse
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/About" className="nav-link mx-2">
                Our Story
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contactus" className="nav-link mx-2">
                Get in Touch
              </NavLink>
            </li>
          </ul>
          <div className="navbar-nav p-2 d-flex align-items-start flex-row">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                    ></path>
                    <path
                      d="M464.1 365.8c-19-18-131.7-51.2-131.7-51.2l-76.3 85.3h0l-76.3-85.3S67.1 347.8 48.1 365.8c-29.3 27.7-31.6 132-31.6 132h479.2c-.1-.1-2.3-104.3-31.6-132z"
                      fill="#283244"
                      stroke="#fff"
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
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
                      {`.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;strokeWidth:2px;}`}
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
        </div>
      </nav>
    </>
  );
};

export default Header;
