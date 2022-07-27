let apiKey = "959764aef958aca1c60220a4c8d8110c";
let city = "Kyiv";  
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=959764aef958aca1c60220a4c8d8110c&units=metric`;

function displayTemperature(responce) {
  console.log(responce);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(responce.data.main.temp);
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
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`)
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
  let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let days =  day [dateCurrent.getDay()];
  return `${days}  ${hours}:${minutes}`;
}

axios.get(apiUrl).then(displayTemperature);
 