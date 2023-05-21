const apiKey = '202de8081502510023b44b019f095d45';

window.addEventListener('load', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      // Получение названия города
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
    });
  } else {
    console.log('Геолокация не поддерживается');
  }
});
  
function getWeatherData(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temperatureInKelvin = data.main.temp;
      const temperatureInCelsius = temperatureInKelvin - 273.15; // Преобразование в градусы Цельсия
      const description = data.weather[0].description;
      const weatherInfo = `Температура: ${temperatureInCelsius.toFixed(2)}°C, ${description}`;

      const weatherInfoElement = document.getElementById('weather-info');
      weatherInfoElement.textContent = weatherInfo;
    })
    .catch(error => {
      console.log('Произошла ошибка при получении данных о погоде', error);
    });
}
