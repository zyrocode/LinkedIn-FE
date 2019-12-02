import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./HomePage";

const MainComponent = () => {
  return (
    <>
      <Router>
        <Route path="/" exact component={HomePage} />
      </Router>
    </>
  );
};

export default MainComponent;
