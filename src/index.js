import './style.scss';

async function getWeather(city) {
  const api = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1c011dc02b6746dea45210523230209&q=${city.toLowerCase()}`);
  const response = await api.json();
  const weather = await {
    name: response.location.name,
    currentTemp: response.current.temp_c,
    tomorrowTemp: response.forecast.forecastday[0].day.avgtemp_c,
  };
  console.log(weather);
}

const search = document.querySelector('img');
const town = document.querySelector('input').value;
search.addEventListener('click', () => getWeather(town));
