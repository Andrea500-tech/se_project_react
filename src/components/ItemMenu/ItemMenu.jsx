import "./ItemMenu.css";
import closeIcon from "../../assets/close-icon.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MobileMenuOverlay({
  closeMobileMenu,
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  isLoggedIn,
  toggleSwitch,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="mobile-overlay">
      <button className="mobile-overlay__close" onClick={closeMobileMenu}>
        <img src={closeIcon} alt="close icon" />
      </button>
      <div className="mobile-overlay__inner">
        <div className="mobile-overlay__content">
          {isLoggedIn ? (
            <>
              {/* Profile link */}
              <NavLink to="/profile" className="mobile-overlay-link">
                <div className="mobile-overlay__user">
                  <p className="mobile-overlay__username">
                    {currentUser?.name}
                  </p>
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser?.name}
                      className="mobile-overlay__avatar"
                    />
                  ) : (
                    <div className="mobile-overlay__avatar-placeholder">
                      {currentUser?.name?.[0]?.toUpperCase() || ""}
                    </div>
                  )}
                </div>
              </NavLink>

              {/* Add clothes button */}
              <button
                className="mobile-overlay__add"
                onClick={() => {
                  closeMobileMenu();
                  handleAddClick();
                }}
              >
                + Add clothes
              </button>

              {/* ToggleSwitch always visible */}
              {toggleSwitch}
            </>
          ) : (
            <>
              {/* Login at top */}
              <button
                className="mobile-overlay__auth-btn mobile-overlay__auth-btn--login"
                onClick={() => {
                  closeMobileMenu();
                  handleLoginClick();
                }}
              >
                Login
              </button>

              {/* Sign Up in middle */}
              <button
                className="mobile-overlay__auth-btn mobile-overlay__auth-btn--signup"
                onClick={() => {
                  closeMobileMenu();
                  handleRegisterClick();
                }}
              >
                Sign Up
              </button>
              {toggleSwitch}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenuOverlay;
