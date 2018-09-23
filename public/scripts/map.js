var map = L.Wrld.map("map", "03013be32ed00b5339b756582b8d184a", {
    center: [56.458629, -2.982733],
    zoom: 18,
    indoorsEnabled: true,
    coverageTreeManifest: "https://webgl-cdn1.wrld3d.com/chunk/indoor_maps/api_requests/EIM-7e76aeae-2f60-471d-baac-cf0d75dc91cf_2018_09_21_10_34_42/webgl_manifest.bin.gz"
  });

var indoorControl = new WrldIndoorControl("widget-container", map);

map.indoors.on('indoormapenter', (event) => {console.log(event.indoorMap.getIndoorMapId()); map.indoors.setFloor(2);});
map.indoors.on('indoorentityclick', (event) => {
  console.log(event.ids);
});