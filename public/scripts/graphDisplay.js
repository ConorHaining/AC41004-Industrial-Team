var e = document.getElementById("graphButton");
var c = document.getElementById("myChart");
var isElementClicked = false;
var moveChart = false;

function animate() {
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if(moveChart){
        pos++;
        c.style.top = pos + 'px';
        c.style.left = pos +'px';
        } else {
            c.style.top = pos
            c.style.left = pos;
        }
    }
}

e.onclick = function () {
    moveChart = !moveChart
    if(!isElementClicked){
    //animate();
    c.style.visibility = "visible";
    //console.log(c);
    isElementClicked = true;
    } else {
        //animate();
        c.style.visibility = "hidden";
        isElementClicked = false;
    }
   // console.log(moveChart);
}


