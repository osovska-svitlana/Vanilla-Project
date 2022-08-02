function getForcastCoordinate(coordinates) {
  // console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=959764aef958aca1c60220a4c8d8110c&units=metric`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(responce) {
  // console.log(responce);

  celsiusTemperature = responce.data.main.temp;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = responce.data.name;
  let weatherConditionElement = document.querySelector("#weather-condition");
  weatherConditionElement.innerHTML = responce.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = responce.data.main.humidity;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(responce.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = actualDate(responce.data.dt * 1000); // actualDate -  новая функция, пишем ее, что бы сделать подсчет времени указаного города
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
  );
  // console.log(responce);
  getForcastCoordinate(responce.data.coord);
}
function actualDate(timestamp) {
  let dateCurrent = new Date(timestamp); //new Date показывает актуальное время
  let hours = dateCurrent.getHours();
  let minutes = dateCurrent.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let days = day[dateCurrent.getDay()];
  return `${days}  ${hours}:${minutes}`;
}

function displayForecast(responce) {
  console.log(responce.data.daily);
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wend"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                  alt="Clear"
                  width="30px"
                  id="temperature-img"
                />
                <div class="forecast-temperature-degree"><span class="highest-temperature">17/<span class="lowest-temperature">22</span></span></div> </div>
                `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function search(city) {
  let apiKey = "959764aef958aca1c60220a4c8d8110c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=959764aef958aca1c60220a4c8d8110c&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubbmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsuisTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
search("New York");

let celsiusTemperature = null;

let form = document.querySelector("#searchline");
form.addEventListener("submit", handleSubbmit); // handleSubbmit - a function;

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheitTemperature);
let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", displayCelsuisTemperature);
