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
import LoginPage from "./LoginPage";

function App() {
  const [isLog, setIsLog] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (
    <>
      <BrowserRouter>
        <div className="container-fluid p-0">
          <div className="row w-100">
            <div className="Aside_col col-2 col-sm-2 col-md-3 col-lg-2">
              {isLog && <Aside isLog={isLog} updateIsLog={setIsLog} />}
            </div>
            <div className="Tables_col col-10 col-sm-10 col-md-9 col-lg-10">
              <div className="container-fluid">
                <Routes>
                  {isLog ? (
                    <>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/writers" element={<TableOfWriters />} />
                      <Route path="/readers" element={<TableOfReaders />} />
                      <Route path="/stories" element={<TableOfStories />} />
                      <Route path="/messages" element={<MessagesTable />} />
                      <Route
                        path="/subUsers"
                        element={<TableOfSubscription />}
                      />
                      <Route path="/comments" element={<CommentsTable />} />
                      <Route
                        path="/storiesrequests"
                        element={<StoriesrequestsTable />}
                      />
                    </>
                  ) : (
                    <Route
                      path="/"
                      element={<LoginPage updateIsLog={setIsLog} />}
                    />
                  )}
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
