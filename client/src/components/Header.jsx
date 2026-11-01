
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const pageTitles = {
  "/officer": "Dashboard",
  "/officer/dashboard": "Dashboard",
  "/officer/applications": "Applications",
  "/officer/compliance": "Compliance Monitoring",
  "/officer/notifications": "Notifications",
  "/officer/reports": "Reports & Analytics",
  "/officer/settings": "Settings",
};

  const pageTitle = pageTitles[location.pathname] || "Officer Portal";

  return (
    <header className="mainHeader">
      <div className="titleHeader">
        <h1>{pageTitle}</h1>
        <p>AICTE Approval Workflow Management System</p>
      </div>

      <div className="headerActions">
        <Link
          to="/officer/notifications"
          className="notificationButton"
          aria-label="View notifications"
        >
          <span>Notifications</span>
        </Link>

        <div className="headerProfile">
          <div className="profileAvatar">A</div>
          <div className="profileInfo">
            <h4>Admin Officer</h4>
            <p>Approval Bureau</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
