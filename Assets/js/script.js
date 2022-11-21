// declare  variables
var searchInput = document.getElementById("citySearch");
var searchButton = document.getElementById('searchButton');

// lookup lat and long based on city, pass onto other functions
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
        getCurrentWeather(lat, lon);
        get5DayForecast(lat, lon);
    })
    // todo: add validation if city not found
    // todo: add validation if error (status not 200)
}

// get lat and long, lookup current weather
function getCurrentWeather(lat, lon) {
    console.log("looking up weather for " + lat + ", " + lon);
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=9ca09e5fa97a5b754fdff55f82acba19&units=metric";
    fetch(currentWeatherURL)
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

// create elements for current weather
function loadCurrentWeather(data) {
    console.log("loading current weather for " + data.name);
    var cityName = data.name;
    var currentDate = dayjs().format("MM/DD/YYYY");
    var currentIcon = data.weather[0].icon;
    var currentTemp = data.main.temp;
    var currentHumidity = data.main.humidity;
    var currentWindSpeed = data.wind.speed;

    var currentWeather = document.getElementById("currentWeatherContent");
    var currentWeatherHeader = document.getElementById("currentWeatherHeader");
    var currentIconEl = document.createElement("img");
    var currentTempEl = document.createElement("p");
    var currentHumidityEl = document.createElement("p");
    var currentWindSpeedEl = document.createElement("p");
    
    currentWeatherHeader.textContent = cityName + " (" + currentDate + ")";
    currentWeatherHeader.appendChild(currentIconEl);
    currentIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + currentIcon + ".png");
    currentWeather.appendChild(currentTempEl);
    currentTempEl.textContent = "Temperature: " + currentTemp + "°C";
    currentWeather.appendChild(currentHumidityEl);
    currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
    currentWeather.appendChild(currentWindSpeedEl);
    currentWindSpeedEl.textContent = "Wind Speed: " + currentWindSpeed + " KPH";
}

// lookup 5 day forecast
function get5DayForecast (lat, lon) {
    console.log("looking up 5 day weather for " + lat + ", " + lon);

    var weather5DayForecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=5&appid=9ca09e5fa97a5b754fdff55f82acba19&units=metric";
    fetch(weather5DayForecastURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        load5DayForecast(data);
    })
}

