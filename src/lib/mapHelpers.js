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

export const drawRoute = (map, route) => {
  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: route
    }
  };

  if (map.getSource("route")) {
    map.getSource("route").setData(geojson);
  } else {
    // make a new request
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geojson
      },
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#203834",
        "line-width": 7,
        "line-opacity": 0.75
      }
    });
  }
};

export const drawBounds = bounds => {
  this.drawPoint([bounds.lngA, bounds.latA], "A");
  this.drawPoint([bounds.lngB, bounds.latB], "B");
};
