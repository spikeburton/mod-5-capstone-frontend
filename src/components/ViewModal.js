import React, { Component, Fragment } from "react";
import { Modal, Grid, Segment, List, Divider, Loader } from "semantic-ui-react";

import SaveButton from "./SaveButton";
import CloseButton from "./CloseButton";
import DirectionListItem from "./DirectionListItem";

class ViewModal extends Component {
  render() {
    const { current } = this.props;

    return (
      <Modal
        open={this.props.open}
        onClose={this.props.handleClose}
        onMount={this.props.handleMount}
        onUnmount={this.props.handleUnmount}
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
                  <div id="directions-container">
                    {this.props.directions.length > 0 ? (
                      <List relaxed animated divided inverted>
                        {this.props.directions.map((direction, i) => (
                          <DirectionListItem key={i} {...direction} />
                        ))}
                      </List>
                    ) : (
                      <Loader>Loading</Loader>
                    )}
                  </div>
                </Grid.Column>
                <Grid.Column>
                  {/* THIS IS WHERE THE MAP LIVES */}
                  <div id="map-container" />
                  {/* INSIDE THIS DIV */}
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
