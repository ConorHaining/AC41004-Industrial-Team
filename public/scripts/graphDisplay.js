var e = document.getElementById("graphButton");
var c = document.getElementById("myChart");
var m = document.getElementById("map");
var n = document.getElementById("NoiseGradient");

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

e.onmouseover = function () {
    c.style.visibility = "visible";
    m.style.visibility = "hidden";
    n.style.visibility = "hidden";
}

e.onmouseout = function () {
    c.style.visibility = "hidden";
    m.style.visibility = "visible";
    n.style.visibility = "visible";
}


