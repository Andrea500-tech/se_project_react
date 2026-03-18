import { weatherOptions, defaultWeatherOptions } from "../../utils/weather";
import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
function WeatherCard({ weatherData }) {
  const {
    currentTemperatureUnit,
    handleToggleSwitchChange,
    isWeatherDataLoaded,
  } = useContext(CurrentTemperatureUnitContext);
  const filteredWeatherOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDayTime &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredWeatherOptions.length === 0) {
    weatherOption =
      defaultWeatherOptions[weatherData.isDayTime ? "day" : "night"];
  } else {
    weatherOption = filteredWeatherOptions[0];
  }
  const timeLabel = weatherOption?.day ? "day" : "night";
  return (
    <section className="Weather-card">
      <p className="weather-card__temp">{isWeatherDataLoaded ? (currentTemperatureUnit === "F" ? weatherData.temp.f : weatherData.temp.c) : "Loading..."} &deg; {currentTemperatureUnit}</p>
      <img
        src={weatherOption?.url}
        alt={`card showing ${timeLabel} ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}
export default WeatherCard;
