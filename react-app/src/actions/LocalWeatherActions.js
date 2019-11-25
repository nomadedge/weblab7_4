import axios from 'axios';

let defaultCity = 'Witcher';

export function fetchLocalWeather() {
    return async function (dispatch) {
        dispatch({ type: 'FETCH_LOCAL_WEATHER' });

        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(
                async position => {
                    try {
                        const weatherResult = await axios.get(`http://localhost:3001/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                        const payload = {
                            name: weatherResult.name,
                            weather: weatherResult
                        };
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: payload });
                        return;
                    } catch {
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: 'Weather for your city is not available :(' });
                        return;
                    }
                },
                async error => {
                    try {
                        const weatherResult = await axios.get(`http://localhost:3001/api/weather?city=${defaultCity}`);
                        const payload = {
                            name: weatherResult.name,
                            weather: weatherResult.weather
                        };
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: payload });
                        return;
                    } catch {
                        dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: 'Weather for your city is not available :(' });
                        return;
                    }
                });
        } else {
            try {
                const weatherResult = await axios.get(`http://localhost:3001/api/weather?city=${defaultCity}`);
                const payload = {
                    name: weatherResult.name,
                    weather: weatherResult.weather
                };
                dispatch({ type: 'FETCH_LOCAL_WEATHER_SUCCESS', payload: payload });
                return;
            } catch {
                dispatch({ type: 'FETCH_LOCAL_WEATHER_ERROR', payload: 'Weather for your city is not available :(' });
                return;
            }
        }
    }
}