// create elements for 5 day forecast
function load5DayForecast(data) {
    var day1 = document.getElementById("day1Card");
    day1.setAttribute("style", "display: block");
    var day1Date = document.createElement("p");
    var day1Icon = document.createElement("img");
    var day1Temp = document.createElement("p");
    var day1Wind = document.createElement("p");
    var day1Humidity = document.createElement("p");
    day1.appendChild(day1Date);
    day1.appendChild(day1Icon);
    day1.appendChild(day1Temp);
    day1.appendChild(day1Wind);
    day1.appendChild(day1Humidity);
    day1Date.textContent = dayjs().add(1, 'day').format("MM/DD/YYYY");
    day1Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png");
    day1Temp.textContent = "Temp: " + data.list[0].main.temp + "°C";
    day1Wind.textContent = "Wind: " + data.list[0].wind.speed + " KPH";
    day1Humidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
    // day 2
    var day2 = document.getElementById("day2Card");
    day2.setAttribute("style", "display: block");
    var day2Date = document.createElement("p");
    var day2Icon = document.createElement("img");
    var day2Temp = document.createElement("p");
    var day2Wind = document.createElement("p");
    var day2Humidity = document.createElement("p");
    day2.appendChild(day2Date);
    day2.appendChild(day2Icon);
    day2.appendChild(day2Temp);
    day2.appendChild(day2Wind);
    day2.appendChild(day2Humidity);
    day2Date.textContent = dayjs().add(2, 'day').format("MM/DD/YYYY");
    day2Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + ".png");
    day2Temp.textContent = "Temp: " + data.list[1].main.temp + "°C";
    day2Wind.textContent = "Wind: " + data.list[1].wind.speed + " KPH";
    day2Humidity.textContent = "Humidity: " + data.list[1].main.humidity + "%";
    // day 3
    var day3 = document.getElementById("day3Card");
    day3.setAttribute("style", "display: block");
    var day3Date = document.createElement("p");
    var day3Icon = document.createElement("img");
    var day3Temp = document.createElement("p");
    var day3Wind = document.createElement("p");
    var day3Humidity = document.createElement("p");
    day3.appendChild(day3Date);
    day3.appendChild(day3Icon);
    day3.appendChild(day3Temp);
    day3.appendChild(day3Wind);
    day3.appendChild(day3Humidity);
    day3Date.textContent = dayjs().add(3, 'day').format("MM/DD/YYYY");
    day3Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + ".png");
    day3Temp.textContent = "Temp: " + data.list[2].main.temp + "°C";
    day3Wind.textContent = "Wind: " + data.list[2].wind.speed + " KPH";
    day3Humidity.textContent = "Humidity: " + data.list[2].main.humidity + "%";
    // day 4
    var day4 = document.getElementById("day4Card");
    day4.setAttribute("style", "display: block");
    var day4Date = document.createElement("p");
    var day4Icon = document.createElement("img");
    var day4Temp = document.createElement("p");
    var day4Wind = document.createElement("p");
    var day4Humidity = document.createElement("p");
    day4.appendChild(day4Date);
    day4.appendChild(day4Icon);
    day4.appendChild(day4Temp);
    day4.appendChild(day4Wind);
    day4.appendChild(day4Humidity);
    day4Date.textContent = dayjs().add(4, 'day').format("MM/DD/YYYY");
    day4Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + ".png");
    day4Temp.textContent = "Temp: " + data.list[3].main.temp + "°C";
    day4Wind.textContent = "Wind: " + data.list[3].wind.speed + " KPH";
    day4Humidity.textContent = "Humidity: " + data.list[3].main.humidity + "%";
    // day 5
    var day5 = document.getElementById("day5Card");
    day5.setAttribute("style", "display: block");
    var day5Date = document.createElement("p");
    var day5Icon = document.createElement("img");
    var day5Temp = document.createElement("p");
    var day5Wind = document.createElement("p");
    var day5Humidity = document.createElement("p");
    day5.appendChild(day5Date);
    day5.appendChild(day5Icon);
    day5.appendChild(day5Temp);
    day5.appendChild(day5Wind);
    day5.appendChild(day5Humidity);
    day5Date.textContent = dayjs().add(5, 'day').format("MM/DD/YYYY");
    day5Icon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + ".png");
    day5Temp.textContent = "Temp: " + data.list[4].main.temp + "°C";
    day5Wind.textContent = "Wind: " + data.list[4].wind.speed + " KPH";
    day5Humidity.textContent = "Humidity: " + data.list[4].main.humidity + "%";
}


// Event listener for search button
searchButton.addEventListener("click", function() {
    event.preventDefault();
    // clear previous weather data
    clearWeather();
    var city = searchInput.value;
    if (city==="") {
        alert("Please enter a city");
        return;}
    console.log("click");
    console.log("Search for " + city);
  getLatLong(city);

  // add the city as new button
var newButton = document.createElement("button");
var cityList = document.getElementById("cityList");
var savedCity = city;
cityList.append(newButton);
newButton.setAttribute("class", "btn btn-secondary");
newButton.textContent = savedCity;
// add event listener to trigger search if button is clicked
newButton.addEventListener("click", function() {
    event.preventDefault();
    console.log("clicked" + savedCity);
    clearWeather();
    getLatLong(savedCity);
    });
});



// clear previous weather data
function clearWeather() {

    let currentWeatherDiv = document.getElementById('currentWeatherContent');
    currentWeatherDiv.innerHTML = '';

    let day1 = document.getElementById('day1Card');
    day1.innerHTML = '';
    let day2 = document.getElementById('day2Card');
    day2.innerHTML = '';
    let day3 = document.getElementById('day3Card');
    day3.innerHTML = '';
    let day4 = document.getElementById('day4Card');
    day4.innerHTML = '';
    let day5 = document.getElementById('day5Card');
    day5.innerHTML = '';
}
  

