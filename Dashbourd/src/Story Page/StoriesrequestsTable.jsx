import React from "react";
import Swal from "sweetalert2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import StoryModal from "./StoryModal";

const StoriesrequestsTable = () => {
  const [stories, setStories] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);

  //  get all story request
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/notActiveStories")
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  // accept story request
  const handleAccepted = (id) => {
    axios
      .put("http://localhost:8000/dashboard/acceptStory/" + id)
      .then((response) => {
        console.log(response.data);
        forceUpdate();
      })
      .catch((error) => console.log(error.message));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Approval Granted Successfully",
      showConfirmButton: false,
      timer: 1800,
    });
    // forceUpdate();
  };

  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure you want to decline this Story?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("This request was rejected", "", "success");

        axios
          .put("http://localhost:8000/dashboard/upStory/" + id)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => console.log(error.message));
        forceUpdate();
      } else Swal.fire(" Cancelled", "", "error");
    });
  };
  return (
    <div className="container-fluid border p-3 mt-5">
      <h5>Stories Requests</h5>
      <div className="table-responsive">
        <table className="table">
          <thead className="gray-header">
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>createdAt</th>
              <th>view</th>
              <th>Actoin</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story, index) => {
              return (
                <tr key={story._id}>
                  <td>{index + 1}</td>
                  <td>{story.title}</td>
                  <td>{story.author}</td>
                  <td>{story.createdAt}</td>

                  <td>
                    {" "}
                    <StoryModal story={story} />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(story._id)}
                      className="btn btn-unstyled text-danger"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>{" "}
                    <button
                      onClick={() => handleAccepted(story._id)}
                      className="btn btn-unstyled text-success"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoriesrequestsTable;
