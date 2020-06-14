var stateSelect = document.getElementById("state-dropdown-menu");
var apiKey = "&api_key=8PYNKmCCNOZNgeQnteDYJtKAQXejR1odSgowgYcn";
var queryValue;
//add function to grab campground api here...

var queryURL = "https://developer.nps.gov/api/v1/campgrounds?stateCode=" 

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

//"https://developer.nps.gov/api/v1/campgrounds?stateCode=UT&api_key=8PYNKmCCNOZNgeQnteDYJtKAQXejR1odSgowgYcn"