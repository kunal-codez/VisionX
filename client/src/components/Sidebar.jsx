
import { NavLink } from "react-router-dom";

const portalDetails = {
  institution: {
    basePath: "/institution",
    title: "Institution Portal",
    name: "Institution Administrator",
    organization: "Institution Workspace",
  },
  officer: {
    basePath: "/officer",
    title: "AICTE Officer Portal",
    name: "Admin Officer",
    organization: "Approval Bureau",
  },
};

const navigationItems = [
  ["dashboard", "Dashboard"],
  ["applications", "Applications"],
  ["compliance", "Compliance"],
  ["notifications", "Notifications"],
  ["reports", "Reports"],
  ["settings", "Settings"],
];

function Sidebar({ portal = "officer" }) {
  const details = portalDetails[portal];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>VisionX</h1>
        <p>{details.title}</p>
      </div>

      <div className="nav">
        <nav aria-label={`${details.title} navigation`}>
          {navigationItems.map(([path, label]) => (
            <NavLink key={path} to={`${details.basePath}/${path}`}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="asideBottom">
        <div className="user">
          <div className="userAvatar">A</div>
          <div>
            <h4>{details.name}</h4>
            <p>{details.organization}</p>
          </div>
        </div>
        <NavLink to="/">Logout</NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
