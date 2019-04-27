import React, { Component } from 'react'
import TopbarContainer from './TopbarContainer';
import MainContentContainer from './MainContentContainer';

class MainContainer extends Component {
  render() {
    return (
      <div>
        <TopbarContainer />
        <MainContentContainer />
      </div>
    )
  }
}

export default MainContainer
