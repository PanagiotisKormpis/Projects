const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weather = document.querySelector(".weather");
const weatherDetails = document.querySelector(".details");
const error404 = document.querySelector(".not-found");

const searchInput = document.querySelector(".search-box input");

const performSearch = () => {
  const city = searchInput.value;

  if (city === "") return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c472bb29db931f85a2ad5b63ca21465`)
    .then((response) => response.json())
    .then((data) => {
        if (data.cod === "404") {
            weather.style.display = "none";
            weatherDetails.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fadeIn");
            return;
          }
          error404.style.display = "none";
          error404.classList.remove("fadeIn");
    
          const image = document.querySelector(".weather img");
          const temperature = document.querySelector(".weather .temperature");
          const hiTemp = document.querySelector(".weather .hi-temp");
          const lowTemp = document.querySelector(".weather .low-temp");
          const humidity = document.querySelector(".details .humidity span");
          const wind = document.querySelector(".details .wind span");
          const town = document.querySelector(".town");
          const country = document.querySelector(".country");
    
          switch (data.weather[0].main) {
            case "Clear":
              image.src = "images/sun.png";
              break;
            case "Clouds":
              image.src = "images/cloud.png";
              break;
            case "Rain":
              image.src = "images/rain.png";
              break;
            case "Snow":
              image.src = "images/snow.png";
              break;
            case "Haze":
              image.src = "";
              break;
            default:
              image.src = "";
          }
    
          temperature.innerHTML = `${parseInt(data.main.temp - 273.15)}<span>° C</span>`;
          hiTemp.innerHTML = `${parseInt(data.main.temp_max - 273.15)}<span>° C Max</span>`;
          lowTemp.innerHTML = `${parseInt(data.main.temp_min - 273.15)}<span>° C Min</span>`;
          humidity.innerHTML = `${data.main.humidity}%`;
          wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
          town.innerHTML = `${data.name}`;
          country.innerHTML = `${data.sys.country}`;
    
          weather.style.display = "";
          weatherDetails.style.display = "";
          weather.classList.add("fadeIn");
          weatherDetails.classList.add("fadeIn");
          container.style.height = "600px";

          document.body.style.backgroundImage = "url('images/moon.jpg')";
    
    });
};

document.querySelector(".search-box button").addEventListener("click", performSearch);

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
});