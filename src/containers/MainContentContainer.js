import React, { Component } from "react";
import { connect } from "react-redux";

import SubMenu from "../components/SubMenu";
import MainContent from "../components/MainContent";
// import { API } from "../data";
import ViewModal from "../components/ViewModal";

import { fetchDrives } from "../actions/driveActions";

class MainContentContainer extends Component {
  // state = {
  //   drives: [],
  //   modalOpen: false,
  //   viewed: null
  // };

  // handleView = id => {
  //   this.setState({
  //     modalOpen: true,
  //     viewed: this.state.drives.find(drive => drive.id === id)
  //   });
  // };

  // closeModal = () => {
  //   this.setState({
  //     modalOpen: false,
  //     viewed: null
  //   });
  // };

  componentDidMount() {
    // fetch(`${API}/drives`)
    //   .then(response => response.json())
    //   .then(payload => this.setState({ drives: payload }));
    this.props.fetchDrives();
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <SubMenu />
        <MainContent drives={this.props.drives} handleView={this.handleView} />
        {/* <ViewModal
          modalOpen={this.state.modalOpen}
          viewed={this.state.viewed}
          closeModal={this.closeModal}
        /> */}
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
    fetchDrives: () => fetchDrives()(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContentContainer);
