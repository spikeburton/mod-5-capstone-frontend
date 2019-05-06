import mapboxgl from "mapbox-gl";
import { DIRECTIONS_API, GEOCODING_API } from "../data";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export const openModal = current => {
  return { type: "OPEN_MODAL", current };
};

export const closeModal = () => {
  return { type: "CLOSE_MODAL" };
};

export const fetchDirections = bounds => {
  return dispatch => {
    dispatch({ type: "LOADING_DIRECTIONS" });
    return fetch(
      `${DIRECTIONS_API}/${bounds.lngA},${bounds.latA};${bounds.lngB},${
        bounds.latB
      }?geometries=geojson&overview=full&steps=true&access_token=${
        mapboxgl.accessToken
      }`
    )
      .then(response => response.json())
      .then(({ routes }) => {
        dispatch({
          type: "FETCH_DIRECTIONS",
          route: routes[0].geometry.coordinates,
          directions: routes[0].legs[0].steps
        });
      });
  };
};

export const fetchGeolocation = (coords, point) => {
  const type = point === "start" ? "FETCH_GEOLOCATION_A" : "FETCH_GEOLOCATION_B"

  return dispatch => {
    dispatch({ type: "LOADING_GEOLOCATION " });
    return fetch(
      `${GEOCODING_API}/${coords[0]},${coords[1]}.json?access_token=${
        mapboxgl.accessToken
      }`
    )
      .then(response => response.json())
      .then(payload => dispatch({ type, payload: payload.features[0].place_name }));
  };
};
