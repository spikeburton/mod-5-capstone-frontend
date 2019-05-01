import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

class TopbarContainer extends Component {
  render() {
    return (
      <div>
        <div id="topbar-container">
        <Navbar active="main" />
          <Topbar />
        </div>
      </div>
    );
  }
}

export default TopbarContainer;
