  
$(document).ready(function () {
    var pastSearches = JSON.parse(localStorage.getItem("searches")) || [];


    function renderPastSearches() {
        $("#past-searches").empty();

        // trims history to five past searches


        var lastFive = searches.slice(0, 4);
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
        if (!searches.includes(response.name)) {
            searches.push(response.name);
        }
        localStorage.setItem("searches", JSON.stringify(searches));
        $("#search").val("");
        renderPastSearches();




