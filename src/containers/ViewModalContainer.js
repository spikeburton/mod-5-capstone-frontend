import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { closeModal, fetchDirections } from "../actions/mapActions";
import { addFavorite, removeFavorite } from "../actions/favoriteActions";
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
        this.drawBounds(bounds);
        this.drawRoute(this.props.route);
      });
    });
  };

  drawRoute = route => {
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route
      }
    };

    if (this.map.getSource("route")) {
      this.map.getSource("route").setData(geojson);
    } else {
      // make a new request
      this.map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson
        },
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#203834",
          "line-width": 7,
          "line-opacity": 0.75
        }
      });
    }
  };

  drawBounds = bounds => {
    this.drawPoint([bounds.lngA, bounds.latA], "A");
    this.drawPoint([bounds.lngB, bounds.latB], "B");
  };

  drawPoint = (coords, name, radius = 9, color = "#203834") => {
    const pointData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: coords
          }
        }
      ]
    };

    if (this.map.getLayer(name)) {
      this.map.getSource(name).setData(pointData);
    } else {
      this.map.addLayer({
        id: name,
        type: "circle",
        source: {
          type: "geojson",
          data: pointData
        },
        paint: {
          "circle-radius": radius,
          "circle-color": color
        }
      });
    }
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
    this.drawPoint(coords, "step", 6, "#008330");
  };

  handleMouseLeave = () => {
    if (this.map.getSource("step")) {
      this.map.removeLayer("step");
      this.map.removeSource("step");
    }
  };

  render() {
    return (
      <ViewModal
        open={this.props.modalOpen}
        current={this.props.current}
        route={this.props.route}
        directions={this.props.directions}
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
    directions: state.map.directions
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
