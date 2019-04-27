import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { closeModal, fetchDirections } from "../actions/mapActions";
import ViewModal from "../components/ViewModal";

class ViewModalContainer extends Component {
  handleMount = () => {
    const { current } = this.props;
    const bounds = {
      lngA: current.bound_a_lng,
      latA: current.bound_a_lat,
      lngB: current.bound_b_lng,
      latB: current.bound_b_lat
    };

    this.map = new Map({
      container: this.mapContainer,
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

  drawPoint = (coords, name) => {
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
          "circle-radius": 9,
          "circle-color": "#203834"
        }
      });
    }
  };

  handleUnmount = () => {
    if (this.map) this.map.remove();
  };

  render() {
    return (
      <ViewModal
        open={this.props.modalOpen}
        current={this.props.current}
        route={this.props.route}
        directions={this.props.directions}
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
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewModalContainer);
