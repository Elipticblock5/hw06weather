// Open Weather API Key 5d70557326e750e6419dd74315c00fd5
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



