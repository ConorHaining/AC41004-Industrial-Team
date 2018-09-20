const elasticsearch = require('elasticsearch');
const ping = require('ping');

let pclist = [];
for(let labNo = 0; labNo < 3; labNo++) {
    for(let deskNo = 1; deskNo < 8; deskNo++) {
        for(let pcNo = 1; pcNo < 5; pcNo++) {
            pclist.push("labpc"+labNo+deskNo+pcNo)
        }
    }
}

client = new elasticsearch.Client({
    hosts: ['https://elastic:VToECC5TLZoafrR83FfRSC3A@0196297975c7432f95b7a548aa467123.eu-west-1.aws.found.io:9243/']
});

setInterval(() => {
    pclist.forEach(function (pcname) {
        host = pcname + ".computing.dundee.ac.uk";
        ping.sys.probe(host, function (isAlive) {
            let body = {
                "timestamp": Date.now(),
                "pc_name": pcname,
                "available": isAlive
            };

            client.index({
                index: 'pc_logs',
                type: '_doc',
                body: body
            }, function (err, resp, status) {
                console.log(resp);
            });
        });
    })
}, 1000);