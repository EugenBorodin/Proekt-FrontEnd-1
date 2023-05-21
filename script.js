const apiKey = '202de8081502510023b44b019f095d45';

window.addEventListener('load', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            const city = data[0].name;
            document.getElementById('city-name').textContent = city;
          })
          .catch(error => {
            console.log('Произошла ошибка при получении названия города', error);
          });

        getWeatherData(latitude, longitude);
      },
      (error) => {
        console.log('Произошла ошибка при получении геолокации', error);
      }
    );
  } else {
    console.log('Геолокация не поддерживается');
  }
});

async function getWeatherData(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const temperatureInKelvin = data.main.temp;
    const temperatureInCelsius = temperatureInKelvin - 273.15;
    const description = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;

    const weatherIconElement = document.getElementById('weather-icon');
    weatherIconElement.className = `fas fa-${getWeatherIconClass(weatherIcon)}`;

    const weatherDescriptionElement = document.getElementById('weather-description');
    weatherDescriptionElement.textContent = description;

    const temperatureElement = document.getElementById('temperature');
    temperatureElement.textContent = `Temperature: ${temperatureInCelsius.toFixed(2)}°C`;

    const humidityElement = document.getElementById('humidity');
    humidityElement.textContent = `Humidity: ${humidity}%`;

    const windSpeedElement = document.getElementById('wind-speed');
    windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;

    const pressureElement = document.getElementById('pressure');
    pressureElement.textContent = `Pressure: ${pressure} hPa`;
  } catch (error) {
    console.log('Произошла ошибка при получении данных о погоде', error);
  }
}

function getWeatherIconClass(iconCode) {
  switch (iconCode) {
    case '01d':
      return 'sun';
    case '01n':
      return 'moon';
    case '02d':
      return 'cloud-sun';
    case '02n':
      return 'cloud-moon';
    case '03d':
    case '03n':
      return 'cloud';
    case '04d':
    case '04n':
      return 'clouds';
    case '09d':
    case '09n':
      return 'cloud-rain';
    case '10d':
    case '10n':
      return 'cloud-showers-heavy';
    case '11d':
    case '11n':
      return 'bolt';
    case '13d':
    case '13n':
      return 'snowflake';
    case '50d':
    case '50n':
      return 'smog';
    default:
      return 'question';
  }
}
