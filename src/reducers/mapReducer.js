export const mapReducer = (
  state = { modalOpen: false, current: null },
  action
) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, modalOpen: true, current: action.current };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, current: null }
    default:
      return state;
  }
};
