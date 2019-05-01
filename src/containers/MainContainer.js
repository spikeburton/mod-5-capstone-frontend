import React, { Component } from "react";
import TopbarContainer from "./TopbarContainer";
import MainContentContainer from "./MainContentContainer";
import NoUserContentContainer from "./NoUserContentContainer";

class MainContainer extends Component {
  render() {
    return (
      <div>
        <TopbarContainer />
        {localStorage.getItem("token") ? (
          <MainContentContainer />
        ) : (
          <NoUserContentContainer />
        )}
      </div>
    );
  }
}

export default MainContainer;
