import { API } from "../data";

export const fetchDrives = () => {
  return dispatch => {
    dispatch({ type: "LOADING_DRIVES" })
    return fetch(`${API}/drives`)
    .then(response => response.json())
    .then(payload => dispatch({ type: "FETCH_DRIVES", payload }))
  }
}
