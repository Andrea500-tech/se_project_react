import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { NavLink } from "react-router-dom";
export function SideBar() {
  return (
    <aside className="sideBar">
      <div className="sideBar__profile">
        <div className="sideBar__profile-background">
          <p className="sideBar__profile-username">Terrence Tegegne</p>
          <p className="sideBar__profile-text">Change profile data</p>
          <NavLink to="/" className="sideBar__profile-link">
          Log out
          </NavLink>
        </div>
        <img
          className="sideBar__profile-image"
          src={avatar}
          alt="Terrence Tegegne"
        />
      </div>
    </aside>
  );
}
