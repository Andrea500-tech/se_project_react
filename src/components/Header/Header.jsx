import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import hamburger from "../../assets/hamburger.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  isLoggedIn,
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
  openMobileMenu,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const {  currentUser } = useContext(CurrentUserContext);

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
            {currentDate}, {weatherData.city}
          </p>
        </div>

        <button className="header__mobile-menu-button" onClick={openMobileMenu}>
          <img src={hamburger} alt="hamburger icon" />
        </button>

        <div className="header__right-side">
          <ToggleSwitch />
          {isLoggedIn && (
            <button
              className="header__add-clothes_btn"
              type="button"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>
          )}

          {isLoggedIn ? (
            <NavLink to="/profile" className="header__nav-link">
              <div className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                {currentUser.avatar ? (
                  <img
                    className="header__user-image"
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                ) : (
                  <div className="header__user-avatar-placeholder">
                    {currentUser.name?.[0]?.toUpperCase() || ""}
                  </div>
                )}
              </div>
            </NavLink>
          ) : (
            <div className="header__auth-links">
              <button
                className="header__nav-link"
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
              <button className="header__nav-link" onClick={handleLoginClick}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
