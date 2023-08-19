import React from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
const MessagesModal = ({ message, index }) => {
  const [show, setShow] = useState(false);
  const [showReplyIndex, setShowReplyIndex] = useState(-1);
  const [showAddToSection, setShowAddToSection] = useState(-1);
  const [selectedOption, setSelectedOption] = useState("");
  const [reply, setReplyContent] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleReplyClick = (index) => {
    setShowReplyIndex(index);
    setShowAddToSection(-1); // Hide the "Add to section" when clicking "Reply"
  };
  const handleAddClick = (index) => {
    setShowAddToSection(index);
    setShowReplyIndex(-1); // Hide the "Reply" when clicking "Add to section"
  };

  const handleReplyChange = (event) => {
    setReplyContent(event.target.value);
  };
  const handleSendReply = (message) => {
    const updatedMessage = {
      ...message,
      reply: reply,
    };

    axios.put(`http://localhost:8000/dashboard/messagesReplay/${message._id}`, {
      reply,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Replay sent Successfully",
      showConfirmButton: false,
      timer: 1800,
    })
      .then((response) => {
        console.log("Reply sent successfully");
        setShowReplyIndex(-1);
        setReplyContent("");
      })
      .catch((error) => {
        console.error("Error sending reply:", error);
      });
  };
  const handleSelectType = (message) => {
    axios
      .put(`http://localhost:8000/dashboard/selectMessageType/${message._id}`, {
        type: selectedOption,
      })
      .then((response) => {
        console.log("Message type updated:", response.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message type selected Successfully",
          showConfirmButton: false,
          timer: 1800,
        });
        setShowAddToSection(-1);
      })
      .catch((error) => {
        console.error("Error updating message type:", error);
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Extract the date portion from the full createdAt timestamp
  //   const createdAtDate = new Date(story.createdAt).toLocaleDateString();

  return (
    <>
      {" "}
      <div className="row">
        <span className="fas fa-eye m-4" onClick={handleShow}></span>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Message Details</Modal.Title>
            <span className="close-icon" onClick={handleClose}>
              <i className="fas fa-times"></i>
            </span>
          </Modal.Header>
          <Modal.Body>
            <div className="col-lg-12 mx-auto mt-5" key={message._id}>
              <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
                <div className="blockquote-custom-icon bg-info shadow-sm">
                  <i className="fa fa-quote-left text-white"></i>
                </div>
                <p className="mb-0 mt-2 font-italic">
                  {message.messageContent}
                  <a href="#" className="text-info"></a>
                </p>
                <div className="mt-5">
                  <hr />
                  <h6>from : {message.name}</h6>
                  <p>Email : {message.email}</p>
                </div>
                <button
                  className="replayBtn"
                  onClick={() => handleReplyClick(index)}
                >
                  Reply
                </button>{" "}
                <button
                  className="replayBtn"
                  onClick={() => handleAddClick(index)}
                >
                  Add to section
                </button>{" "}
              </blockquote>
              {showReplyIndex === index && (
                <div className="text-center">
                  <textarea
                    value={reply}
                    onChange={handleReplyChange}
                    placeholder="Write your reply here..."
                    rows={4}
                    className="form-control"
                  ></textarea>
                  <button
                    className="replayBtn mt-2"
                    onClick={() => handleSendReply(message)}
                  >
                    Send Reply
                  </button>
                </div>
              )}
              {showAddToSection === index && (
                <div className="container border p-5">
                  <div className="row">
                    <div className="col">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="option"
                          value="faq"
                          checked={selectedOption === "faq"}
                          onChange={handleOptionChange}
                        />
                        <label className="form-check-label">Add to FAQ</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="option"
                          value="opinion"
                          checked={selectedOption === "opinion"}
                          onChange={handleOptionChange}
                        />
                        <label className="form-check-label">
                          Add to opinions section
                        </label>
                      </div>
                      <button
                        className="replayBtn mt-2"
                        onClick={() => handleSelectType(message)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default MessagesModal;
