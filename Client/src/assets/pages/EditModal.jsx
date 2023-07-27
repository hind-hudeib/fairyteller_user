import React from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditModal = ({ handleUpdate }) => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate({
      username: userName,
      password: userPassword,
    });
    handleClose();
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;
