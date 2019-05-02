import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

class TopbarContainer extends Component {
  render() {
    const colors = [
      "#cddd3f",
      "#e0ee5f",
      "#e9e65b",
      "#a9e49a",
      "#8dd8b9",
      "#2fcab5",
      "#5dafd4",
      "#6483d6",
      "#6761c9",
      "#ab6dcf"
    ];

    return (
      <div>
        <div
          id="topbar-container"
          style={{
            background: localStorage.getItem("token")
              ? "#aab4b2"
              : colors[Math.floor(Math.random() * colors.length)]
          }}
        >
          <Navbar active="main" />
          <Topbar />
        </div>
      </div>
    );
  }
}

export default TopbarContainer;
