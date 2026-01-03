import { weatherOptions, defaultWeatherOptions } from "../../utils/weather";
import "./WeatherCard.css";
function WeatherCard({ weatherData }) {
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
      <p className="weather-card__temp">{weatherData.temp.f} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`card showing ${timeLabel} ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}
export default WeatherCard;
