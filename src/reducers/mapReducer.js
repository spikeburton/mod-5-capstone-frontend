export const mapReducer = (
  state = {
    modalOpen: false,
    current: null,
    loading: false,
    route: [],
    directions: [],
    geolocationStart: "",
    geolocationEnd: "",
    region: ""
  },
  action
) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, modalOpen: true, current: action.current };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, current: null, directions: [] };
    case "LOADING_DIRECTIONS":
      return { ...state, loading: true };
    case "FETCH_DIRECTIONS":
      return {
        ...state,
        loading: false,
        route: action.route,
        directions: action.directions
      };
    case "LOADING_GEOLOCATION":
      return { ...state, loading: true };
    case "FETCH_GEOLOCATION_A":
      return {
        ...state,
        loading: false,
        geolocationStart: action.geolocation,
        region: action.region
      };
    case "FETCH_GEOLOCATION_B":
      return {
        ...state,
        loading: false,
        geolocationEnd: action.geolocation,
        region: action.region
      };
    default:
      return state;
  }
};
