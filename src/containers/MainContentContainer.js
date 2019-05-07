import React, { Component } from "react";
import { connect } from "react-redux";

import SubMenu from "../components/SubMenu";
import MainContent from "../components/MainContent";
import ViewModalContainer from "./ViewModalContainer";

import { fetchDrives } from "../actions/driveActions";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite
} from "../actions/favoriteActions";
import { openModal } from "../actions/mapActions";

class MainContentContainer extends Component {
  state = {
    page: "all"
  };

  componentDidMount() {
    this.props.fetchDrives();
    this.props.fetchFavorites();
  }

  handleMenuChange = page => {
    this.setState({ page });
  };

  handleClick = id => {
    console.log(id)
  }

  render() {
    let drives;
    if (this.state.page === "favorites") {
      const favorites = this.props.favorites.map(favorite => favorite.drive_id)
      drives = this.props.drives.filter(drive => favorites.includes(drive.id))
    } else {
      drives = this.props.drives
    }

    return (
      <div>
        <SubMenu
          active={this.state.page}
          handleMenuChange={this.handleMenuChange}
        />
        <MainContent
          drives={drives}
          handleView={this.props.openModal}
          handleSave={this.props.addFavorite}
          handleUnsave={this.props.removeFavorite}
          favorites={this.props.favorites}
          handleClick={this.handleClick}
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
    addFavorite: id => addFavorite(id)(dispatch),
    removeFavorite: id => removeFavorite(id)(dispatch),
    openModal: current => dispatch(openModal(current))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContentContainer);
