import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

const StoryModal = ({ story }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <div className="imageContainer">
              <img
                src={story.cover}
                alt="Image"
                className="viewStoryImage h-25 w-25"
              />
            </div>
            <div className="data-container">
              <h3 className="title">{story.title}</h3>
              <p className="createdAt">created at: {story.createdAt}</p>
              <p className="category">{story.category}</p>
              <p className="Description">"{story.Description}"</p>
              <hr />
              <div className="content-container">
                <p className="content">{story.content}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-cancel" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StoryModal;
