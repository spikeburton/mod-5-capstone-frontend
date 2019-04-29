import { API } from "../data";

export const fetchFavorites = () => {
  return dispatch => {
    dispatch({ type: "LOADING_FAVORITES" })
    return fetch(`${API}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then(response => response.json())
    .then(payload => dispatch({ type: "FETCH_FAVORITES", payload }))
  }
}
