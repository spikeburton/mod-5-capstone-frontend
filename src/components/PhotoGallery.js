import React, { Component } from "react";
import {
  Modal,
  Button,
  Icon,
  Image,
  Segment,
  Header,
  Card,
  Loader
} from "semantic-ui-react";

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
          <Modal.Content scrolling>
            {drive && (drive.photos.length > 0 || this.props.loading) ? (
              <Card.Group
              // centered
              itemsPerRow={3}
              stackable
              >
                {drive.photos.map((photo, i) => (
                  <Card key={i} raised>
                    <Image
                      src={photo.image_url}
                      // wrapped
                      // size="large"
                    />
                    <Card.Content>
                      <Card.Header>Added by {photo.user_id}</Card.Header>
                      <Card.Meta>{photo.created_at}</Card.Meta>
                    </Card.Content>
                  </Card>
                ))}
                {this.props.loading ? (
                  <Card raised>
                    <Segment placeholder loading style={{height: "100%"}}>
                      {/* <Loader className="workaround" active /> */}
                    </Segment>
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
            <input
              type="file"
              hidden
              ref={el => (this.uploadInput = el)}
              onChange={this.props.upload}
            />
            <Button color="black" onClick={() => this.uploadInput.click()}>
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
