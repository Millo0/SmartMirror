import React, { useState, useEffect } from "react";

const API_KEY = "9d9cc271fb5245f422d17a8ae2a2d7d8";
const CITY = "Cairo";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentResponse = await fetch(
          `${BASE_URL}/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=en`
        );
        const currentData = await currentResponse.json();

        if (currentResponse.ok) {
          setWeather(currentData);
          localStorage.setItem("weather", JSON.stringify(currentData)); // Store in localStorage
        } else {
          setError(currentData.message);
        }

        const forecastResponse = await fetch(
          `${BASE_URL}/forecast?q=${CITY}&appid=${API_KEY}&units=metric&lang=en`
        );
        const forecastData = await forecastResponse.json();

        if (forecastResponse.ok) {
          const filteredForecast = forecastData.list.filter((_, index) => index % 8 === 0);
          setForecast(filteredForecast);
          localStorage.setItem("forecast", JSON.stringify(filteredForecast)); // Store in localStorage
        } else {
          setError(forecastData.message);
        }
      } catch (err) {
        console.log("ERROR UPDATE WEATHER!!");
        // setError("Failed to fetch weather data.");
      }
    };

    // Check if we have stored weather data in localStorage
    const savedWeather = localStorage.getItem("weather");
    const savedForecast = localStorage.getItem("forecast");

    if (savedWeather && savedForecast) {
      setWeather(JSON.parse(savedWeather));
      setForecast(JSON.parse(savedForecast));
    }

    // Try fetching fresh data
    fetchWeather();
  }, []);

  if (error || !weather || forecast.length === 0) {
    return <div>Error: {error}</div>;
  }
  return { weather, forecast };
};

export default WeatherComponent;
