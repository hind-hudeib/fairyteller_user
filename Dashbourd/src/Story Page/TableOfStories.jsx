import React from "react";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import StoryModal from "./StoryModal";
import "../css/pagination.css";

const TableOfStories = () => {
  const [stories, setStories] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const [deletedStory, setDeletedStory] = useState([]);
  const [activeCurrentPage, setActiveCurrentPage] = useState(1);
  const [deletedCurrentPage, setDeletedCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/notActiveStories")
      .then((response) => {
        setDeletedStory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/activeStories")
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

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
          .put("http://localhost:8000/dashboard/upStory/" + id)
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

  const handleRestoreStory = (id, name) => {
    Swal.fire({
      title: `Do you want to restore ${name}?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`${name} has been restored.`, "", "success");

        axios
          .put("http://localhost:8000/dashboard/restoreStory/" + id)
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

  // Pagination Logic for Active Stories
  const indexOfLastActiveStory = activeCurrentPage * rowsPerPage;
  const indexOfFirstActiveStory = indexOfLastActiveStory - rowsPerPage;
  const activeCurrentStories = stories.slice(
    indexOfFirstActiveStory,
    indexOfLastActiveStory
  );

  const handleActivePageChange = (pageNumber) => {
    setActiveCurrentPage(pageNumber);
  };

  const activeTotalPages = Math.ceil(stories.length / rowsPerPage);

  // Pagination Logic for Deleted Stories
  const indexOfLastDeletedStory = deletedCurrentPage * rowsPerPage;
  const indexOfFirstDeletedStory = indexOfLastDeletedStory - rowsPerPage;
  const deletedCurrentStories = deletedStory.slice(
    indexOfFirstDeletedStory,
    indexOfLastDeletedStory
  );

  const handleDeletedPageChange = (pageNumber) => {
    setDeletedCurrentPage(pageNumber);
  };

  const deletedTotalPages = Math.ceil(deletedStory.length / rowsPerPage);

  return (
    <>
      <div className="container-fluid border p-3 mt-5 shadow-lg rounded">
        <h5 className="text-uppercase">Stories</h5>
        <div className="table-responsive">
          <table className="table">
            <thead className="gray-header">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>createdAt</th>
                <th>Actoin</th>
              </tr>
            </thead>
            <tbody>
              {activeCurrentStories.map((story, index) => {
                return (
                  <tr key={story._id}>
                    <td>{index + 1}</td>
                    <td>{story.title}</td>
                    <td>{story.author}</td>
                    <td>{story.createdAt}</td>

                    <td>
                      <StoryModal story={story} />

                      <a
                        href="#"
                        className="text-danger m-2"
                        onClick={() => handleDelete(story._id, story.title)}
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

      {/* **** deleted stories **** */}

      <div className="container-fluid border p-3 mt-5 shadow-lg rounded">
        <h5 className="text-uppercase">Deleted Stories</h5>
        <div className="table-responsive">
          <table className="table">
            <thead className="gray-header">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>createdAt</th>
                <th>Actoin</th>
              </tr>
            </thead>
            <tbody>
              {deletedCurrentStories.map((stories, index) => {
                return (
                  <tr key={stories._id}>
                    <td>{index + 1}</td>
                    <td>{stories.title}</td>
                    <td>{stories.author}</td>
                    <td>{stories.createdAt}</td>

                    <td>
                      <a
                        href="#"
                        className="text-sucendary m-1"
                        onClick={() =>
                          handleRestoreStory(stories._id, stories.title)
                        }
                      >
                        <i className="fas fa-sync-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination for Deleted Stories */}
      <ul className="pagination justify-content-center my-3">
        {Array.from({ length: deletedTotalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${
              index + 1 === deletedCurrentPage ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handleDeletedPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TableOfStories;
