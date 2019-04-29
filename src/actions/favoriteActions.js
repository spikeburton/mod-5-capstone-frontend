import { API } from "../data";

export const fetchFavorites = () => {
  return dispatch => {
    dispatch({ type: "LOADING_FAVORITES" });
    return fetch(`${API}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(payload =>
        dispatch({ type: "FETCH_FAVORITES", payload: payload.user.favorites })
      );
  };
};

export const addFavorite = id => {
  return dispatch => {
    dispatch({ type: "LOADING_FAVORITES" });
    return fetch(`${API}/favorites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ drive_id: id })
    })
      .then(response => response.json())
      .then(payload => dispatch({ type: "ADD_FAVORITE", payload }));
  };
};

export const removeFavorite = id => {
  return dispatch => {
    dispatch({ type: "LOADING_FAVORITES" })
    return fetch(`${API}/favorites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(() => dispatch({ type: "REMOVE_FAVORITE", id }))
  }
}
