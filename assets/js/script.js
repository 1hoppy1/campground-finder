var stateSelect = document.getElementById("state-dropdown-menu");
var provinceSelect = document.getElementById("province-dropdown-menu");
var modalBtn = document.getElementById('modal-btn');
var campgroundCardEl = document.getElementById("campground-card-el");
var apiKey = "&api_key=afvahcy3rpqnc76atjxg4kjk";
var queryValue;

//add function to grab campground api here...

var queryURL = "https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campgrounds/?pstate="

//add function to grab weather data here....

// var currentWeather = function(location){
//     var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&units=imperial&appid=803fa34dbd4909977dd765eb002a2987";
//     fetch(currentWeatherAPI).then(function(response){
//         response.json().then(function(data){
//             displayWeather(data, location)
//             // console.log(data);
//         })
//     });
// };

// var displayWeather = function(weather, coord){
//     weatherContainerEl.textContent ="";
//     weatherSearchTerm.textContent = coord;
//     weatherIcon = weather.weather[0].icon;
//     var weatherIconImg = document.createElement("img");
//     weatherIconImg.src = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
//     weatherSearchTerm.appendChild(weatherIconImg);
    

//     var weatherTemp = weather.main.temp;
//     var weatherType = weather.weather.description;

//     console.log(weather);
//     // console.log(inputCity);

//     var weatherContainerTemp = document.createElement('P');
//         weatherContainerTemp.innerHTML = "Temperature: " + weatherTemp;
//         weatherContainerEl.appendChild(weatherContainerTemp);

//     var weatherType = document.createElement('P');
//         weatherType.innerHTML = "Currently: " + weatherTemp;
//         weatherContainerEl.appendChild(weatherType);

// };

function getCampgroundData(area) {
    $.ajax({
            type: "GET",
            url: queryURL + area + apiKey
        })
        .then(function (data) {

            var dataAsJSON = xmlToJson(data);
            var resultData = dataAsJSON.resultset.result
            campgroundCards(resultData);
            console.log(resultData);
        })
};

function filterData (resultData){
    campgroundCards(resultData);
};
function modalBtnHandler(){
    campgroundCards();
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
        <div class="row">
            <div class="card small col s6 m3">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="./assets/images/campfire.jfif">
                </div>
                <div class="card-content" id="[i]+card-content">
                    <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
                    <p><a href="#">Current Weather</a></p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
            </div>
        </div>
        `;

        //append new card to container
        campgroundCardEl.innerHTML = cardContent;

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

//This is the majority of the persistance storage function
window.onload = function () {
    var state = localStorage.getItem("state");
    $('#state-dropdown-menu').val(state);
    var province = localStorage.getItem("province");
    $('#province-dropdown-menu').val(province);

    if (state = true) {
        queryValue = stateSelect.options[stateSelect.selectedIndex].value
        getCampgroundData(queryValue);
    }
    if (province = true) {
        queryValue = provinceSelect.options[provinceSelect.selectedIndex].value
        getCampgroundData(queryValue);
    }
}
$('#state-dropdown-menu').change(function () {
    var stateValue = $(this).val();
    localStorage.setItem("state", stateValue);
});
$('#province-dropdown-menu').change(function () {
    var provinceValue = $(this).val();
    localStorage.setItem("province", provinceValue);
});

modalBtn.addEventListener('click', modalBtnHandler);
