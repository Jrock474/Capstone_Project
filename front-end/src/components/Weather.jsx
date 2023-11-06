import React, { useContext, useState } from 'react';
import { WeatherContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Music2 from './MusicFolder/WeatherOst';

const Weather = () => {
  const navigate = useNavigate();
  const [weatherContext, setWeatherContext] = useContext(WeatherContext);
  const apiKey = '3f93593a210c4dc788d222647230810';
  const [city, setCity] = useState('');
  const [displayWeather, setDisplayWeather] = useState(false);
  const [errorFound, setErrorFound] = useState('');
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );

      if (response.ok) {
        const data = await response.json();
        const iconUrl = data.current.condition.icon;
        const condition = data.current.condition.text;
        const temperature = data.current.temp_f;
        const weatherData = {
          icon: iconUrl,
          condition: condition,
          temperature: temperature,
        };
        setWeatherContext(weatherData);
        setDisplayWeather(true);
       
        // If the fetch call is successful, navigate to MainGame
        navigate('/MainGame');
      } else {
        setErrorFound('Please Enter a Valid City')
        console.error('Error fetching weather data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleButtonClick = () => {
    if (city) {
      fetchWeatherData();
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div>
    <Music2/>
      <div className="wContainer">
        <h2 className="wTitle">Weather Information</h2>
        <div className="wInput">
          <label htmlFor="city" className="wTitle">
            {/* Enter Current City: */}
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            className="wCity"
            placeholder='Enter Current City'
          />
          <button onClick={handleButtonClick} className="submitBtn">
            Get Weather
          </button>
        </div>
        {displayWeather && (
          <div className="wDetails">
            <h3 className="whCity">Weather for {city} Entered</h3>
          </div>
        )}
      </div>
      <div>{errorFound && <div className="errorD">{errorFound}</div>}</div>
    </div>
  );
};

export default Weather;
