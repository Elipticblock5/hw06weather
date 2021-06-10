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
        var todaysDate = document.createElement("span")
        todaysDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
        citySearchInputEl.appendChild(todaysDate);

        var weathIcon = document.createElement("img")
        weathIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
        inputCitySearchEl.appendChild(weathIcon);

        var tempEl = document.createElement("span");
        tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
        tempEl.classList = "list-group-item";

        var humidEl = document.createElement("span");
        humidEl.textContent = "Humidity: " + weather.main.humidity + " %";
        humidEl.classList = "list-group-item";

        var windDataEl = document.createElement("span");
        windDataEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
        windDataEl.classList = "list-group-item";
    });
};


var displayCityWeather = function(weather, searchCities) {

    weatherContainerFlexBoxEl.textContent="";
    inputCitySearchEl.textContent=searchCities;
}


/*create date element using moment
var todaysDate = document.createElement("span")
todaysDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
citySearchInputEl.appendChild(todaysDate);*/
//makes an imaage using icons

 /*var weathIcon = document.createElement("img")
 weathIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
 inputCitySearchEl.appendChild(weathIcon);*/



 //makes an area to hold temp data
 /*var tempEl = document.createElement("span");
 tempEl.textContent = "Temperature: " + weather.main.temp + " °F";
 tempEl.classList = "list-group-item"*/


// makes an area to hold humid data
   /* var humidEl = document.createElement("span");
   humidEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidEl.classList = "list-group-item" */

// makes a wind datea holder
  /* var windDataEl = document.createElement("span");
  windDataEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windDataEl.classList = "list-group-item" */



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
 weatherContainerFlexBoxEl.appendChild(tempEl);

 //humid El
 weatherContainerFlexBoxEl.appendChild(humidEl);

 //wind spped El
 weatherContainerFlexBoxEl.appendChild(windDataEl);

 //section for UV index

 var findUvIndex = function(lat,lon){
    var apiKey = '5d70557326e750e6419dd74315c00fd5'
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            showUvIndex(data)
           // console.log(data)
        });
    });
    //console.log(lat);
    //console.log(lon);
}

var showUvIndex = function(index){
    var showUvIndexEl = document.createElement("div");
    showUvIndexEl.textContent = "UV Index: "
    showUvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value
// if else for severity
    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    showUvIndexEl.appendChild(uvIndexValue);
 
    // inster into current weater

    weatherContainerEl.appendChild(showUUvIndexEl);
}


// Five day section

var getFiveDay = function(city){
    var apiKey = '5d70557326e750e6419dd74315c00fd5'
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           displayFiveDay(data);
        });
    });
};


//display five day function

var displayFiveDay = function(weather){
    fiveDayContainerEl.textContent = ""
    forecastTitle.textContent = "Five Day Forecast:";


    //making index for forecast

    var forecast = weather.list;
    for(var i=5; i < forecast.length; i=i+8){
   var dailyForecast = forecast[i];

   //creates ane Element for the forecast

   var forecastElement=document.createElement("div");
       forecastElement.classList = "card bg-primary text-light m-2";

       //create date element for the forecast
       var todaysDate = document.createElement("h5")
       todaysDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       todaysDate.classList = "card-header text-center"
       forecastElement.appendChild(todaysDate);


        //create an image element
        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

        //append to forecast card
       forecastElement.appendChild(weatherIcon);

        //create temperature span
        var forecastTempEl=document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastElement.appendChild(forecastTempEl);

        var forecastHumidEl=document.createElement("span");
       forecastHumidEl.classList = "card-body text-center";
       forecastHumidEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastElement.appendChild(forecastHumidEl);

        // console.log(forecastElement);

       //append to five day container
        fiveDayContainerEl.appendChild(forecastElement);
    }

}


