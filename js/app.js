const searchForm = document.querySelector('form');
const weatherCard = document.querySelector('.weather');
const weatherCurrent = document.querySelector('.weather__current');
const weatherDetails = document.querySelector('.weather__details');

const updateUI = data => {

    // Destructure properties
    const { location, weather } = data;

    // Get elements to update
    const city = weatherCurrent.querySelector('.weather__current__location'),
        conditions = weatherCurrent.querySelector('.weather__current__conditions'),
        temperature = weatherCurrent.querySelector('.weather__current__temperature span:first-child'),
        icon = weatherCurrent.querySelector('.weather__current__icon img'),
        humidity = weatherDetails.querySelector('.weather__details__humidity span:first-child'),
        windspeed = weatherDetails.querySelector('.weather__details__windspeed span:first-child'),
        pressure = weatherDetails.querySelector('.weather__details__pressure span:first-child');

    // Inject the relevant day/night image
    if(!weather.IsDayTime) {
        weatherCard.classList.add('weather--night');
    } else {
        weatherCard.classList.remove('weather--night');
    }

    // Inject the relevant icon for the weather
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // Update weather details template
    city.innerText = location.LocalizedName;
    conditions.innerText = weather.WeatherText;
    temperature.innerText = Math.round(weather.Temperature.Metric.Value);
    humidity.innerText = weather.RelativeHumidity + '%';
    windspeed.innerText = Math.round(weather.Wind.Speed.Imperial.Value) + weather.Wind.Speed.Imperial.Unit;
    pressure.innerText = Math.round(weather.Pressure.Imperial.Value) + weather.Pressure.Imperial.Unit;

    // Remove d-none class if present
    if(weatherCard.classList.contains('d-none')) {
        weatherCard.classList.remove('d-none');
    }

};

const updateWeather = async searchTerm => {
    
    const location = await getLocation(searchTerm);
    const weather = await getWeather(location.Key);

    return { location, weather }

};

searchForm.addEventListener('submit', event => {
    // Prevent default submit action
    event.preventDefault();

    // Pull out the search location
    const searchTerm = searchForm.search.value.trim();

    // Reset the form so user can search again
    searchForm.reset();

    // Update the UI with the returned location and weather
    updateWeather(searchTerm)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})