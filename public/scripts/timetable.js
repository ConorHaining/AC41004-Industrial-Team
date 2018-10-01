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

var timetableIcon = L.icon({
    iconUrl: 'images/calendar.png',
    iconSize: [32, 32]
});

function placeMarkers(event) {
    const buildingName = event.indoorMap.getIndoorMapId();
    console.log(buildingName);

    
    $.get({
        url: 'timetable/GroundFloorLabs/today',
        dataType: 'html',
        success: (data) => {
            
            locations.forEach((location) => {
                L.marker(location.LatLong, {        
                    title: location.Title,
                    indoorMapId: location.IndoorMapId,
                    indoorMapFloorId: location.IndoorMapFloor,
                    icon: timetableIcon
                  }).addTo(map)
                    .bindPopup(data,
                        {
                            maxWidth: 600,
                        });

            });
        } 
    });
    setEntityHighlights();
    document.getElementById('hourRange').style.visibility = "visible";
    document.getElementById('graphButton').style.visibility = "visible";
    document.getElementById('myPopup').style.visibility = "visible";
}

function onIndoorMapExited() 
{
    document.getElementById('NoiseGradient').style.visibility = "hidden";
    document.getElementById('hourRange').style.visibility = "hidden";
    document.getElementById('graphButton').style.visibility = "hidden";
    document.getElementById('myPopup').style.visibility = "hidden";
}

map.indoors.on('indoormapenter', placeMarkers);
map.indoors.on('indoormapexit', onIndoorMapExited);