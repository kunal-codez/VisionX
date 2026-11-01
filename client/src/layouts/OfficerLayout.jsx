import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../App.css";

function OfficerLayout() {
  return (
    <div className="appLayout">
      <Sidebar />

      <main>
        <Header />

        <div className="pageContent">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default OfficerLayout;