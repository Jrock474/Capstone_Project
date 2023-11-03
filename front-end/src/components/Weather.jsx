import React, { useContext, createContext, useState, useEffect } from 'react';
import { WeatherContext } from '../App';


const Weather = () => {
const [weatherContext, setWeatherContext] = useContext(WeatherContext)
  const apiKey = '3f93593a210c4dc788d222647230810';
  const [city, setCity] = useState('');
  const [displayWeather, setDisplayWeather] = useState(false);
  let weatherData = ({  
    icon: '',
    condition: '',
    temperature: '',
  });

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
        weatherData = ({
          icon: iconUrl,
          condition: condition,
          temperature: temperature,
        });
        setWeatherContext(weatherData)
  
        setDisplayWeather(true);
      } else {
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
      <div className="wContainer">
        <h2 className="wTitle">Weather Information</h2>
        <div className="wInput">
          <label htmlFor="city" className="wLabel">
            Enter Current City:
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            className="wCity"
          />
          <button onClick={handleButtonClick} className="get-weather-button">
            Get Weather
          </button>
        </div>
        {displayWeather && (
          <div className="wDetails">
            <h3 className="whCity">Weather for {city}</h3>
            <p className="wTemp">Temperature: {weatherData.temperature}°F</p>
            <p className="WeText">Condition: {weatherData.condition}</p>
            <img
              src={weatherData.icon}
              alt="Weather Icon"
              className="weather-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;



