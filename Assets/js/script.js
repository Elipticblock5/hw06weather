  
$(document).ready(function () {
    var pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];


    function renderPastSearches() {
        $("#past-searches").empty();

        // trims history to five past searches


        var lastFive = pastSearches.slice(0, 4);
        for (var i = 0; i < lastFive.length; i++) {
            $("#past-searches").append($("<a href='' class='city list-group-item'>").text(lastFive[i]));
        };
    };
 
    //form handling
    $("form").on("submit", function (event) {
        event.preventDefault();

    var cityInput = $("#search").val().trim();

    //call to API

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=5d70557326e750e6419dd74315c00fd5",
        method: "GET"
    }).then(function (response) {
        // this should add city to search history
        if (!pastSearches.includes(response.name)) {
            pastSearches.push(response.name);
        }
        localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
        $("#search").val("");
        renderPastSearches();

// drops data into correct containter, today 
        var todaysWeathBox = $("#cur-weather");
        console.log(response);
        todaysWeathBox.append($("#city").text(response.name + " (" + moment().format('L') + ")"));
        todaysWeathBox.append($("#temp").text("Current Temp: " + response.main.temp.toFixed(1)));
        todaysWeathBox.append($("#feels").text("Feels Like Temp: " + response.main.feels_like.toFixed(1)));
        todaysWeathBox.append($("#humid").text("Humidity: " + response.main.humidity + "%"));
        todaysWeathBox.append($("#windspeed").text("Wind Speed: " + response.wind.speed + " MPH"));
        $("#cur-weather").append(todaysWeathBox);

//uv variable and call
        var cityCoord = [response.coord.lat, response.coord.lon];
        cityUVindex(cityCoord);

    });

    //calling function to get UV for city

    function cityUVindex(cityCoord) {
        
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=appid=5d70557326e750e6419dd74315c00fd5&lat=" + cityCoord[0] + "&lon=" + cityCoord[1],
            method: "GET"
        }).then(function (response) {
            var curWeathEl = $("#cur-weather");
            curWeathEl.append($("#uv").text("UV Index: " + response.value));
        });
    };

      // Get the five day
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=5d70557326e750e6419dd74315c00fd5",
        method: "GET"
    }).then(function (response) {
        console.log(response)

     //clears weahter boxes
     $("#weather-boxes").empty();

     //appends weather box section, have to iterate through current date

     for (var i = 1; i < 6; i++) {
        var box = $("<div>")
        var boxCol = $("<div class='col-md-2'>");
        var weathTitle = $("<h5>");
        var openWeathImg = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png").attr("style", "width: 100px;")
        var para1 = $("<p>").text("Temp: " + response.list[i].main.temp_max + " °F");
        var para2 = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");

        $("#weather-boxes").append(box.append(boxCol.append((weathTitle).text(moment().add(i, "day").format('L')), openWeathImg, para1, para2)))
    }
});
});


    $(document).on("click", ".city", function () {
            console.log($(this).text());
        });    

        renderPastSearches();
    });
