window.addEventListener('load', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherData(latitude, longitude);
      });
    } else {
      console.log('Геолокация не поддерживается');
    }
  });
  
  function getWeatherData(latitude, longitude) {
    const apiKey = '202de8081502510023b44b019f095d45';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const weatherInfo = `Температура: ${temperature}°C, ${description}`;
  
        const weatherInfoElement = document.getElementById('weather-info');
        weatherInfoElement.textContent = weatherInfo;
      })
      .catch(error => {
        console.log('Произошла ошибка при получении данных о погоде', error);
      });
  }
  