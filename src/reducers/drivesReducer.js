export const drivesReducer = (state = { loading: false, data: [] }, action) => {
  switch (action.type) {
    case "LOADING_DRIVES":
      return { ...state, loading: true };
    case "FETCH_DRIVES":
      return { loading: false, data: action.payload };
    default:
      return state;
  }
};
