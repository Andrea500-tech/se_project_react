import "./ItemMenu.css";
import avatar from "../../assets/avatar.png";
import closeIcon from "../../assets/close-icon.svg";
import { NavLink } from "react-router-dom";
function MobileMenuOverlay({ closeMobileMenu, handleAddClick,toggleSwitch }) {
  return (
    <div className="mobile-overlay">
      <button className="mobile-overlay__close" onClick={closeMobileMenu}>
        <img src={closeIcon} alt="close icon" />
      </button>
      <div className="mobile-overlay__inner">
        <div className="mobile-overlay__content">
          <NavLink to="/Profile" className="mobile-overlay-link">
            <div className="mobile-overlay__user">
              <p>Terrence Tegegne</p>
              <img
                src={avatar}
                alt="Terrence Tegegne"
                className="mobile-overlay__avatar"
              />
            </div>
          </NavLink>
          <button className="mobile-overlay__add" onClick={handleAddClick}>
            + Add clothes
          </button>
          {toggleSwitch}
        </div>
      </div>
    </div>
  );
}
export default MobileMenuOverlay;
