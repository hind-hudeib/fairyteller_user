import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const StoryViewModal = ({ story }) => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = () => {
    navigate(
      `/startwrite/${story._id}?content=${encodeURIComponent(story.content)}`
    );
  };

  return (
    <>
      <Button variant="" onClick={handleShow}>
        <FiEye size={16} style={{ color: "#c9c9c9" }} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Story Detailes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="image-data-component">
            <div className="imageContainer">
              <img
                src={story.cover}
                alt="Image"
                className="viewStoryImage h-25 w-25"
              />
            </div>
            <div className="data-container">
              <h3 className="title">{story.title}</h3>
              <p className="createdAt">created at : {story.createdAt}</p>
              <p className="category"> {story.category}</p>
              <p className="Description">" {story.Description} "</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleUpdate}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StoryViewModal;
