import React, { Component, Fragment } from "react";
import {
  Modal,
  Grid,
  Segment,
  List,
  Divider,
  Loader,
  Button,
  Icon
} from "semantic-ui-react";

import SaveButton from "./SaveButton";
import UnsaveButton from "./UnsaveButton";
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
              <Grid centered columns={2} stackable reversed="mobile">
                <Grid.Column>
                  <div id="directions-container">
                    {this.props.directions.length > 0 ? (
                      <List relaxed animated divided inverted>
                        {this.props.directions.map((direction, i) => (
                          <DirectionListItem
                            key={i}
                            handleMouseEnter={this.props.handleMouseEnter}
                            handleMouseLeave={this.props.handleMouseLeave}
                            handleZoomToStep={this.props.handleZoomToStep}
                            {...direction}
                          />
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
              <Button color={current.photos.length > 0 ? "blue" : ""} onClick={this.props.openGallery}>
                <Icon name="picture" />
                Photos
              </Button>
              {/* <CloseButton handleClose={this.props.handleClose} /> */}
              {this.props.saved ? (
                <UnsaveButton
                  handleUnsave={this.props.handleUnsave}
                  id={this.props.saved.id}
                />
              ) : (
                <SaveButton
                  handleSave={this.props.handleSave}
                  id={current.id}
                />
              )}
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
