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

  userFormEl.addEventListener("submit", formSubmitHandler);







