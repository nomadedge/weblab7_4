const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FILL_CITIES': {
            const newState = [...state];
            action.payload.forEach(cityName => {
                newState.push({
                    name: cityName,
                    isFetching: false,
                    error: null,
                    weather: {}
                });
            });
            return newState;
        }
        case 'ADD_CITY': {
            const newState = [...state, {
                name: action.payload,
                isFetching: false,
                error: null,
                weather: {}
            }];
            newState.sort((a, b) => {
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
        case 'DELETE_CITY': {
            const newState = [...state];
            const index = newState.findIndex(city => city.name.toLowerCase() === action.payload.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState.splice(index, 1);
            return newState;
        }
        case 'FETCH_CITY_WEATHER': {
            const newState = [...state];
            const index = newState.findIndex(city => city.name.toLowerCase() === action.payload.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState[index] = {
                ...newState[index],
                isFetching: true,
                error: null,
                weather: {}
            };
            return newState;
        }
        case 'FETCH_CITY_WEATHER_SUCCESS': {
            const newState = [...state];
            const index = newState.findIndex(city => city.name === action.payload.name);
            if (index === -1) {
                return state;
            }
            newState[index] = {
                ...newState[index],
                isFetching: false,
                error: null,
                weather: action.payload.weather
            };
            return newState;
        }
        case 'FETCH_CITY_WEATHER_ERROR': {
            const newState = [...state];
            const index = newState.findIndex(city => city.name.toLowerCase() === action.payload.toLowerCase());
            if (index === -1) {
                return state;
            }
            newState[index] = {
                ...newState[index],
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