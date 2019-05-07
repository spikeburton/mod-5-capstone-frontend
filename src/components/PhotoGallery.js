import React, { Component, Fragment } from "react";
import {
  Modal,
  Button,
  Icon,
  Image,
  Segment,
  Header,
  Card
} from "semantic-ui-react";

class PhotoGallery extends Component {
  render() {
    const { drive, photos } = this.props;

    return (
      <div>
        <Modal
          open={this.props.open}
          closeIcon
          onClose={this.props.close}
          onMount={this.props.handleMount}
        >
          <Modal.Header>
            <Icon name="image" />
            Photo Gallery
          </Modal.Header>
          <Modal.Content scrolling>
            {photos && (photos.length > 0 || this.props.loading) ? (
              <Card.Group
                // centered
                itemsPerRow={3}
                stackable
              >
                {photos.map((photo, i) => (
                  <Card key={i} raised>
                    <Image
                      src={photo.image_url}
                      // wrapped
                    />
                    <Card.Content>
                      <Card.Header>Added by {photo.user_id}</Card.Header>
                      <Card.Meta>{photo.created_at}</Card.Meta>
                    </Card.Content>
                  </Card>
                ))}
                {this.props.loading ? (
                  <Card raised>
                    <Segment placeholder loading style={{ height: "100%" }} />
                  </Card>
                ) : null}
              </Card.Group>
            ) : (
              <Segment placeholder textAlign="center">
                <Header>No Photos Yet</Header>
                <span>Be The First</span>
              </Segment>
            )}
          </Modal.Content>
          <Modal.Actions>
            {drive ? (
              <Fragment>
                <input
                  type="file"
                  hidden
                  ref={el => (this.uploadInput = el)}
                  onChange={() =>
                    this.props.upload(this.uploadInput.files, drive.id)
                  }
                />
                <Button color="black" onClick={() => this.uploadInput.click()}>
                  <Icon name="upload" />
                  Upload
                </Button>
              </Fragment>
            ) : null}
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default PhotoGallery;
