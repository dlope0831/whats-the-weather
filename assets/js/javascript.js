var userFormEl = document.querySelector("#user-form");
var cityButtonsEl = document.querySelector("#city-buttons");
var cityInputEl = document.querySelector("#city");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var city = cityInputEl.value.trim();
  
    if (city) {
      getWeatherData(city);
  
      // clear old content
      cityContainerEl.textContent = "";
      cityInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
  };

  var cityButtonHandler = function(event) {
    event.preventDefault();

    // var variousCities = cityButtonsEl.value;
    getWeatherData(event.target.value)

  }
  document.querySelectorAll("#city-buttons .btn").forEach(function(btn) {
    btn.addEventListener("click", cityButtonHandler)
    console.log(btn.value)
  });

  var getWeatherData = function (searchQuery) {
    var currentApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + searchQuery + "&units=imperial&APPID=791d4e5cacae8c82a3c4abaa9b7629bf";
    fetch(currentApiUrl).then(function(response){
      if (response.ok) {
        response.json().then(function(currentData) {
          console.log(currentData);
          displayWeather(currentData);
        })
      }
    })
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchQuery + "&limit=1&APPID=791d4e5cacae8c82a3c4abaa9b7629bf";
    fetch(apiUrl).then(function(response){
        if (response.ok) {
         response.json().then(function(data){
            console.log(data);
            var oneApiUrl ="https://api.openweathermap.org/data/2.5/forecast?lat=" + data[0].lat + "&lon=" + data[0].lon +"&exclude=hourly,daily&appid=791d4e5cacae8c82a3c4abaa9b7629bf"
            fetch(oneApiUrl).then(function(response) {
              if (response.ok) {
                response.json().then(function(weatherData){
                  console.log(weatherData);
                  localStorage.setItem(weatherData, JSON.stringify(weatherData));
                  localStorage.getItem(weatherData);
                })
              }
            })
          })   
        }
    })
}

    var displayWeather = function(data) {
      cityContainerEl.innerHTML = `<h3> ${data.name} </h3>
      <h5> Temp: ${data.main.temp} </h5>
      <h4> Humidity: ${data.main.humidity} </h4>
      <h7> ${data.weather[0].main} </h7> `
  
    }

  userFormEl.addEventListener("submit", formSubmitHandler);







