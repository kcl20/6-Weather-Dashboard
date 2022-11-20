var searchInput = document.getElementById("citySearch");
var searchButton = document.getElementById('searchButton');


function getLatLong(city) {
    console.log("looking up lat/long for " + city);
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=9ca09e5fa97a5b754fdff55f82acba19";
    fetch(geoURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        getWeather(lat, lon);
    })
    // todo: add validation if city not found
    // todo:  add validation if error (status not 200)
}

function getWeather(lat, lon) {
    console.log("looking up weather for " + lat + ", " + lon);
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=9ca09e5fa97a5b754fdff55f82acba19";
    fetch(weatherURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var currentTemp = data.main.temp;
        var currentHumidity = data.main.humidity;
        var currentWindSpeed = data.wind.speed;
        
    })
}


// Event listener for search button
searchButton.addEventListener("click", function() {
    event.preventDefault();
    var city = searchInput.value;
    if (city==="") {
        alert("Please enter a city");
        return;}
    console.log("click");
    console.log("Search for " + city);
  getLatLong(city);
});
