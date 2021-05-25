//setting open array for cities
var searchCities = [];


//variables from HTML input to for functions.
var cityInputForm = document.querySelector("#city-input-form");
var cityName = document.querySelector("#city");
var weatherContainerFlexBox = document.querySelector("#current-city-container");
var pastCitySearch = document.querySelector("#past-city");
var forecastTitle = document.querySelector("#forecast");
var fiveDayContainer = document.querySelector("#fiveday-containter");
var citySearch = document.querySelector("#searched-city");


var formHandler = function(event) {
    event.preventDefault();

    var city = cityName.value.trim();
    if(city)  {
        getCityForecast(city);
        getFiveDay(city);
        cityName.value = '';
    } else {
        alert("You have to Enter a valid City Name");
    }

    saveTheSearch();
    pastCitySearch(city);
}

var saveTheSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityForecast = function(city){
    var apiKey = '5d70557326e750e6419dd74315c00fd5'
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayCityWeather(data,city);
        });
    });
};


var displayCityWeather = function(weather, searchCities) {

    weatherContainerFlexBox.textContent="";
    pastCitySearch.textContent=searchCities;
}









/* Open Weather API Key 5d70557326e750e6419dd74315c00fd5
let APIkey = '5d70557326e750e6419dd74315c00fd5'
$('.input-group-text').click(getCityWeather);

function getCityWeather() {
    let city = $('.input-search').val();
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;

    console.log(city);

    $.ajax({
        url: queryURL,
        method: 'get'
    }).then((res) => {
        console.log(res);
        $('.city-heading').text(res.name);
        $('.temp').text(res.main.temp);
        $('.humidity').text(res.main.humidity);
        $('.wind-speed').text(res.wind.speed);
        //$('.uv-index').text(res.main.temp);
        $('.input-search').val('')
    })
}
  */


