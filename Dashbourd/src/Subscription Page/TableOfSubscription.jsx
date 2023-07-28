import React from "react";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "../css/pagination.css";

const TableOfSubscription = () => {
  const [subUsers, setSubUsers] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const [deletedWriter, setDeletedWriter] = useState([]);
  const [activeCurrentPage, setActiveCurrentPage] = useState(1);
  const [deletedCurrentPage, setDeletedCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/subusers")
      .then((response) => {
        setSubUsers(response.data);
        //  const bb = forceUpdate()
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  // Pagination Logic for Active Writers
  const indexOfLastActiveWriter = activeCurrentPage * rowsPerPage;
  const indexOfFirstActiveWriter = indexOfLastActiveWriter - rowsPerPage;
  const activeCurrentWriters = subUsers.slice(
    indexOfFirstActiveWriter,
    indexOfLastActiveWriter
  );

  const handleActivePageChange = (pageNumber) => {
    setActiveCurrentPage(pageNumber);
  };

  const activeTotalPages = Math.ceil(subUsers.length / rowsPerPage);

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
        <h5 className="text-uppercase">Subscribed users</h5>
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
                      <a href="#" className="text-danger m-1">
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
    </>
  );
};

export default TableOfSubscription;
