const elasticsearch = require('elasticsearch');

module.exports = {
   getCurrentDeskUsage: (cb) => {

       const client = new elasticsearch.Client({
           hosts: ['https://elastic:VToECC5TLZoafrR83FfRSC3A@0196297975c7432f95b7a548aa467123.eu-west-1.aws.found.io:9243/']
        });
        
        let occupancy = {};
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const currentSecond = new Date().getSeconds();

       
       client.search({
           index: 'pc_logs',
           body: {
               size: 250,
               query: {
                range : {
                    timestamp: {
                        gte: `2018-09-25 ${currentHour}:${currentMinute}:${currentSecond - 2}`,
                        lte: `2018-09-25 ${currentHour}:${currentMinute}:${currentSecond}`,
                        format: "yyyy-MM-dd HH:mm:ss"
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

    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentSecond = new Date().getSeconds();
    let dayToUse = 25;
    let differenceInHours = currentHour - hour;

    if (differenceInHours < 0) {
        // differenceInHours = differenceInHours + 24;
        dayToUse--;
    }

    // let differenceInSeconds = differenceInHours * 3600;

    let occupancy = {};
    
    client.search({
        index: 'pc_logs',
        body: {
            size: 100,
            query: {
                range : {
                    timestamp: {
                        gte: `2018-09-${dayToUse} ${currentHour}:${currentMinute}:${currentSecond - 2}`,
                        lte: `2018-09-${dayToUse} ${currentHour}:${currentMinute}:${currentSecond}`,
                        format: "yyyy-MM-dd HH:mm:ss"
                    }
                }
            }
        }
      }, (err, response) => {
            console.log(response);

            if ((err || response.hits.total === 0) && ((hour > 8) && (hour < 19))){
                let pclist = [];
                for(let labNo = 0; labNo < 3; labNo++) {
                    for(let deskNo = 1; deskNo < 8; deskNo++) {
                        for(let pcNo = 1; pcNo < 5; pcNo++) {
                            pclist.push("labpc"+labNo+deskNo+pcNo)
                        }
                    }
                }

                pclist.forEach((pcName) => {
                    occupancy[pcName] = Math.random() >= 0.5;;
                });

            } else if(((hour <= 8) || (hour >= 19))) {
                cb({ labpc031: false, labpc043: true, labpc061: true, labpc224: true, labpc222: true, labpc262: true, labpc134: true, labpc143: true, labpc253: true, labpc154: true, labpc153: true, labpc271: false, labpc221: false, labpc124: false, labpc023: false, labpc213: false, labpc142: false, labpc121: false, labpc151: false, labpc123: false, labpc172: false, labpc271: false, labpc261: false, labpc151: false, labpc173: false, labpc011: false, labpc051: true, labpc141: true, labpc144: true, labpc222: true, labpc054: true, labpc211: true, labpc243: true, labpc064: true, labpc073: true, labpc061: true, labpc154: true, labpc214: true, labpc234: true, labpc012: true, labpc013: true, labpc114: true, labpc264: true, labpc141: true, labpc123: false, labpc022: false, labpc111: false, labpc233: false, labpc263: false, labpc242: false, labpc272: false, labpc163: false, labpc024: false, labpc252: true, labpc143: true, labpc153: true, labpc134: true, labpc023: false, labpc073: true, labpc163: false, labpc144: true, labpc011: false, labpc074: false, labpc044: false, labpc212: false, labpc131: false, labpc032: false, labpc034: true, labpc223: true, labpc231: false, labpc133: true, labpc054: true, labpc273: true, labpc243: true, labpc274: true, labpc072: true, labpc264: true, labpc041: false, labpc173: false, labpc232: false, labpc053: true, labpc042: true, labpc033: false, labpc052: true, labpc234: true, labpc122: true, labpc063: true, labpc274: true, labpc211: true, labpc174: false, labpc124: false, labpc071: false, labpc162: false, labpc173: false, labpc021: false, labpc023: false, labpc273: true, labpc114: true, labpc052: true, labpc171: true, labpc152: true, labpc063: true, labpc053: true, labpc122: true, labpc133: true, labpc244: true, labpc253: true, labpc223: true, labpc262: true, labpc224: true, labpc011: false, labpc024: false, labpc151: false, labpc021: false, labpc014: true, labpc064: true, labpc051: true, labpc132: false, labpc171: true, labpc252: true, labpc072: true, labpc214: true, labpc152: true, labpc244: true, labpc241: false, labpc142: false, labpc172: false, labpc024: false, labpc021: false, labpc022: false, labpc113: false, labpc112: false, labpc161: false, labpc174: false, labpc251: false, labpc241: false, labpc221: false, labpc164: false, labpc254: false, labpc062: false, labpc041: false });
            } else {
                response.hits.hits.forEach(element => {
                    occupancy[element._source.pc_name] = element._source.available;
                });
      
            }
            
            cb(occupancy);
      });
    
}
}