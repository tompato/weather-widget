const apikey = 'QvVuTdtRy0b87pcrcyC3GOuz4DMEkETT';

// Get city/town information for the given search term
const getLocation = async searchTerm => {

    const baseURL = '//dataservice.accuweather.com/locations/v1/cities/search';
    const queryString = `?apikey=${apikey}&q=${searchTerm}`;

    const response = await fetch(baseURL + queryString);
    const data = await response.json();

    return data[0];
};

// Get the current weather conditions for the given location key
const getWeather = async key => {

    const baseURL = '//dataservice.accuweather.com/currentconditions/v1/';
    const queryString = `${key}?apikey=${apikey}&details=true`;

    const response = await fetch(baseURL + queryString);
    const data = await response.json();

    return data[0];
};