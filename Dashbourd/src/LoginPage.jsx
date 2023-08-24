import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/login.css";
import axios from "axios";

const LoginPage = ({ updateIsLog }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [path] = useState("/dashboard");
  const [passwordMode, setPasswordMode] = useState(true);

  function handlePasswordMode() {
    setPasswordMode(!passwordMode);
  }

  const themeValue = {
    success: "green",
    error: "red",
    warning: "red",
    normal: "teal",
  };

  const [checkInput, setCheckInput] = useState({
    email: false,
    password: false,
    type: false,
  });

  const [inputTheme, setInputTheme] = useState({
    email: themeValue.normal,
    password: themeValue.normal,
  });

  const [massageWarning, setMassageWarning] = useState({
    email: "",
    password: "",
  });

  function handleEmail(event) {
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
    const email = event.target.value;
    setCheckInput({ ...checkInput, email: false });

    if (email === "") {
      setInputTheme({ ...inputTheme, email: themeValue.normal });
      setMassageWarning({ ...massageWarning, email: "Please enter a value" });
    } else if (!patternEmail.test(email)) {
      setInputTheme({ ...inputTheme, email: themeValue.error });
      setMassageWarning({
        ...massageWarning,
        email: "Please enter a valid email address.",
      });
    } else {
      setMassageWarning({ ...massageWarning, email: "" });
      setInputTheme({ ...inputTheme, email: themeValue.success });
      setUser({ ...user, email: email });
      setCheckInput({ ...checkInput, email: true });
    }
  }

  {
    /* Somewhere in your JSX */
  }
  <span className="text-danger">{massageWarning.email}</span>;

  function handlePassword(event) {
    const patternPassword =
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
    const password = event.target.value;
    setCheckInput({ ...checkInput, password: false });
    if (password === "") {
      setInputTheme({ ...inputTheme, password: themeValue.normal });
      setMassageWarning({
        ...massageWarning,
        password: "Please enter a value",
      });
    } else if (!patternPassword.test(password)) {
      setInputTheme({ ...inputTheme, password: themeValue.error });
      setMassageWarning({
        ...massageWarning,
        password: `Please enter a password that is at least 8 characters long and includes at least one uppercase letter, one lowercase letter, one number, and one special character `,
      });
    } else {
      setMassageWarning({ ...massageWarning, password: "" });
      setInputTheme({ ...inputTheme, password: themeValue.success });
      setUser({ ...user, password: password });
      setCheckInput({ ...checkInput, password: true });
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      setMassageWarning({
        ...massageWarning,
        submit: "Please enter both email and password",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/Login_admin", {
        email: email,
        password: password,
      });

      localStorage.setItem("email", email);
      localStorage.setItem("token", res.data.Token);
      updateIsLog(true);
      navigate("/dashboard");

      // Clear the warning messages
      setMassageWarning({
        email: "",
        password: "",
        submit: "",
      });
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log("Response status:", err.response.status);
        console.log("Response data:", err.response.data);
      }

      if (err.response && err.response.status === 401) {
        setMassageWarning({
          ...massageWarning,
          submit: "Incorrect email or password.",
        });
      } else if (err.response && err.response.data === "Don't have access") {
        setMassageWarning({
          ...massageWarning,
          submit: "Your account has not been approved by the admin yet...",
        });
      } else {
        setMassageWarning({
          ...massageWarning,
          submit: "An error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <div>
      <section className="background-radial-gradient overflow-hidden pt-5">
        <div className="container px-4 py-5 px-md-5 text-center text-md-start my-5">
          <div className="row gx-md-5 ml-md-5 d-flex justify-content-center justify-content-md-start align-items-center mb-5">
            <div className="col-md-9 mb-5 mb-md-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong z-3"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card shadow">
                <div className="card-body px-4 py-5 px-md-5" id="positionError">
                  <form id="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-outline mb-4">
                      <div id="signInDiv" className="text-center m-2"></div>
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={(event) => handleEmail(event)}
                      />
                      <span className="text-danger">
                        {massageWarning.email}
                      </span>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          onChange={(event) => handlePassword(event)}
                          type={passwordMode ? "password" : "text"}
                          id="password"
                          className="form-control"
                          placeholder="Password"
                          autoComplete="on"
                        />
                        <span
                          className="input-group-text eye"
                          onClick={handlePasswordMode}
                        >
                          {passwordMode ? (
                            <i
                              style={{ color: inputTheme.password }}
                              className="fas fa-eye-slash"
                            />
                          ) : (
                            <i
                              style={{ color: inputTheme.password }}
                              className="fas fa-eye"
                            />
                          )}
                        </span>
                      </div>
                      <span className="text-danger d-block mt-1">
                        {massageWarning.password}
                      </span>
                      <span className="text-danger">
                        {massageWarning.submit}
                      </span>
                    </div>

                    <div className="text-center">
                      <button class="btn loginBtn" type="submit">
                        Login
                      </button>
                    </div>

                    <div className="text-center mt-3">
                      <p>or Login with:</p>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                    </div>

                    <div className="text-center">
                      <p>
                        Don't have an account?{" "}
                        <Link to={"/Signup"}>Sign up</Link>{" "}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
