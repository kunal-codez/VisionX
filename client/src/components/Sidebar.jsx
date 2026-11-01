
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>VisionX</h2>
        <span>AICTE Officer Portal</span>
      </div>

      <nav className="nav">
        <NavLink to="/officer/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/officer/applications">
          Applications
        </NavLink>

        <NavLink to="/officer/compliance">
          Compliance
        </NavLink>

        <NavLink to="/officer/notifications">
          Notifications
        </NavLink>

        <NavLink to="/officer/reports">
          Reports
        </NavLink>

        <NavLink to="/officer/settings">
          Settings
        </NavLink>
      </nav>

      <div className="asideBottom">
        <div className="user">
          <div className="userAvatar">A</div>
          <div>
            <h4>Admin Officer</h4>
            <p>Approval Bureau</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
