import React, { Component } from "react";
import { Modal, Button, Icon, Segment, Header, Image } from "semantic-ui-react";

class PhotoGallery extends Component {
  render() {
    console.log(this.props.drive);
    const { drive } = this.props;

    return (
      <div>
        <Modal open={this.props.open} closeIcon onClose={this.props.close}>
          <Modal.Header>
            <Icon name="image" />
            Photo Gallery
          </Modal.Header>
          <Modal.Content>
            {drive && drive.photos.length > 0 ? (
              drive.photos.map((photo, i) => (
                <Image key={i} src={photo.image_url} wrapped size="medium" />
              ))
            ) : (
              <Segment placeholder textAlign="center">
                <Header>No Photos Yet</Header>
                <span>Be The First</span>
              </Segment>
            )}
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => this.props.upload()}>
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
