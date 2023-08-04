import React from "react";
import { useState, useEffect, useContext } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import defaultImage from "../images/woman1.png";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../css/userProfile.css";
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

export default function ProfilePage() {
  const { userData, loading } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const [massage, setMassage] = useState();
  const [userStories, setUserStories] = useState();
  const [userLikedStories, setUserLikedStories] = useState();
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLikedPage, setCurrentLikedPage] = useState(1);

  const storiesPerPage = 3;

  const base64Data = profileImage.myFile;

  useEffect(() => {
    if (!loading && userData !== null) {
      startGetUserData();
    }
  }, [loading, userData]);

  async function startGetUserData() {
    try {
      const user = await userData.userId;
      const userStories = await getUserStories(userData.email);
      const userLikedStories = await getUserLikedStories(
        userData.userId,
        userData.email
      );

      setUser(user);
      setUserStories(userStories);
      setUserLikedStories(userLikedStories);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserStories(email) {
    try {
      const res = await axios.get(
        `http://localhost:8000/all_story_by_email/${email}`
      );
      setUserStories(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserLikedStories(id, email) {
    try {
      const res = await axios.get(`http://localhost:8000/likeById/${id}`);
      setUserLikedStories(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  //
  const handleUpdate = async (data) => {
    const { username, password } = data;

    // console.log({
    //   ...user[0],
    //   username: username,
    //   password: password,
    // });

    try {
      const res = await axios.put(`http://localhost:8000/user/${user[0]._id}`, {
        ...user[0],
        username: username,
        password: password,
      });
      setUser(res.data);
      startGetUserData();
    } catch (error) {
      console.log(error);
      setMassage("Password is incorrect");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file); // Log the selected file
    setProfileImage(URL.createObjectURL(file));
    setIsImageChanged(true);
  };
  function convertToBase64(file) {
    console.log(file);
    return new Promise((resolve, reject) => {
      if (file instanceof File || file instanceof Blob) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject(new Error("Invalid file object"));
      }
    });
  }
  const updateUserProfile = async (uploadedFile) => {
    const base64 = await convertToBase64(uploadedFile);
    console.log(base64);
    setProfileImage({ myFile: base64 });
    try {
      const res = await axios.put(`http://localhost:8000/user/${user[0]._id}`, {
        ...user[0],
        profileImage: { myFile: base64 },
      });

      setUser(res.data);
      setIsImageChanged(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }
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

        <MDBContainer className="py-5">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol lg="12" className="d-flex justify-content-center">
              <MDBCard className="mb-4 mb-lg-0 userCard w-100 shadow-lg">
                <MDBCardBody className="p-0 ">
                  <MDBListGroup flush className="rounded-3 userCardBody">
                    <MDBRow className="justify-content-center">
                      <MDBCol xl="2" lg="3" md="4" sm="4" xs="4">
                        <div className="image-container">
                          <img
                            src={profileImage}
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
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </div>
                          </div>
                        </div>
                        {isImageChanged && (
                          <button
                            className="save-button"
                            onClick={updateUserProfile}
                          >
                            Save
                          </button>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="p-4 mt-3">
                      <MDBCol sm="3">
                        <MDBCardText>Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCardText className="text-muted">
                          {" "}
                          {userData?.username}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol
                        sm="3"
                        className="d-flex align-items-center justify-content-end"
                      >
                        <EditModal handleUpdate={handleUpdate} />
                      </MDBCol>
                    </MDBRow>

                    <hr />
                    <MDBRow className="p-4">
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBCardText className="text-muted ">
                          {" "}
                          {userData?.email}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol
                        sm="3"
                        className="d-flex align-items-center justify-content-end"
                      ></MDBCol>
                    </MDBRow>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <MDBContainer className="py-5">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0 storiesCard  shadow-lg">
                <MDBCardBody>
                  <MDBCardText className="mb-4">My Work</MDBCardText>
                  <hr />
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
                                height: "10rem",
                                width: "7rem",
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
            </MDBCol>
            <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0 storiesCard  shadow-lg">
                <MDBCardBody>
                  <MDBCardText className="mb-4">Stories I Like</MDBCardText>
                  <hr />
                  {currentLikedStories?.map((story) => (
                    <>
                      <div
                        key={story._id}
                        className="d-flex justify-content-start align-items-start mt-4 p-2"
                      >
                        <div style={{ position: "relative" }} className="mx-5">
                          <img
                            src={story.cover}
                            alt="Story Cover"
                            style={{
                              height: "10rem",
                              width: "7rem",
                            }}
                          />
                        </div>
                        <div className="flout-left">
                          <h3>{story.title}</h3>
                          <p>by : {story.author}</p>
                          <button className="heart-icon btn active ">
                            <FontAwesomeIcon icon={faHeart} />
                          </button>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="viewAll">
                          <span className="hover-underline-animation">
                            {" "}
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
                            </Link>{" "}
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
                      <hr />
                    </>
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
      </section>
    </>
  );
}
