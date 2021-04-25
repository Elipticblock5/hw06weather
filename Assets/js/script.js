// Open Weather API Key 5d70557326e750e6419dd74315c00fd5
let APIkey = '5d70557326e750e6419dd74315c00fd5'
let city = 'Phoenix';
let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

$.ajax({
    url: queryURL,
    method: 'get'
}).then((res) => {
    console.log(res);
})
    
