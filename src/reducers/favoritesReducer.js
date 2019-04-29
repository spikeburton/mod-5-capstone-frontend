export const favoritesReducer = (
  state = { loading: false, data: [] },
  action
) => {
  switch (action.type) {
    case "LOADING_FAVORITES":
      return { ...state, loading: true }
    case "FETCH_FAVORITES":
      return { loading: false, data: action.payload }
    case "ADD_FAVORITE":
      return { ...state, data: [...state.data, action.payload] }
    default:
      return state;
  }
};
