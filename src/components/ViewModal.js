import React, { Component, Fragment } from "react";
import { Modal, Grid } from "semantic-ui-react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = "pk.eyJ1Ijoic3Bpa2VidXJ0b24iLCJhIjoiY2p0MDhsbmpuMDEwajQzbWp4Mnd4a2hneiJ9.hejKLROWCOdlcjV6W67qHw"

class ViewModal extends Component {
  handleMount = () => {
    console.log("Modal mounted");

  };

  render() {
    const { viewed } = this.props;

    return (
      <Modal
        open={this.props.modalOpen}
        onClose={this.props.closeModal}
        onMount={this.handleMount}
      >
        {viewed ? (
          <Fragment>
            <Modal.Header>{viewed.name}</Modal.Header>
            <Modal.Content>
              <Grid centered columns={2}>
                <Grid.Column>
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
          </Fragment>
        ) : null}
      </Modal>
    );
  }
}

export default ViewModal;
