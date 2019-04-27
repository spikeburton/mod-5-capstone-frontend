export const mapReducer = (
  state = {
    modalOpen: false,
    current: null,
    loading: false,
    container: null,
    route: [],
    directions: []
  },
  action
) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, modalOpen: true, current: action.current };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, current: null, directions: [] };
    case "SET_CONTAINER":
      return { ...state, container: action.container };
    case "LOADING_DIRECTIONS":
      return { ...state, loading: true };
    case "FETCH_DIRECTIONS":
      return {
        ...state,
        loading: false,
        route: action.route,
        directions: action.directions
      };
    default:
      return state;
  }
};
