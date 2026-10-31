import { NavLink, Outlet } from "react-router-dom";

function InstitutionLayout() {
  return (
    <div className="appLayout">
      <aside>
        <div className="logo">
          <h2>VisionX</h2>
          <p>Institution Portal</p>
        </div>

        <nav className="nav">
          <NavLink to="/institution/dashboard">Dashboard</NavLink>
          <NavLink to="/institution/applications">Applications</NavLink>
          <NavLink to="/institution/compliance">Compliance</NavLink>
          <NavLink to="/institution/notifications">Notifications</NavLink>
          <NavLink to="/institution/reports">Reports</NavLink>
        </nav>

        <div className="asideBottom">
          <NavLink to="/institution/settings">Settings</NavLink>
          <NavLink to="/">Logout</NavLink>
        </div>
      </aside>

      <main>
        <header>
          <h2>Institution Administrator</h2>
          <p>Manage your institution's approval workflow</p>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

export default InstitutionLayout;