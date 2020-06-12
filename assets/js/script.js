
//This makes the Side Bar work
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

/*This notation section only needed if we use side navigation bar and want collapsible option
//Initialize collapsible (uncomment the lines below if you use the dropdown variation)
var collapsibleElem = document.querySelector('.collapsible');
var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);
*/

//This makes the state,province,park dropdown boxes work
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
});


//This makes the Modal work
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

// add key to open weather

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


 
