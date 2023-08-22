import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/messages.css";
import MessagesModal from "./MessagesModal";
const MessagesTable = () => {
  const [messages, setMessages] = useState([]);
  const [expandedMessages, setExpandedMessages] = useState([]);
  const [activeCurrentPage, setActiveCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/messages")
      .then((response) => {
        setMessages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleMessageExpand = (messageId) => {
    if (expandedMessages.includes(messageId)) {
      setExpandedMessages(expandedMessages.filter((id) => id !== messageId));
    } else {
      setExpandedMessages([...expandedMessages, messageId]);
    }
  };

  // Pagination Logic for Messages
  const indexOfLastActiveMessage = activeCurrentPage * rowsPerPage;
  const indexOfFirstActiveMessage = indexOfLastActiveMessage - rowsPerPage;
  const activeCurrentMessages = messages.slice(
    indexOfFirstActiveMessage,
    indexOfLastActiveMessage
  );

  const handleActivePageChange = (pageNumber) => {
    setActiveCurrentPage(pageNumber);
  };

  const activeTotalPages = Math.ceil(messages.length / rowsPerPage);
  return (
    <div>
      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 mx-auto">
              <header className="text-center">
                <h1 className="h2">Messages</h1>
              </header>
            </div>
          </div>

          {/*  */}
          <div className="container-fluid border p-3 mt-5 shadow-lg rounded">
            <h5 className="text-uppercase">Messages</h5>
            <div className="table-responsive">
              <table className="table">
                <thead className="gray-header">
                  <tr>
                    <th></th>
                    <th>Author</th>
                    <th>Email</th>
                    <th>Content</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCurrentMessages.map((message, index) => {
                    return (
                      <tr key={message._id}>
                        <td>{index + 1}</td>
                        <td>{message.name}</td>
                        <td>{message.email}</td>
                        <td className="message-cell">
                          {message.messageContent.length > 100 ? (
                            <>
                              {expandedMessages.includes(message._id) ? (
                                <>
                                  {message.messageContent}{" "}
                                  <span
                                    className="text-primary cursor-pointer"
                                    onClick={() =>
                                      toggleMessageExpand(message._id)
                                    }
                                  >
                                    Hide
                                  </span>
                                </>
                              ) : (
                                <>
                                  {message.messageContent.substring(0, 100)}{" "}
                                  <span
                                    className="text-primary cursor-pointer"
                                    onClick={() =>
                                      toggleMessageExpand(message._id)
                                    }
                                  >
                                    Read More
                                  </span>
                                </>
                              )}
                            </>
                          ) : (
                            message.messageContent
                          )}
                        </td>

                        <td>
                          <MessagesModal message={message} index={index} />

                          <a
                            href="#"
                            className="text-danger m-3"
                            onClick={() =>
                              handleDelete(message._id, message.name)
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

          {/*  */}
          {/* Pagination for Messages */}
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
        </div>
      </section>
    </div>
  );
};

export default MessagesTable;
