import "./App.css";
import React, { useEffect, useState, useReducer } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "../src/Footer";
import Dashboard from "./Dashboard";
import TableOfWriters from "./Writer page/TableOfWriters";
import TableOfReaders from "./Reader Page/TableOfReaders";
import TableOfStories from "./Story Page/TableOfStories";
import Aside from "../src/Aside";
import StoriesrequestsTable from "./Story Page/StoriesrequestsTable";
import MessagesTable from "./Messages Page/MessagesTable";
import TableOfSubscription from "./Subscription Page/TableOfSubscription";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-3 col-sm-3 col-md-3 col-lg-3 ">
              <Aside />
            </div>
            <div className="col-9 col-sm-9 col-md-9 col-lg-9 ">
              <div className="container-fluid">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/writers" element={<TableOfWriters />} />
                  <Route path="/readers" element={<TableOfReaders />} />
                  <Route path="/stories" element={<TableOfStories />} />
                  <Route path="/messages" element={<MessagesTable />} />
                  <Route path="/subUsers" element={<TableOfSubscription />} />
                  <Route
                    path="/storiesrequests"
                    element={<StoriesrequestsTable />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
