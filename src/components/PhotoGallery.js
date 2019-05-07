import React, { Component } from "react";
import { Modal, Button, Icon, Segment, Header } from "semantic-ui-react";

class PhotoGallery extends Component {
  render() {
    return (
      <div>
        <Modal open={this.props.open} closeIcon onClose={this.props.close}>
          <Modal.Header>
            <Icon name="image" />
            Photo Gallery
          </Modal.Header>
          <Modal.Content>
            <Segment placeholder textAlign="center">
            <Header>No Photos Yet</Header>
              <span>Be The First</span>
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black">
              <Icon name="upload" />
              Upload
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default PhotoGallery;
