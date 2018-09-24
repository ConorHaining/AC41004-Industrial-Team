var slider = document.getElementById("hourRange");
let tempDate = new Date();
slider.value = tempDate.getHours();
displaySliderTime(tempDate);
//output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    //output.innerHTML = this.value;
    let curDate = new Date();
    displaySliderTime(curDate);
    deskHighlightingHour(curDate.getHours());
}

function displaySliderTime(curDate) {
    
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

function updateSliderTime()
{
    let curDate = new Date();
    if ( popup.innerHTML == "Time: Current" )
    {
        if ( slider.value != curDate.getHours() )
        {
            slider.value = curDate.getHours();
            displaySliderTime(curDate);
        }
    }
    else
    {
        if ( slider.value == curDate.getHours() )
            displaySliderTime(curDate);
    }
}
