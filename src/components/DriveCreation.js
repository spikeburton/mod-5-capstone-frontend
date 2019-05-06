import React, { Component } from "react";
import { Container, Segment, Grid, Loader, Modal } from "semantic-ui-react";

class DriveCreation extends Component {
  render() {
    return (
      <Container>
        <Segment>
          <Grid columns="2" stackable reversed="mobile">
            <Grid.Column>
              <p>Current longitude: {this.props.lng}</p>
              <p>Current latitude: {this.props.lat}</p>
            </Grid.Column>
            <Grid.Column>
              <div
                id="create-map-container"
                style={{ width: "100%", height: "400px", borderRadius: "7px" }}
              />
            </Grid.Column>
          </Grid>
          <Modal open={!(this.props.lat && this.props.lng)}>
            <Loader active size="massive" />
          </Modal>
        </Segment>
      </Container>
    );
  }
}

export default DriveCreation;
