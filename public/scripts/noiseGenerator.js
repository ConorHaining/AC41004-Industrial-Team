let intervalVar;
let noiseHighlighted = false;
let graphDisplay = false;
let labArray = ["3003","3002","3000"];

function getNoiseLevel(hour) {
    let curHour;
    if (hour == -1)
    {
        let d = new Date(); // for now
        curHour = d.getHours();
    }
    else 
    {
        curHour = hour;
    }
    let utilizationArray = [1, 1, 1, 1, 1, 1,
                            1.1, 1.2, 1.4, 1.5, 1.7, 1.7,
                            1.4, 1.5, 1.5, 1.5, 1.5, 1.35,
                            1.15, 1.1, 1, 1, 1, 1];
    
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

function highlightUpdate(labid, hour) {
    let roomDB = getNoiseLevel(hour);
    let highestDB = 75;
    let baseDB = 40;

    let dbDiff = highestDB - roomDB;
    dbDiff = dbDiff / (highestDB - baseDB);

    let redRGB = Math.floor(255 * (1 - dbDiff));
    let blueRGB = Math.floor(255 * dbDiff);

    if (redRGB > 255)
        redRGB = 255;
    if (redRGB < 0)
        redRGB = 0;

    if (blueRGB > 255)
        blueRGB = 255;
    if (blueRGB < 0)
        blueRGB = 0;
    
    map.indoors.setEntityHighlights(labid, [redRGB, 0, blueRGB, 64]);
    
    if(massPopChart != undefined) {
        massPopChart.config.data.datasets[0].data.push({x: +new Date, y: roomDB});
        massPopChart.config.data.datasets[0].borderColor = ("rgba(" + parseFloat(redRGB).toPrecision(3) + " , 0," + parseFloat(blueRGB).toPrecision(3) + " , 64)");
        massPopChart.update();
    }
}

function highlightLabs(hour)
{
    highlightUpdate("3003", hour);
    highlightUpdate("3002", hour);
    highlightUpdate("3000", hour);
    if(!graphDisplay){
        displayChart();
        graphDisplay = true;
    }
}

function setEntityHighlights() {
    if ( noiseHighlighted == false )
    {
        noiseHighlighted = true;
        highlightLabs(-1);
        intervalVar = setInterval(function() { highlightLabs(-1); }, 5000);
        document.getElementById('NoiseGradient').style.visibility = "visible";
    }
    else
    {
        noiseHighlighted = false;
        clearEntityHighlights();
        document.getElementById('NoiseGradient').style.visibility = "hidden";
    }
}

function currentNoiseUpdate()
{
    if(intervalVar)
        clearInterval(intervalVar);
    highlightLabs(-1);
    intervalVar = setInterval(function() { highlightLabs(-1); }, 5000);
}

function clearEntityHighlights() {
    map.indoors.clearEntityHighlights(labArray);
    if(intervalVar)
        clearInterval(intervalVar);
}
var timeFormat = 'DD/MM/YYYY';
let myChart = document.getElementById('myChart').getContext('2d');
var massPopChart;
function displayChart(){
    document.getElementById('myChart').style.visibility = "hidden";
    massPopChart = new Chart(myChart, {
        type:'line', 
        data:{
        datasets:[{
                label:'Noise level in the labs',
                data:[],
                fill: false,
                borderColor: 'red',
                }
                ]
        },
        options: {
        responsive: true,
        scales:     {
            xAxes: [{
                type:       "time",
                time:       {
                    format: timeFormat,
                    tooltipFormat: 'll'
                },
                scaleLabel: {
                    display:     true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display:     true,
                    labelString: 'value'
                },
                    ticks: {
                        min: 40,
                        max: 80
                    }
            }]
        }
    }
    });
}