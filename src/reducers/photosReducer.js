export const photosReducer = (
  state = { loading: false, photos: [] },
  action
) => {
  switch (action.type) {
    case "LOADING_PHOTOS":
      return { ...state, loading: true };
    case "FETCH_PHOTOS":
      return { loading: false, photos: action.photos };
    case "UPLOAD_PHOTO":
      return { loading: false, photos: [...state.photos, action.payload ]}
    case "CLEAR_PHOTO_GALLERY":
      return { loading: false, photos: [] };
    default:
      return state;
  }
};
