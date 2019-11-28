const express = require('express');

const { getWeatherByName, getWeatherByCoord } = require('../helpers/weatherGetter');

const weatherRouter = express.Router();

weatherRouter.route('/').get(async (req, res) => {
    let name = req.query.city.trim();
    const weatherObj = await getWeatherByName(name);

    if (weatherObj.isOk) {
        res.json({
            name: weatherObj.name,
            weather: weatherObj.weather
        });
    } else {
        res.status(404).send('Weather for this city is not available.');
    }
});

weatherRouter.route('/coordinates').get(async (req, res) => {
    const weatherObj = await getWeatherByCoord(req.query.lat, req.query.lon);

    if (weatherObj.isOk) {
        res.json({
            name: weatherObj.name,
            weather: weatherObj.weather
        });
    } else {
        res.status(404).send('Weather for this coordinates is not available.');
    }
});

exports.weatherRouter = weatherRouter;