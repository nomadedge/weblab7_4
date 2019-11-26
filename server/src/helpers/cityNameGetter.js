const axios = require('axios');

const googleMapsKey = 'AIzaSyADtVQrQmnam1m9XM-mblqN2wamkglWhlY';

const getCityName = (lat, lon) => {
    return new Promise(async result => {
        const googleMapsUrl =
            'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            lat + ',' + lon +
            '&key=' + googleMapsKey;

        let locationData = {};
        try {
            locationData = await axios.get(googleMapsUrl);
        } catch (error) {
            res = {
                isOk: false,
                error: "No city on this coordinates"
            };
            result(res);
        }

        const locationJson = await locationData.data;
        let cityName = '';
        let res;

        locationJson.results.forEach(element => {
            if (
                JSON.stringify(element.types) ===
                JSON.stringify(['locality', 'political'])
            ) {
                cityName = element.address_components[0].long_name;
            }
        });
        if (cityName === '') {
            res = {
                isOk: false,
                error: "No city on this coordinates"
            };
        } else {
            cityName = cityName[0].toUpperCase() + cityName.slice(1).toLowerCase();
            res = {
                isOk: true,
                cityName: cityName
            };
        }
        
        result(res);
    });
};

exports.getCityName = getCityName;