import axios from 'axios';

export function fetchFavorites() {
    return async function (dispatch) {
        try {
            const cities = await axios.get('http://localhost:3001/api/favorites');
            cities.data.forEach(element => {
                dispatch({ type: 'ADD_CITY', payload: element });
            });
        } catch (error) {
            alert('Fail to load favorites :(');
        }
    }
}

export function addCity(cityName, currentState) {
    return async function (dispatch) {
        if (!cityName) {
            alert('Please enter the city :)');
            return;
        }
        cityName = cityName.trim();
        const cityNameFormatted = cityName[0].toUpperCase() + cityName.slice(1).toLowerCase();
        if (currentState.findIndex(city => city.name === cityNameFormatted) === -1) {
            dispatch({ type: 'ADD_CITY', payload: cityNameFormatted });
        }
        else {
            alert('This city is already added :/');
        }
    }
}

export function deleteCity(cityName) {
    return async function (dispatch) {
        dispatch({ type: 'DELETE_CITY', payload: cityName });
        axios.delete('http://localhost:3001/api/favorites', {
            "name": cityName
        });
    }
}

export function fetchCityWeather(cityName) {
    return async function (dispatch) {
        dispatch({ type: 'FETCH_CITY_WEATHER', payload: cityName });
        try {
            const weatherResult = await axios.get(`http://localhost:3001/api/weather?city=${cityName}`);
            const payload = {
                city: cityName,
                weather: weatherResult.data
            };
            console.log(weatherResult.data);
            dispatch({ type: 'FETCH_CITY_WEATHER_SUCCESS', payload: payload });
        } catch (error) {
            const payload = {
                city: cityName,
                error: 'Weather for this city is not available :('
            };
            dispatch({ type: 'FETCH_CITY_WEATHER_ERROR', payload: payload });
            alert(payload.error);
            dispatch({ type: 'DELETE_CITY', payload: cityName });
        }
    }
}