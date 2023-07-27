import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import autosize from "autosize";
import "../css/write.css";
import axios from "axios";
import avatar from "../images/book1.jpg";
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
        console.log(response.data);
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
      errors.category = "Author is required.";
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
    console.log(base64);
    setImage({ myFile: base64 }); // Corrected state update
  };

  return (
    <div>
      <div class="container-fluid formContainer p-5">
        <div class="p-5">
          <div class="container-fluid border border-3 rounded shadow w-75 w-md-75 w-lg-50">
            <div class="row m-2">
              <div class="col-12 mb-3">
                <h5 class="formTitle ">Story Details</h5>
              </div>

              <div class="col-12">
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
                            src={image}
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
                  <label htmlFor="title" class="col-form-label">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    category="text"
                    class="form-control"
                    id="story_title"
                    placeholder="Untitled Story"
                  />
                  {errors.title && (
                    <p className="error text-danger">{errors.title}</p>
                  )}
                  <label htmlFor="title" class="col-form-label">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    name="author"
                    category="text"
                    class="form-control"
                    id="story_title"
                    placeholder="Untitled Story"
                  />
                  {errors.title && (
                    <p className="error text-danger">{errors.author}</p>
                  )}
                  <label htmlFor="description" class="col-form-label">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    class="form-control"
                    id="story_description"
                    placeholder="write a description"
                    rows="4"
                  ></textarea>
                  {errors.Description && (
                    <p className="error text-danger">{errors.Description}</p>
                  )}{" "}
                  {/* Add this line */}
                  <label htmlFor="category" class="col-form-label">
                    Category *
                  </label>
                  <select
                    name="category" // Add the name attribute
                    class="form-select"
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
                  <label htmlFor="language" class="col-form-label">
                    Language *
                  </label>
                  <select
                    name="language" // Add the name attribute
                    class="form-select"
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
