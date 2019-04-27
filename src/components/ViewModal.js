import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal, Grid, Segment, List, Divider } from "semantic-ui-react";
import { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import SaveButton from "./SaveButton";
import CloseButton from "./CloseButton";
import DirectionListItem from "./DirectionListItem";

import { closeModal, fetchDirections } from "../actions/mapActions";

class ViewModal extends Component {
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
    const { current } = this.props;

    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.props.closeModal}
        onMount={this.handleMount}
        onUnmount={this.handleUnmount}
        closeIcon
        basic
        // dimmer="blurring"
      >
        {current ? (
          <Fragment>
            <Modal.Header>{current.name}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {current.description}
                <Divider />
              </Modal.Description>
              <Grid centered columns={2}>
                <Grid.Column>
                  {/* <div id="directions-container" className="map-modal-child"> */}
                  {/* <p>Directions</p> */}
                  <List relaxed divided inverted>
                    {this.props.directions.map((direction, i) => (
                      <DirectionListItem key={i} {...direction} />
                    ))}
                  </List>
                  {/* </div> */}
                </Grid.Column>
                <Grid.Column>
                  <div
                    id="map-container"
                    className="map-modal-child"
                    ref={el => (this.mapContainer = el)}
                  />
                </Grid.Column>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <CloseButton />
              <SaveButton />
            </Modal.Actions>
          </Fragment>
        ) : (
          <Segment placeholder />
        )}
      </Modal>
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
)(ViewModal);
