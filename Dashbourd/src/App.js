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
import CommentsTable from "./Comments Page/CommentsTable";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="Aside_col col-2 col-sm-2 col-md-3 col-lg-2 ">
              <Aside />
            </div>
            <div className="Tables_col col-10 col-sm-10 col-md-9 col-lg-10 ">
              <div className="container-fluid">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/writers" element={<TableOfWriters />} />
                  <Route path="/readers" element={<TableOfReaders />} />
                  <Route path="/stories" element={<TableOfStories />} />
                  <Route path="/messages" element={<MessagesTable />} />
                  <Route path="/subUsers" element={<TableOfSubscription />} />
                  <Route path="/comments" element={<CommentsTable />} />

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
