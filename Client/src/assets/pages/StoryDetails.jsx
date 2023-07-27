import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/storyDetails.css";
import { useParams } from "react-router-dom";
import storyCover from "../images/book8.gif";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await axios.get(
          `http://localhost:8000/one_story_by_Id/${id}`
        );
        setStory(response.data);
      } catch (error) {
        console.log(error);
        setStory(null);
      }
    }
    fetchStory();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getCommentsByStory/${id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    async function verifyUser() {
      const token = localStorage.getItem("token") || false;
      if (token) {
        try {
          const res = await axios.get(`http://localhost:8000/Verify_token`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          setUserId(res.data.userId);
          setIsLoggedIn(true); // User is logged in
        } catch (error) {
          console.log(error);
        }
      }
    }

    verifyUser();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/addcomment", {
        storyId: id,
        text: commentText,
        userId: userId,
      });
      const response = await axios.get(
        `http://localhost:8000/getCommentsByStory/${id}`
      );
      setComments(response.data);
      setCommentText(""); // Clear the comment text after submission
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:8000/deletecomment/${commentId}`,
            {
              data: { userId }, // Pass the userId in the request body
            }
          );
          const updatedComments = comments.filter(
            (comment) => comment._id !== commentId
          );
          setComments(updatedComments);
          Swal.fire({
            title: "Deleted!",
            text: "Your comment has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting comment:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the comment.",
            icon: "error",
          });
        }
      }
    });
  };

  if (!story) {
    return <div>Loading...</div>; // Display loading state while fetching the story
  }

  const Story = story.find((item) => item._id === id);

  return (
    <>
      <section>
        <div
          className=" container-fluid story-Details-Container"
          style={{
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="row storyHeader pt-5">
            <div className="col-lg-6 col-md-6 col-sm-12 p-5 d-flex align-items-center justify-content-center">
              <img
                src={Story.cover}
                alt="story cover"
                className="storyDetailsImg rounded-circle"
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column align-items-start justify-content-center p-2 text-center">
              <h2 className="storyTitle display-4 ">{Story.title}</h2>
              <span className=" px-1 py-2  author-StoryDetails">
                By : {Story.author}
              </span>
            </div>
          </div>
        </div>

        <div className="story-details">
          <section id="block_content">
            <div className="col-md-6 container description-container">
              <blockquote className="blockstyle blockDescription">
                {Story.Description}
              </blockquote>
            </div>
            <div class="col-md-6 container description-container mb-5">
              <hr className="mt-3" />
            </div>

            <div className="container mx-auto storyContainer mb-5 mt-4">
              <div className="row d-flext justify-content-center">
                <div className="col-8">
                  <p>{Story.content}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Comment section */}
      <section>
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              className="card shadow-0 border mb-5"
              style={{ backgroundColor: "#f0f2f5" }}
            >
              <div className="card-body p-4">
                {isLoggedIn ? ( // Render the comment form only if the user is logged in
                  <form onSubmit={handleAddComment}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="addANote"
                        className="form-control"
                        placeholder="Type comment..."
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                      />
                      <button type="submit" className="btn btn-primary mt-2">
                        Add Comment
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>Please log in to add a comment.</p>
                )}
                {comments.map((comment) => (
                  <div className="card mb-4" key={comment._id}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                            alt="avatar"
                            width="25"
                            height="25"
                          />
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <p className="small mb-0 ms-2">{userName}</p>
                          <i
                            className="far fa-thumbs-up mx-2 fa-xs text-black"
                            style={{ marginTop: "-0.16rem" }}
                          ></i>
                          <p className="small text-muted mb-0">
                            {comment.userId === userId && ( // Check if the comment belongs to the user
                              <button
                                onClick={() => handleDeleteComment(comment._id)}
                                className="btn btn-unstyled text-danger"
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </button>
                            )}
                          </p>
                        </div>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoryDetails;
