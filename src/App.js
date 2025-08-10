import React, { useEffect, useState } from "react";
import mycloud from "./assets/mycloud.mp4";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); 

  function handlechange(e) {
    setCity(e.target.value);
  }

  useEffect(() => {
    if (!city) {
      setWeather(null);
      setLoading(false);
      return;
    }

    const fetchweather = async () => {
      setLoading(true); 
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=308510d44f67f3cdd6c81a2fd5ec034a`
        );
        const data = await response.json();

        if (data.cod === 200) {
          setWeather(data);
        } else {
          setWeather(null);
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather(null);
      } finally {
        setLoading(false); 
      }
    };

    const time = setTimeout(() => {
      fetchweather();
    }, 1000);

    return () => clearTimeout(time);
  }, [city]);

  let display;
  if (!city) {
    display = <p>Type a city name...</p>;
  } else if (loading) {
    display = <p>Fetching weather...</p>;
  } else if (weather) {
    display = (
      <>
        <p>{weather.name}</p>
        <p>{weather.weather[0].main}</p>
        <p>{weather.main.temp} °C</p>
      </>
    );
  } else {
    display = <p>No weather data</p>;
  }

  return (
    <>
      <video
        src={mycloud}
        className="background-video"
        autoPlay
        muted
        loop
      ></video>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={handlechange}
          className="inputarea"
        />
      </div>

      <div className="display-area">{display}</div>
    </>
  );
};

export default App;
