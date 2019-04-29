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
      return { loading: false, data: [...state.data, action.payload] }
    case "REMOVE_FAVORITE":
      const i = state.data.findIndex(cur => cur.id === action.id)
      return { loading: false, data: [...state.data.slice(0, i), ...state.data.slice(i + 1)]}
    default:
      return state;
  }
};
