import React, { Component } from "react";
import PhotoGallery from "../components/PhotoGallery";

class PhotoGalleryContainer extends Component {
  upload = () => {
    console.log("UPLOAD")
  }

  render() {
    return (
      <div>
        <PhotoGallery
          open={this.props.open}
          close={this.props.close}
          drive={this.props.drive}
          upload={this.upload}
        />
      </div>
    );
  }
}

export default PhotoGalleryContainer;
