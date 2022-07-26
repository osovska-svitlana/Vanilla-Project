let apiKey = "959764aef958aca1c60220a4c8d8110c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=959764aef958aca1c60220a4c8d8110c&units=metric`;

function displayTemperature(responce) {
    console.log(responce);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(responce.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = responce.data.name;
    let weatherConditionElement = document.querySelector("#weather-condition");
    weatherConditionElement.innerHTML = responce.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity")
    humidityElement.innerHTML = responce.data.main.humidity;
    let windElement = document.querySelector("#wind-speed");
    windElement.innerHTML = Math.round(responce.data.wind.speed);
    
}

axios.get(apiUrl).then(displayTemperature);