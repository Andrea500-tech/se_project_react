import { weatherOptions,defaultWeatherOptions } from "../../utils/weather";
import "./WeatherCard.css";
function WeatherCard({weatherData}) {
  const filteredweatherOption = weatherOptions.filter(
    (option) =>{
      return option.day === weatherData.isDayTime && option.condition === weatherData.condition
    }
  );
  let weatherOption;
  if (filteredweatherOption.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDayTime ? "day" : "night"];
  } else{
   weatherOption = filteredweatherOption[0];
}
  return (
    <section className="Weather-card">
      <p className="weather-card__temp">{weatherData.temp.f} &deg; F</p>
      <img src={weatherOption?.url} alt={`card showing ${weatherOption?.day === "clear" ? "day" : "night"} ${weatherOption?.condition} weather`} className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
