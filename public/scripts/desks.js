const red = [255, 0 , 0, 255];
const green = [0, 255, 0, 255];

function deskHighlighting() {
    $.get({
        url: '/desks',
        dataType: 'json',
        success: (desks) => {
            let deskIds = Object.keys(desks);
            let availability = Object.values(desks);
    
            let onDesks = [];
            let offDesks = [];
    
            deskIds.forEach((desk, index) => {
                if(availability[index]) {
                    offDesks.push(desk);
                } else {
                    onDesks.push(desk);
                }
            });
    
            map.indoors.setEntityHighlights(onDesks, red);
            map.indoors.setEntityHighlights(offDesks, green);
    
        } 
    });
}

function deskHighlightingHour(hour) {
    clearInterval(deskPolling);
    $.get({
        url: '/desks/:' + hour.toString(),
        dataType: 'json',
        success: (desks) => {
            let deskIds = Object.keys(desks);
            let availability = Object.values(desks);
    
            let onDesks = [];
            let offDesks = [];
    
            deskIds.forEach((desk, index) => {
                if(availability[index]) {
                    offDesks.push(desk);
                } else {
                    onDesks.push(desk);
                }
            });
    
            map.indoors.setEntityHighlights(onDesks, red);
            map.indoors.setEntityHighlights(offDesks, green);
    
        } 
    });
}

let deskPolling = window.setInterval(deskHighlighting, 5000);
deskHighlighting();