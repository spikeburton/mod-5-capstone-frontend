import React, { Component } from "react";
import PhotoGallery from "../components/PhotoGallery";

class PhotoGalleryContainer extends Component {
  render() {
    return (
      <div>
        <PhotoGallery
          open={this.props.open}
          close={this.props.close}
          id={this.props.id}
        />
      </div>
    );
  }
}

export default PhotoGalleryContainer;
