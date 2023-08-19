import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/write.css";
import "../css/startWrite.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const StartWrite = () => {
  const location = useLocation();

  const { id } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const contentParam = queryParams.get("content");
  const [content, setStoryContent] = useState(contentParam || "");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleStoryContentChange = (event) => {
    const { userData } = verifyToken();

    if (userData && userData[0].subscriber) {
      setStoryContent(event.target.value);
    } else {
      const updatedContent = event.target.value;
      localStorage.setItem("savedContent", updatedContent);
      setStoryContent(updatedContent);
    }
  };

  async function verifyToken() {
    const token = localStorage.getItem("token") || false;

    if (token) {
      try {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const userId = res.data.userId;
        console.log(userId);

        const userResponse = await axios.get(
          `http://localhost:8000/user/${userId}`
        );
        const userData = userResponse.data;

        console.log(userResponse.data);
        console.log(userData);
        return { userId, userData };
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleApproval = async () => {
    const { userId, userData } = await verifyToken();

    if (userData && userData[0].subscriber === true) {
      try {
        await axios.put(`http://localhost:8000/updatestorycontent/${id}`, {
          content,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Story Created Successfully",
          showConfirmButton: false,
          timer: 1800,
        });
        console.log("Story content updated successfully. ");

        handleClose();
        localStorage.removeItem("savedContent"); // Remove saved content when the user is a subscriber
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/subscription");
      handleClose();
    }
  };

  const rows = Math.max(content.split("\n").length, 20);

  useEffect(() => {
    const savedContent = localStorage.getItem("savedContent");
    if (!contentParam && savedContent) {
      setStoryContent(savedContent);
    }
  }, [contentParam]);

  return (
    <>
      <div className="container-fluid writeBox  p-5">
        <div className="row justify-content-center mt-4 pt-5">
          <div className="col-2"></div>
          <div className="col-lg-8 col-md-8">
            <div className="form-group d-flex justify-content-center "></div>

            <div className="form-group mt-5">
              <textarea
                className="form-control shadow"
                value={content || localStorage.getItem("savedContent") || ""}
                onChange={handleStoryContentChange}
                placeholder="Start writing your story here..."
                rows={rows}
              />
            </div>
          </div>
          <div className="col-2">
            <div className="text-right">
              <button className="btn writeBtn m-1" onClick={handleApproval}>
                Publish
              </button>

              <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartWrite;
// const handlePublish = async () => {
//   handleShow(); // Show the modal first

//   const userData = await verifyToken();

//   if (userData && userData.subscriber === true) {
//     try {
//       await axios.put(`http://localhost:8000/updatestorycontent/${id}`, {
//         content,
//       });
//       console.log("Story content updated successfully.");
//       handleClose();
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   } else {
//     handleClose();
//     navigate("/subscription");
//   }
// };

// async function verifyToken() {
//   const token = localStorage.getItem("token") || false;

//   if (token) {
//     try {
//       const res = await axios.get(`http://localhost:8000/Verify_token`, {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });
//       setUserId(res.data.userId);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// useEffect(() => {
//   axios
//     .get("http://localhost:8000/writer/" + userId)
//     .then((response) => {
//       setWriter(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }, []);

// axios
//   .put("http://localhost:8000/dashboard/acceptStory/" + id)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => console.log(error.message));
