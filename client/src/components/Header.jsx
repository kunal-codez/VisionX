
import { Link, useLocation } from "react-router-dom";

const pageTitles = {
  dashboard: "Dashboard",
  applications: "Applications",
  compliance: "Compliance Monitoring",
  notifications: "Notifications",
  reports: "Reports & Analytics",
  settings: "Settings",
};

const portalNames = {
  institution: "Institution Administrator",
  officer: "Admin Officer",
};

function Header({ portal = "officer" }) {
  const location = useLocation();
  const page = location.pathname.split("/").filter(Boolean).pop();
  const pageTitle = pageTitles[page] || "Dashboard";
  const notificationsPath = `/${portal}/notifications`;

  return (
    <header className="mainHeader">
      <div className="titleHeader">
        <h1>{pageTitle}</h1>
        <p>AICTE Approval Workflow Management System</p>
      </div>

      <div className="headerActions">
        <Link
          to={notificationsPath}
          className="notificationButton"
          aria-label="View notifications"
        >
          <span>Notifications</span>
        </Link>

        <div className="headerProfile">
          <div className="profileAvatar">A</div>
          <div className="profileInfo">
            <h4>{portalNames[portal]}</h4>
            <p>
              {portal === "officer" ? "Approval Bureau" : "Institution Workspace"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
