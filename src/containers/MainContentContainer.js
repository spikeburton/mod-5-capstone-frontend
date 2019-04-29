import React, { Component } from "react";
import { connect } from "react-redux";

import SubMenu from "../components/SubMenu";
import MainContent from "../components/MainContent";
import ViewModalContainer from "./ViewModalContainer";

import { fetchDrives } from "../actions/driveActions";
import { openModal } from "../actions/mapActions";
import { API } from "../data";

class MainContentContainer extends Component {
  componentDidMount() {
    this.props.fetchDrives();
  }

  handleSave = id => {
    console.log(id)
    fetch(`${API}/favorites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ drive_id: id })
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
