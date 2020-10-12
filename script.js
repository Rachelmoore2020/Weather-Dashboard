
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
  // postList.preventDefault();
  var userInput = document.getElementById("userCity").value;
  userSelectedCity.push(userInput);
  console.log(userSelectedCity);
  
  
  localStorage.setItem("userInput", JSON.stringify(userSelectedCity));
  for (let i = 0; i < userSelectedCity.length; i++) {
  
  console.log(userSelectedCity[i]);
  document.getElementById(cityList[i]).innerHTML = userSelectedCity[i];
  document.getElementById("currCity").innerHTML = userSelectedCity[i] + "&nbsp";
  console.log("cityList", cityList[i]);
};
};

 // This is our API key
 var APIKey = "bb55783c8d612e6ce0920236575bef0d";

 // Here we are building the URL we need to query the database
 var queryURL = "api.openweathermap.org/data/2.5/find?q=userSelectedCity[i]&appid=bb55783c8d612e6ce0920236575bef0d"
//  console.log(queryURL);

//  Here we run our AJAX call to the OpenWeatherMap API
 $.ajax({
   url: queryURL,
   method: "GET"
 })

  //  We store all of the retrieved data inside of an object called "response"
   .then(function(response) {

  //   //  Log the queryURL
     console.log(queryURL);

  //   //  Log the resulting object
     console.log(response);

     // Transfer content to HTML
    //  $(".city").html("<h1>" + response.name + " Weather Details</h1>");
  //    $("#wind").text("Wind Speed: " + response.wind.speed);
  //    $("#humidity").text("Humidity: " + response.main.humidity);
     
  //    // Convert the temp to fahrenheit
  //    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

  //    // add temp content to html
  //    $(".temp").text("Temperature (K) " + response.main.temp);
  //    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

  //    // Log the data in the console as well
  //    console.log("Wind Speed: " + response.wind.speed);
  //    console.log("Humidity: " + response.main.humidity);
  //    console.log("Temperature (F): " + tempF);
   });

// Format Dates in Any Timezone
// var jun = moment("2014-06-01T12:00:00Z");
// var dec = moment("2014-12-01T12:00:00Z");

// jun.tz('America/Los_Angeles').format('ha z');  // 5am PDT
// dec.tz('America/Los_Angeles').format('ha z');  // 4am PST

// jun.tz('America/New_York').format('ha z');     // 8am EDT
// dec.tz('America/New_York').format('ha z');     // 7am EST

// jun.tz('Asia/Tokyo').format('ha z');           // 9pm JST
// dec.tz('Asia/Tokyo').format('ha z');           // 9pm JST

// jun.tz('Australia/Sydney').format('ha z');     // 10pm EST
// dec.tz('Australia/Sydney').format('ha z');     // 11pm EST

// // Convert Dates Between Timezones
// var newYork    = moment.tz("2014-06-01 12:00", "America/New_York");
// var losAngeles = newYork.clone().tz("America/Los_Angeles");
// var london     = newYork.clone().tz("Europe/London");

// newYork.format();    // 2014-06-01T12:00:00-04:00
// losAngeles.format(); // 2014-06-01T09:00:00-07:00
// london.format();     // 2014-06-01T17:00:00+01:00