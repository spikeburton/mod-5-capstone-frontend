import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import DriveCreation from "../components/DriveCreation";

import { Map } from "mapbox-gl";
import { fetchDirections } from "../actions/mapActions";
import { drawPoint, drawRoute } from "../lib/mapHelpers";

import "mapbox-gl/dist/mapbox-gl.css";

class DriveCreationContainer extends Component {
  state = {
    curLng: 0,
    curLat: 0,
    endLng: 0,
    endLat: 0
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

          this.map.on("load", () => {
            drawPoint(
              this.map,
              [this.state.curLng, this.state.curLat],
              "start"
            );
            const canvas = this.map.getCanvasContainer();

            this.map.on("click", e => {
              const bounds = {
                lngA: this.state.curLng,
                latA: this.state.curLat,
                lngB: e.lngLat.lng,
                latB: e.lngLat.lat
              };

              drawPoint(this.map, e.lngLat.toArray(), "end");
              this.props
                .fetchDirections(bounds)
                .then(() => drawRoute(this.map, this.props.route));

              this.setState({
                endLng: e.lngLat.lng,
                endLat: e.lngLat.lat
              });
            });

            this.map.on("mouseenter", "start", () => {
              canvas.style.cursor = "move";
              this.map.setPaintProperty("start", "circle-color", "#475250");
            });

            this.map.on("mouseleave", "start", () => {
              canvas.style.cursor = "";
              this.map.setPaintProperty("start", "circle-color", "#203834");
            });

            this.map.on("mousedown", "start", e => {
              e.preventDefault();
              canvas.style.cursor = "grab";

              if (this.map.getSource("route")) {
                this.map.removeLayer("route");
                this.map.removeSource("route");
              }

              const onMove = moveEvent => {
                canvas.style.cursor = "grabbing";
                const coords = moveEvent.lngLat.toArray();

                drawPoint(this.map, coords, "start");
              };

              this.map.on("mousemove", onMove);
              this.map.once("mouseup", upEvent => {
                canvas.style.cursor = "";
                this.map.off("mousemove", onMove);

                if (this.map.getSource("end")) {
                  const bounds = {
                    lngA: upEvent.lngLat.lng,
                    latA: upEvent.lngLat.lat,
                    lngB: this.state.endLng,
                    latB: this.state.endLat
                  };

                  this.props
                    .fetchDirections(bounds)
                    .then(() => drawRoute(this.map, this.props.route));
                }

                this.setState({
                  curLng: upEvent.lngLat.lng,
                  curLat: upEvent.lngLat.lat
                })
              });
            });

            this.map.on("touchstart", "start", e => {
              if (e.points.length !== 1) return;
              e.preventDefault();

              const onMove = moveEvent => {
                const coords = moveEvent.lngLat.toArray();

                drawPoint(this.map, coords, "start");
              };

              this.map.on("touchmove", onMove);
              this.map.once("touchend", () =>
                this.map.off("touchmove", onMove)
              );
            });
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

const mapStateToProps = state => {
  return {
    route: state.map.route
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDirections: bounds => fetchDirections(bounds)(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriveCreationContainer);
