import React, { Component } from "react";
import PhotoGallery from "../components/PhotoGallery";

class PhotoGalleryContainer extends Component {
  state = {
    loading: false
  }

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
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default PhotoGalleryContainer;
