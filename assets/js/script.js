const inptEl = document.getElementById('inpt');
const weatherInfoEl = document.getElementById('weather-info');

const api_details = {
    url: "http://api.openweathermap.org/data/2.5/",
    api_key: "60bbd59ec7556e88c0f6b5a2080aebaa"
}

const getWeatherDetails = async (place) => {
    const url = `${api_details.url}weather?q=${place}&units=metric&APPID=${api_details.api_key}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeatherDetails(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

const displayWeatherDetails = (data) => {
    const { name, main, wind } = data;
    weatherInfoEl.innerHTML = `
        <div>Location: ${name}</div>
        <div>Temperature: ${main.temp}°C</div>
        <div>Humidity: ${main.humidity}%</div>
        <div>Wind Speed: ${wind.speed} m/s</div>
    `;
}

inptEl.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        const value = inptEl.value; 
        getWeatherDetails(value);
        inptEl.value = "";
    }
});
