const axios = require('axios');

const openWeatherKey = 'd5bb735f9e1ce1a846ab736fc9d95dc6';

const getWeatherByUrl = async url => {
    let weatherData = {};
    try {
        weatherData = await axios.get(url);
    } catch (error) {
        const out = {
            isOk: false,
            status: weatherData.status
        };
        return out;
    }

    const weatherJson = await weatherData.data;

    const weather = {
        name: weatherJson.name,
        iconUrl:
            'http://openweathermap.org/img/w/' +
            weatherJson.weather[0].icon +
            '.png',
        description: weatherJson.weather[0].description,
        temperature: (weatherJson.main.temp - 273.15).toFixed(0),
        pressure: weatherJson.main.pressure,
        humidity: weatherJson.main.humidity,
        windSpeed: weatherJson.wind.speed
    };

    const out = {
        isOk: true,
        weather: weather
    };
    return out;
};

const getWeatherByName = cityName => {
    return new Promise(async result => {
        const openWeatherUrl =
            'https://api.openweathermap.org/data/2.5/weather?q=' +
            cityName +
            '&appid=' +
            openWeatherKey;

        out = await getWeatherByUrl(openWeatherUrl);
        result(out);
    });
};

const getWeatherByCoord = (lat, lon) => {
    return new Promise(async result => {
        const openWeatherUrl =
            'https://api.openweathermap.org/data/2.5/weather?' +
            'lat=' + lat + '&lon=' + lon +
            '&appid=' +
            openWeatherKey;

        out = await getWeatherByUrl(openWeatherUrl);
        result(out);
    });
};

exports.getWeatherByCoord = getWeatherByCoord;
exports.getWeatherByName = getWeatherByName;