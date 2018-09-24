var slider = document.getElementById("hourRange");
let tempDate = new Date();
slider.value = tempDate.getHours();
//output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    //output.innerHTML = this.value;
    displaySliderTime();
}

function displaySliderTime() {
    let curDate = new Date();
    var popup = document.getElementById("myPopup");
    if(curDate.getHours() == slider.value)
        popup.innerHTML = "Time: Current";
    else
        popup.innerHTML = "Time:" + slider.value;
    /*if(!popup.classList.contains("show"))
    {
        popup.classList.toggle("show");
    }*/
}
