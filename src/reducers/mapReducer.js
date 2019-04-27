export const mapReducer = (
  state = { modalOpen: false, current: null, loading: false, directions: [] },
  action
) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, modalOpen: true, current: action.current };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, current: null, directions: [] }
    case "LOADING_DIRECTIONS":
      return { ...state, loading: true }
    case "FETCH_DIRECTIONS":
      return { ...state, loading: false, directions: action.payload }
    default:
      return state;
  }
};
