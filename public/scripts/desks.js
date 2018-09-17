const red = [255, 0 , 0, 255];
const green = [0, 255, 0, 255];

let deskPolling = window.setInterval(() => {

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
                    onDesks.push(desk);
                } else {
                    offDesks.push(desk);
                }
            });

            console.log(onDesks);
            console.log(offDesks);

            map.indoors.setEntityHighlights(onDesks, red);
            map.indoors.setEntityHighlights(offDesks, green);

        } 
    });

}, 1000);

