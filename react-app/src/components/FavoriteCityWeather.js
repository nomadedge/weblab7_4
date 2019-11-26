import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCityWeather } from '../actions/FavoriteCitiesActions';

import Loader from './Loader';
import CityWeather from './CityWeather';

import '../styles/Weather.css';

class FavoriteCityWeather extends Component {
    componentDidMount() {
        const { cityName, isSaved, fetchCityWeather } = this.props;
        fetchCityWeather(cityName, isSaved);
    }

    render() {
        const { onDelete, favoriteCities } = this.props;
        const city = favoriteCities.find(city => city.name === this.props.cityName);

        if (city.isFetching) {
            return (
                <div id='favorite'>
                    <button id='delete-button' onClick={() => onDelete(city.name)}>Delete city</button>

                    <div id='weather-container'>
                        <div id='left-block'>
                            <div id='city-name'>{city.name}</div>
                        </div>
                        <div id='right-block'>
                            <Loader />
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <>
                <div id='favorite'>
                    <button id='delete-button' onClick={() => onDelete(city.name)}>Delete city</button>

                    <div id='weather-container'>
                        <CityWeather city={city} />
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ favoriteCities }) => {
    return {
        favoriteCities: favoriteCities
    };
};
const mapDispatchToProps = {
    fetchCityWeather: fetchCityWeather
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCityWeather);