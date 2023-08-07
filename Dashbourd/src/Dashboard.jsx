import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import Stats from "./Main Page/Stats";
import TableOfReaders from "./Reader Page/TableOfReaders";
import Aside from "./Aside";
import Footer from "./Footer";
import TableOfWriters from "./Writer page/TableOfWriters";
import TableOfStories from "./Story Page/TableOfStories";
import Main from "./Main Page/Main";

function Dashboard(props) {
  const navigate = useNavigate();

  // const verifyToken = async (role) => {
  //   const token = localStorage.getItem("token") || "";

  //   try {
  //     const res = await axios.get("http://localhost:8000/Verify_token", {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (res.data.role !== role) {
  //       navigate("/");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     navigate("/");
  //   }
  // };
  // useEffect(() => {
  //   verifyToken("admin");
  //   window.scrollTo(0, 0);
  //   var Nav = document.getElementById("Nav");
  //   Nav.style.display = "none";
  //   var Footer = document.getElementById("Footer");
  //   Footer.style.display = "none";
  // }, []);
  const [style, setStyle] = useState(
    "navbar-nav sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (style == "navbar-nav  sidebar sidebar-dark accordion") {
      setStyle("navbar-nav  sidebar sidebar-dark accordion toggled");
    } else {
      setStyle("navbar-nav  sidebar sidebar-dark accordion");
    }
  };

  return (
    <>
      <div className=" d-flex justify-content-center">
        <Main />
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
}

export default Dashboard;
