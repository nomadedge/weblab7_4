const express = require('express');

const { getWeatherByName, getWeatherByCoord } = require('../helpers/weatherGetter');
const { getCityName } = require('../helpers/cityNameGetter');

const weatherRouter = express.Router();

weatherRouter.route('/').get(async (req, res) => {
    let name = req.query.city.trim();
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const result = await getWeatherByName(name);

    if (result.isOk) {
        res.json(result.weather);
    } else {
        res.status(404).send('Weather for this city is not available.');
    }
});

weatherRouter.route('/coordinates/').get(async (req, res) => {
    const result = await getWeatherByCoord(req.query.lat, req.query.lon);

    if (result.isOk) {
        const city = await getCityName(req.query.lat, req.query.lon);
        if (city.isOk) {
            result.weather.name = city.cityName;
        }
        res.json(result.weather);
    } else {
        res.status(404).send('Weather for this coordinates is not available.');
    }
});

exports.weatherRouter = weatherRouter;