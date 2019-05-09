import { API } from "../data";

export const fetchPhotos = driveId => {
  return dispatch => {
    dispatch({ type: "LOADING_PHOTOS" });
    return fetch(`${API}/drives/${driveId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(payload => {
        dispatch({ type: "FETCH_PHOTOS", photos: payload.photos });
      });
  };
};

export const uploadPhoto = (files, id) => {
  return dispatch => {
    const file = files[0];
    if (!file) return;

    dispatch({ type: "LOADING_PHOTOS" });
    return fetch(`${API}/signed_s3`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(payload => {
        const fields = payload.form_data;
        const url = payload.url;

        const data = new FormData();
        Object.keys(fields).forEach(i => {
          data.append(i, fields[i]);
        });
        data.append("file", file);

        fetch(url, {
          method: "POST",
          body: data
        })
          .then(response => response.text())
          .then(str => {
            const imageURL = new DOMParser()
              .parseFromString(str, "application/xml")
              .getElementsByTagName("Location")[0].textContent;

            fetch(`${API}/photos`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                drive_id: id,
                image_url: imageURL
              })
            })
              .then(response => response.json())
              .then(payload => {
                dispatch({ type: "UPLOAD_PHOTO", payload });
              });
          });
      });
  };
};

export const clearGallery = () => {
  return { type: "CLEAR_PHOTO_GALLERY" }
}
