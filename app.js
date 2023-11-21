
function getWeather() {
    const cityName = document.getElementById('city-input').value;
    const weatherInfoContainer = document.getElementById('weather-info');

    if (cityName.trim() === '') {
        weatherInfoContainer.innerHTML = 'Please enter a city name.';
        return;
    }

    const apiKey = '6a48f3a4cf1b37e60fe9d9929419b682';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                weatherInfoContainer.innerHTML = 'City not found. Please enter a valid city name.';
            } else {
                const temperature_min = Math.round(data?.main?.temp_min - 273.15);
                const temperature_max = Math.round(data?.main?.temp_max - 273.15);

                // Convert temperature to Celsius
                const description = data?.weather[0].description;
                document.getElementById("weather__wind").innerHTML = data?.wind?.speed
                document.getElementById("weather__humidity").innerHTML = data?.main?.humidity

                document.getElementById("min_temp").innerHTML = temperature_min

                document.getElementById("max_temp").innerHTML = temperature_max
                convertTimezone(data?.timezone)
                weatherInfoContainer.innerHTML = description
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoContainer.innerHTML = 'An error occurred while fetching weather data.';
        });
}

function convertTimezone(time) {
    const timezoneOffsetSeconds = time; // Replace with your actual timezone offset
    const utcTime = new Date();
    const localTime = new Date(utcTime.getTime() + timezoneOffsetSeconds * 1000);

    const localTimeString = localTime.toLocaleString(); // Adjust format as needed

    document.getElementById('weather__time').innerHTML = `Local Time: ${localTimeString}`;
}

// Call the function when the page loads
convertTimezone();

