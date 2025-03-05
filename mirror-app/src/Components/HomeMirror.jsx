'use client';

import { useEffect, useState } from 'react';
import { BarChart, Cloud, Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { AnalogClock } from './AnalogClock'
import { WeatherForecast } from './WeatherForecast'
import TheSun from "./assets/3d/Sun"
import  Sphere  from './assets/3d/SPhere';
import Earthshape from './assets/3d/Earth'
import News from "./home_components/news";
import Music from "./home_components/music";
import Cards from "./home_components/cards";
import WeatherComponent from "./home_components/weather";

import ThunderstormWeather from "./home_components/thunderstormWeather";
import CloudWeather from "./home_components/cloudWeather";
import LightCloudSunWeather from "./home_components/lightCloudSunWeather";
import LightCloudRainWeather from "./home_components/lightCloudRainWeather";
import RainCloudWeather from "./home_components/rainCloudWeather";
import SnowWeather from "./home_components/snowWeather";

// 🌞 Sun Model
const sunWeather = ["clear sky"];

// 🌙 Moon Model (Nighttime)
const moonWeather = ["clear sky"]; // Use this for night detection

// ☁️ Cloud Model (General Cloudy Weather)
const cloudWeatherlist = ["few clouds", "scattered clouds", "broken clouds", "overcast clouds"];

// 🌦️ Light Cloud + Sun Model (Partly Cloudy Weather)
const lightCloudSunWeatherlist = ["few clouds", "scattered clouds"];

// 🌦️ Light Cloud + Rain Model (Drizzling / Light Rain)
const lightCloudRainWeatherlist = ["light rain", "light drizzle", "light rain and snow"];

// 🌧️ Rain Cloud Model (Moderate to Heavy Rain)
const rainCloudWeatherlist = [
    "moderate rain",
    "heavy intensity rain",
    "very heavy rain",
    "extreme rain",
    "freezing rain",
    "drizzle",
    "heavy intensity drizzle",
    "shower rain",
    "ragged shower rain"
];

// ⛈️ Thunderstorm Model
const thunderstormWeatherlist = [
    "thunderstorm with light rain",
    "thunderstorm with rain",
    "thunderstorm with heavy rain",
    "light thunderstorm",
    "thunderstorm",
    "heavy thunderstorm",
    "ragged thunderstorm"
];

// 🌨️ Snow Model
const snowWeatherlist = [
    "light snow",
    "snow",
    "heavy snow",
    "sleet",
    "shower sleet",
    "light shower snow",
    "shower snow",
    "heavy shower snow"
];

// 🌫️ Fog / Mist Model
const fogMistWeather = ["mist", "smoke", "haze", "fog"];

// 🏜️ Sandstorm / Dust Model
const sandDustWeather = ["sand/dust whirls", "sand", "dust"];

// 🌋 Volcanic Ash Model
const volcanicAshWeather = ["volcanic ash"];

// 🌪️ Tornado Model
const tornadoWeather = ["squalls", "tornado"];


export default function SmartMirror() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  let WeatherComponentt = WeatherComponent();
  let weather_description = "";
  if (WeatherComponentt && WeatherComponentt["weather"]) {
    weather_description = WeatherComponentt["weather"]["weather"][0]["description"];
  }

  const getWeatherComponent = (weather_description) => {
    if (sunWeather.includes(weather_description)) {
      return <TheSun />;
    } else if (cloudWeatherlist.includes(weather_description)) {
      return <CloudWeather />;
    } else if (lightCloudSunWeatherlist.includes(weather_description)) {
      return <LightCloudSunWeather />;
    } else if (lightCloudRainWeatherlist.includes(weather_description)) {
      return <LightCloudRainWeather />;
    } else if (rainCloudWeatherlist.includes(weather_description)) {
      return <RainCloudWeather />;
    } else if (thunderstormWeatherlist.includes(weather_description)) {
      return <ThunderstormWeather />;
    } else if (snowWeatherlist.includes(weather_description)) {
      return <SnowWeather />;
    } else {
      return "Need Update..."; // A default fallback component
    }
  };

  return (
    <div className="h-screen w-full p-4">
      <div className="grid h-full w-full gap-4">
        {/* First row - Always two columns */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg"><AnalogClock /></div>
            <div className="p-4 rounded-lg">{getWeatherComponent(weather_description)}</div>

        </div>

        {/* Remaining rows - Full width */}
        <div className="p-4 rounded-lg"><Cards /></div>
        {/* <div className="p-4 rounded-lg"><WeatherComponent /></div> */}
        <div className="p-4 rounded-lg"><Music /></div>
        <div className="p-4 rounded-lg"><News /></div>
      </div>
    </div>
  );
}
