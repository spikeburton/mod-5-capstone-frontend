import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import DriveCreation from "../components/DriveCreation";

import { Map } from "mapbox-gl";
import { fetchDirections, fetchGeolocation } from "../actions/mapActions";
import { drawPoint, drawRoute } from "../lib/mapHelpers";

import "mapbox-gl/dist/mapbox-gl.css";
import CreateModal from "../components/CreateModal";
import { API } from "../data";

class DriveCreationContainer extends Component {
  state = {
    curLng: 0,
    curLat: 0,
    endLng: 0,
    endLat: 0,
    name: "",
    description: "",
    submit: false,
    errors: []
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

  redrawRoute = upEvent => {
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
            this.props.fetchGeolocation(
              [this.state.curLng, this.state.curLat],
              "start"
            );

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

              this.props.fetchGeolocation([e.lngLat.lng, e.lngLat.lat], "end");

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
                this.redrawRoute(upEvent);
                this.props.fetchGeolocation(upEvent.lngLat.toArray(), "start");
              });
            });

            this.map.on("touchstart", "start", e => {
              if (e.points.length !== 1) return;
              e.preventDefault();

              if (this.map.getSource("route")) {
                this.map.removeLayer("route");
                this.map.removeSource("route");
              }

              const onMove = moveEvent => {
                const coords = moveEvent.lngLat.toArray();

                drawPoint(this.map, coords, "start");
              };

              this.map.on("touchmove", onMove);
              this.map.once("touchend", endEvent => {
                this.map.off("touchmove", onMove);
                this.redrawRoute(endEvent);
                this.props.fetchGeolocation(endEvent.lngLat.toArray(), "start");
              });
            });
          });
        }
      );
    });
  }

  componentWillUnmount() {
    if (this.map) this.map.remove();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (
      this.state.name &&
      this.state.description &&
      this.state.endLat &&
      this.state.endLng
    ) {
      this.setState({
        submit: true,
        errors: []
      });
    } else {
      this.setState({
        errors: [
          "You must provide a name, description, and an ending location."
        ]
      });
    }
  };

  handleConfirm = () => {
    const data = {
      bound_a_lng: this.state.curLng,
      bound_a_lat: this.state.curLat,
      bound_b_lng: this.state.endLng,
      bound_b_lat: this.state.endLat,
      name: this.state.name,
      description: this.state.description,
      state: this.props.region
    };

    fetch(`${API}/drives`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(payload => {
        if (payload.errors) {
          this.setState({
            submit: false,
            errors: payload.errors
          });
        } else {
          this.props.history.push("/");
        }
      });
  };

  handleCancel = () => {
    this.setState({
      submit: false
    });
  };

  render() {
    return (
      <div>
        <Navbar active="create" />
        <DriveCreation
          loaded={this.state.curLng && this.state.curLat ? true : false}
          geolocationA={this.props.geolocationStart}
          geolocationB={this.props.geolocationEnd}
          name={this.state.name}
          description={this.state.description}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
        <CreateModal
          open={this.state.submit}
          geolocationA={this.props.geolocationStart}
          geolocationB={this.props.geolocationEnd}
          name={this.state.name}
          description={this.state.description}
          region={this.props.region}
          handleConfirm={this.handleConfirm}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    route: state.map.route,
    geolocationStart: state.map.geolocationStart,
    geolocationEnd: state.map.geolocationEnd,
    region: state.map.region
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDirections: bounds => fetchDirections(bounds)(dispatch),
    fetchGeolocation: (coords, point) =>
      fetchGeolocation(coords, point)(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriveCreationContainer);
