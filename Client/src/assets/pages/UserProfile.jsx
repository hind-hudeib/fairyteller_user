import React from "react";
import { useState, useEffect, useContext } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import defaultImage from "../images/woman1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../css/userProfile.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBListGroup,
} from "mdb-react-ui-kit";
import EditModal from "./EditModal";
import StoryViewModal from "./StoryViewModal";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfile() {
  const [user, setUser] = useState([]);
  const [massage, setMassage] = useState();
  const [profileImage, setProfileImage] = useState(null); // Store the selected image file
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [userStories, setUserStories] = useState([]);
  const [userLikedStories, setUserLikedStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLikedPage, setCurrentLikedPage] = useState(1);
  const [userData, setUserData] = useState({
    username: "", // Initialize with current user's username
    password: "",
  });
  const storiesPerPage = 3;

  // get user data and user Stories

  async function verifyToken() {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const userId = res.data.userId;
        // Fetch user info using the user ID
        const userInfoResponse = await axios.get(
          `http://localhost:8000/user/${userId}`
        );
        const userInfo = userInfoResponse.data;
        console.log(userInfo);

        // Fetch user stories written by their email
        const userStoriesResponse = await axios.get(
          `http://localhost:8000/all_story_by_email/${userInfo[0].email}`
        );
        const userStories = userStoriesResponse.data;
        console.log(userStories);
        // Fetch stories liked by the user's ID
        const likedStoriesResponse = await axios.get(
          `http://localhost:8000/likeById/${userId}`
        );
        const likedStories = likedStoriesResponse.data;
        console.log(likedStories);

        // Now you can set the user, userStories, and likedStories states accordingly
        setUser(userInfo);
        setUserStories(userStories);
        setUserLikedStories(likedStories);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // handle update user infornation

  const handleUpdate = async (updatedData) => {
    try {
      const userId = user[0]._id;
      const response = await axios.put(
        `http://localhost:8000/user/${userId}`,
        updatedData
      );

      if (response.status === 200) {
        setUser([{ ...user[0], username: updatedData.username }]);
        setUserData({
          ...userData,
          username: updatedData.username,
        });
      } else {
        console.error("Update failed");
      }

      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error; // Re-throw the error to be handled elsewhere if needed
    }
  };

  // handle update user Image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    setProfileImage(file);
    setNewImageSelected(URL.createObjectURL(file));
  };
  const handleSaveImage = async () => {
    try {
      if (!profileImage) {
        console.error("No image selected.");
        return;
      }

      const formData = new FormData();
      formData.append("profileImage", profileImage);

      const userId = user[0]._id;

      const response = await axios.put(
        `http://localhost:8000/updateProfile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setNewImageSelected(false);
        console.log("Profile image updated");
      } else {
        console.error("Profile image update failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  //  handle remove story from liked stories

  const isStoryLiked = (storyId) => {
    return userLikedStories.some((story) => story._id === storyId);
  };

  const handleFavoriteClick = async (storyId) => {
    console.log(user[0]._id);
    try {
      const userId = user[0]._id;

      const isLiked = isStoryLiked(storyId);

      if (isLiked) {
        await axios.delete(`http://localhost:8000/removelike/${storyId}`, {
          data: { user: userId },
        });

        setUserLikedStories(
          userLikedStories.filter((story) => story._id !== storyId)
        );

        toast.error("Dislike Successful");
      } else {
        // Handle the like action here
      }
    } catch (error) {
      console.error("Error handling dislike action:", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  // User Stories Pagination

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = userStories?.slice(
    indexOfFirstStory,
    indexOfLastStory
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(userStories?.length / storiesPerPage);

  // Liked Stories Pagination

  const indexOfLastLikedStories = currentLikedPage * storiesPerPage;
  const indexOfFirstLikedStories = indexOfLastLikedStories - storiesPerPage;
  const currentLikedStories = userLikedStories?.slice(
    indexOfFirstLikedStories,
    indexOfLastLikedStories
  );
  // Function to handle page change for liked stories
  const handleLikedPageChange = (pageNumber) => {
    setCurrentLikedPage(pageNumber);
  };
  const totalLikedPages = Math.ceil(userLikedStories?.length / storiesPerPage);

  return (
    <>
      <section className="pt-5">
        <section
          className="contactSection"
          style={{
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container-fluid contact-header pt-5 ">
            <div className="row pt-5">
              <div className="col-12 text-center pt-5 pb-3"></div>
            </div>
          </div>
        </section>
      </section>

      {/* taps */}
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="profile" title="Profile">
          <MDBContainer className="py-5">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol lg="12" className="d-flex justify-content-center">
                <MDBCard className="mb-4 mb-lg-0 userCard w-100 shadow-lg">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3 userCardBody">
                      <MDBRow className="justify-content-center align-items-center">
                        {user?.map((userData) => (
                          <div key={userData._id} className="mb-4">
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="image-container">
                                <img
                                  src={
                                    newImageSelected || // Display the selected image if available
                                    `http://localhost:8000/uploads/${userData.profileImage}` || // Display the user's profile image if available
                                    defaultImage // Path to your default image
                                  }
                                  alt="Your Image"
                                  className="img-fluid rounded-circle"
                                />

                                <div className="overlay">
                                  <div className="overlay-content">
                                    <label htmlFor="imageUpload">
                                      <FiEdit className="book-title w-6 h-6 text-[#0d9488] cursor-pointer" />
                                    </label>
                                    <input
                                      type="file"
                                      id="imageUpload"
                                      name="profileImage"
                                      style={{ display: "none" }}
                                      accept="image/*"
                                      onChange={handleImageChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {newImageSelected && (
                              <div className="d-flex justify-content-center align-items-center mt-2">
                                <button
                                  style={{
                                    backgroundColor: "#1d2533",
                                    border: "1px solid #1d2533",
                                  }}
                                  onClick={handleSaveImage}
                                  className="save-button rounded text-light px-3 py-1"
                                >
                                  Save
                                </button>
                              </div>
                            )}
                            <div className="text-center mt-3">
                              {/* Center name and email */}

                              {console.log(userData.profileImage)}
                              <MDBCardText className="text-muted">
                                {userData.username}
                              </MDBCardText>
                              <MDBCardText className="text-muted">
                                {userData.email}
                              </MDBCardText>
                              <div className="d-flex align-items-center justify-content-center mt-3">
                                {/* Center edit icon */}
                                <EditModal handleUpdate={handleUpdate} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </MDBRow>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Tab>
        <Tab eventKey="My Work" title="My Work">
          <MDBContainer className="py-5">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol md="8">
                <h2 className="mb-4">My Work</h2>
                {currentStories.length === 0 ? ( // Check if there are no stories
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "50vh",
                    }}
                  >
                    <img
                      src="https://assets.materialup.com/uploads/3bb5bf77-24cf-464b-bb0c-415cca344095/preview.jpg"
                      alt="no stories yet"
                      className="w-50"
                    />
                    <p className="text-center">
                      You have not created any stories. Would you like to{" "}
                      <Link
                        to={"/write"}
                        className="text-uppercase font-weight-bold text-primary text-decoration-none"
                      >
                        start{" "}
                      </Link>{" "}
                      ?
                    </p>
                  </div>
                ) : (
                  <MDBCard className="mb-4 mb-md-0 storiesCard  shadow-lg">
                    <MDBCardBody>
                      {
                        // Display stories created by the writer
                        currentStories?.map((story) => (
                          <>
                            <div
                              key={story._id}
                              className="d-flex justify-content-between align-items-center mt-4 p-2"
                            >
                              <div style={{ position: "relative" }}>
                                <img
                                  src={story.cover}
                                  alt="Story Cover"
                                  style={{
                                    height: "12rem",
                                    width: "9rem",
                                  }}
                                />
                                <span className="eye-icon">
                                  <StoryViewModal story={story} />
                                </span>
                              </div>
                              <div className="flout-left">
                                <h3>{story.title}</h3>
                                <p>{story.createdAt}</p>
                              </div>
                              <span>
                                <FiEdit />
                              </span>
                            </div>
                            <hr />
                          </>
                        ))
                      }
                      {/* Pagination */}
                      <ul className="pagination justify-content-center">
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              index + 1 === currentPage ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </MDBCardBody>
                  </MDBCard>
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Tab>
        <Tab eventKey="longer-tab" title="Stories I Like">
          <MDBContainer className="py-5">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol md="8">
                <h2 className="mb-4">Stories I Like</h2>

                <MDBCard className="mb-4 mb-md-0 storiesCard  shadow-lg">
                  <MDBCardBody>
                    {currentLikedStories?.map((story) => (
                      <React.Fragment key={story._id}>
                        <div className="d-flex justify-content-start mt-4 p-2">
                          <div
                            style={{ position: "relative" }}
                            className="mr-5"
                          >
                            <img
                              src={story.cover}
                              alt="Story Cover"
                              style={{
                                height: "12rem",
                                width: "9rem",
                              }}
                            />
                          </div>
                          <div className="flex-grow-1 mx-5">
                            <div>
                              <h5>{story.title}</h5>
                              <p>by: {story.author}</p>
                              <p>{story.category}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-end">
                              <button
                                className="heart-icon btn active mt-5"
                                onClick={() => handleFavoriteClick(story._id)}
                              >
                                <FontAwesomeIcon icon={faHeart} />
                              </button>
                              <button className="viewAll">
                                <span className="hover-underline-animation">
                                  <Link
                                    to={`/story/${story._id}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      fontSize: "12px",
                                      fontWeight: "bolder",
                                    }}
                                  >
                                    Read Now
                                  </Link>
                                </span>
                                <svg
                                  viewBox="0 0 46 16"
                                  height="10"
                                  width="30"
                                  xmlns="http://www.w3.org/2000/svg"
                                  id="arrow-horizontal"
                                >
                                  <path
                                    transform="translate(30)"
                                    d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                    data-name="Path 10"
                                    id="Path_10"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </React.Fragment>
                    ))}
                    {/* Pagination */}
                    <ul className="pagination justify-content-center">
                      {Array.from({ length: totalLikedPages }, (_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            index + 1 === currentLikedPage ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handleLikedPageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Tab>
      </Tabs>
    </>
  );
}
