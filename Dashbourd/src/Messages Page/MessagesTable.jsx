import React from "react";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "../css/messages.css";
import MessagesModal from "./MessagesModal";
const MessagesTable = () => {
  const [messages, setMessages] = useState([]);
  const [showReplyIndex, setShowReplyIndex] = useState(-1);
  const [showAddToSection, setShowAddToSection] = useState(-1);
  const [selectedOption, setSelectedOption] = useState("");
  const [reply, setReplyContent] = useState("");
  const [expandedMessages, setExpandedMessages] = useState([]);
  const [activeCurrentPage, setActiveCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleReplyClick = (index) => {
    setShowReplyIndex(index);
  };
  const handleAddClick = (index) => {
    setShowAddToSection(index);
  };

  const handleReplyChange = (event) => {
    setReplyContent(event.target.value);
  };
  const handleSendReply = (message) => {
    const updatedMessage = {
      ...message,
      reply: reply,
    };

    axios.put(`http://localhost:8000/dashboard/messagesReplay/${message._id}`, {
      reply,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Replay sent Successfully",
      showConfirmButton: false,
      timer: 1800,
    })
      .then((response) => {
        console.log("Reply sent successfully");
        setShowReplyIndex(-1);
        setReplyContent("");
      })
      .catch((error) => {
        console.error("Error sending reply:", error);
      });
  };
  const handleSelectType = (message) => {
    axios
      .put(`http://localhost:8000/dashboard/selectMessageType/${message._id}`, {
        type: selectedOption,
      })
      .then((response) => {
        console.log("Message type updated:", response.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message type selected Successfully",
          showConfirmButton: false,
          timer: 1800,
        });
        setShowAddToSection(-1);
      })
      .catch((error) => {
        console.error("Error updating message type:", error);
      });
  };

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
          {/* <div className="row">
            <div className="col-lg-3 mx-auto">
              <header className="text-center pb-5">
                <h1 className="h2">Messages</h1>
              </header>
            </div>
          </div> */}

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
