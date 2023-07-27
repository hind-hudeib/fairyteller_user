import React from "react";
import { Link } from "react-router-dom";
import "../css/storiesList.css";

const Posts = ({ posts, loading, post, handleClick }) => {
  const cardSets = [];
  const cardsPerSet = 4;
  if (loading) {
    return <h3>Loading ...</h3>;
  }

  if (!posts || posts.length === 0) {
    return <h3>No posts found.</h3>;
  }

  // Divide the posts array into sets of four cards each
  for (let i = 0; i < posts.length; i += cardsPerSet) {
    const cardSet = posts.slice(i, i + cardsPerSet);
    cardSets.push(cardSet);
  }

  // Divide the Stories array into sets of four cards each
  for (let i = 0; i < posts.length; i += cardsPerSet) {
    const cardSet = posts.slice(i, i + cardsPerSet);
    cardSets.push(cardSet);
  }

  return (
    <>
      <div className="card-container d-flex flex-wrap flex-column align-items-center justify-content-center ">
        {cardSets.map((posts, index) => (
          <div
            className="card-set book-item d-flex m-3 "
            key={index}
            onClick={() => handleClick(post)}
          >
            {posts.map((post) => (
              <div className="row" key={post.id}>
                <div
                  className="card border shadow-sm m-3"
                  style={{ width: "18rem" }}
                  key={post.id}
                >
                  <img
                    className="card-img-top cardImage"
                    src={post.img}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{post.title}</h4>
                    <h6 className="card-title">{post.author}</h6>
                    <hr />

                    <button class="viewAll">
                      <span class="hover-underline-animation">
                        {" "}
                        <Link
                          to={`/story/${post.id}`}
                          {...post}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontSize: "12px",
                          }}
                        >
                          Read Now{" "}
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
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
