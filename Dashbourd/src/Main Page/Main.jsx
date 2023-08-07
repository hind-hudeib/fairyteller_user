import React from "react";
import Stats from "./Stats";
import TableOfWriters from "../Writer page/TableOfWriters";
import TableOfStories from "../Story Page/TableOfStories";
import TableOfSubscription from "../Subscription Page/TableOfSubscription";
const Main = () => {
  return (
    <div className="container-fluid mb-5">
      <div className="row mb-5">
        <div className="col-12">
          <Stats />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <TableOfWriters />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <TableOfSubscription />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 mb-5">
          <TableOfStories />
        </div>
      </div>
    </div>
  );
};

export default Main;
