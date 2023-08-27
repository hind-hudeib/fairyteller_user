import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/write.css";
import axios from "axios";
import bg from "../images/writebg.jpg";

const Write = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [image, setImage] = useState({ myFile: "" });

  async function verifyToken() {
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
  }
  const base64Data = image.myFile;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      title: event.target.elements.title.value,
      author: event.target.elements.author.value,
      email: localStorage.getItem("email"),
      Description: event.target.elements.description.value,
      Language: event.target.elements.language.value,
      cover: base64Data,
      category: event.target.elements.category.value,
      acceptPolicy: event.target.elements.acceptPolicy.checked,
    };
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});

      try {
        const response = await axios.post(
          "http://localhost:8000/new_story",
          formData
        );
        navigate(`/startwrite/${response.data._id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const validateForm = (formData) => {
    const errors = {};

    if (formData.title.trim() === "") {
      errors.title = "Title is required.";
    }

    if (formData.author.trim() === "") {
      errors.author = "Author is required.";
    }

    if (formData.Description.trim().length < 100) {
      errors.Description = "Description should be at least 100 characters.";
    }

    if (formData.Language.trim() === "") {
      errors.Language = "Language is required.";
    }

    if (formData.category.trim() === "") {
      errors.category = "Category is required.";
    }

    if (!formData.acceptPolicy) {
      errors.acceptPolicy =
        "You must accept the policy before starting to write.";
    }

    return errors;
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Corrected state update
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      if (file instanceof File || file instanceof Blob) {
        // Check if file is valid
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage({ myFile: base64 }); // Corrected state update
    setSelectedImage(base64);
  };

  const containerStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100vw",
    height: "75vh",
    opacity: "0.8",
    backgroundAttachment: "fixed",
  };
  const imageStyle = {
    display: "none", // Hide the original image
  };
  const handleStartButtonClick = () => {
    // Find the nextSection element by its id
    const nextSection = document.getElementById("storyDetailesSection");
    if (nextSection) {
      // Scroll to the nextSection element smoothly
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="container-fluid addStoryHeader" style={containerStyle}>
        <img
          src={bg}
          alt=""
          style={imageStyle}
          className="w-100 m-5 rounded"
          data-aos="fade-up-right"
        />
        <div className="row pt-5 addStoryHeader">
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center text-md-left p-md-0 p-sm-0 p-lg-5">
            <h2 className="mt-5 mx-5 mx-md-0 white-text">
              Share Your Tale's Spellbinding Details!
            </h2>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-start justify-content-md-start py-3 mx-3 px-5">
            <button className="viewAll" onClick={handleStartButtonClick}>
              <span className="hover-underline-animation">
                <a
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "25px",
                  }}
                >
                  Start
                </a>
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

      <div
        className="container-fluid formContainer p-5"
        id="storyDetailesSection"
      >
        <div className="p-5">
          <div className="container-fluid border border-3 rounded shadow w-75 w-md-75 w-lg-50">
            <div className="row m-2">
              <div className="col-12 mb-3">
                <h5 className="formTitle ">Story Details</h5>
              </div>

              <div className="col-12">
                <form action="#" ref={formRef} onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="upload-input">
                      <input
                        type="file"
                        lable="Image"
                        name="cover"
                        id="upload-input"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                      />
                      <div
                        className="upload-wrapper"
                        style={{
                          border: "2px dashed #ccc",
                          borderRadius: "5px",
                          padding: "2%",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt="Selected"
                            style={{
                              width: "25%",
                              height: "25%",
                              marginBottom: "10px",
                              borderRadius: "5px",
                            }}
                          />
                        ) : (
                          <div style={{ color: "#aaa" }}>
                            Click or drag an image here to upload
                          </div>
                        )}
                        <button
                          className="upload-button m-5"
                          style={{
                            backgroundColor: "#283244",
                            color: "white",
                            border: "none",
                            padding: "3%",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Select Image
                        </button>
                      </div>
                    </label>
                  </div>
                  <label htmlFor="title" className="col-form-label">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    category="text"
                    className="form-control"
                    id="story_title"
                    placeholder="Untitled Story"
                  />
                  {errors.title && (
                    <p className="error text-danger">{errors.title}</p>
                  )}
                  <label htmlFor="title" className="col-form-label">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    name="author"
                    category="text"
                    className="form-control"
                    id="story_title"
                    placeholder="Untitled Story"
                  />
                  {errors.title && (
                    <p className="error text-danger">{errors.author}</p>
                  )}
                  <label htmlFor="description" className="col-form-label">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    id="story_description"
                    placeholder="write a description"
                    rows="4"
                  ></textarea>
                  {errors.Description && (
                    <p className="error text-danger">{errors.Description}</p>
                  )}{" "}
                  {/* Add this line */}
                  <label htmlFor="category" className="col-form-label">
                    Category *
                  </label>
                  <select
                    name="category" // Add the name attribute
                    className="form-select"
                    id="story_category"
                    labelId="category"
                    label="category"
                  >
                    <option value="">Select a category</option>
                    <option value="Drama">Drama</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Horror">Horror</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Romance">Romance</option>
                    <option value="Ghost story">Ghost story</option>
                    <option value="Adventure fiction">Adventure fiction</option>
                  </select>
                  {errors.category && (
                    <p className="error text-danger">{errors.category}</p>
                  )}{" "}
                  {/* Add this line */}
                  <label htmlFor="language" className="col-form-label">
                    Language *
                  </label>
                  <select
                    name="language" // Add the name attribute
                    className="form-select"
                    id="story_language"
                    labelId="language"
                    label="language"
                  >
                    <option value="">Select a Language</option>

                    <option value="arabic">Arabic</option>
                    <option value="english">English</option>
                  </select>
                  {errors.Language && (
                    <p className="error text-danger">{errors.Language}</p>
                  )}
                  {/* New checkbox for policy acceptance */}
                  <div className="form-check mb-1 mt-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="acceptPolicy"
                      id="acceptPolicyCheckbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="acceptPolicyCheckbox"
                    >
                      I accept the <Link to={"/privacyandpolicy"}>policy</Link>{" "}
                      and terms before starting to write.
                    </label>
                    {errors.acceptPolicy && (
                      <p className="error text-danger">{errors.acceptPolicy}</p>
                    )}
                  </div>
                  <button className="btn nextBtn mt-5 w-25" type="submit">
                    Next
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
