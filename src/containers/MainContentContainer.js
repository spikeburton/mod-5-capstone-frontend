import React, { Component } from "react";
import { connect } from "react-redux";

import SubMenu from "../components/SubMenu";
import MainContent from "../components/MainContent";
import ViewModalContainer from "./ViewModalContainer";

import { fetchDrives } from "../actions/driveActions";
import { openModal } from "../actions/mapActions";
import { API } from "../data";

class MainContentContainer extends Component {
  state = {
    favorites: []
  }

  componentDidMount() {
    this.props.fetchDrives();
    fetch(`${API}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then(response => response.json())
    .then(({ user }) => {
      this.setState({
        favorites: user.favorites
      })
    })
  }

  handleSave = id => {
    fetch(`${API}/favorites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ drive_id: id })
    })
    .then(response => response.json())
    .then(console.log)
  }

  handleUnsave = id => {
    fetch(`${API}/favorites`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ drive_id: id })
    })
    .then(response => response.json())
    .then(console.log)
  }

  render() {
    return (
      <div>
        <SubMenu />
        <MainContent
          drives={this.props.drives}
          handleView={this.props.openModal}
          handleSave={this.handleSave}
          handleUnsave={this.handleUnsave}
          favorites={this.state.favorites.map(favorite => favorite.drive_id)}
        />
        <ViewModalContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drives: state.drives.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDrives: () => fetchDrives()(dispatch),
    openModal: current => dispatch(openModal(current))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContentContainer);
