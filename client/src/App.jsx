import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import InstitutionLayout from "./layouts/InstitutionLayout";
import InstitutionDashboard from "./pages/institution/Dashboard";
import OfficerDashboard from "./pages/officer/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/institution" element={<InstitutionLayout />}>
        <Route
          path="dashboard"
          element={<InstitutionDashboard />}
        />
      </Route>
      <Route
        path="/officer/dashboard"
        element={<OfficerDashboard />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;