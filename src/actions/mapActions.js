import { DIRECTIONS_API } from "../data";

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
        // this.setState({ directions: routes[0].legs[0].steps });
        // this.drawRoute(routes);
        // console.log(routes[0].legs[0].steps);
      });
  };
};
