
var date = moment().format("MMM Do YYYY");
var hour = parseInt(moment().format("HH"));
var cityList = ["city1", "city2", "city3", "city4", "city5", "city6", "city7", "city8"]
var userSelectedCity = [];

function postDate() {
  var postDate = document.getElementById("currDate");
  postDate.textContent = date;
  console.log(date)
}
postDate()

// When user hits the search button user Input gets put into City text area
// document.getElementsById("submit").addEventListener("click", (postList))
function postList() {
  var userInput = document.getElementById("userCity").value;
  userSelectedCity.push(userInput);
  console.log(userSelectedCity);


  localStorage.setItem("userInput", JSON.stringify(userSelectedCity));

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
      .then(function(response) {
        console.log(response)

      // $.getJSON("https://api.openweathermap.org/data/2.5/find?q=" + userSelectedCity[i] + "&appid=bb55783c8d612e6ce0920236575bef0d", function(data) {
      //   console.log(data);
      // })
    
//  Transfer content to HTML
    //  $(".city").html("<h1>" + response.name + " Weather Details</h1>");

    // var iconCode = response.weather[0].icon;
    // var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

     $("#wind").text("Wind Speed: " + response.wind.speed);
     $("#humidity").text("Humidity: " + response.main.humidity);

     // Convert the temp to fahrenheit
     var tempF = (response.main.temp - 273.15) * 1.80 + 32;

     // add temp content to html
     $(".temp").text("Temperature (K) " + response.main.temp);
     $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

     // Log the data in the console as well
     console.log("Wind Speed: " + response.wind.speed);
     console.log("Humidity: " + response.main.humidity);
     console.log("Temperature (F): " + tempF);
    })
  } 
}
