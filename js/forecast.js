class Forecast {
    constructor() {
        this.apiKey = 'QvVuTdtRy0b87pcrcyC3GOuz4DMEkETT';
        this.locationURI = '//dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = '//dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateWeather(searchTerm) {
        const location = await this.getLocation(searchTerm);
        if(location === undefined) {
            throw new Error('Cannot find a matching location.');
        }
        const weather = await this.getWeather(location.Key);
        return { location, weather }
    }
    async getLocation(searchTerm) {
        const queryString = `?apikey=${this.apiKey}&q=${searchTerm}`;
        const response = await fetch(this.locationURI + queryString);
        const data = await response.json();
        return data[0];
    }
    async getWeather(locationKey) {
        const queryString = `${locationKey}?apikey=${this.apiKey}&details=true`;
        const response = await fetch(this.weatherURI + queryString);
        const data = await response.json();
        return data[0];
    }
}