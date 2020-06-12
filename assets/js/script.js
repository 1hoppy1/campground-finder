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


 