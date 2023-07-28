import React from "react";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "../css/pagination.css";
const TableOfWriters = () => {
  const [writers, setWriters] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const [deletedWriter, setDeletedWriter] = useState([]);
  const [activeCurrentPage, setActiveCurrentPage] = useState(1);
  const [deletedCurrentPage, setDeletedCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/usersNotActive")
      .then((response) => {
        setDeletedWriter(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/users")
      .then((response) => {
        setWriters(response.data);
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
          .put("http://localhost:8000/dashboard/deleteuser/" + id)
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

  const handleRestoreWriter = (id, name) => {
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
          .put("http://localhost:8000/dashboard/restoreUser/" + id)
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

  // Pagination Logic for Active Writers
  const indexOfLastActiveWriter = activeCurrentPage * rowsPerPage;
  const indexOfFirstActiveWriter = indexOfLastActiveWriter - rowsPerPage;
  const activeCurrentWriters = writers.slice(
    indexOfFirstActiveWriter,
    indexOfLastActiveWriter
  );

  const handleActivePageChange = (pageNumber) => {
    setActiveCurrentPage(pageNumber);
  };

  const activeTotalPages = Math.ceil(writers.length / rowsPerPage);

  // Pagination Logic for Deleted Writers
  const indexOfLastDeletedWriter = deletedCurrentPage * rowsPerPage;
  const indexOfFirstDeletedWriter = indexOfLastDeletedWriter - rowsPerPage;
  const deletedCurrentWriters = deletedWriter.slice(
    indexOfFirstDeletedWriter,
    indexOfLastDeletedWriter
  );

  const handleDeletedPageChange = (pageNumber) => {
    setDeletedCurrentPage(pageNumber);
  };

  const deletedTotalPages = Math.ceil(deletedWriter.length / rowsPerPage);

  return (
    <>
      <div className="container-fluid border p-3 mt-5 shadow-lg rounded">
        <h5>USERS</h5>
        <div className="table-responsive">
          <table className="table">
            <thead className="gray-header">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Subscriber</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeCurrentWriters.map((writer, index) => {
                return (
                  <tr key={writer._id}>
                    <td>{index + 1}</td>
                    <td>{writer.username}</td>
                    <td>{writer.email}</td>
                    <td>
                      {writer && writer.subscriber ? (
                        <i className="fas fa-check  text-success"></i>
                      ) : (
                        <i className="fa fa-times  text-danger"></i>
                      )}
                    </td>

                    <td>
                      <a
                        href="#"
                        className="text-danger m-1"
                        onClick={() =>
                          handleDelete(writer._id, writer.username)
                        }
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

      {/* Pagination for Active Writers */}
      <ul className="pagination justify-content-center my-3">
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

      {/* **** deleted Writers **** */}

      <div className="container-fluid border p-3 mt-5 shadow-lg rounded">
        <h5>DELETED USERS</h5>
        <div className="table-responsive">
          <table className="table">
            <thead className="gray-header">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subscriber</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deletedCurrentWriters.map((writers) => {
                return (
                  <tr key={writers._id}>
                    <td>1</td>
                    <td>{writers.username}</td>
                    <td>{writers.email}</td>
                    <td>
                      {writers && writers.subscriber ? (
                        <i className="fas fa-check  text-success"></i>
                      ) : (
                        <i className="fa fa-times  text-danger"></i>
                      )}
                    </td>
                    <td>
                      <a
                        href="#"
                        className="text-sucendary m-1"
                        onClick={() =>
                          handleRestoreWriter(writers._id, writers.username)
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
      {/* Pagination for Deleted Writers */}
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

export default TableOfWriters;
