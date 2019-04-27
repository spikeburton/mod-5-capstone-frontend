export const openModal = current => {
  return { type: "OPEN_MODAL", current }
}

export const closeModal = () => {
  return { type: "CLOSE_MODAL" }
}
