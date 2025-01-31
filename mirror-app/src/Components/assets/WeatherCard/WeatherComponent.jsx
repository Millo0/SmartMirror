import {React} from "react";
import { useStateContext } from "../../../Context/index";



const WeatherComponent = () => {
  const { weather, thisLocation, place, setPlace } = useStateContext();
  console.log("Context values:", { weather, thisLocation, place });
  
  if (!weather) {
    return <p>Loading weather data...</p>;
  }
  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Enter a place"
      />
      {weather ? (
        <div>
          <h2>Weather in {thisLocation}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.conditions}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherComponent;

