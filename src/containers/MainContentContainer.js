import React, { Component } from "react";
import { connect } from "react-redux";

import SubMenu from "../components/SubMenu";
import MainContent from "../components/MainContent";
import ViewModalContainer from "./ViewModalContainer";

import { fetchDrives } from "../actions/driveActions";
import { fetchFavorites } from "../actions/favoriteActions";
import { openModal } from "../actions/mapActions";
import { API } from "../data";

class MainContentContainer extends Component {
  state = {
    favorites: []
  }

  componentDidMount() {
    this.props.fetchDrives();
    this.props.fetchFavorites();
    // fetch(`${API}/profile`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   }
    // })
    // .then(response => response.json())
    // .then(({ user }) => {
    //   this.setState({
    //     favorites: user.favorites
    //   })
    // })
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
    .then(payload => {
      this.setState({
        favorites: [
          ...this.state.favorites,
          payload
        ]
      })
    })
  }

  handleUnsave = id => {
    fetch(`${API}/favorites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(() => {
      const i = this.state.favorites.findIndex(cur => cur.id === id)
      this.setState({
        favorites: [
          ...this.state.favorites.slice(0, i),
          ...this.state.favorites.slice(i + 1)
        ]
      })
    })
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
          favorites={this.state.favorites}
        />
        <ViewModalContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drives: state.drives.data,
    favorites: state.favorites.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDrives: () => fetchDrives()(dispatch),
    fetchFavorites: () => fetchFavorites()(dispatch),
    openModal: current => dispatch(openModal(current))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContentContainer);
