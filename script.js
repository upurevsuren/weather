var inputCity = document.getElementById("city-name");
var searchButton = document.getElementById("search");
//var currentCity = document.getElementById("current-city");


searchButton.addEventListener("click", function () {
    console.log(inputCity.value)
})


var currentCity = ["current city"];

function displayCity(){

    var city = $.attr("city-name");
    var queryURL = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={6973f9d40a0697728512df68b1f55a07}";


    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {

    }
