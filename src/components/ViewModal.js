import React, { Component, Fragment } from "react";
import { Modal, Grid, Segment } from "semantic-ui-react";
import SaveButton from "./SaveButton";
import CloseButton from "./CloseButton";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3Bpa2VidXJ0b24iLCJhIjoiY2p0MDhsbmpuMDEwajQzbWp4Mnd4a2hneiJ9.hejKLROWCOdlcjV6W67qHw";

class ViewModal extends Component {
  handleMount = () => {
    const { viewed } = this.props;
    const bounds = {
      lngA: viewed.bound_a_lng,
      latA: viewed.bound_a_lat,
      lngB: viewed.bound_b_lng,
      latB: viewed.bound_b_lat
    }

    this.map = new Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/navigation-guidance-day-v2",
      center: [bounds.lngA, bounds.latA],
      zoom: 7
    });
  };

  render() {
    const { viewed } = this.props;

    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.props.closeModal}
        onMount={this.handleMount}
        closeIcon
        // basic
        dimmer="blurring"
      >
        {viewed ? (
          <Fragment>
            <Modal.Header>{viewed.name}</Modal.Header>
            <Modal.Content>
              <Grid centered columns={2}>
                <Grid.Column>
                  <p>{viewed.description}</p>
                  <p>Directions</p>
                </Grid.Column>
                <Grid.Column>
                  <div
                    id="map-container"
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
