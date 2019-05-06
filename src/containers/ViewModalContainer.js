import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { closeModal, fetchDirections } from "../actions/mapActions";
import { addFavorite, removeFavorite } from "../actions/favoriteActions";
import { drawBounds, drawPoint, drawRoute } from "../lib/mapHelpers";
import ViewModal from "../components/ViewModal";

class ViewModalContainer extends Component {
  /* ---
  When the modal is mounted in the DOM, this is when the map is drawn.
  A request is sent to the Directions API to grab the routing and directions
  data using the bounds for the current drive.
     --- */

  handleMount = () => {
    const { current } = this.props;
    const bounds = {
      lngA: current.bound_a_lng,
      latA: current.bound_a_lat,
      lngB: current.bound_b_lng,
      latB: current.bound_b_lat
    };

    this.map = new Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/navigation-guidance-day-v2",
      center: [
        (bounds.lngA + bounds.lngB) / 2,
        (bounds.latA + bounds.latB) / 2
      ],
      zoom: 8
    });

    this.map.on("load", () => {
      this.props.fetchDirections(bounds).then(() => {
        drawBounds(this.map, bounds);
        drawRoute(this.map, this.props.route);
      });
    });
  };

  handleUnmount = () => {
    if (this.map) this.map.remove();
  };

  /* ---
  These methods handle events that happen in the view modal,
  inside the list of direction steps.
  Clicking on the step name zooms the map in to the coordinates
  for that step.
  When the mouse enters a list item, a point is drawn at the coordinates
  for that step on the map.
  When the mouse leaves that area, the point is removed from the map.
     --- */

  handleZoomToStep = coords => {
    // console.log(coords)
    this.map.flyTo({
      center: coords,
      zoom: 14
    });
  };

  handleMouseEnter = coords => {
    drawPoint(this.map, coords, "step", 6, "#008330");
  };

  handleMouseLeave = () => {
    if (this.map.getSource("step")) {
      this.map.removeLayer("step");
      this.map.removeSource("step");
    }
  };

  render() {
    const favorites = this.props.favorites.map(favorite => favorite.drive_id);
    const saved = this.props.current
      ? favorites.includes(this.props.current.id)
      : false;

    return (
      <ViewModal
        open={this.props.modalOpen}
        current={this.props.current}
        route={this.props.route}
        directions={this.props.directions}
        saved={
          saved
            ? this.props.favorites.find(
                f => f.drive_id === this.props.current.id
              )
            : false
        }
        handleMount={this.handleMount}
        handleUnmount={this.handleUnmount}
        handleClose={this.props.closeModal}
        handleSave={this.props.handleSave}
        handleUnsave={this.props.handleUnsave}
        handleZoomToStep={this.handleZoomToStep}
        handleMouseEnter={this.handleMouseEnter}
        handleMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    modalOpen: state.map.modalOpen,
    current: state.map.current,
    route: state.map.route,
    directions: state.map.directions,
    favorites: state.favorites.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDirections: bounds => fetchDirections(bounds)(dispatch),
    closeModal: () => dispatch(closeModal()),
    handleSave: id => addFavorite(id)(dispatch),
    handleUnsave: id => removeFavorite(id)(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewModalContainer);
