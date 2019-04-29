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
  componentDidMount() {
    this.props.fetchDrives();
    this.props.fetchFavorites();
  }

  render() {
    return (
      <div>
        <SubMenu />
        <MainContent
          drives={this.props.drives}
          handleView={this.props.openModal}
          handleSave={this.props.addFavorite}
          handleUnsave={this.props.removeFavorite}
          favorites={this.props.favorites}
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
