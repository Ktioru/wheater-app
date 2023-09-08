import './style.scss';

const search = document.querySelector('button');
const town = document.querySelector('input');

const cityName = document.querySelector('.cityName');
const temperature = document.querySelector('.temperature');

const localTime = document.querySelector('.localTime');

const hour = document.querySelector('.hour');

const condition = document.querySelector('.condition');

const img = document.querySelector('.img');

const feelsAs = document.querySelector('.feelsLike');

const humidity = document.querySelector('.humidity');

const wind = document.querySelector('.wind');

const error = document.querySelector('.error');

const changeValue = document.querySelector('.changed');

const defaultMetric = 'c';

async function getWeather(city = 'london') {
  const api = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1c011dc02b6746dea45210523230209&q=${city.toLowerCase()}`);
  const response = await api.json();
  const weather = {
    name: response.location.name,
    currentTemp: {
      c: response.current.temp_c,
      f: response.current.temp_f,
    },
    condition: response.current.condition.text,
    icon: response.current.condition.icon,
    date: response.location.localtime,
    feelsLike: {
      c: response.current.feelslike_c,
      f: response.current.feelslike_f,
    },
    humidity: response.current.humidity,
    windSpeed: response.current.wind_kph,

    tomorrowTemp: response.forecast.forecastday[0].day.avgtemp_c,
  };

  return weather;
}

function registerName(data) {
  cityName.innerText = data.name;
}

function registerTemperature(data, metric = 'c') {
  temperature.innerText = `${data.currentTemp[metric]}°${metric.toUpperCase()}`;
}

function registerDate(date) {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  localTime.innerText = `${weekDays[date.getDay()]}, ${date.getDate()}th ${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
}

function registerHour(date) {
  let pageHour;
  let mid;

  if (date.getHours() >= 13) {
    pageHour = date.getHours() - 12;
    mid = 'pm';
  } else if (date.getHours() === 0) {
    pageHour = 12;
    mid = 'am';
  } else {
    pageHour = date.getHours();
    mid = 'am';
  }

  hour.innerText = `${pageHour}:${date.getMinutes()} ${mid}`;
}

function registerCondition(data) {
  condition.innerText = data.condition;
}

function registerImage(data) {
  img.src = `http:${data.icon}`;
  img.style.width = '100px';
  img.style.height = '100px';
}

function registerFeelsLike(data, metric = 'c') {
  feelsAs.innerText = `${data.feelsLike[metric]}°${metric.toUpperCase()}`;
}
function registerHumidity(data) {
  humidity.innerText = `${data.humidity}%`;
}
function registerWind(data) {
  wind.innerText = `${data.windSpeed} kph`;
}

async function registerCity(fCity) {
  error.style.visibility = 'hidden';
  const data = await getWeather(fCity).catch(() => {
    error.style.visibility = 'visible';
  });

  registerTemperature(data, defaultMetric);
  registerName(data);

  const date = new Date(data.date);
  registerDate(date);
  registerHour(date);
  registerCondition(data);
  registerImage(data);
  registerFeelsLike(data, defaultMetric);
  registerHumidity(data);
  registerWind(data);
}

search.addEventListener('click', () => registerCity(town.value));

registerCity('london');
