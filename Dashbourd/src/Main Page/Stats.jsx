import React from "react";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";

const Stats = () => {
  const [writers, setWriters] = useState([]);
  const [reducer, forceUpdate] = useReducer((x) => x + 1, 0);
  const [readers, setReaders] = useState([]);
  const [stories, setStories] = useState([]);
  const [storiesReq, setStoriesReq] = useState([]);

  // get total of donors
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/subwriters")
      .then((response) => {
        setWriters(response.data);
        //  const bb = forceUpdate()
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        setReaders(response.data);
        //  const bb = forceUpdate()
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  //  get all story request
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/notActiveStories")
      .then((response) => {
        setStoriesReq(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  // total donation
  useEffect(() => {
    axios
      .get("http://localhost:8000/dashboard/activeStories")
      .then((response) => {
        setStories(response.data);
        // forceUpdate();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reducer]);

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/*  <!-- Earnings (Monthly) Card Example --> */}

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Subscribers
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {writers.length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-fw fa-pencil-alt"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {readers.length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-fw fa-book-open"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Stories
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {stories.length}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-fw fa-book"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  <!-- Pending Requests Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Stories requests
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {storiesReq.length}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fas fa-exclamation-circle"></i>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
