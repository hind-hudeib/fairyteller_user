import "./App.css";
import React, { useEffect, useState, useReducer } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Home from "./assets/pages/Home";
import Header from "./assets/Layout/Header";
import Footer from "./assets/Layout/Footer";
import Login from "./assets/pages/Login";
import Signup from "./assets/pages/Signup";
import StoriesList from "./assets/pages/StoriesList";
import BackToTopButton from "./assets/component/BackToTopButton";
import About from "./assets/pages/About";
import Write from "./assets/pages/Write";
import StoryDetails from "./assets/pages/StoryDetails";
import ContactUs from "./assets/pages/ContactUs";
import UserProfile from "./assets/pages/UserProfile";
import axios from "axios";
import StartWrite from "./assets/pages/StartWrite";
import Subscription from "./assets/pages/Subscription";
import PaymentForm from "./assets/pages/PaymentForm";
import ProfilePage from "./assets/pages/UserProfile";
import UserProfilePage from "./assets/pages/user/UserProfilePage";
import PrivacyPolicy from "./assets/pages/PrivacyPolicy";
import NotFound from "./assets/pages/NotFound";

function App() {
  const [isLog, setIsLog] = useState(
    localStorage.getItem("token") ? true : false
  );

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
        <Header isLog={isLog} updateIsLog={setIsLog} />{" "}
        {/* Pass isLog to Header component */}
        <Routes>
          <Route path="/" element={<Home />} />
          {isLog ? (
            // If logged in, render all the routes
            <>
              <Route path="/StoriesList" element={<StoriesList />} />
              <Route path="/write" element={<Write />} />
              <Route path="/About" element={<About />} />
              <Route path="/story/:id" element={<StoryDetails />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/startwrite/:id" element={<StartWrite />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/payment" element={<PaymentForm />} />
              <Route path="/userpage" element={<UserProfilePage />} />
              {/* Custom 404 route for logged-in users */}
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            // If not logged in, only render specific routes
            <>
              <Route path="/login" element={<Login updateIsLog={setIsLog} />} />
              <Route
                path="/Signup"
                element={<Signup updateIsLog={setIsLog} />}
              />
              <Route path="/About" element={<About />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/StoriesList" element={<StoriesList />} />
              <Route path="/story/:id" element={<StoryDetails />} />
              <Route path="/privacyandpolicy" element={<PrivacyPolicy />} />
              {/* Custom 404 route for non-logged-in users */}
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
        <BackToTopButton />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
