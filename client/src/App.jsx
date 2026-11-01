
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import InstitutionLayout from "./layouts/InstitutionLayout";
import OfficerLayout from "./layouts/OfficerLayout";

// Institution pages
import InstitutionDashboard from "./pages/institution/Dashboard";
import InstitutionApplications from "./pages/institution/Applications";
import InstitutionCompliance from "./pages/institution/Compliance";
import InstitutionNotifications from "./pages/institution/Notifications";
import InstitutionReports from "./pages/institution/Reports";
import InstitutionSettings from "./pages/institution/Settings";

// Officer pages
import OfficerDashboard from "./pages/officer/Dashboard";
import OfficerApplications from "./pages/officer/Applications";
import OfficerCompliance from "./pages/officer/Compliance";
import OfficerNotifications from "./pages/officer/Notifications";
import OfficerReports from "./pages/officer/Reports";
import OfficerSettings from "./pages/officer/Settings";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Institution Portal */}
      <Route path="/institution" element={<InstitutionLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<InstitutionDashboard />} />
        <Route path="applications" element={<InstitutionApplications />} />
        <Route path="compliance" element={<InstitutionCompliance />} />
        <Route path="notifications" element={<InstitutionNotifications />} />
        <Route path="reports" element={<InstitutionReports />} />
        <Route path="settings" element={<InstitutionSettings />} />
      </Route>

      {/* Officer Portal */}
      <Route path="/officer" element={<OfficerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<OfficerDashboard />} />
        <Route path="applications" element={<OfficerApplications />} />
        <Route path="compliance" element={<OfficerCompliance />} />
        <Route path="notifications" element={<OfficerNotifications />} />
        <Route path="reports" element={<OfficerReports />} />
        <Route path="settings" element={<OfficerSettings />} />
      </Route>

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
