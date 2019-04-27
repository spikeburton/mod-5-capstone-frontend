import React, { Component, Fragment } from "react";
import { Modal, Grid, Segment, List, Divider } from "semantic-ui-react";
import SaveButton from "./SaveButton";
import CloseButton from "./CloseButton";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { DIRECTIONS_API } from "../data";
import DirectionListItem from "./DirectionListItem";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3Bpa2VidXJ0b24iLCJhIjoiY2p0MDhsbmpuMDEwajQzbWp4Mnd4a2hneiJ9.hejKLROWCOdlcjV6W67qHw";

class ViewModal extends Component {
  state = {
    directions: []
  };

  handleMount = () => {
    const { viewed } = this.props;
    const bounds = {
      lngA: viewed.bound_a_lng,
      latA: viewed.bound_a_lat,
      lngB: viewed.bound_b_lng,
      latB: viewed.bound_b_lat
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
      fetch(
        `${DIRECTIONS_API}/${bounds.lngA},${bounds.latA};${bounds.lngB},${
          bounds.latB
        }?geometries=geojson&overview=full&steps=true&access_token=${
          mapboxgl.accessToken
        }`
      )
        .then(response => response.json())
        .then(({ routes }) => {
          this.setState({ directions: routes[0].legs[0].steps });
          this.drawRoute(routes);
          // console.log(routes[0].legs[0].steps);
        });

      this.drawBounds(bounds);
    });
  };

  drawRoute = routes => {
    // console.log(routes[0]);
    const route = routes[0].geometry.coordinates;
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
    this.setState({
      directions: []
    });
    if (this.map) this.map.remove();
  };

  render() {
    const { viewed } = this.props;

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
        {viewed ? (
          <Fragment>
            <Modal.Header>{viewed.name}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {viewed.description}
                <Divider />
              </Modal.Description>
              <Grid centered columns={2}>
                <Grid.Column>
                  {/* <div id="directions-container" className="map-modal-child"> */}
                  {/* <p>Directions</p> */}
                  <List relaxed divided inverted>
                    {this.state.directions.map((direction, i) => (
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

export default ViewModal;
