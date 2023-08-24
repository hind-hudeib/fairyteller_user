import { useEffect, useState, useReducer } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import logo from "../src/images/fairytellers-w.png";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons from react-icons

const Aside = ({ isLog, updateIsLog }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(true); // Keep the menu open on larger screens
      } else {
        setIsMenuOpen(false); // Close the menu on smaller screens
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the handleResize function on component mount to initialize the menu state
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleLogOut() {
    localStorage.clear();
    updateIsLog(false);
  }

  return (
    <>
      <div className="d-flex flex-column">
        <nav className="navbar-nav " style={{ width: "100vw" }} id="navbar">
          <button
            className="btn bt d-md-none w-25"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        <ul
          className={`navbar-nav sidebar sidebar-dark accordion ${
            isMenuOpen ? "" : "sidebar-hidden" // Toggle the sidebar-hidden class based on the isMenuOpen state
          }`}
          id="sideBar"
        >
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="/"
          >
            <div className="sidebar-brand-logo mx-2">
              <img src={logo} alt="" className="sidebar-logo" />
            </div>
          </a>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading">User Management</div>

          <li className="nav-item">
            <Link className="nav-link a1" to="/writers">
              <i className="fas fa-fw fa-pencil-alt"></i>
              <span>Users</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/stories">
              <i className="fas fa-fw fa-book"></i>
              <span>Storeis</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/subUsers">
              <i className="fas fa-fw fa-newspaper"></i>
              <span>subscribers</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/messages">
              <i className="fas fa-fw fa-bell"></i>
              <span>Messages</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/comments">
              <i className="far fa-fw fa-comment"></i>
              <span>Comments</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/storiesrequests">
              <i class="fas fa-paper-plane"></i>
              <span> Stories requests</span>
            </Link>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleLogOut}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Aside;
