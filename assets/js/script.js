
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
    selectedState: "",
    selectedProvince: "",
    selectedAmeneties: {},
};
//add function to grab campground api here...


function getCampgroundData(area) {
    console.log(area)

    var queryURL = "https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campgrounds/?pstate="
    $.ajax({
        type: "GET",
        url: queryURL + area + apiKey
    })
        .then(function (data) {

            var dataAsJSON = xmlToJson(data);
            var resultData = dataAsJSON.resultset.result

            userSelection.resultData = resultData
            console.log(userSelection.resultData);
        })
};

function modalBtnHandler() {

    const { selectedAmeneties } = userSelection;

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
    console.log(selectedAmeneties.campPets)

    if (selectedAmeneties.campPowerCheck) {
        campgroundCards(selectedAmeneties.campPower);
    }
    if (selectedAmeneties.campPetsCheck) {
        campgroundCards(selectedAmeneties.campPets);
    }
    if (selectedAmeneties.campSewerCheck) {
        campgroundCards(selectedAmeneties.campSewer);
    }
    if (selectedAmeneties.campWaterCheck) {
        campgroundCards(selectedAmeneties.campWater);
    }
    if (selectedAmeneties.campWaterFrontCheck) {
        campgroundCards(selectedAmeneties.campWaterFront);
    }
    if ((!selectedAmeneties.campPowerCheck) &&
        (!selectedAmeneties.campPetsCheck) &&
        (!selectedAmeneties.campSewerCheck) &&
        (!selectedAmeneties.campWaterCheck) &&
        (!selectedAmeneties.campWaterFrontCheck)) {
        campgroundCards(userSelection.resultData);
    }
};

//create cards and append data to them here.....
function campgroundCards(campgroundData) {
    console.log(userSelection.resultData, "campground data")
    campgroundCardEl.textContent = ""


    for (var i = 0; i < 20; i++) {
        //campName = campgroundData.facilityName;
        console.log("https://api.openweathermap.org/data/2.5/weather?lat=" + userSelection.resultData[i]["@attributes"].latitude + "&lon=" + userSelection.resultData[i]["@attributes"].longitude + "&units=imperial&appid=" + keys.OPENWEATHER)
        let campsiteDataIndex = i;
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?lat=" + userSelection.resultData[i]["@attributes"].latitude + "&lon=" + userSelection.resultData[i]["@attributes"].longitude + "&units=imperial&appid=" + keys.OPENWEATHER,
            method: "GET"
        }).then(function (currentWeather) {

            console.log(currentWeather);
            const card = document.createElement('div');
            card.classList = 'card-body';
            var iconurl = "http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png";
            console.log(iconurl)
            //construct card content
            const cardContent = document.createElement('div');
            cardContent.classList = "small col s6 m3"
            cardContent.innerHTML =
                `<div class="card small">
                        <div id="card-img" class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="./assets/images/morning camp.jpg">
                        </div>
                        <div class="card-content" id="card-content">
                            <span id="card-title" class="card-title activator grey-text text-darken-4">${userSelection.resultData[campsiteDataIndex]["@attributes"].facilityName}</span>
                            <p>Click the image for weather!</p>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">Current Weather<i class="material-icons right">close</i></span>
                            <div id ="weather-icon"><img  src="${iconurl}" /></div>
                            <div id ="weather-temp">temp:${currentWeather.main.temp}</div>
                        </div>
                    </div>`;
            campgroundCardEl.append(cardContent);

        })
    }
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
window.onload = function () {
    var state = localStorage.getItem("state");
    $('#state-dropdown-menu').val(state);
    var province = localStorage.getItem("province");
    $('#province-dropdown-menu').val(province);

    if (state) {
        queryValue = stateSelect.options[stateSelect.selectedIndex].value
        getCampgroundData(queryValue);
        campgroundCards();
    }
    if (province) {
        queryValue = provinceSelect.options[provinceSelect.selectedIndex].value
        getCampgroundData(queryValue);
        campgroundCards();
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
