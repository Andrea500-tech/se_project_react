import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import hamburger from "../../assets/hamburger.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
function Header({
  handleAddClick,
  weatherData,
  openMobileMenu,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__top-left">
          <NavLink to="/" className="header__logo-link">
            <div className="header__logo-wrapper">
              <img className="header__logo" src={logo} alt="WTWR logo" />
            </div>
          </NavLink>
          <p className="header__date_and-location">
            {currentDate},{weatherData.city}
          </p>
        </div>
        <button className="header__mobile-menu-button" onClick={openMobileMenu}>
          <img src={hamburger} alt="hamburger icon" />
        </button>
        <div className="header__right-side">
          <ToggleSwitch />
          <button
            className="header__add-clothes_btn"
            type="button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
          <NavLink to="/Profile" className="header__nav-link">
            <div className="header__user-container">
              <p className="header__username">Terrence Tegegne</p>
              <img
                className="header__user-image"
                src={avatar}
                alt="Terrence Tegegne"
              />
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
export default Header;
