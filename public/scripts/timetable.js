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

$.get({
    url: 'timetable/GroundFloorLabs/today',
    dataType: 'json',
    success: (data) => {
        timetable = data;
    } 
});

function timetableTableBuilder(timetable) {
    let tableHTML;

    tableHTML += '<thead><td>Module</td><td>Start</td><td>End</td><td>Staff</td></thead>';
    tableHTML += '<tbody>';
    
    timetable.forEach((record) => {
        tableHTML += '<tr>';
        tableHTML += `<td>${record.title}</td>`
        tableHTML += `<td>${record.start}</td>`
        tableHTML += `<td>${record.end}</td>`
        tableHTML += `<td>${record.staff.toString()}</td>`
        tableHTML += '</tr>';
    });
    
    tableHTML += '</tbody>';
    return tableHTML;
}

function placeMarkers(event) {
    const buildingName = event.indoorMap.getIndoorMapId();

    locations.forEach((location) => {

        var marker = L.marker(location.LatLong, {        
            title: location.Title,
            indoorMapId: location.IndoorMapId,
            indoorMapFloorId: location.IndoorMapFloor
          }).addTo(map)
            .bindPopup(`<h1>${location.Title}</h1>
                        <h3>Today's Timetable</h3>
                        <table>${timetableTableBuilder(timetable)}</table>`,
                {
                    maxWidth: 600,
                });
    });

}

map.indoors.on('indoormapenter', placeMarkers);