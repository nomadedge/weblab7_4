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
                    weather: {},
                    isSaved: true
                });
            });
            return newState;
        }
        case 'ADD_CITY': {
            const newState = [...state, {
                name: action.payload,
                isFetching: false,
                error: null,
                weather: {},
                isSaved: false
            }];
            return newState;
        }
        case 'DELETE_CITY': {
            const newState = [...state];
            const index = newState.findIndex(city => city.name === action.payload);
            if (index === -1) {
                return state;
            }
            newState.splice(index, 1);
            return newState;
        }
        case 'FETCH_CITY_WEATHER': {
            const newState = [...state];
            const index = newState.findIndex(city => city.name === action.payload);
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
            const index = newState.findIndex(city => city.name === action.payload.name);
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
        case 'SAVE_CITY': {
            const newState = [...state];
            const index = newState.findIndex(city => city.name === action.payload);
            if (index === -1) {
                return state;
            }
            newState[index] = {
                ...newState[index],
                isSaved: true
            };
            return newState;
        }
        default: {
            return state;
        }
    }
}