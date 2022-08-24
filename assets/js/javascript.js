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
      //localStorage.setItem(city, JSON.stringify(city))
      cityContainerEl.innerHTML = `<h3> ${city} </h3>`;
    }

};  

  var cityButtonHandler = function(event) {
    event.preventDefault();

    // var variousCities = cityButtonsEl.value;
    getWeatherData(event.target.value)

  }
  

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
            var oneApiUrl ="https://api.openweathermap.org/data/2.5/uvi?lat=" + data[0].lat + "&lon=" + data[0].lon +"&exclude=hourly,daily&appid=791d4e5cacae8c82a3c4abaa9b7629bf"
            fetch(oneApiUrl).then(function(response) {
              if (response.ok) {
                response.json().then(function(weatherData){
                  console.log(weatherData.value);          
                })
              }
            })
          })   
        }
    })
}
  

    var displayWeather = function(data) {
      cityContainerEl.innerHTML = `<h3> ${data.name} </h3> 
      <li> Temp: ${data.main.temp} F</li>
      <li> Humidity: ${data.main.humidity}%</li>
      <li> Wind: ${data.wind.speed} mph</li>
      <li> Sky: ${data.weather[0].main} </li>`


       
      
      // We check to see if there's anything in the local storage for cities
      var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
      // First, we want to make sure the city hasn't already been added to the list
      if (!citiesArray.includes(data.name.toLowerCase())){
        // If this city is not in the list of cities, we add it
        citiesArray.push(data.name.toLowerCase());
        // Now we store the array in localStorage
        localStorage.setItem("cities", JSON.stringify(citiesArray));
        // Now we need to re-add the buttons
        addSearchHistory();  
      }
    }
      
      // If the city IS already in the list, we don't add it again      
    

    var capitalizeThis = function(word) {
      // This takes a word like "new york" and turns it
      // into ["new", "york"]
      // This way, we can capitalize each individual word
      let individualWords = word.split(" ");

      // This loops through the cities and creates a new
      // array where the first letter of the word is capitalized
      // ["new", "york"] becomes ["New", "York"]
      let capitalizedWords =  individualWords.map(function (w) {
        return w[0].toUpperCase() + w.slice(1);
      })

      // We use join to turn ["New", "York"] as "New York"
      return capitalizedWords.join(" ");
    }

    var addSearchHistory = function(){
      cityButtonsEl.innerHTML = "";


      var citiesArray = JSON.parse(localStorage.getItem("cities")) || ["austin", "chicago", "new york", "orlando", "san francisco", "seattle"];

      citiesArray.forEach(function(city){
        // Create a new button
        let newButton = document.createElement("button");
        // Make the button's text be the city name
        newButton.textContent = capitalizeThis(city);
        // Set the button's value to the city name
        newButton.value = city.toLowerCase();
        newButton.addEventListener("click", cityButtonHandler);
        // Now we add the button to the page
        cityButtonsEl.appendChild(newButton);
      })

      // Setting this in case there was nothing stored in localStorage
      localStorage.setItem("cities", JSON.stringify(citiesArray))
    }

  // When the page first loads, we add search history
  addSearchHistory();
  userFormEl.addEventListener("submit", formSubmitHandler);