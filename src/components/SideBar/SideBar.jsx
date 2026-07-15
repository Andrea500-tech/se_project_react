import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export function SideBar({ handleEditProfileClick, handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <aside className="sideBar">
      <div className="sideBar__profile">
        {/* Top row: avatar + username */}
        <div className="sideBar__profile-top">
          {currentUser.avatar ? (
            <img
              className="sideBar__profile-image"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
          ) : (
            <div className="sideBar__profile-avatar-placeholder">
              {currentUser.name?.[0]?.toUpperCase()}
            </div>
          )}
          <p className="sideBar__profile-username">{currentUser.name}</p>
        </div>

        {/* Buttons stacked below */}
        <button
          className="sideBar__profile-btn"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>

        <button className="sideBar__logout-btn" onClick={handleSignOut}>
          Log out
        </button>
      </div>
    </aside>
  );
}
