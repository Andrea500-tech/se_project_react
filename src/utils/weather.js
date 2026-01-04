export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.svg", import.meta.url).href,
  },
];
export const defaultWeatherOptions = {
  day:{
    day:true,
    condition:"unknown",
    url: new URL("../assets/day/default.png",import.meta.url).href,
    

  },
  night:{
    day:false,
    condition:"unknown",
    url: new URL("../assets/night/default.png",import.meta.url).href,
  },
}
export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  
result.temp ={f:data.main.temp};
result.type = determineWeatherType(result.temp.f);
result.condition = data.weather[0].main.toLowerCase();
result.isDayTime = isDayTime(data.sys,Date.now());
return result;
};
 const determineWeatherType = (temperature) => {
 if (temperature > 86) {
   return "hot";
 } else if ( temperature >= 66 && temperature < 86 ) {
   return "warm";
 } else {
   return "cold";
 }
};
 const isDayTime = ({ sunrise, sunset},now) => {
   
  return sunrise * 1000 < now && now < sunset * 1000;
  
 };