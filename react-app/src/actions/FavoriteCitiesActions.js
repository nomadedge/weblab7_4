import axios from 'axios';

export function fetchFavorites() {
    return async function (dispatch) {
        try {
            const cities = await axios.get('http://localhost:3001/api/favorites');
            dispatch({ type: 'FILL_CITIES', payload: cities.data });
        } catch (error) {
            alert('Fail to load favorites :(');
        }
    }
}

export function addCity(cityName) {
    return async function (dispatch) {
        if (!cityName) {
            alert('Please enter the city :)');
            return;
        }
        try {
            const weatherObj = await axios.post(`http://localhost:3001/api/favorites/${cityName}`);
            dispatch({ type: 'ADD_CITY', payload: weatherObj.data.name });
            dispatch({ type: 'FETCH_CITY_WEATHER_SUCCESS', payload: weatherObj.data });
        } catch (error) {
            alert(error.response.data);
        }
    }
}

export function deleteCity(cityName) {
    return async function (dispatch) {
        try {
            await axios.delete(`http://localhost:3001/api/favorites/${cityName}`);
            dispatch({ type: 'DELETE_CITY', payload: cityName });
        }
        catch (error) {
            alert(error.response.data);
        }
    }
}

export function fetchCityWeather(cityName) {
    return async function (dispatch) {
        dispatch({ type: 'FETCH_CITY_WEATHER', payload: cityName });
        try {
            const weatherResult = await axios.get(`http://localhost:3001/api/weather?city=${cityName}`);
            dispatch({ type: 'FETCH_CITY_WEATHER_SUCCESS', payload: weatherResult.data });
        } catch (error) {
            const payload = {
                city: cityName,
                error: 'Weather for this city is not available :('
            };
            dispatch({ type: 'FETCH_CITY_WEATHER_ERROR', payload: payload });
            dispatch({ type: 'DELETE_CITY', payload: cityName });
            alert(payload.error);
        }
    }
}