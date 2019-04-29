export const favoritesReducer = (
  state = { loading: false, data: [] },
  action
) => {
  switch (action.type) {
    case "LOADING_FAVORITES":
      return { ...state, loading: true }
    case "FETCHING_FAVORITES":
      return { loading: false, data: action.payload }
    default:
      return state;
  }
};
