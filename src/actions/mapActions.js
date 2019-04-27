import mapboxgl from "mapbox-gl";
import { DIRECTIONS_API } from "../data";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3Bpa2VidXJ0b24iLCJhIjoiY2p0MDhsbmpuMDEwajQzbWp4Mnd4a2hneiJ9.hejKLROWCOdlcjV6W67qHw";

export const openModal = current => {
  return { type: "OPEN_MODAL", current };
};

export const closeModal = () => {
  return { type: "CLOSE_MODAL" };
};

export const setContainer = container => {
  return { type: "SET_CONTAINER", container }
}

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
        // this.setState({ directions: routes[0].legs[0].steps });
        // this.drawRoute(routes);
        // console.log(routes[0].legs[0].steps);
      });
  };
};
