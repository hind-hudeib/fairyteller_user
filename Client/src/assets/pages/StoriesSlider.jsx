import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
const StoriesSlider = () => {
  const navigate = useNavigate();
  const [fantasyStories, setFantasyStories] = useState([]);
  const [dramaStories, setDramaStories] = useState([]);

  const fantasyCategoryType = "Fantasy";
  const dramaCategoryType = "Drama";

  useEffect(() => {
    async function getAllStories() {
      try {
        const fantasyResponse = await axios.get(
          `http://localhost:8000/all_story_by_category?category=${fantasyCategoryType}`
        );

        const fantasyStories = fantasyResponse.data.slice(0, 4);
        setFantasyStories(fantasyStories);

        const dramaResponse = await axios.get(
          `http://localhost:8000/all_story_by_category?category=${dramaCategoryType}`
        );

        const dramaStories = dramaResponse.data.slice(0, 4);
        setDramaStories(dramaStories);
      } catch (error) {
        console.log(error);
        setFantasyStories([]);
        setDramaStories([]);
      }
    }

    getAllStories();
  }, []);

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-out",
      delay: 20,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <>
      <section className="mb-5">
        <div className="container mb-5">
          <div className="row text-center ">
            <div className="col-12 p-5">
              <h3>Tales from a Realm of Fantasy ...</h3>
            </div>
          </div>
          <div className="row">
            {fantasyStories.map((story) => (
              <div
                className="card col-lg-3 col-md-6 col-sm-12 p-3 imageCard d-flex justify-content-center align-items-center"
                data-aos="zoom-out-up"
                key={story._id}
              >
                <div className="image-block image-block">
                  <div className="image-hover-overlay">
                    <Link to={`/story/${story._id}`}>
                      <h4
                        className="book-title"
                        style={{ textDecoration: "none" }}
                      >
                        {story.title}
                      </h4>
                    </Link>
                  </div>

                  <img
                    src={story.cover}
                    alt=""
                    className="w-100 h-100"
                    data-aos="zoom-out-up"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            {" "}
            <div className="col-12"></div>
          </div>
        </div>
      </section>

      {/* ************************  Drama Section  *********************** */}
      <section className="mt-5">
        <div className="container mt-5">
          <div className="row text-center mt-5">
            <div className="col-12 p-5">
              <h3>Our Captivating Drama Stories...</h3>
            </div>
          </div>
          <div className="row">
            {dramaStories.map((story) => (
              <div
                className="card col-lg-3 col-md-6 col-sm-12 p-3 imageCard d-flex justify-content-center align-items-center"
                data-aos="zoom-out-up"
                key={story._id}
              >
                <div className="image-block image-block">
                  <div className="image-hover-overlay">
                    <Link to={`/story/${story._id}`}>
                      <h4 className="book-title">{story.title}</h4>
                    </Link>{" "}
                  </div>
                  <img
                    src={story.cover}
                    alt=""
                    className="w-100 h-100"
                    data-aos="zoom-out-up"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 p-5 text-center">
              <button className="viewAll">
                <span className="hover-underline-animation">
                  {" "}
                  <Link
                    to={`/StoriesList`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "12px",
                      fontWeight: "bolder",
                    }}
                  >
                    View all stories
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
          </div>
        </div>
      </section>
    </>
  );
};

export default StoriesSlider;
