import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

const Signup = ({ updateIsLog }) => {
  useEffect(() => {
    const token = localStorage.getItem("token") || false;
    if (token) {
      checkToken(token).then((resultUsers) => {
        if (resultUsers) {
          updateIsLog(true);
          navigate(path);
        }
      });
    }

    async function checkToken(token) {
      try {
        const response = await axios.get("http://localhost:5000/checkToken", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [path] = useState("/");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [checkInput, setCheckInput] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const themeValue = {
    success: "green",
    error: "red",
    warning: "red",
    normal: "teal",
  };

  const [inputTheme, setInputTheme] = useState({
    email: themeValue.normal,
    password: themeValue.normal,
    username: themeValue.normal,
    phone: themeValue.normal,
    confirmPassword: themeValue.normal,
    serial: themeValue.normal,
  });

  const [massageWarning, setMassageWarning] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    submit: "",
  });

  const [passwordMode, setPasswordMode] = useState(true);
  const [passwordModeCon, setPasswordModeCon] = useState(true);

  function handlePasswordMode() {
    setPasswordMode(!passwordMode);
  }

  function handlePasswordModeCon() {
    setPasswordModeCon(!passwordModeCon);
  }

  function handleName(event) {
    const username = event.target.value;
    setCheckInput({ ...checkInput, username: false });

    if (username === "") {
      setInputTheme({ ...inputTheme, username: themeValue.normal });
      setMassageWarning({
        ...massageWarning,
        username: "Please enter a value",
      });
    } else {
      setInputTheme({ ...inputTheme, username: themeValue.success });
      setMassageWarning({ ...massageWarning, username: "" });
      setUser({ ...user, username: username });
      setCheckInput({ ...checkInput, username: true });
    }
  }

  function handleEmail(event) {
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
    setCheckInput({ ...checkInput, email: false });
    const email = event.target.value;

    if (email === "") {
      setInputTheme({ ...inputTheme, email: themeValue.normal });
      setMassageWarning({ ...massageWarning, email: "Please enter a value" });
    } else if (!patternEmail.test(email)) {
      setInputTheme({ ...inputTheme, email: themeValue.error });
      setMassageWarning({
        ...massageWarning,
        email: " Please enter a valid email address",
      });
    } else {
      setMassageWarning({ ...massageWarning, email: "" });
      setInputTheme({ ...inputTheme, email: themeValue.success });
      setUser({ ...user, email: email });
      setCheckInput({ ...checkInput, email: true });
    }
  }

  function handlePassword(event) {
    // more than 8 characters, with at least 1 number, uppercase, and special characters.
    const patternPassword =
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
    setCheckInput({ ...checkInput, password: false });
    const password = event.target.value;

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

  function handleConfirmPassword(event) {
    const password = event.target.value;

    setCheckInput({ ...checkInput, confirmPassword: false });

    if (password === "") {
      setInputTheme({ ...inputTheme, confirmPassword: themeValue.normal });
      setMassageWarning({
        ...massageWarning,
        confirmPassword: "Please enter a value",
      });
    } else if (password !== user.password) {
      setInputTheme({ ...inputTheme, confirmPassword: themeValue.error });
      setMassageWarning({
        ...massageWarning,
        confirmPassword: "The password confirmation does not match",
      });
    } else {
      setMassageWarning({ ...massageWarning, confirmPassword: "" });
      setInputTheme({ ...inputTheme, confirmPassword: themeValue.success });
      setCheckInput({ ...checkInput, confirmPassword: true });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      checkInput.username &&
      checkInput.email &&
      checkInput.password &&
      checkInput.confirmPassword
    ) {
      sendDataToServer(user);
    } else {
      setMassageWarning({
        ...massageWarning,
        submit: "Please enter all required fields.",
      });
    }
  }

  async function sendDataToServer(user) {
    try {
      const res = await axios.post("http://localhost:8000/user", user);
      localStorage.setItem("username", user.username);
      localStorage.setItem("email", user.email);
      localStorage.setItem("token", res.data.Token);
      updateIsLog(true);
      navigate(path);
    } catch (err) {
      setMassageWarning({
        ...massageWarning,
        email: "The email address already exists.",
      });
      console.error(err);
    }
  }
  // async function handleGoogleResponse(response) {
  //   try {
  //     const res = await axios.post("http://localhost:8000/google-login", {
  //       googleId: response.googleId,
  //       email: response.profileObj.email,
  //     });

  //     localStorage.setItem("username", res.data.username);
  //     localStorage.setItem("email", res.data.email);
  //     localStorage.setItem("token", res.data.token);

  //     updateIsLog(true);
  //     navigate(path);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return (
    <div>
      {" "}
      <section className="background-radial-gradient overflow-hidden pt-5">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-2 loginHeader">
                Get started <br />
              </h1>
              <p className="mb-4 opacity-70">
                Log in to complete your awesome work !
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card shadow">
                <div className="card-body px-4 py-5 px-md-5">
                  <form id="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="container">
                      <div className="row">
                        <div className="col-12 text-center mx-auto">
                          <div id="signInDiv"></div>
                        </div>
                      </div>

                      <div className="text-center">
                        {/* <GoogleLogin
                          className="col-12 w-50 "
                          clientId="198899238997-1pf661qghlgiuv2bs3nnl9lrkg47vlal.apps.googleusercontent.com"
                          buttonText="Sign Up with Google"
                          onSuccess={handleGoogleResponse}
                          handleGoogleResponse={handleGoogleResponse}
                          onFailure={(err) =>
                            console.error("Google Sign-In failed:", err)
                          }
                        /> */}
                      </div>

                      <div className="text-center mt-2">
                        <p>or sign up with:</p>
                      </div>

                      <div className="row">
                        <div className="col-12 mt-2">
                          <label className="form-label" for="username">
                            Name
                          </label>
                          <input
                            name="name"
                            onChange={(event) => handleName(event)}
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="first name"
                          />
                          <p
                            className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}
                            style={{ direction: "rtl" }}
                          >
                            <span class="font-medium">
                              {massageWarning.name}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="container mt-2">
                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="form-outline mb-4">
                            <label className="form-label" for="email">
                              Email address
                            </label>
                            <input
                              name="email"
                              onChange={(event) => handleEmail(event)}
                              type="email"
                              id="email"
                              className="form-control"
                              placeholder="Email"
                            />

                            <p class="mt-2 text-sm text-danger"></p>

                            <span class="font-medium text-danger">
                              {massageWarning.email}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="form-outline mb-4">
                            <label className="form-label" for="password">
                              Password
                            </label>
                            <input
                              onChange={(event) => handlePassword(event)}
                              type={passwordMode ? "password" : "text"}
                              id="password"
                              name="password"
                              className="form-control"
                              placeholder="password"
                              autocomplete="on"
                            />
                            <span className="eye" onClick={handlePasswordMode}>
                              <i
                                style={{ color: inputTheme.password }}
                                className={`fas fa-eye ${
                                  passwordMode ? "block" : "hidden"
                                }`}
                                id="showEye"
                              />
                              <i
                                style={{ color: inputTheme.password }}
                                className={`fas fa-eye-slash ${
                                  passwordMode ? "hidden" : "block"
                                }`}
                                id="hideEye"
                              />
                            </span>
                            <p className="mt-2 text-sm text-danger">
                              <span class="font-medium text-danger">
                                {massageWarning.password}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              for="password-confirm"
                            >
                              Confirm Password
                            </label>
                            <input
                              onChange={(event) => handleConfirmPassword(event)}
                              type={passwordModeCon ? "password" : "text"}
                              id="passwordConfirm"
                              name="password-confirm"
                              className="form-control"
                              placeholder="password"
                              autocomplete="on"
                            />
                            <span
                              className="eye"
                              onClick={handlePasswordModeCon}
                            >
                              <i
                                className={`fas fa-eye ${
                                  passwordModeCon ? "block" : "hidden"
                                }`}
                                style={{ color: inputTheme.confirmPassword }}
                              />
                              <i
                                style={{ color: inputTheme.confirmPassword }}
                                className={`fas fa-eye-slash ${
                                  passwordModeCon ? "hidden" : "block"
                                }`}
                                id="hideEye"
                              />
                            </span>
                            <p className="mt-2 text-sm text-danger">
                              <span class="font-medium text-danger">
                                {massageWarning.confirmPassword}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button className="btn loginBtn" type="submit">
                        Signup
                      </button>
                    </div>

                    <div className="text-center mt-3">
                      <p>
                        If you already have an account,
                        <Link to={"/Login"}>Log in.</Link>
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

export default Signup;
