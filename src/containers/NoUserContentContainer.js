import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchDrives } from "../actions/driveActions";
import SubMenu from "../components/SubMenu";
import NoUserContent from "../components/NoUserContent";

class NoUserContentContainer extends Component {
  state = {
    page: "all"
  };

  componentDidMount() {
    this.props.fetchDrives();
  }

  handleMenuChange = page => {
    this.setState({ page });
  };

  render() {
    return (
      <div>
        <SubMenu
          active={this.state.page}
          handleMenuChange={this.handleMenuChange}
        />
        <NoUserContent drives={this.props.drives} />
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
)(NoUserContentContainer);
