import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";
import UpdateUser from "./UpdateUser"

const MainComponent = () => {
  return (
    <>
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/updateUser"  component={UpdateUser} />
      </Router>
    </>
  );
};

export default MainComponent;
