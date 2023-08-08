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
export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [massage, setMassage] = useState();
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [userStories, setUserStories] = useState();
  const [userLikedStories, setUserLikedStories] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLikedPage, setCurrentLikedPage] = useState(1);

  const storiesPerPage = 3;
  const verifyToken = async () => {
    const token = localStorage.getItem("token") || false;

    if (token) {
      try {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;

      console.log(userInfo);
      if (!userInfo) {
        const fetchedUserInfo = await verifyToken();
        setUser(fetchedUserInfo);

        if (fetchedUserInfo && fetchedUserInfo.userId) {
          try {
            const response = await axios.get(
              `http://localhost:8000/user/${fetchedUserInfo.userId}`
            );
            const updatedUserInfo = response.data;
            setUser(updatedUserInfo);
            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo)); // Update localStorage with the fetched user data
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        setUser(userInfo);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await verifyToken();
      setUser(userInfo);

      try {
        const response = await axios.get(
          `http://localhost:8000/all_story_by_email/${userInfo.email}`
        );
        setUserStories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchLikedStories = async () => {
      if (user && user.userId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/likeById/${user.userId}`
          );
          setUserLikedStories(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchLikedStories();
  }, [user]);

  const handleUpdate = async (data) => {
    const { username, password } = data;

    try {
      // Make the API request to update the user data
      const response = await axios.put(
        `http://localhost:8000/user/${user.userId}`,
        {
          ...user,
          username: username,
          password: password,
        }
      );

      setUser(response.data);
      console.log(response.data);
      setMassage("User data updated successfully");
      fetchUser();
    } catch (error) {
      console.log(error);
      // Handle the error appropriately, e.g., show an error message to the user
      setMassage("Failed to update user data. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", imageFile);

    // Make a request to the server to upload the image
    axios
      .post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Assuming the server returns the image URL after successful upload
        setProfileImage(response.data.imageUrl);
        setNewImageSelected(true); // Indicate that the user has selected a new image
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  const isStoryLiked = (storyId) => {
    return userLikedStories.some((story) => story._id === storyId);
  };

  const handleFavoriteClick = async (storyId) => {
    try {
      const isLiked = isStoryLiked(storyId);

      if (isLiked) {
        await axios.delete(`http://localhost:8000/removelike/${storyId}`, {
          data: { user: user.userId },
        });
        setUserLikedStories(
          userLikedStories.filter((story) => story._id !== storyId)
        );
        toast.error("Dislike Successful");
      } else {
      }
    } catch (error) {
      console.error("Error handling dislike action:", error);
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
                        {" "}
                        {/* Center both image and name/email/edit */}
                        <MDBCol xl="2" lg="3" md="4" sm="4" xs="4">
                          <div className="image-container">
                            <img
                              src={
                                newImageSelected ? profileImage : defaultImage
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
                                  style={{ display: "none" }}
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </div>
                            </div>
                          </div>
                        </MDBCol>
                        <MDBCol sm="12" className="text-center mt-3">
                          {" "}
                          {/* Center name and email */}
                          <MDBCardText className="text-muted">
                            {user?.username}
                          </MDBCardText>
                          <MDBCardText className="text-muted">
                            {user?.email}
                          </MDBCardText>
                          <MDBCol
                            sm="12"
                            className="d-flex align-items-center justify-content-center mt-3"
                          >
                            {" "}
                            {/* Center edit icon */}
                            <EditModal handleUpdate={handleUpdate} />
                          </MDBCol>
                        </MDBCol>
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

// ////////////////////////////////////////////////////////////////////////////

// useEffect(() => {
//   async function verifyToken() {
//     const token = localStorage.getItem("token") || false;

//     if (token) {
//       try {
//         const res = await axios.get(`http://localhost:8000/Verify_token`, {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         setUserData(res.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false); // Set loading to false when the request completes
//       }
//     } else {
//       setLoading(false); // Set loading to false if there's no token
//     }
//   }

//   async function startGetUserData() {
//     try {
//       const user = await userData.userId;
//       const userStories = await getUserStories(userData.email);
//       const userLikedStories = await getUserLikedStories(
//         userData.userId,
//         userData.email
//       );

//       setUser(user);
//       setUserStories(userStories);
//       setUserLikedStories(userLikedStories);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   if (!loading && userData !== null) {
//     startGetUserData();
//   }

//   if (localStorage.token != null) {
//     verifyToken();
//   }
// }, [loading, userData]);

// async function getUserStories(email) {
//   try {
//     const res = await axios.get(
//       `http://localhost:8000/all_story_by_email/${email}`
//     );
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getUserLikedStories(id, email) {
//   try {
//     const res = await axios.get(`http://localhost:8000/likeById/${id}`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// const handleUpdate = async (data) => {
//   const { username, password } = data;

//   console.log({
//     ...user,
//     username: username,
//     password: password,
//   });

//   try {
//     const res = await axios.put(`http://localhost:8000/user/${user._id}`, {
//       ...user[0],
//       username: username,
//       password: password,
//     });
//     setUser(res.data);
//     startGetUserData();
//   } catch (error) {
//     console.log(error);
//     setMassage("Password is incorrect");
//   }
// };

// const handleImageUpload = (event) => {
//   const file = event.target.files[0];
//   console.log(file); // Log the selected file
//   setProfileImage(URL.createObjectURL(file));
//   setIsImageChanged(true);
// };

// function convertToBase64(file) {
//   console.log(file);
//   return new Promise((resolve, reject) => {
//     if (file instanceof File || file instanceof Blob) {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     } else {
//       reject(new Error("Invalid file object"));
//     }
//   });
// }
// const updateUserProfile = async (uploadedFile) => {
//   const base64 = await convertToBase64(uploadedFile);
//   console.log(base64);
//   setProfileImage({ myFile: base64 });
//   try {
//     const res = await axios.put(`http://localhost:8000/user/${user[0]._id}`, {
//       ...user[0],
//       profileImage: { myFile: base64 },
//     });

//     setUser(res.data);
//     setIsImageChanged(false);
//   } catch (error) {
//     console.log(error);
//   }
// };
