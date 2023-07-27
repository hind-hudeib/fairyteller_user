import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/recommended.css";
import AOS from "aos";
import "aos/dist/aos.css";
const Recommended = () => {
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    async function fetchTopPicks() {
      try {
        const response = await axios.get("http://localhost:8000/top_picks");
        setTopPicks(response.data);
      } catch (error) {
        console.log(error);
        setTopPicks([]);
      }
    }

    fetchTopPicks();
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
              <h3>Top Picks For You ..</h3>
            </div>
          </div>
          <div className="row">
            {topPicks.map((story) => (
              <div
                className="card col-lg-3 col-md-6 col-sm-12 p-3 imageCard d-flex justify-content-center align-items-center"
                data-aos="zoom-out-up"
                key={story._id}
              >
                <div className="image-block image-block ">
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
          <div className="row bookSectionHeader">
            {" "}
            <div className="col-2"></div>
            <div className="col-8 mt-5 p-5 text-center">
              <h4 className="darkBgTitel">
                "Our collection of stories offers a wide range of varieties,
                carefully curated to cater to the unique preferences of every
                reader."
              </h4>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recommended;
