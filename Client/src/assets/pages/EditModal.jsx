import React from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditModal = ({ handleUpdate }) => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const handleClose = () => {
    setShow(false);
    setPasswordError(false);
    setIncorrectPassword(false);
    setErrorMessage(""); // Reset error message when modal is closed
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userPassword) {
      setPasswordError(true);
      setErrorMessage("Please enter your password to save");
      return;
    }

    try {
      const response = await handleUpdate({
        username: userName,
        password: userPassword,
      });

      if (response && response.error === "Incorrect password") {
        setIncorrectPassword(true);
        setErrorMessage("Incorrect password. Please try again.");
        return;
      }

      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("401 Unauthorized");
        setIncorrectPassword(true);
        setErrorMessage("Incorrect password. Please try again.");
      } else {
        // Handle other errors here if needed
      }
    }
  };

  return (
    <>
      <Button variant="" onClick={handleShow}>
        <FiEdit className="w-6 h-6 text-[#0d9488] cursor-pointer" />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update your information</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group mt-4">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control mt-1"
                id="name"
                placeholder="Enter your name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>

            <div className="form-group mt-4">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control mt-1"
                id="password"
                placeholder="Enter your password"
                value={userPassword}
                onChange={(event) => setUserPassword(event.target.value)}
              />
              <p className="text-danger mt-4">{errorMessage}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: "#1d2533",
                border: "1px solid #1d2533",
              }}
              type="submit"
            >
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
