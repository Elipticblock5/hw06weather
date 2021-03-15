var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var description = document.querySelector(".description");
var temperature = document.querySelector(".temperature");
var humidity = document.querySelector(".humidity");
var uvIndex = document.querySelector(".UVIndex");
var windSpeed = document.querySelector(".windspeed");
var weatherIcon = document.querySelector(".weathericon");

//button event listner function and fetch request. 

button.addEventListener('click',function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&APPID=5d70557326e750e6419dd74315c00fd5")

    //then responses using arrow functions learned at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions//
.then(response => response.json())
.then(data => {
    var nameValue = data['name'];
    var temperatureValue = data['main']['temp'];
    var descriptionValue = data['weather'][0]['description'];
    var humidityValue = data['main']['humidity'];
    var windspeedValue = data['wind']['speed'];
    var weatherIconValue = data['weather']['icon'];


    name.innerHTML =nameValue;
    temperature.innerHTML =temperatureValue;
    description.innerHTML =descriptionValue;
    humidity.innerHTML =humidityValue;
    windspeed.innerHTML =windspeedValue;
    weathericon.innerHTML =weatherIconValue;

})

.catch(err => alert("invalid city name"))
})
    
