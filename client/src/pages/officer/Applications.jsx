import "./Applications.css";
import { useState } from "react";

function Applications() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");

  const applications = [
    {
      id: "APP-2026-001",
      institution: "NIT Patna",
      type: "New Approval",
      submitted: "20 Oct 2026",
      deadline: "01 Nov 2026",
      status: "Under Review",
    },
    {
      id: "APP-2026-002",
      institution: "BIT Mesra",
      type: "Extension",
      submitted: "21 Oct 2026",
      deadline: "03 Nov 2026",
      status: "Approved",
    },
    {
      id: "APP-2026-003",
      institution: "IIT Madras",
      type: "New Approval",
      submitted: "22 Oct 2026",
      deadline: "05 Nov 2026",
      status: "Pending",
    },
    {
      id: "APP-2026-004",
      institution: "Patna College of Engineering",
      type: "Renewal",
      submitted: "23 Oct 2026",
      deadline: "07 Nov 2026",
      status: "Rejected",
    },
    {
      id: "APP-2026-005",
      institution: "IIT Kanpur",
      type: "Extension",
      submitted: "24 Oct 2026",
      deadline: "09 Nov 2026",
      status: "Under Review",
    },
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.institution.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || app.status === status;

    const matchesType =
      type === "All" || app.type === type;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <>
      <section className="welcomeSection">
        <h2>Applications</h2>
        <p>
          View and manage institutional approval applications
          and track their current status.
        </p>
      </section>

      {/* Application Summary */}

      <section className="statsGrid">
        <div className="statsCard">
          <h3>Total Applications</h3>
          <p>{applications.length}</p>
        </div>

        <div className="statsCard2">
          <h3>Pending</h3>
          <p>
            {applications.filter((a) => a.status === "Pending").length}
          </p>
        </div>

        <div className="statsCard3">
          <h3>Approved</h3>
          <p>
            {applications.filter((a) => a.status === "Approved").length}
          </p>
        </div>

        <div className="statsCard4">
          <h3>Under Review</h3>
          <p>
            {applications.filter((a) => a.status === "Under Review").length}
          </p>
        </div>
      </section>

      {/* Search and Filters */}

      <section className="recentSection">

        <div className="sectionHeader">
          <h2>All Applications</h2>
          <span>{filteredApplications.length} Results</span>
        </div>

        <div className="applicationFilters">

          <input
            type="text"
            placeholder="Search by ID or institution..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="New Approval">New Approval</option>
            <option value="Extension">Extension</option>
            <option value="Renewal">Renewal</option>
          </select>

        </div>

        {/* Applications Table */}

        <div className="applicationTable">
          <table>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Institution</th>
                <th>Type</th>
                <th>Submitted</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.institution}</td>
                    <td>{app.type}</td>
                    <td>{app.submitted}</td>
                    <td>{app.deadline}</td>
                    <td>
                      <span
                        className={`status ${
                          app.status === "Approved"
                            ? "approved"
                            : app.status === "Rejected"
                            ? "rejected"
                            : app.status === "Pending"
                            ? "pending"
                            : "review"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </section>
    </>
  );
}

export default Applications;