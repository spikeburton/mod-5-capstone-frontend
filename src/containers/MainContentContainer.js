import React, { Component } from 'react'
import SubMenu from '../components/SubMenu';
import MainContent from '../components/MainContent';

class MainContentContainer extends Component {
  render() {
    return (
      <div>
        <SubMenu />
        <MainContent />
      </div>
    )
  }
}

export default MainContentContainer
