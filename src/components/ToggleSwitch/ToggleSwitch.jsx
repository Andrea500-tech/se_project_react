import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <label className="toggle-switch">
      <input type="checkbox" className="toggle-switch__input" onChange={handleToggleSwitchChange}/>
      <span className="toggle-switch__slider"></span>
      <span className={`toggle-switch__text toggle-switch__text_f ${currentTemperatureUnit === "F" ? "toggle-switch__text_color_white" : ""}`}>F</span>
      <span className={`toggle-switch__text toggle-switch__text_c ${currentTemperatureUnit === "C" ? "toggle-switch__text_color_white" : ""}`}>C</span>
    </label>
  );
}
