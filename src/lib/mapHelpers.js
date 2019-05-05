export const drawPoint = (map, coords, name, radius = 9, color = "#203834") => {
  const pointData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: coords
        }
      }
    ]
  };

  if (map.getLayer(name)) {
    map.getSource(name).setData(pointData);
  } else {
    map.addLayer({
      id: name,
      type: "circle",
      source: {
        type: "geojson",
        data: pointData
      },
      paint: {
        "circle-radius": radius,
        "circle-color": color
      }
    });
  }
};
