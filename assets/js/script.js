var stateSelect = document.getElementById("state-dropdown-menu");
var provinceSelect = document.getElementById("province-dropdown-menu");
var apiKey = "&api_key=afvahcy3rpqnc76atjxg4kjk";
var queryValue;
//add function to grab campground api here...

var queryURL = "https://api.amp.active.com/camping/campgrounds/?pstate=" 

//add function to grab weather data here....
function getCampgroundData (area) {
    $.ajax({
        type: "GET",
        url: queryURL + area + apiKey
    })
    .then (function(data){
        console.log(data)
    })
}

stateSelect.addEventListener('change', function () {
     console.log('change') 
     queryValue = stateSelect.options[stateSelect.selectedIndex].value 
     console.log(queryValue)
    getCampgroundData(queryValue);
    })




provinceSelect.addEventListener('change', function () { 
    console.log('change') 

})




