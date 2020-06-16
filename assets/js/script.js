var stateSelect = document.getElementById("state-dropdown-menu");
var provinceSelect = document.getElementById("province-dropdown-menu");
var modalBtn = document.getElementById('modal-btn');
var apiKey = "&api_key=afvahcy3rpqnc76atjxg4kjk";
var queryValue;
//add function to grab campground api here...

var queryURL = "https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campgrounds/?pstate="

//add function to grab weather data here....
function getCampgroundData(area) {
    $.ajax({
        type: "GET",
        url: queryURL + area + apiKey
    })
        .then(function (data) {
            console.log(data)
            var dataAsJSON = xmlToJson(data);

            var resultData = dataAsJSON.resultset.result
            campgroundCards(resultData)
        })
}

function campgroundCards(campgroundData) {
 //create cards and append data to them here.....
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
    
    //This opens the Modal after the user selects state or province
    const elem = document.getElementById('modal1');
    const instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
   
})

provinceSelect.addEventListener('change', function () {
    queryValue = provinceSelect.options[provinceSelect.selectedIndex].value
    console.log(queryValue)
    getCampgroundData(queryValue);

//This opens the Modal after the user selects state or province
const elem = document.getElementById('modal1');
const instance = M.Modal.init(elem, {dismissible: false});
instance.open();

})
