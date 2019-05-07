import React, { Component } from "react";
import PhotoGallery from "../components/PhotoGallery";
import { API } from "../data";

class PhotoGalleryContainer extends Component {
  state = {
    loading: false,
    photos: []
  };

  handleMount = () => {
    fetch(`${API}/drives/${this.props.drive.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(payload => {
        this.setState({
          photos: payload.photos
        });
      });
  };

  handleUnmount = () => {
    this.setState({
      loading: false,
      photos: []
    })
  }

  upload = (files, id) => {
    this.setState({ loading: true });
    const file = files[0];

    fetch(`${API}/signed_s3`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(payload => {
        const fields = payload.form_data;
        const url = payload.url;

        const data = new FormData();
        Object.keys(fields).forEach(i => {
          data.append(i, fields[i]);
        });
        data.append("file", file);

        fetch(url, {
          method: "POST",
          body: data
        })
          .then(response => response.text())
          .then(str => {
            const imageURL = new DOMParser()
              .parseFromString(str, "application/xml")
              .getElementsByTagName("Location")[0].textContent;

            fetch(`${API}/photos`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                drive_id: id,
                image_url: imageURL
              })
            })
              .then(response => response.json())
              .then(payload => {
                this.setState({
                  loading: false,
                  photos: [...this.state.photos, payload]
                });
              });
          });
      });
  };

  render() {
    return (
      <div>
        <PhotoGallery
          open={this.props.open}
          close={this.props.close}
          drive={this.props.drive}
          photos={this.state.photos}
          upload={this.upload}
          loading={this.state.loading}
          handleMount={this.handleMount}
        />
      </div>
    );
  }
}

export default PhotoGalleryContainer;
