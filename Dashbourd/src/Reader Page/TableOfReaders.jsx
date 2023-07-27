import React from "react";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";

const TableOfReaders = () => {
  const [readers, setReaders] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const [deletedReader, setDeletedReader] = useState([]);
  const [activeCurrentPage, setActiveCurrentPage] = useState(1);
  const [deletedCurrentPage, setDeletedCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/readersNotActive")
      .then((response) => {
        setDeletedReader(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  // get all donors
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/readers")
      .then((response) => {
        setReaders(response.data);
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` ${name} has been removed `, "", "success");

        axios
          .put("http://localhost:8000/dashboard/upReader/" + id)
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

  const handleRestoreReader = (id, name) => {
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
          .put("http://localhost:8000/dashboard/restoreReader/" + id)
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

  // Pagination Logic for Active Readers
  const indexOfLastActiveReader = activeCurrentPage * rowsPerPage;
  const indexOfFirstActiveReader = indexOfLastActiveReader - rowsPerPage;
  const activeCurrentReaders = readers.slice(
    indexOfFirstActiveReader,
    indexOfLastActiveReader
  );

  const handleActivePageChange = (pageNumber) => {
    setActiveCurrentPage(pageNumber);
  };

  const activeTotalPages = Math.ceil(readers.length / rowsPerPage);

  // Pagination Logic for Deleted Readers
  const indexOfLastDeletedReader = deletedCurrentPage * rowsPerPage;
  const indexOfFirstDeletedReader = indexOfLastDeletedReader - rowsPerPage;
  const deletedCurrentReaders = deletedReader.slice(
    indexOfFirstDeletedReader,
    indexOfLastDeletedReader
  );

  const handleDeletedPageChange = (pageNumber) => {
    setDeletedCurrentPage(pageNumber);
  };

  const deletedTotalPages = Math.ceil(deletedReader.length / rowsPerPage);

  return (
    <>
      <div className="container-fluid border p-3 mt-5 ">
        <h5>Readers</h5>
        <div className="table-responsive">
          <table className="table">
            <thead className="gray-header">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {activeCurrentReaders.map((reader, index) => (
                <tr key={reader._id}>
                  <td>{index + 1}</td>
                  <td>{reader.username}</td>
                  <td>{reader.email}</td>
                  <td>
                    <a
                      href="#"
                      className="text-danger m-1"
                      onClick={() => handleDelete(reader._id, reader.username)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination for Active Readers */}
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
      {/* **** deleted Readers **** */}

      <div className="container-fluid border p-3 mt-5">
        <h5>Deleted Readers</h5>
        <div className="table-responsive">
          <table className="table">
            <thead className="gray-header">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deletedCurrentReaders.map((readers) => {
                return (
                  <tr key={readers._id}>
                    <td>1</td>
                    <td>{readers.username}</td>
                    <td>{readers.email}</td>
                    <td>
                      <a
                        href="#"
                        className="text-sucendary m-1"
                        onClick={() =>
                          handleRestoreReader(readers._id, readers.username)
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
      {/* Pagination for Deleted Readers */}
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

export default TableOfReaders;
