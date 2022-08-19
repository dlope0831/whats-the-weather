var getWeatherData = function () {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=791d4e5cacae8c82a3c4abaa9b7629bf";
    fetch(apiUrl).then(function(response){
        if (response.ok) {
         response.json().then(function(data){
            console.log(response);
         })   
        }
    })
}