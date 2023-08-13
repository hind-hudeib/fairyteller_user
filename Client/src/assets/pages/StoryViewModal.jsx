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

  const createdAtDate = new Date(story.createdAt).toLocaleDateString();

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
            <div className="imageContainer text-center">
              <img
                src={story.cover}
                alt="Image"
                className="viewStoryImage rounded w-25 mb-3"
              />
            </div>
            <div className="data-container">
              <div className="text-center">
                <h3 className="title">{story.title}</h3>
                <p className="createdAt">created at: {createdAtDate}</p>
                <p className="category">{story.category}</p>
              </div>
              <hr />
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
