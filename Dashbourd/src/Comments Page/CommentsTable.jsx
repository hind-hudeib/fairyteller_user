import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const CommentsTable = () => {
  const [comments, setComments] = useState([]);
  const [reportedComments, setReportedComments] = useState([]);
  const [activeCurrentPage, setActiveCurrentPage] = useState(1);
  const [activeCurrentPageReported, setActiveCurrentPageReported] = useState(1);

  const rowsPerPage = 3;

  useEffect(() => {
    // Fetch all comments for each comment
    axios
      .get("http://localhost:8000/dashboard/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });

    // Fetch reported comments
    axios
      .get("http://localhost:8000/dashboard/reportedcomments")
      .then((response) => {
        setReportedComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reported comments:", error);
      });
  }, []);

  //   delete a comment
  const handleDelete = (id, name) => {
    Swal.fire({
      title: ` do you want to remove ${name}?  `,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been removed `, "", "success");

        axios
          .put("http://localhost:8000/dashboard/deleteComment/" + id)
          .then((response) => {
            console.log(response.data);
          })
          .then(() => {
            forceUpdate();
          })
          .catch((error) => console.log(error.message));
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  // Pagination Logic for Comments
  const indexOfLastComment = activeCurrentPage * rowsPerPage;
  const indexOfFirstComment = indexOfLastComment - rowsPerPage;
  const activeCurrentComment = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handleActivePageChange = (pageNumber) => {
    setActiveCurrentPage(pageNumber);
  };

  const activeTotalPages = Math.ceil(comments.length / rowsPerPage);

  // Pagination Logic for Reported Comments
  const indexOfLastReportedComment = activeCurrentPageReported * rowsPerPage;
  const indexOfFirstReportedComment = indexOfLastReportedComment - rowsPerPage;
  const activeCurrentReportedComment = reportedComments.slice(
    indexOfFirstReportedComment,
    indexOfLastReportedComment
  );

  const handleReportedPageChange = (pageNumber) => {
    setActiveCurrentPageReported(pageNumber);
  };
  const activeTotalPagesForReported = Math.ceil(
    reportedComments.length / rowsPerPage
  );

  return (
    <>
      <div className="container-fluid border p-3 mt-5 shadow-lg rounded">
        <h5 className="text-uppercase">Comments</h5>
        <div className="table-responsive">
          <table className="table">
            <thead className="gray-header">
              <tr>
                <th></th>
                <th>Author</th>
                <th>content</th>
                <th>createdAt</th>
                <th>Actoin</th>
              </tr>
            </thead>
            <tbody>
              {activeCurrentComment.map((comment, index) => {
                return (
                  <tr key={comment._id}>
                    <td>{index + 1}</td>
                    <td>{comment.userId.username}</td>
                    <td>{comment.text}</td>
                    <td>{comment.timestamp}</td>

                    <td>
                      <a
                        href="#"
                        className="text-danger m-2"
                        onClick={() => handleDelete(comment._id, comment.text)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination for Active Stories */}
      <ul className="pagination justify-content-center my-3 ">
        {Array.from({ length: activeTotalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${
              index + 1 === activeCurrentPage ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handleActivePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>

      {/* Reported comments */}
      <div className="container-fluid border p-3 mt-5 shadow-lg rounded">
        <h5 className="text-uppercase">Reported comments</h5>
        <div className="table-responsive">
          <table className="table">
            <thead className="gray-header">
              <tr>
                <th></th>
                <th>Author</th>
                <th>content</th>
                <th>createdAt</th>
                <th>Actoin</th>
              </tr>
            </thead>
            <tbody>
              {activeCurrentReportedComment.map((comment, index) => {
                return (
                  <tr key={comment._id}>
                    <td>{index + 1}</td>
                    <td>{comment.userId.username}</td>
                    <td>{comment.text}</td>
                    <td>{comment.timestamp}</td>

                    <td>
                      <a
                        href="#"
                        className="text-danger m-2"
                        onClick={() => handleDelete(comment._id, comment.text)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination for Active Stories */}
      <ul className="pagination justify-content-center my-3 ">
        {Array.from({ length: activeTotalPagesForReported }, (_, index) => (
          <li
            key={index}
            className={`page-item ${
              index + 1 === activeCurrentPageReported ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handleReportedPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentsTable;
