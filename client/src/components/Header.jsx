
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const pageTitles = {
  dashboard: "Dashboard",
  applications: "Applications",
  compliance: "Compliance Monitoring",
  notifications: "Notifications",
  reports: "Reports & Analytics",
  settings: "Settings",
};

function Header({ portal = "officer" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const page = location.pathname.split("/").filter(Boolean).pop();
  const pageTitle = pageTitles[page] || "Dashboard";

  function handleSearch(event) {
    event.preventDefault();
    const query = searchQuery.trim();
    const search = query ? `?q=${encodeURIComponent(query)}` : "";

    navigate(`/${portal}/applications${search}`);
  }

  return (
    <header className="mainHeader">
      <div className="titleHeader">
        <h1>{pageTitle}</h1>
        <p>AICTE Approval Workflow Management System</p>
      </div>

      <form className="searchHeader" role="search" onSubmit={handleSearch}>
        <input
          type="search"
          aria-label="Search applications"
          placeholder="Search applications..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
