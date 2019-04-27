export const drivesReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "LOADING_DRIVES":
      return { loading: true };
    case "FETCH_DRIVES":
      return { loading: false, data: action.payload };
    default:
      return state;
  }
};
