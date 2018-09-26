const elasticsearch = require('elasticsearch');

module.exports = {
   getCurrentDeskUsage: (cb) => {

       const client = new elasticsearch.Client({
           hosts: ['https://elastic:VToECC5TLZoafrR83FfRSC3A@0196297975c7432f95b7a548aa467123.eu-west-1.aws.found.io:9243/']
       });

       let occupancy = {};
       
       client.search({
           index: 'pc_logs',
           body: {
               size: 100,
               query: {
                   range : {
                       timestamp: {
                           gte : "now-5s",
                           lt :  "now"
                       }
                   }
               }
           }
         }, (err, response) => {
             response.hits.hits.forEach(element => {
                 occupancy[element._source.pc_name] = element._source.available;
             });

             cb(occupancy);
         });
       
   },

   getHistoricalDeskUsage: (hour, cb) => {
     
    const client = new elasticsearch.Client({
        hosts: ['https://elastic:VToECC5TLZoafrR83FfRSC3A@0196297975c7432f95b7a548aa467123.eu-west-1.aws.found.io:9243/']
    });

    let currentHour = new Date().getHours();
    let differenceInHours = currentHour - hour;

    if (differenceInHours < 0) {
        differenceInHours = differenceInHours + 24; 
    }

    let differenceInSeconds = differenceInHours * 3600;

    let occupancy = {};
    
    client.search({
        index: 'pc_logs',
        body: {
            size: 100,
            query: {
                range : {
                    timestamp: {
                        "gte" : `now-${differenceInSeconds}s`,
                        "lt" :  `now-${differenceInSeconds-10}s`
                    }
                }
            }
        }
      }, (err, response) => {
          response.hits.hits.forEach(element => {
              occupancy[element._source.pc_name] = element._source.available;
          });

          cb(occupancy);
      });
    
}
}