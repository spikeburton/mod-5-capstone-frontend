import React, { Component } from "react";
import SubMenu from "../components/SubMenu";
import MainContent from "../components/MainContent";
import { API } from "../data";
import ViewModal from "../components/ViewModal";

class MainContentContainer extends Component {
  state = {
    drives: [],
    modalOpen: false,
    viewed: null
  };

  handleView = id => {
    this.setState({
      modalOpen: true,
      viewed: this.state.drives.find(drive => drive.id === id)
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      viewed: null
    });
  };

  componentDidMount() {
    fetch(`${API}/drives`)
      .then(response => response.json())
      .then(payload => this.setState({ drives: payload }));
  }

  render() {
    return (
      <div>
        <SubMenu />
        <MainContent drives={this.state.drives} handleView={this.handleView} />
        <ViewModal
          modalOpen={this.state.modalOpen}
          viewed={this.state.viewed}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default MainContentContainer;
