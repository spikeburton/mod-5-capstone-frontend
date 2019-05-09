import React, { Component } from "react";
import { connect } from "react-redux";
import PhotoGallery from "../components/PhotoGallery";
import {
  fetchPhotos,
  uploadPhoto,
  clearGallery
} from "../actions/photoActions";
import { fetchDrives } from "../actions/driveActions";

class PhotoGalleryContainer extends Component {
  handleMount = () => {
    this.props.fetchPhotos(this.props.drive.id);
  };

  handleUnmount = () => {
    this.props.clearGallery();
    this.props.fetchDrives();
  };

  upload = (files, id) => {
    this.props.uploadPhoto(files, id);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <PhotoGallery
          open={this.props.open}
          close={this.props.close}
          drive={this.props.drive}
          photos={this.props.photos}
          upload={this.upload}
          loading={this.props.loading}
          handleMount={this.handleMount}
          handleUnmount={this.handleUnmount}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photos: state.photos.photos,
    loading: state.photos.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPhotos: driveId => fetchPhotos(driveId)(dispatch),
    uploadPhoto: (files, id) => uploadPhoto(files, id)(dispatch),
    clearGallery: () => dispatch(clearGallery()),
    fetchDrives: () => fetchDrives()(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGalleryContainer);
