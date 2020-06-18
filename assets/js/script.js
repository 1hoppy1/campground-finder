var stateSelect = document.getElementById("state-dropdown-menu");
var provinceSelect = document.getElementById("province-dropdown-menu");
var modalBtn = document.getElementById('modal-btn');
var campgroundCardEl = document.getElementById("campground-card-el");
var apiKey = "&api_key=afvahcy3rpqnc76atjxg4kjk";
var queryValue;
var weatherIcon = document.getElementById("weather-icon");
var weatherCardTemp = document.getElementById("weather-temp");
var weatherCardCondition = document.getElementById("weather-cond")
var userSelection = {
    selectedState:"",
    selectedProvince:"",
    selectedAmeneties:{},
};
//add function to grab campground api here...

var queryURL = "https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campgrounds/?pstate="

//add function to grab weather data here....

var currentWeather = function(location){
    var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=lat="+ userSelection.campLat + "&lon=" + userSelection.campLon + "&units=imperial&appid=a6fe42d269d6db96181cb890742e1fc3";
    fetch(currentWeatherAPI).then(function(response){
        response.json().then(function(data){
            displayWeather(data, location)
            console.log(data);
        })
    });
};

var displayWeather = function(weather){
    weatherIcon = weather.weather[0].icon;
    var weatherIconImg = document.createElement("img");
    weatherIconImg.src = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    weatherIcon.appendChild(weatherIconImg);
    
    var weatherTemp = weather.main.temp;
    var weatherType = weather.weather.description;

    console.log(weather);

    weatherCardTemp.innerHTML = "Temperature: " + weatherTemp;
    weatherCardCondition.innerHTML = "Currently: " + weatherType;


};

function getCampgroundData(area) {
    $.ajax({
            type: "GET",
            url: queryURL + area + apiKey
        })
        .then(function (data) {

            var dataAsJSON = xmlToJson(data);
            var resultData = dataAsJSON.resultset.result
            // campgroundCards(resultData);
            userSelection.resultData = resultData
            console.log(userSelection.resultData);
        })
};

function filterData (resultData){
    campgroundCards(resultData);
};
function modalBtnHandler(){

    const {selectedAmeneties} = userSelection;

    selectedAmeneties.campPower = document.getElementById("sitesWithAmps").value;
    selectedAmeneties.campPets = document.getElementById("sitesWithPetsAllowed").value;
    selectedAmeneties.campSewer = document.getElementById("sitesWithSewerHookup").value;
    selectedAmeneties.campWater = document.getElementById("sitesWithWaterHookup").value;
    selectedAmeneties.campWaterFront = document.getElementById("sitesWithWaterfront").value;

    selectedAmeneties.campPowerCheck = document.getElementById("sitesWithAmps").checked;
    selectedAmeneties.campPetsCheck = document.getElementById("sitesWithPetsAllowed").checked;
    selectedAmeneties.campSewerCheck = document.getElementById("sitesWithSewerHookup").checked;
    selectedAmeneties.campWaterCheck = document.getElementById("sitesWithWaterHookup").checked;
    selectedAmeneties.campWaterFrontCheck = document.getElementById("sitesWithWaterfront").checked;
    console.log(selectedAmeneties.campPetsCheck)
    console.log(selectedAmeneties.campSewerCheck)
    
    if (selectedAmeneties.campPowerCheck){
        filterData(selectedAmeneties.campPower);
    }
    if (selectedAmeneties.campPetsCheck){
        filterData(selectedAmeneties.campPets);
    }
    if (selectedAmeneties.campSewerCheck){
        filterData(selectedAmeneties.campSewer);
    }
    if (selectedAmeneties.campWaterCheck){
        filterData(selectedAmeneties.campWater);
    }
    if (selectedAmeneties.campWaterFrontCheck){
        filterData(selectedAmeneties.campWaterFront);
    }
    else{
        campgroundCards();
    }
};

 //create cards and append data to them here.....
function campgroundCards(campgroundData) {
    // for(var i=0; i<20;i++){
        // campName = campgroundData.facilityName;
        console.log(campgroundData);
        const card = document.createElement('div');
        card.classList = 'card-body';

        //construct card content
        const cardContent = `
        <div class="small col s6 m3">
            <div class="card">
                <div id="card-img" class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="./assets/images/morning camp.jpg">
                </div>
                <div class="card-content" id="card-content">
                    <span id="card-title" class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span>
                    <p>Click Image for Weather</p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Current Weather<i class="material-icons right">close</i></span>
                    <div id ="weather-icon">Icon</div>
                    <div id ="weather-cond">condition</div>
                    <div id ="weather-temp">temp</div>
                </div>
            </div>
        </div>
        `;

        //append new card to container
        campgroundCardEl.innerHTML = cardContent;
        document.getElementById("card-title").innerHTML = userSelection.resultData[0]["@attributes"].facilityName;

// add image to card
        // var cardImg = document.createElement("img");
        //     cardImg.setAttribute("class", "activator");
        //     var cardImgEndPoint = userSelection.resultData[0]["@attributes"].facilityPhoto;
        //     cardImg.src = "https://cors-anywhere.herokuapp.com" + cardImgEndPoint;
        //     var cardImgDiv = document.getElementById("card-img");
        //     cardImgDiv.appendChild(cardImg);

        //access coordinates from camp API and store it to use for weather
        userSelection.campLat = userSelection.resultData[0]["@attributes"].latitude;
        userSelection.campLon = userSelection.resultData[0]["@attributes"].longitude;
        currentWeather();
    // }
}

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

stateSelect.addEventListener('change', function () {
    queryValue = stateSelect.options[stateSelect.selectedIndex].value
    console.log(queryValue)
    userSelection.selectedState = queryValue
    getCampgroundData(queryValue);

    //This opens the Modal after the user selects state
    const elem = document.getElementById('modal1');
    const instance = M.Modal.init(elem, {
        dismissible: false
    });
    instance.open();

    //This is a small part of the persistance storage function
    localStorage.setItem("state", stateSelect.value);
    $('#province-dropdown-menu').val("");
    localStorage.removeItem("province");
});


provinceSelect.addEventListener('change', function () {
    queryValue = provinceSelect.options[provinceSelect.selectedIndex].value
    console.log(queryValue)
    userSelection.selectedProvince = queryValue
    getCampgroundData(queryValue);

    //This opens the Modal after the user selects province
    const elem = document.getElementById('modal1');
    const instance = M.Modal.init(elem, {
        dismissible: false
    });
    instance.open();

    //This is a small part of the persistance storage function
    localStorage.setItem("province", provinceSelect.value);
    $('#state-dropdown-menu').val("");
    localStorage.removeItem("state");
})

// //This is the majority of the persistance storage function
// window.onload = function () {
//     var state = localStorage.getItem("state");
//     $('#state-dropdown-menu').val(state);
//     var province = localStorage.getItem("province");
//     $('#province-dropdown-menu').val(province);

//     if (state = true) {
//         queryValue = stateSelect.options[stateSelect.selectedIndex].value
//         getCampgroundData(queryValue);
//     }
//     if (province = true) {
//         queryValue = provinceSelect.options[provinceSelect.selectedIndex].value
//         getCampgroundData(queryValue);
//     }
// }
// $('#state-dropdown-menu').change(function () {
//     var stateValue = $(this).val();
//     localStorage.setItem("state", stateValue);
// });
// $('#province-dropdown-menu').change(function () {
//     var provinceValue = $(this).val();
//     localStorage.setItem("province", provinceValue);
// });

modalBtn.addEventListener('click', modalBtnHandler);
