import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create Context
 const StateContext = createContext(); //{
//     weather: null,
//     values: [],
//     lat: null,
//     lon: null,
//     place: "",
//     thisLocation: "",
//     setPlace: () => {},
//     setLatLon: () => {},
//     fetchWeather: () => {},
//   });

// Context Provider
export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Egypt");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [thisLocation, setLocation] = useState("");

  // Fetch Weather Data
  const fetchWeather = async () => {
    const options = {
      method: 'GET',
      url: 'https://weather-api167.p.rapidapi.com/api/weather/current',
      params: {
        place: 'Egypt',
        units: 'standard',
        lang: 'en',
        mode: 'json',
        lat: 30.033333,
        lon:	31.233334
      },
      headers: {
        'x-rapidapi-key': 'fa62882bcbmsh261a6235d656f11p1861ebjsn3e2397239069',
        'x-rapidapi-host': 'weather-api167.p.rapidapi.com',
        Accept: 'application/json'
      }
    
    };

    try {
      console.log("Fetching weather for:", place);
      const response = await axios.request(options);
      console.log("API Response:", response.data);

      const thisData = Object.values(response.data.location[0]);

      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);

      
      if (response.data && response.data.main) {
        const weatherData = response.data; // Assuming response matches expected structure
        setLocation(weatherData.name || "Unknown");
        setWeather(weatherData.main || {}); // Adjust key names as per actual API response
      } else {
        throw new Error("No data found for the given location");
      }

    //   const thisData = Object.values(response.data.locations)[0];
    //   setLocation(thisData.address);
    //   setValues(thisData.values);
    //   setWeather(thisData.values[0]);
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("This place does not exist or there was an issue with the API.");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]); // Fetch data whenever the place changes

   useEffect(() => {
    console.log(values);
  }, [values]); // Fetch data whenever the place changes
  return (
    <StateContext.Provider
      value={{
        weather,
        values,
        setPlace,
        thisLocation,
        fetchWeather,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom Hook to use the context
export const useStateContext = () => {
  return useContext(StateContext);
};
