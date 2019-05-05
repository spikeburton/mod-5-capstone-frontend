import React, { Component } from "react";
import Navbar from "../components/Navbar";
import DriveCreation from "../components/DriveCreation";

import { Map } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

class DriveCreationContainer extends Component {
  state = {
    curLng: 0,
    curLat: 0
  };

  getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geoloation not supported"));
      }

      navigator.geolocation.getCurrentPosition(
        pos => {
          resolve(pos);
        },
        () => reject(new Error("Permission denied"))
      );
    });
  };

  componentDidMount() {
    this.getLocation().then(pos => {
      this.setState(
        {
          curLng: pos.coords.longitude,
          curLat: pos.coords.latitude
        },
        () => {
          this.map = new Map({
            style: "mapbox://styles/mapbox/navigation-guidance-day-v2",
            container: "create-map-container",
            center: [this.state.curLng, this.state.curLat],
            zoom: 8
          });
        }
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <DriveCreation
          lng={this.state.curLng}
          lat={this.state.curLat}
          map={this.map}
        />
      </div>
    );
  }
}

export default DriveCreationContainer;
