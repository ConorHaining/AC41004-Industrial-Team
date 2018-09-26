var slider = document.getElementById("hourRange");
let tempDate = new Date();
slider.value = 24;
displaySliderTime(tempDate);
//output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    //output.innerHTML = this.value;
    let curDate = new Date();
    displaySliderTime(curDate);
    if( this.value == 24 )
    {
        currentDeskUpdate();
    }
    else
    {
        map.indoors.clearEntityHighlights();
        deskHighlightingHour(getHourFromSliderValue(this.value, 
            curDate.getHours()));
    }
}

function getHourFromSliderValue(value, curHour)
{
    let tempHour = 24 - value;
    tempHour = curHour - tempHour;
    if (tempHour < 0)
        tempHour = 24 + tempHour;
    return tempHour;
}

function displaySliderTime(curDate) {
    
    var popup = document.getElementById("myPopup");
    if( slider.value == 24 )
        popup.innerHTML = "Time: Current";
    else
    {
        popup.innerHTML = "Time:" + 
            getHourFromSliderValue(slider.value, curDate.getHours());
    }
    /*if(!popup.classList.contains("show"))
    {
        popup.classList.toggle("show");
    }*/
}

function updateSliderTime()
{
    var popup = document.getElementById("myPopup");
    let curDate = new Date();
    let valueToHours = getHourFromSliderValue(slider.value, curDate.getHours());
    //In progress
    if ( popup.innerHTML != "Time: Current" )
    {
        if ( slider.value == curDate.getHours() )
            displaySliderTime(curDate);
    }
}

//let sliderUpdate = window.setInterval(updateSliderTime, 5000);
