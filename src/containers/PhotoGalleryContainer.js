import React, { Component } from "react";
import PhotoGallery from "../components/PhotoGallery";

class PhotoGalleryContainer extends Component {
  render() {
    return (
      <div>
        <PhotoGallery
          open={this.props.open}
          close={this.props.close}
          drive={this.props.drive}
        />
      </div>
    );
  }
}

export default PhotoGalleryContainer;
