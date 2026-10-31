
import { Routes, Route, Navigate } from "react-router-dom";

// Login
import Login from "./pages/Login";

// Institution layout
import InstitutionLayout from "./layouts/InstitutionLayout";

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
      {/* Login page */}
      <Route path="/" element={<Login />} />

      {/* Institution portal */}
      <Route
        path="/institution"
        element={<InstitutionLayout />}
      >
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<InstitutionDashboard />}
        />

        <Route
          path="applications"
          element={<InstitutionApplications />}
        />

        <Route
          path="compliance"
          element={<InstitutionCompliance />}
        />

        <Route
          path="notifications"
          element={<InstitutionNotifications />}
        />

        <Route
          path="reports"
          element={<InstitutionReports />}
        />

        <Route
          path="settings"
          element={<InstitutionSettings />}
        />
      </Route>

      {/* Officer portal */}
      <Route
        path="/officer"
        element={<Navigate to="/officer/dashboard" replace />}
      />

      <Route
        path="/officer/dashboard"
        element={<OfficerDashboard />}
      />

      <Route
        path="/officer/applications"
        element={<OfficerApplications />}
      />

      <Route
        path="/officer/compliance"
        element={<OfficerCompliance />}
      />

      <Route
        path="/officer/notifications"
        element={<OfficerNotifications />}
      />

      <Route
        path="/officer/reports"
        element={<OfficerReports />}
      />

      <Route
        path="/officer/settings"
        element={<OfficerSettings />}
      />

      {/* Redirect unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
