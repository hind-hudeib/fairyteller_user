import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const StoryModal = ({ story }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Extract the date portion from the full createdAt timestamp
  const createdAtDate = new Date(story.createdAt).toLocaleDateString();

  return (
    <>
      <span className="fas fa-eye" onClick={handleShow}></span>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Story Details</Modal.Title>
          <span className="close-icon" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </span>
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
              <p className="Description">
                Description : <br /> "{story.Description}"
              </p>
              <hr />
              <div className="content-container">
                <p className="content">{story.content}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-cancel replayBtn" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StoryModal;
