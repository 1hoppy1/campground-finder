var stateSelect = document.getElementById("state-dropdown-menu");
var provinceSelect = document.getElementById("province-dropdown-menu");

stateSelect.addEventListener('change', function(){console.log('change')})
provinceSelect.addEventListener('change', function(){console.log('change')})




//This makes the Modal work
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
// add key to open weather


// add key to open weather


//a3ce1170090b51754d348bf99509f9f8857bddbe
 $.ajax({
     url:"http://api.amp.active.com/camping/campground/details?contractCode=CO&parkId=50032&api_key=ajx3dgbbz3xz9ftbez8be438",
     method:"GET"
    
 }).then (function(campgroundResults){
     console.log("campground-api",campgroundResults)
     $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?lat=38.8947222&lon=-105.1794444&units=imperial&appid="+keys.OPENWEATHER,
        method:"GET"
    }).then (function(results){
        console.log("openweather",results)
    })
 })


 
