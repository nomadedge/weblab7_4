import axios from 'axios';

let defaultCity = 'Witcher';

export function fetchLocalWeather() {
    return async function (dispatch) {
        dispatch({ type: 'FETCH_LOCAL_WEATHER' });

        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(
                async position => {
                    try {
                        const weatherObj = await axios.get(`http://localhost:3001/api/weather/coordinates?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: weatherObj.data });
                        return;
                    } catch {
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: 'Weather for your city is not available.' });
                        return;
                    }
                },
                async error => {
                    try {
                        const weatherObj = await axios.get(`http://localhost:3001/api/weather?city=${defaultCity}`);
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: weatherObj.data });
                        return;
                    } catch {
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: 'Weather for your city is not available.' });
                        return;
                    }
                });
        } else {
            try {
                const weatherObj = await axios.get(`http://localhost:3001/api/weather?city=${defaultCity}`);
                dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: weatherObj.data });
                return;
            } catch {
                dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: 'Weather for your city is not available.' });
                return;
            }
        }
    }
}