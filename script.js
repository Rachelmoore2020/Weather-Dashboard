
var date = moment().format("MMM Do YYYY");
var hour = parseInt(moment().format("HH"));
var cityList = ["city1", "city2", "city3", "city4", "city5", "city6", "city7", "city8"]
var userSelectedCity = [];

function postData() {
  var localStore = JSON.parse(localStorage.getItem("userInput"))
  for (let i = 0; i < localStore.length; i++) {
    const element = localStore[i];
    document.getElementById(cityList[i]).innerHTML = element;

  }
}
postData()


// When user hits the search button user Input gets put into City text area
// document.getElementsById("submit").addEventListener("click", (postList))
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

    //  Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      //  We store all of the retrieved data inside of an object called "response"
      .then(function (data) {
        console.log("response", data)

        // var iconCode = response.weather[0].icon;
        // var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        $("#wind").text("Wind Speed: " + data.list[0].wind.speed);
        $("#humidity").text("Humidity: " + data.list[0].main.humidity);
        $("#currDate").text("Date: " + date);
        console.log('humidity', data.list[0].main.humidity)

        //  Convert the temp to fahrenheit
        var tempF = (data.list[0].main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        //  $("#temp").text("Temperature (K) " + data.list[0].main.temp);
        $("#temp").text("Temperature (F) " + tempF.toFixed(2));

        var lat = (data.list[0].coord.lat);
        var lon = (data.list[0].coord.lon);
        console.log("lat: ", lat, "lon ", lon);

      })
  }
}


// Gets UV index
var latt = lat;
var long = lon;
console.log("latt", lat, "long", lon);
// var queryUV = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=bb55783c8d612e6ce0920236575bef0d"

// function UV() {
//   for (let i = 0; i < userSelectedCity.length; i++) {
//     var queryUV = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSelectedCity[i] + "&appid=bb55783c8d612e6ce0920236575bef0d";

//     //  Here we run our AJAX call to the OpenWeatherMap API
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       .then(function (data) {
//         console.log("response", data)

//       })
//   }
// }
// function UV()


// gets 5 day forecast
function fiveDay() {
  for (let i = 0; i < userSelectedCity.length; i++) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSelectedCity[i] + "&appid=bb55783c8d612e6ce0920236575bef0d";

    //  Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (data) {
        console.log("response", data)

      })
  }
}
fiveDay()
