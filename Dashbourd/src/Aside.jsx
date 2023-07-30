import { useEffect, useState, useReducer } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
const Aside = (props) => {
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const [style, setStyle] = useState(
    "navbar-nav sidebar sidebar-dark accordion d-inline-block p-2"
  );

  const changeStyle = (event) => {
    event.preventDefault(); // Prevent default anchor tag behavior
    if (style === "navbar-nav sidebar sidebar-dark accordion") {
      setStyle("navbar-nav sidebar sidebar-dark accordion toggled");
    } else {
      setStyle("navbar-nav sidebar sidebar-dark accordion");
    }
  };

  function handleLogOut() {
    localStorage.removeItem("token");
    props.forceUpdate();
  }
  return (
    <>
      <ul className={style} id="sideBar">
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-text mx-3">Fairytellers</div>
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
              onClick={changeStyle}
            ></button>
          </div>
        </a>

        {/*   <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/*  <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <span>Dashboard</span>
          </Link>
        </li>

        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">User Management</div>

        {/* <!-- Nav Item - Charts --> */}

        <li className="nav-item">
          <Link className="nav-link" to="/writers">
            <i className="fas fa-fw fa-pencil-alt"></i>
            <span>Users</span>
          </Link>
        </li>

        {/*  <!-- Nav Item - Tables --> */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/readers">
            <i className="fas fa-fw fa-book-open"></i>
            <span>Readers</span>
          </Link>
        </li> */}

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
            <FontAwesomeIcon icon={faCommentDots} className="mr-1 opacity-25" />
            <span>Comments</span>
          </Link>
        </li>
        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />
        <li className="nav-item">
          <Link className="nav-link" to="/storiesrequests">
            <i class="fas fa-paper-plane"></i>
            <span> Stories requests</span>
          </Link>
        </li>
        <hr className="sidebar-divider d-none d-md-block" />

        <li className="nav-item">
          <a className="nav-link" href="tables.html" onClick={handleLogOut}>
            <i className="fas fa-fw fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Aside;
