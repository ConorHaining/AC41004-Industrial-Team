const elasticsearch = require('elasticsearch');

let lablist = ["3000","3001","3002","3003"];

client = new elasticsearch.Client({
    hosts: ['https://elastic:VToECC5TLZoafrR83FfRSC3A@0196297975c7432f95b7a548aa467123.eu-west-1.aws.found.io:9243/']
});

function getNoiseLevel() {
    let d = new Date(); // for now
    let utilizationArray = [1, 1, 1, 1, 1, 1,
                            1.1, 1.2, 1.4, 1.5, 1.7, 1.7,
                            1.4, 1.5, 1.5, 1.5, 1.5, 1.35,
                            1.15, 1.1, 1, 1, 1, 1];
    let curHour = d.getHours();
    if (curHour == 0)
        curHour = 23;
    else
        --curHour;
    
    let ambientNoiseDB = 40;
    let curUtilization = utilizationArray[curHour];
    
    let utilizationVariance = Math.random() / 5;
    
    let plusOrMinus = Math.random();
    
    let finalUtilization;
    if (plusOrMinus > 0.5)
        finalUtilization = curUtilization + utilizationVariance;
    else
        finalUtilization = curUtilization - utilizationVariance;
    
    let labNoiseDB = ambientNoiseDB * finalUtilization;
    
    if (curUtilization != 1)
        return labNoiseDB;
    else
        return ambientNoiseDB;
}

setInterval(() => {
    lablist.forEach(function (labname) {
        let body = {
            "timestamp": Date.now(),
            "lab_no": labname,
            "volume": parseFloat(getNoiseLevel()).toPrecision(3)
        };

        client.index({
            index: 'volume_logs',
            type: '_doc',
            body: body
        }, function (err, resp, status) {
            console.log(resp);
        });
    })
}, 30000);