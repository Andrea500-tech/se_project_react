import "./ItemMenu.css";
import avatar from "../assets/avatar.png";
import closeIcon from "../assets/close-icon.svg";
function MobileMenuOverlay({ closeMobileMenu, handleAddClick }) {
  return (
    <div className="mobile-overlay">
      <button className="mobile-overlay__close" onClick={closeMobileMenu}>
        <img src={closeIcon} alt="close icon" />
      </button>
      <div className="mobile-overlay__inner">
        <div className="mobile-overlay__content">
          <div className="mobile-overlay__user">
            <p>Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="mobile-overlay__avatar"
            />
          </div>

          <button className="mobile-overlay__add" onClick={handleAddClick}>
            + Add clothes
          </button>
        </div>
      </div>
    </div>
  );
}
export default MobileMenuOverlay;
