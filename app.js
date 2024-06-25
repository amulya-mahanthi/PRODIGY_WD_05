const weatherInfo = document.getElementById('weatherInfo');
const locationForm = document.getElementById('locationForm');
const locationInput = document.getElementById('locationInput');

locationForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const location = locationInput.value;
  if (location.trim() === '') {
    alert('Please enter a location.');
    return;
  }
  getWeather(location);
  locationInput.value = '';
});

async function getWeather(location) {
  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Error fetching weather data. Please try again.');
  }
}

function displayWeather(data) {
  const { name, weather, main } = data;
  const weatherDescription = weather[0].description;
  const temperature = main.temp;
  const humidity = main.humidity;

  const weatherHTML = `
    <h2>${name}</h2>
    <p>Weather: ${weatherDescription}</p>
    <p>Temperature: ${temperature}°C</p>
    <p>Humidity: ${humidity}%</p>
  `;
  weatherInfo.innerHTML = weatherHTML;
}
