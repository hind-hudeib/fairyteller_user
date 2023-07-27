import React from "react";

const UserTypeBotton = () => {
  return (
    <div className="m-2">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
        />
        <label className="form-check-label" for="flexRadioDefault1">
          {" "}
          Reader{" "}
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          checked
        />
        <label className="form-check-label" for="flexRadioDefault2">
          {" "}
          Writer{" "}
        </label>
      </div>
    </div>
  );
};

export default UserTypeBotton;
