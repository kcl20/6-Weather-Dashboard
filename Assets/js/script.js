var searchInput = document.getElementById("citySearch");
var searchButton = document.getElementById('searchButton');


function getLatLong(city) {
    console.log("looking up lat/long for " + city);
    localStorage.setItem("city", city);
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

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=9ca09e5fa97a5b754fdff55f82acba19&units=metric";
    fetch(weatherURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        if (data.length === 0) {
            console.log("no results");
            alert("No results found. Please try again.");
        } else {
            loadCurrentWeather(data);
        }
    })
}

function loadCurrentWeather(data) {

    console.log("loading current weather for " + data.name);

    var cityName = data.name;
    var currentDate = dayjs().format("MM/DD/YYYY");
    var currentIcon = data.weather[0].icon;
    var currentTemp = data.main.temp;
    var currentHumidity = data.main.humidity;
    var currentWindSpeed = data.wind.speed;

    var currentWeather = document.getElementById("Current Weather");
    var cityNameEl = document.createElement("h1");
    var currentIconEl = document.createElement("img");
    var currentTempEl = document.createElement("p");
    var currentHumidityEl = document.createElement("p");
    var currentWindSpeedEl = document.createElement("p");
    
    currentWeather.appendChild(cityNameEl);
    cityNameEl.textContent = cityName + " (" + currentDate + ")";
    cityNameEl.appendChild(currentIconEl);
    currentIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIcon + ".png");
    currentWeather.appendChild(currentTempEl);
    currentTempEl.textContent = "Temperature: " + currentTemp + "°C";
    currentWeather.appendChild(currentHumidityEl);
    currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
    currentWeather.appendChild(currentWindSpeedEl);
    currentWindSpeedEl.textContent = "Wind Speed: " + currentWindSpeed + " KPH";

    var day1 = document.getElementById("Day 1");
    day1.setAttribute("style", "display: block");
    
    var day2 = document.getElementById("Day 2");
    day2.setAttribute("style", "display: block");
    var day3 = document.getElementById("Day 3");
    day3.setAttribute("style", "display: block");
    var day4 = document.getElementById("Day 4");
    day4.setAttribute("style", "display: block");
    var day5 = document.getElementById("Day 5");
    day5.setAttribute("style", "display: block");


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
