var searchInput = document.getElementById("citySearch");
var searchButton = document.getElementById("searchButton");

// Event listener for search button
searchButton.addEventListener("click", function() {
    console.log("click");
    var city = searchInput.value;
    console.log("Search for " + city);
//   getLatLong(city);
});

function getLatLong() {
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
}

function getWeather(lat, lon) {
    var weatherURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=9ca09e5fa97a5b754fdff55f82acba19";
    fetch(weatherURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}