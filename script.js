
var date = moment().format("MMM Do YYYY");
var day = moment().format("MMM Do");
var hour = parseInt(moment().format("HH"));
var cityList = ["city1", "city2", "city3", "city4", "city5", "city6", "city7", "city8"]
var userSelectedCity = [];
var lat = 0;
var lon = 0;

function postData() {
  var localStore = JSON.parse(localStorage.getItem("userInput"))
  for (let i = 0; i < localStore.length; i++) {
    const element = localStore[i];
    document.getElementById(cityList[i]).innerHTML = element;

  }
}
postData()


// --------------When user hits the search button user Input gets put into City text area---------------------------

function postList() {
  var userInput = document.getElementById("userCity").value;

  var localStore = JSON.parse(localStorage.getItem("userInput")) || []
  userSelectedCity.push(userInput)
  localStore.push(userInput);
  fiveDay()

  localStorage.setItem("userInput", JSON.stringify(localStore));

  for (let i = 0; i < userSelectedCity.length; i++) {

    console.log(userSelectedCity[i]);
    document.getElementById(cityList[i]).innerHTML = userSelectedCity[i];
    document.getElementById("currCity").innerHTML = userSelectedCity[i] + "&nbsp";
    console.log("cityList", cityList[i]);

    var queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + userSelectedCity[i] + "&appid=bb55783c8d612e6ce0920236575bef0d";



    // -----------------------------------Populates the larger weather area -----------------------------

    //  Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      //  We store all of the retrieved data inside of an object called "data"
      .then(function (data) {
        console.log("response", data)
        $("#wind").text("Wind Speed: " + data.list[0].wind.speed + " Mph");
        $("#humidity").text("Humidity: " + data.list[0].main.humidity + "%");
        $("#currDate").text(date);
        var icon = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
        $(".lrgIcon").attr("src", icon);
        console.log('humidity', data.list[0].main.humidity);

        //  Convert the temp to fahrenheit
        var tempF = (data.list[0].main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        //  $("#temp").text("Temperature (K) " + data.list[0].main.temp);
        $("#temp").text("Temperature " + tempF.toFixed(0) + "°F");
        lat = (data.list[0].coord.lat);
        lon = (data.list[0].coord.lon);
        uvData()
      })
  }
}

// -------------------------------Gets UV index------------------------------------------

   function uvData() {


    var queryUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=bb55783c8d612e6ce0920236575bef0d";

        //  Here we run our AJAX call to the OpenWeatherMap API

    $.ajax({
      url: queryUV,
      method: "GET"
    })
    .then(function (data) {
      console.log("response", data)
    $("#uv").text("UV Index:" + data.value);
  })

}


// --------------------------gets 5 day forecast-------------------------------------------
function fiveDay() {
  for (let i = 0; i < userSelectedCity.length; i++) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSelectedCity[i] + "&appid=bb55783c8d612e6ce0920236575bef0d";

    //  Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })

        // --------------Five Day Forecast Weather: Day 1 -----------------
        
        .then(function (data) {
          console.log("response", data)

        // $("#date1").text(data.list[2].dt_txt);
        // var day = moment().add(1, 'days').calendar();
        // var day = moment().format("MMM Do");

        $("#hum1").text("Humidity: " + data.list[2].main.humidity + "%");
        var icon = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
        $("#icon1").attr("src", icon);
        //  Convert the temp to fahrenheit
        var tempF = (data.list[2].main.temp - 273.15) * 1.80 + 32;
        $("#temp1").text("Temperature: " + tempF.toFixed(0) + "°F");


        // --------------Five Day Forecast Weather: Day 2 -----------------
        $("#date2").text(data.list[10].dt_txt);
        $("#hum2").text("Humidity: " + data.list[11].main.humidity + "%");
        var icon = "http://openweathermap.org/img/w/" + data.list[10].weather[0].icon + ".png";
        $("#icon2").attr("src", icon);
        //  Convert the temp to fahrenheit
        var tempF = (data.list[10].main.temp - 273.15) * 1.80 + 32;
        $("#temp2").text("Temperature: " + tempF.toFixed(0) + "°F");

        // --------------Five Day Forecast Weather: Day 3 -----------------
        $("#date3").text(data.list[18].dt_txt);
        $("#hum3").text("Humidity: " + data.list[18].main.humidity + "%");
        var icon = "http://openweathermap.org/img/w/" + data.list[18].weather[0].icon + ".png";
        $("#icon3").attr("src", icon);
        //  Convert the temp to fahrenheit
        var tempF = (data.list[18].main.temp - 273.15) * 1.80 + 32;
        $("#temp3").text("Temperature: " + tempF.toFixed(0) + "°F");

        // --------------Five Day Forecast Weather: Day 4 -----------------
        $("#date4").text(data.list[26].dt_txt);
        $("#hum4").text("Humidity: " + data.list[26].main.humidity + "%");
        var icon = "http://openweathermap.org/img/w/" + data.list[26].weather[0].icon + ".png";
        $("#icon4").attr("src", icon);
        //  Convert the temp to fahrenheit
        var tempF = (data.list[26].main.temp - 273.15) * 1.80 + 32;
        $("#temp4").text("Temperature: " + tempF.toFixed(0) + "°F");

        // --------------Five Day Forecast Weather: Day 5 -----------------
        $("#date5").text(data.list[34].dt_txt);
        $("#hum5").text("Humidity: " + data.list[34].main.humidity + "%");
        var icon = "http://openweathermap.org/img/w/" + data.list[34].weather[0].icon + ".png";
        $("#icon5").attr("src", icon);
        //  Convert the temp to fahrenheit
        var tempF = (data.list[34].main.temp - 273.15) * 1.80 + 32;
        $("#temp5").text("Temperature: " + tempF.toFixed(0) + '°F');

      })
  }
}
fiveDay()
