import React, { Component } from 'react'
import SubMenu from '../components/SubMenu';
import MainContent from '../components/MainContent';
import { API } from '../data';

class MainContentContainer extends Component {
  state = {
    drives: []
  }

  componentDidMount() {
    fetch(`${API}/drives`)
    .then(response => response.json())
    .then(payload => this.setState({drives: payload}))
  }

  render() {
    return (
      <div>
        <SubMenu />
        <MainContent drives={this.state.drives} />
      </div>
    )
  }
}

export default MainContentContainer
