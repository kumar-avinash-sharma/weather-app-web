import './App.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import {
  faCloud,
  faSun,
  faCloudRain,
  faSnowflake,
  faSmog,
  faBolt
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  function getWeatherIcon() {
    if (!weather) return faCloud;

    const mainWeather = weather.weather[0].main;

    switch (mainWeather) {
      case "Clear":
        return faSun;
      case "Clouds":
        return faCloud;
      case "Rain":
        return faCloudRain;
      case "Snow":
        return faSnowflake;
      case "Thunderstorm":
        return faBolt;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
        return faSmog;
      default:
        return faCloud;
    }
  }

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=308510d44f67f3cdd6c81a2fd5ec034a`
        );
        const data = await response.json();
        if (data.cod === 200) {
          setWeather(data);
        } else {
          setWeather(null);
          console.log("City not found");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather(null);
      }
    };

    const timeout = setTimeout(() => {
      fetchWeather();
    }, 500); // Slightly increased delay for better performance

    return () => clearTimeout(timeout);
  }, [city]);

  return (
    <div className="weather">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/cloudy.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="displaybox">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="display-area">
          {weather ? (
            <>
              <p className="icon">
                <FontAwesomeIcon
                  icon={getWeatherIcon()}
                  style={{ fontSize: '5rem', color: '#18d3d3ff' }}
                />
              </p>
              <p className="cityname">{weather.name}</p>
              <p className="weathertype">{weather.weather[0].main}</p>
              <p className="temperature">{weather.main.temp}°C</p>
            </>
          ) : (
            city && <p className="notfound">City not found or loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
