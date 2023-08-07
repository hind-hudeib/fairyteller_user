import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/contactus.css";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [massage, setMassage] = useState({
    msg: "",
    theme: "",
  });
  async function handleSendEmail(event) {
    event.preventDefault();

    const name = event.target.user_name.value;
    const email = event.target.user_email.value;
    const messageContent = event.target.message.value;
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;

    console.log(name);
    console.log(messageContent);
    if (!email || !name || !messageContent) {
      setMassage({ msg: "Please fill in all fields" });
      return;
    }

    if (!patternEmail.test(email)) {
      setMassage({ msg: "Invalid email address" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/sendMessage", {
        name,
        email,
        messageContent,
      });
      console.log(res.data);
      event.target.reset();
      toast.success("Message sent Successfully ");
    } catch (error) {
      toast.error("Failed to send the message");
      console.log(error);
    }
  }

  return (
    <div>
      <section
        className="contactSection"
        style={{
          backgroundPosition: "50%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container-fluid contact-header pt-5 ">
          <div className="row pt-5">
            <div className="col-12 text-center pt-5 pb-3">
              <h1 className="contactTitle display-4">Contact Us</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container p-5">
          <div className="row justify-content-center">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="card contactUsForm shadow w-100 ">
                <div className="card-body px-4 py-5 px-md-5" id="positionError">
                  <form id="form" onSubmit={(e) => handleSendEmail(e)}>
                    <div className="info-wrap contactInfo w-100 pb-5 text-center ">
                      <h2 className="pb-2 display-6">Let's get in touch</h2>
                      <p className="mb-4">
                        We're open for any suggestion or just to have a chat
                      </p>
                      <hr />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="contactUsName">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        id="contactUsName"
                        className="form-control"
                        placeholder="enter your full name"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="loginEmail">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        id="loginEmail"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        placeholder="write your message here"
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <button
                        className="btn loginBtn"
                        type="submit"
                        value="send"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                  <p style={{ color: massage.theme }} className="mt-5">
                    {massage.msg}
                  </p>
                </div>{" "}
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
