var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var description = document.querySelector(".description");
var temperature = document.querySelector(".temperature");

//button event listner function and fetch request. 

button.addEventListener('click',function(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&APPID=5d70557326e750e6419dd74315c00fd5")

    //then responses using arrow functions learned at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions//
.then(response => response.json())
.then(data => console.log(data))

.catch(err => alert("invalid city name"))
})
    
