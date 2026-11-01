import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function InstitutionLayout() {
  return (
    <div className="appLayout">
      <Sidebar portal="institution" />

      <main>
        <Header portal="institution" />
        <div className="pageContent">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default InstitutionLayout;