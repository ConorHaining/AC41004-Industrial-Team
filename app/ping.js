var elasticsearch = require('elasticsearch');
var ping = require('ping');

client = new elasticsearch.Client({
    hosts: ['https://elastic:VToECC5TLZoafrR83FfRSC3A@0196297975c7432f95b7a548aa467123.eu-west-1.aws.found.io:9243/']
});

let pclist = ['labpc071', 'labpc072', 'labpc073', 'labpc074',
    'labpc021', 'labpc022', 'labpc023', 'labpc024'];

setInterval(() => {
    pclist.forEach(function (pcname) {
        host = pcname + ".computing.dundee.ac.uk";
        ping.sys.probe(host, function (isAlive) {
            var body = {
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