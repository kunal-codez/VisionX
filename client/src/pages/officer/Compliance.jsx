import "./Compliance.css";
import { useState } from "react";

function Compliance() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const complianceData = [
    {
      id: "CMP-2026-001",
      institution: "NIT Patna",
      requirement: "Faculty Details Verification",
      application: "APP-2026-001",
      deadline: "02 Nov 2026",
      status: "Pending",
    },
    {
      id: "CMP-2026-002",
      institution: "BIT Mesra",
      requirement: "Infrastructure Compliance",
      application: "APP-2026-002",
      deadline: "04 Nov 2026",
      status: "Under Review",
    },
    {
      id: "CMP-2026-003",
      institution: "IIT Madras",
      requirement: "Undertaking Submission",
      application: "APP-2026-003",
      deadline: "28 Oct 2026",
      status: "Overdue",
    },
    {
      id: "CMP-2026-004",
      institution: "Patna College of Engineering",
      requirement: "Mandatory Disclosure",
      application: "APP-2026-004",
      deadline: "30 Oct 2026",
      status: "Compliant",
    },
    {
      id: "CMP-2026-005",
      institution: "IIT Kanpur",
      requirement: "Faculty Qualification Documents",
      application: "APP-2026-005",
      deadline: "09 Nov 2026",
      status: "Pending",
    },
  ];

  const filteredData = complianceData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.institution.toLowerCase().includes(search.toLowerCase()) ||
      item.requirement.toLowerCase().includes(search.toLowerCase()) ||
      item.application.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || item.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      {/* Welcome Section */}

      <section className="welcomeSection">
        <h2>Compliance Monitoring</h2>
        <p>
          Monitor institutional compliance requirements, verify
          submissions and track pending and overdue activities.
        </p>
      </section>

      {/* Compliance Statistics */}

      <section className="statsGrid">
        <div className="statsCard">
          <h3>Total Requirements</h3>
          <p>{complianceData.length}</p>
        </div>

        <div className="statsCard2">
          <h3>Pending</h3>
          <p>
            {complianceData.filter(
              (item) => item.status === "Pending"
            ).length}
          </p>
        </div>

        <div className="statsCard3">
          <h3>Compliant</h3>
          <p>
            {complianceData.filter(
              (item) => item.status === "Compliant"
            ).length}
          </p>
        </div>

        <div className="statsCard4">
          <h3>Overdue</h3>
          <p>
            {complianceData.filter(
              (item) => item.status === "Overdue"
            ).length}
          </p>
        </div>
      </section>

      {/* Compliance Records */}

      <section className="recentSection">

        <div className="sectionHeader">
          <h2>Institutional Compliance Records</h2>
          <span>{filteredData.length} Records</span>
        </div>

        {/* Search and Filter */}

        <div className="complianceFilters">

          <input
            type="text"
            placeholder="Search institution, requirement or ID..."
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
            <option value="Compliant">Compliant</option>
            <option value="Overdue">Overdue</option>
          </select>

        </div>

        {/* Compliance Table */}

        <div className="complianceTable">
          <table>
            <thead>
              <tr>
                <th>Compliance ID</th>
                <th>Institution</th>
                <th>Requirement</th>
                <th>Application ID</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.institution}</td>
                    <td>{item.requirement}</td>
                    <td>{item.application}</td>
                    <td>{item.deadline}</td>
                    <td>
                      <span
                        className={`complianceStatus ${
                          item.status === "Compliant"
                            ? "compliant"
                            : item.status === "Overdue"
                            ? "overdue"
                            : item.status === "Under Review"
                            ? "reviewing"
                            : "awaiting"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="complianceEmpty">
                    No compliance records found.
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

export default Compliance;