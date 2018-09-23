const locations = [
    {
        "Title": "Lab 0",
        "ID": "GroundFloorLabs",
        "LatLong": [56.458496, -2.982746],
        "IndoorMapId": "EIM-7e76aeae-2f60-471d-baac-cf0d75dc91cf",
        "IndoorMapFloor": 2,
    },
    {
        "Title": "Lab 1",
        "ID": "GroundFloorLabs",
        "LatLong": [56.458620, -2.982880],
        "IndoorMapId": "EIM-7e76aeae-2f60-471d-baac-cf0d75dc91cf",
        "IndoorMapFloor": 2,
    },
    {
        "Title": "Lab 2",
        "ID": "GroundFloorLabs",
        "LatLong": [56.458737, -2.982999],
        "IndoorMapId": "EIM-7e76aeae-2f60-471d-baac-cf0d75dc91cf",
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