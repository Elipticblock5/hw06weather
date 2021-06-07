//setting open array for cities
var searchCities = [];


//variables from HTML input to for functions.
var cityInputFormEl = document.querySelector("#city-input-form");
var cityNameEl = document.querySelector("#city");
var weatherContainerFlexBoxEl = document.querySelector("#current-city-container");
var inputCitySearchEl = document.querySelector("#past-city");
var forecastTitleEl = document.querySelector("#forecast");
var fiveDayContainerEl = document.querySelector("#fiveday-containter");
var citySearchPastEl = document.querySelector("#searched-city");


//form handler
var formHandler = function(event) {
    event.preventDefault();

    var city = cityNameEl.value.trim();
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

//dearch save function

var saveTheSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

//get forecast function.

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

    weatherContainerFlexBoxEl.textContent="";
    inputCitySearchEl.textContent=searchCities;
}


//create date element using moment
var todaysDate = document.createElement("span")
todaysDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
citySearchInputEl.appendChild(todaysDate);

//makes an imaage using icons

 var weathIcon = document.createElement("img")
 weathIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
 inputCitySearchEl.appendChild(weathIcon);


 //makes an area to hold temp data
 var tempEl = document.createElement("span");
 tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
 tempEl.classList = "list-group-item"


// makes an area to hold humid data
   var humidEl = document.createElement("span");
   humidEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidEl.classList = "list-group-item"

// makes a wind datea holder
  var windDataEl = document.createElement("span");
  windDataEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windDataEl.classList = "list-group-item"



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

// Places above variables in containers

 //tmp El
 weatherContainerEl.appendChild(tempEl);

 //humid El
 weatherContainerEl.appendChild(humidEl);

 //wind spped El
 weatherContainerEl.appendChild(windDataEl);
