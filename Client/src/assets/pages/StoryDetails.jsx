import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/storyDetails.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [likes, setLikes] = useState(0);

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
        const commentsWithUser = response.data.map(async (comment) => {
          const userResponse = await axios.get(
            `http://localhost:8000/user/${comment.userId}`
          );
          const [user] = userResponse.data; // Destructure the first element from the user array
          return { ...comment, user };
        });
        const resolvedComments = await Promise.all(commentsWithUser);
        setComments(resolvedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchLikes = async (storyId) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/likesCount/${storyId}`
        );
        setLikes(response.data.likesCount);
        console.log(response.data);
        console.log(likes);
      } catch (error) {
        console.error("Error fetching Likes:", error);
      }
    };

    fetchLikes(id); // Use the id parameter in the fetchLikes function
  }, [id]);

  const verifyUser = async () => {
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

        // Once the user is verified, call fetchLikes with the user's ID
      } catch (error) {
        console.log(error);
      }
    }
  };

  verifyUser();

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      // Add the new comment to the server
      await axios.post("http://localhost:8000/addcomment", {
        storyId: id,
        text: commentText,
        userId: userId,
      });

      // Fetch the updated comments along with the user information
      const response = await axios.get(
        `http://localhost:8000/getCommentsByStory/${id}`
      );

      // Update the comments state with the new comments (including user information)
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

  const handleReportComment = (commentId) => {
    Swal.fire({
      title: "Report Comment",
      text: "Are you sure you want to report this comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, report it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make the API request to report the comment
        axios
          .post(`http://localhost:8000/report/${commentId}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Comment Reported",
              text: "The comment has been reported successfully.",
              timer: 3000, // Auto close after 3 seconds
              timerProgressBar: true,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong while reporting the comment. Please try again later.",
            });
          });
      }
    });
  };
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
                src={story.cover}
                alt="story cover"
                className="storyDetailsImg rounded-circle"
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column align-items-start justify-content-center p-2 text-center">
              <h2 className="storyTitle display-4 ">{story.title}</h2>
              <span className=" px-1 py-2  author-StoryDetails">
                By : {story.author}
              </span>
              <div className="mt-3">
                {/* Likes */}
                <span style={{ display: "inline-block", marginRight: "10px" }}>
                  <span className="p-2">{story.likes?.length}</span>
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#E9518A" }}
                  />
                </span>

                {/* Comments */}
                <span style={{ display: "inline-block" }}>
                  <span className="p-2">{story.comments?.length}</span>
                  <FontAwesomeIcon
                    icon={faComment}
                    style={{ color: "#A1AFFC" }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="story-details">
          <section id="block_content">
            <div className="col-md-6 container description-container">
              <h5 className="">Description : </h5>

              <blockquote className="blockstyle blockDescription">
                {story.Description}
              </blockquote>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <hr class="custom-hr" />
            </div>

            <div className="container mx-auto storyContainer mb-5 mt-4">
              <div className="row d-flext justify-content-center">
                <div className="col-8">
                  <p>{story.content}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <div class="d-flex justify-content-center mt-3">
        <hr class="custom-hr" />
      </div>

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
                      <button
                        type="submit"
                        className="btn addCommentBtn mt-2"
                        style={{ backgroundColor: "#303761", color: "white" }}
                      >
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
                          <p className="small text-muted mb-0">
                            {comment.userId === userId && (
                              // Check if the comment belongs to the user
                              <button
                                onClick={() => handleDeleteComment(comment._id)}
                                className="btn btn-unstyled text-danger"
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </button>
                            )}
                            {comment.userId !== userId && (
                              // Check if the comment does not belong to the user
                              <button
                                onClick={() => handleReportComment(comment._id)}
                                className="btn btn-unstyled text-danger"
                              >
                                <FontAwesomeIcon icon={faFlag} />
                              </button>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="comment-user ">
                        {comment.user && <h6>{comment.user.username}</h6>}
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
