const initialState = {
    isAdding: false,
    cities: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FILL_CITIES': {
            const newState = {...state};
            action.payload.forEach(cityName => {
                newState.cities.push({
                    name: cityName,
                    isFetching: false,
                    error: null,
                    weather: {}
                });
            });
            return newState;
        }
        case 'ADD_CITY': {
            const newState = {...state, isAdding: true};
            return newState;
        }
        case 'ADD_CITY_SUCCESS': {
            const newState = {...state, isAdding: false};
            newState.cities.push({
                name: action.payload.name,
                isFetching: false,
                error: null,
                weather: action.payload.weather
            });
            newState.cities.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            return newState;
        }
        case 'ADD_CITY_ERROR': {
            const newState = {...state, isAdding: false};
            return newState;
        }
        case 'DELETE_CITY': {
            const newState = {...state};
            const index = newState.cities.findIndex(city => city.name.toLowerCase() === action.payload.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState.cities[index].isFetching = true;
            return newState;
        }
        case 'DELETE_CITY_SUCCESS': {
            const newState = {...state};
            const index = newState.cities.findIndex(city => city.name.toLowerCase() === action.payload.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState.cities.splice(index, 1);
            return newState;
        }
        case 'DELETE_CITY_ERROR': {
            const newState = {...state};
            const index = newState.cities.findIndex(city => city.name.toLowerCase() === action.payload.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState.cities[index].isFetching = false;
            return newState;
        }
        case 'FETCH_CITY_WEATHER': {
            const newState = {...state};
            const index = newState.cities.findIndex(city => city.name.toLowerCase() === action.payload.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState.cities[index] = {
                ...newState.cities[index],
                isFetching: true,
                error: null,
                weather: {}
            };
            return newState;
        }
        case 'FETCH_CITY_WEATHER_SUCCESS': {
            const newState = {...state};
            const index = newState.cities.findIndex(city => city.name === action.payload.name);
            if (index === -1) {
                return state;
            }
            newState.cities[index] = {
                ...newState.cities[index],
                isFetching: false,
                error: null,
                weather: action.payload.weather
            };
            return newState;
        }
        case 'FETCH_CITY_WEATHER_ERROR': {
            const newState = {...state};
            const index = newState.cities.findIndex(city => city.name.toLowerCase() === action.payload.city.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState.cities[index] = {
                ...newState.cities[index],
                isFetching: false,
                error: action.payload.error,
                weather: {}
            };
            return newState;
        }
        default: {
            return state;
        }
    }
}