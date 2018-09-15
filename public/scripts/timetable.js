const locations = [
    {
        "Title": "WRLD Office",
        "ID": "GroundFloorLabs",
        "LatLong": [56.459970, -2.978182],
        "IndoorMapId": "westport_house",
        "IndoorMapFloor": 2,
    },
    {
        "Title": "Office Space D",
        "ID": "GroundFloorLabs",
        "LatLong": [56.459957, -2.978466],
        "IndoorMapId": "westport_house",
        "IndoorMapFloor": 2,
    },
    {
        "Title": "Office Space C",
        "ID": "GroundFloorLabs",
        "LatLong": [56.460229, -2.978405],
        "IndoorMapId": "westport_house",
        "IndoorMapFloor": 2,
    },
    {
        "Title": "Office Space A",
        "ID": "GroundFloorLabs",
        "LatLong": [56.460242, -2.978094],
        "IndoorMapId": "westport_house",
        "IndoorMapFloor": 2,
    }
]
let timetable;

function placeMarkers(event) {
    const buildingName = event.indoorMap.getIndoorMapId();

    locations.forEach((location) => {

        $.get({
            url: 'timetable/GroundFloorLabs/today',
            dataType: 'html',
            success: (data) => {
                
                L.marker(location.LatLong, {        
                    title: location.Title,
                    indoorMapId: location.IndoorMapId,
                    indoorMapFloorId: location.IndoorMapFloor
                  }).addTo(map)
                    .bindPopup(data,
                        {
                            maxWidth: 600,
                        });

            } 
        });

    });

}

map.indoors.on('indoormapenter', placeMarkers);