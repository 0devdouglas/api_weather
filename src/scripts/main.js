// Selecionando Elementos

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherElement = document.querySelector("#weather-icon");
const umidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

// Mostrar dados que vieram da API
async function showWeatherData (city)  {

    const data = await getWeatherData(city)

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    weatherContainer.classList.remove("hide")
}

// Puxar dados da API
async function getWeatherData (city) {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json()

    return data
}

// Eventos

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const city = cityInput.value;
    await showWeatherData(city)
});

cityInput.addEventListener("keyup", async (e) => {
    if(e.code === "Enter") {
        const city = e.target.value
        showWeatherData(city)
    }
})