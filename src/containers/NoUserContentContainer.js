import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchDrives } from "../actions/driveActions";
import SubMenu from "../components/SubMenu";
import NoUserContent from "../components/NoUserContent";
import { Grid } from "semantic-ui-react";

import { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

class NoUserContentContainer extends Component {
  state = {
    page: "all"
  };

  componentDidMount() {
    this.props.fetchDrives().then(() => {
      // Grab a different random location each time
      const current = this.props.drives[
        Math.floor(Math.random() * this.props.drives.length)
      ];
      const bounds = {
        lngA: current.bound_a_lng,
        latA: current.bound_a_lat,
        lngB: current.bound_b_lng,
        latB: current.bound_b_lat
      };

      this.map = new Map({
        container: this.mapContainer,
        style: "mapbox://styles/mapbox/navigation-guidance-night-v2",
        center: [
          (bounds.lngA + bounds.lngB) / 2,
          (bounds.latA + bounds.latB) / 2
        ],
        zoom: 8
      });
    });
  }

  componentWillUnmount() {
    if (this.map) this.map.remove();
  }

  handleMenuChange = page => {
    this.setState({ page });
  };

  render() {
    return (
      <div>
        {/* <SubMenu
          active={this.state.page}
          handleMenuChange={this.handleMenuChange}
        /> */}
        {/* <NoUserContent drives={this.props.drives} /> */}
        <div id="woman">
          <h1>Welcome!</h1>
          <Grid columns={2} centered relaxed stackable>
            <Grid.Column>
              <p style={{ color: "white" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                adipisci corporis aspernatur dolore ab quod sint consectetur
                illum nostrum hic! Earum cumque possimus officia labore
                praesentium nostrum esse culpa facere?
              </p>
              {/* <Image size="medium" src={require("../images/fence.jpg")} /> */}
              <div
                ref={el => (this.mapContainer = el)}
                style={{ width: "90%", height: "400px", borderRadius: "7px" }}
              />
            </Grid.Column>
            <Grid.Column />
          </Grid>
        </div>
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
