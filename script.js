var cities = ["New York", "Seattle", "Detroit", "San Francisco","Chicago","Los angeles"];
var apiKey = "c94ac49bcd423ef700d020797840e0c4";
var lat = "latitude";
var lon = "longitude";
var uvIndex = (lat + lon)

cities.forEach(function (city, index, originalArr) {
    renderButtons(city);

    if (index === originalArr.length - 1) {
        displayWeatherInfo(city);
    }
})

function displayWeatherInfo(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=imperial`;

    // var queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    $.get(queryURL).then(function (response) {
        // let unIndex = response.coord.lon.lat;
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var queryUV = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
				console.log(response, "1");
        $.get(queryUV)
            .then(function (uvResponse) {
            
            $.get(forecast).then(function (response) {
            	console.log(response.list);
              response.list.forEach(el => {
              	$("#forecast-icons").append(`
              <div class="card" id="monday">
                                          <div class="card-body">
                                          <p id="date">${el.dt_txt}</p>
                                          <p id="temp">Temp:${el.main.temp} &#176F</p>
                                          <p id="humidity">Wind:${el.wind.speed}</p>
                                          </div>
               </div>
             `);
              })
              
              
              
            });
            
                console.log(uvResponse, "2")
                // Data Calculations 
                var temperature = response.main.temp;
                let windSpeed = response.wind.speed;
                let humidity = response.main.humidity;
                // ====== Building HTML Element =====
                var cityDiv = $("<div class='city'>");
                var header = $("<h4>").text(city);
                var pOne = $("<p>").text("Temperature: " + temperature + String.fromCharCode(176) + "F");
                var pTwo = $("<p>").text("Wind Speed: " + windSpeed + "mph");
                var pThree = $("<p>").text("Humidity: " + humidity + "%");

                var color = "green";
                var UVindex = uvResponse.value;
                if(UVindex > 10){
                    color = "red";
                }
                else if(UVindex > 4){
                    color = "purple";
                };


                var uvSpan = $("<span>").text(uvResponse.value).css("color", color)
                var pFour = $("<p>").text("UV Index: ").append(uvSpan);
                cityDiv.append(header, pOne, pTwo, pThree, pFour);
        
                // =======Push Element to Page =====
        
                $("#weather-view").empty();
                $("#weather-view").prepend(cityDiv);
            })


    })

}

function renderButtons(city) {
    var btn = $("<button>");
    btn.addClass("city-btn btn btn-default").css("display", "block");
    btn.attr("data-name", city);
    btn.text(city);
    $(".cities-array").append(btn);
}

$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    //  Declare Variables 
    var $weather = $("#city-input").val();

    //  Update Search History 
    cities.push($weather);
    localStorage.setItem("weather", JSON.stringify(cities))

    // Function calls 
    renderButtons($weather);
    displayWeatherInfo($weather)
});

$(document).on("click", ".city-btn", function () {
    var city = $(this).attr("data-name");
    displayWeatherInfo(city);
});