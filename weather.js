function getWeather() {
    const city = document.getElementById('cityInput').value;

   
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(geocodeData => {
            if (geocodeData.results && geocodeData.results.length > 0) {
                const latitude = geocodeData.results[0].latitude;
                const longitude = geocodeData.results[0].longitude;

                
                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&windspeed_unit=ms`;

                fetch(weatherUrl)
                    .then(response => response.json())
                    .then(weatherData => {
                        const weatherInfo = document.getElementById('weatherInfo');

                       
                        const weatherCodes = {
                            0: "Clear sky",
                            1: "Mainly clear",
                            2: "Partly cloudy",
                            3: "Overcast",
                            45: "Fog",
                            48: "Depositing rime fog",
                            51: "Light drizzle",
                            53: "Moderate drizzle",
                            55: "Dense drizzle",
                            56: "Light freezing drizzle",
                            57: "Dense freezing drizzle",
                            61: "Slight rain",
                            63: "Moderate rain",
                            65: "Heavy rain",
                            66: "Light freezing rain",
                            67: "Heavy freezing rain",
                            71: "Slight snow fall",
                            73: "Moderate snow fall",
                            75: "Heavy snow fall",
                            77: "Snow grains",
                            80: "Slight rain showers",
                            81: "Moderate rain showers",
                            82: "Violent rain showers",
                            85: "Slight snow showers",
                            86: "Heavy snow showers",
                            95: "Thunderstorm",
                            96: "Thunderstorm with slight hail",
                            99: "Thunderstorm with heavy hail"
                        };

                        const weatherDescription = weatherCodes[weatherData.current_weather.weathercode] || "Unknown weather condition";

                        
                        weatherInfo.innerHTML = `
                            <h2>${geocodeData.results[0].name}, ${geocodeData.results[0].country_code}</h2>
                            <p>Temperature: ${weatherData.current_weather.temperature}°C</p>
                            <p>Weather: ${weatherDescription}</p>
                            <p>Wind Speed: ${weatherData.current_weather.windspeed} m/s</p>
                        `;
                    })
                    .catch(error => {
                        console.error('Error fetching the weather data:', error);
                        document.getElementById('weatherInfo').innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
                    });
            } else {
                document.getElementById('weatherInfo').innerHTML = `<p>City not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching the geocoding data:', error);
            document.getElementById('weatherInfo').innerHTML = `<p>Error fetching city data. Please try again.</p>`;
        });
}