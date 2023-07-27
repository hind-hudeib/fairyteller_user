import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="pagination-container">
      <nav>
        {" "}
        <ul className="pagination justify-content-center">
          {pageNumber.map((number) => (
            <li key={number} className="page-item">
              <a
                href="#"
                className="page-link"
                onClick={() => paginate(number)}
              >
                {" "}
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
