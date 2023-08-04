import React, { useState, useEffect } from "react";
import "../css/storiesList.css";
import Pagination from "../component/Pagination";
import StoryDetails from "./StoryDetails";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import storyCover from "../images/book8.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoriesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setselectedLanguage] = useState("");
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedStories, setDisplayedStories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [likedStories, setLikedStories] = useState([]);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  // check for user logged
  async function verifyToken() {
    const token = localStorage.getItem("token") || false;

    if (token) {
      try {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setUserId(res.data.userId);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // fetch all Stories and liked stories
  useEffect(() => {
    async function fetchLikedStories() {
      await verifyToken(); // Wait for verifyToken to complete before proceeding
      window.scrollTo(0, 0);
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:8000/likeById/${userId}`
          );
          setLikedStories(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching liked stories:", error);
      }
    }

    fetchLikedStories();
    axios
      .get("http://localhost:8000/all_stories")
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
      });
  }, [userId]);

  // handle the like & dislike click
  const isStoryLiked = (storyId) => {
    return likedStories.some((story) => story._id === storyId);
  };
  const handleFavoriteClick = async (storyId) => {
    if (!userId) {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to like a story.",
        icon: "warning",
      });
      return;
    }

    try {
      // Call the isStoryLiked function with the storyId parameter to check if the story is liked
      const isLiked = isStoryLiked(storyId);

      if (isLiked) {
        // If the story is already liked, make a delete request to remove the like
        await axios.delete(`http://localhost:8000/removelike/${storyId}`, {
          data: { user: userId }, // Use the correct field name for user
        });
        setLikedStories(likedStories.filter((story) => story._id !== storyId));

        toast.error("Dislike Successful");
      } else {
        // If the story is not liked, make a post request to add the like
        await axios.post(`http://localhost:8000/newlike/${storyId}`, {
          userId,
        });

        setLikedStories([...likedStories, { _id: storyId }]);
        toast.success("Like Successful ");
      }
    } catch (error) {
      console.error("Error handling like action:", error);
    }
  };

  // category filter
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // language filter
  const handleLanguageChange = (event) => {
    setselectedLanguage(event.target.value);
  };

  // stories filter

  const filterStories = (searchQuery) => {
    let filteredStories = [...stories];

    if (selectedCategory) {
      filteredStories = filteredStories.filter(
        (story) =>
          story.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedLanguage) {
      filteredStories = filteredStories.filter(
        (story) =>
          story.Language?.toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    if (searchQuery && searchQuery.trim() !== "") {
      filteredStories = filteredStories.filter((story) =>
        story.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedStories(filteredStories);
  };

  useEffect(() => {
    filterStories();
  }, [selectedCategory, selectedLanguage, stories]);

  // search functionalty
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    filterStories(value);
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentStories = displayedStories.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <ToastContainer />

      <div className="container-fluid p-5">
        {/* Filter */}
        <section className="py-2">
          <div className="container mx-auto p-4">
            <div className="row w-full p-5 mt-3 filterSection shadow rounded">
              <div className="col-lg-2">
                <div className="d-flex items-center gap-3 mb-3 flex-wrap justify-content-start flex-sm-row">
                  <select
                    onChange={handleCategoryChange}
                    value={selectedCategory}
                    className="form-select mb-1 mb-sm-0 border-2 rounded"
                  >
                    <option value="">Category</option>
                    {[...new Set(stories.map((story) => story.category))].map(
                      (category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="col-lg-2">
                <select
                  onChange={handleLanguageChange}
                  value={selectedLanguage}
                  className="form-select mb-3 mb-sm-0 border-2 border-gray-300 focus:outline-teal-700 focus:shadow-outline rounded"
                >
                  <option value="">Language</option>
                  {[...new Set(stories.map((story) => story.Language))].map(
                    (language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="col-lg-8">
                <div className="d-flex items-center">
                  <input
                    placeholder="Search"
                    name="search"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control shadow appearance-none border rounded w-40 py-2 px-3 text-teal-700 leading-tight focus:outline-teal-700 focus:shadow-outline"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="row p-5">
          {currentStories.map((story) => (
            <div
              className="col-xl-3 col-lg-6 col-md-6 col-sm-12  d-flex justify-content-center align-items-center"
              key={story._id}
            >
              <div
                className="card border shadow-sm m-3 storyCard"
                style={{ width: "18rem" }}
              >
                <img
                  className="card-img-top cardImage"
                  src={story.cover}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <div className="card">
                    <h4 className="card-title">{story.title}</h4>
                    <p className="card-text story-card-text">
                      By: {story.author}
                    </p>
                    <p className="card-text story-card-text">
                      Category: {story.category}
                    </p>
                    <p className="card-text story-card-text">
                      Language: {story.Language}
                    </p>
                  </div>

                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
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
                    <button
                      className={`heart-icon btn ${
                        isStoryLiked(story._id) ? "active" : ""
                      }`}
                      onClick={() => handleFavoriteClick(story._id)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={displayedStories.length}
        paginate={paginate}
      />
    </div>
  );
};

export default StoriesList;
