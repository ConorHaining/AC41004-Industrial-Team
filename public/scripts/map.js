var map = L.Wrld.map("map", "03013be32ed00b5339b756582b8d184a", {
    center: [56.458629, -2.982733],
    zoom: 18,
    indoorsEnabled: true,
  });

var indoorControl = new WrldIndoorControl("widget-container", map);

map.indoors.on('indoormapenter', (event) => {console.log(event.indoorMap.getIndoorMapId()); map.indoors.setFloor(2);});
map.indoors.on('indoorentityclick', (event) => {
  console.log(event.ids);
});