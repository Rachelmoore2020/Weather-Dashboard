
var date = moment().format("MMM Do YYYY");
let nextDay  = moment().add(1,'days');
nextDay.format("MMM Do YYYY");
let nextDay1  = moment().add(2,'days');
let nextDay2  = moment().add(3,'days');
let nextDay3  = moment().add(4,'days');
let nextDay4  = moment().add(5,'days');


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

function postDate() {
  var postDate = document.getElementById("currDate");
  postDate.textContent = date;
  console.log(date)
  console.log(nextDay)
  
  var postDate1 = document.getElementById("date1");
  postDate1.textContent = nextDay; 
  var postDate2 = document.getElementById("date2");
  postDate2.textContent = nextDay1;
  var postDate3 = document.getElementById("date3");
  postDate3.textContent = nextDay2;
  var postDate4 = document.getElementById("date4");
  postDate4.textContent = nextDay3;
  var postDate5 = document.getElementById("date5");
  postDate5.textContent = nextDay4;

}
postDate()


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
      .then(function(data) {
        console.log("response", data)

    // var iconCode = response.weather[0].icon;
    // var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

     $("#wind").text("Wind Speed: " + data.list[0].wind.speed);
     $("#humidity").text("Humidity: " + data.list[0].weather.humidity);

     // Convert the temp to fahrenheit
    //  var tempF = (data.main.temp - 273.15) * 1.80 + 32;

     // add temp content to html
     $("#temp").text("Temperature (K) " + data.main.temp);
    //  $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

     // Log the data in the console as well
     console.log("Wind Speed: " + data.list[0].main.wind.speed);
     console.log("Humidity: " + data.main.humidity);
    //  console.log("Temperature (F): " + tempF);
    })
  } 
}
function fiveDay() {
  for (let i = 0; i < userSelectedCity.length; i++) {
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSelectedCity[i] + "&appid=bb55783c8d612e6ce0920236575bef0d";
 
//  Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
.then(function(data) {
  console.log("response", data)

})
  }
}
fiveDay()
