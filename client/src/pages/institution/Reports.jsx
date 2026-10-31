
import { useMemo, useState } from "react";
import "./Reports.css";

const initialReports = [
  {
    id: "AICTE-2026-001",
    applicationName: "Extension of Approval",
    institution: "Vision Institute of Technology",
    submittedAt: "2026-10-25",
    status: "Approved",
    compliance: "Compliant",
  },
  {
    id: "AICTE-2026-002",
    applicationName: "New Course Approval",
    institution: "Vision Institute of Technology",
    submittedAt: "2026-10-21",
    status: "Under Review",
    compliance: "Pending",
  },
  {
    id: "AICTE-2026-003",
    applicationName: "Intake Approval",
    institution: "Vision Institute of Technology",
    submittedAt: "2026-10-14",
    status: "Pending",
    compliance: "Compliant",
  },
  {
    id: "AICTE-2026-004",
    applicationName: "Faculty Information Update",
    institution: "Vision Institute of Technology",
    submittedAt: "2026-09-28",
    status: "Approved",
    compliance: "Compliant",
  },
  {
    id: "AICTE-2026-005",
    applicationName: "Infrastructure Compliance",
    institution: "Vision Institute of Technology",
    submittedAt: "2026-09-17",
    status: "Under Review",
    compliance: "Action Required",
  },
  {
    id: "AICTE-2026-006",
    applicationName: "Course Closure Request",
    institution: "Vision Institute of Technology",
    submittedAt: "2026-08-20",
    status: "Rejected",
    compliance: "Compliant",
  },
  {
    id: "AICTE-2026-007",
    applicationName: "Extension of Approval",
    institution: "Vision Institute of Technology",
    submittedAt: "2026-07-12",
    status: "Approved",
    compliance: "Compliant",
  },
  {
    id: "AICTE-2026-008",
    applicationName: "Document Verification",
    institution: "Vision Institute of Technology",
    submittedAt: "2026-05-10",
    status: "Pending",
    compliance: "Pending",
  },
];

const formatDate = (dateString) =>
  new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function Reports() {
  const [reports] = useState(initialReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [exportMessage, setExportMessage] = useState("");

  const filteredReports = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const cutoff = new Date(today);

    if (periodFilter === "30days") {
      cutoff.setDate(cutoff.getDate() - 30);
    } else if (periodFilter === "90days") {
      cutoff.setDate(cutoff.getDate() - 90);
    } else if (periodFilter === "year") {
      cutoff.setMonth(0, 1);
      cutoff.setHours(0, 0, 0, 0);
    }

    return reports.filter((report) => {
      const matchesSearch = [
        report.id,
        report.applicationName,
        report.institution,
      ].some((value) =>
        value.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      const submittedDate = new Date(`${report.submittedAt}T00:00:00`);
      const matchesPeriod =
        periodFilter === "all" ||
        (submittedDate >= cutoff && submittedDate <= today);

      return matchesSearch && matchesStatus && matchesPeriod;
    });
  }, [reports, searchTerm, statusFilter, periodFilter]);

  const summary = useMemo(() => {
    const total = filteredReports.length;
    const approved = filteredReports.filter(
      (report) => report.status === "Approved"
    ).length;
    const pending = filteredReports.filter(
      (report) => report.status === "Pending"
    ).length;
    const compliant = filteredReports.filter(
      (report) => report.compliance === "Compliant"
    ).length;

    return {
      total,
      approved,
      pending,
      complianceRate:
        total === 0 ? 0 : Math.round((compliant / total) * 100),
    };
  }, [filteredReports]);

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setPeriodFilter("all");
    setExportMessage("");
  };

  const exportCSV = () => {
    if (filteredReports.length === 0) {
      setExportMessage("No records available to export.");
      return;
    }

    const headers = [
      "Application ID",
      "Application Name",
      "Institution",
      "Submission Date",
      "Application Status",
      "Compliance Status",
    ];

    const escapeCSV = (value) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = filteredReports.map((report) => [
      report.id,
      report.applicationName,
      report.institution,
      report.submittedAt,
      report.status,
      report.compliance,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "visionx-institution-report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setExportMessage(
      `${filteredReports.length} report record(s) exported successfully.`
    );
  };

  return (
    <div className="reportsPage">
      <div className="reportPageHeader">
        <div>
          <p className="reportEyebrow">INSTITUTION PORTAL</p>
          <h1>Reports & Analytics</h1>
          <p className="reportSubtitle">
            Review application outcomes and institutional compliance.
          </p>
        </div>

        <button
          type="button"
          className="reportExportButton"
          onClick={exportCSV}
        >
          <span aria-hidden="true">↓</span>
          Export CSV
        </button>
      </div>

      <section className="reportStatsGrid" aria-label="Report summary">
        <article className="reportStatCard reportStatPrimary">
          <div className="reportStatTop">
            <span className="reportStatLabel">Total Applications</span>
            <span className="reportStatIcon" aria-hidden="true">▤</span>
          </div>
          <p className="reportStatValue">{summary.total}</p>
          <p className="reportStatNote">Matching selected filters</p>
        </article>

        <article className="reportStatCard reportStatSuccess">
          <div className="reportStatTop">
            <span className="reportStatLabel">Approved</span>
            <span className="reportStatIcon" aria-hidden="true">✓</span>
          </div>
          <p className="reportStatValue">{summary.approved}</p>
          <p className="reportStatNote">Approved applications</p>
        </article>

        <article className="reportStatCard reportStatPending">
          <div className="reportStatTop">
            <span className="reportStatLabel">Pending</span>
            <span className="reportStatIcon" aria-hidden="true">◷</span>
          </div>
          <p className="reportStatValue">{summary.pending}</p>
          <p className="reportStatNote">Awaiting further action</p>
        </article>

        <article className="reportStatCard reportStatCompliance">
          <div className="reportStatTop">
            <span className="reportStatLabel">Compliance Rate</span>
            <span className="reportStatIcon" aria-hidden="true">%</span>
          </div>
          <p className="reportStatValue">{summary.complianceRate}%</p>
          <div
            className="reportProgressTrack"
            role="progressbar"
            aria-label="Compliance rate"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={summary.complianceRate}
          >
            <span style={{ width: `${summary.complianceRate}%` }} />
          </div>
        </article>
      </section>

      <section className="reportTableSection">
        <div className="reportSectionHeader">
          <div>
            <h2>Application Report</h2>
            <p>Search and review your institution's application records.</p>
          </div>

          <span className="reportRecordCount">
            {filteredReports.length} record(s)
          </span>
        </div>

        <div className="reportFilters">
          <div className="reportSearch">
            <label htmlFor="reportSearch">Search records</label>
            <input
              id="reportSearch"
              type="search"
              placeholder="Search ID or application..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="reportFilterField">
            <label htmlFor="reportPeriod">Reporting period</label>
            <select
              id="reportPeriod"
              value={periodFilter}
              onChange={(event) => setPeriodFilter(event.target.value)}
            >
              <option value="all">All dates</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="year">Current year</option>
            </select>
          </div>

          <div className="reportFilterField">
            <label htmlFor="reportStatus">Application status</label>
            <select
              id="reportStatus"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button
            type="button"
            className="reportResetButton"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        {exportMessage && (
          <p className="reportFeedback" role="status">
            {exportMessage}
          </p>
        )}

        <div className="reportTableWrapper">
          <table className="reportTable">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Application</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Compliance</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <span className="reportApplicationId">{report.id}</span>
                  </td>
                  <td>
                    <span className="reportApplicationName">
                      {report.applicationName}
                    </span>
                    <span className="reportInstitutionName">
                      {report.institution}
                    </span>
                  </td>
                  <td>{formatDate(report.submittedAt)}</td>
                  <td>
                    <span
                      className={`reportBadge reportStatus${report.status
                        .replace(/\s+/g, "")}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`reportBadge reportCompliance${report.compliance
                        .replace(/\s+/g, "")}`}
                    >
                      {report.compliance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredReports.length === 0 && (
            <div className="reportEmptyState">
              <span aria-hidden="true">⌕</span>
              <h3>No reports found</h3>
              <p>
                Try changing your search term, reporting period, or status.
              </p>
              <button type="button" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="reportTableFooter">
          <span>
            Showing {filteredReports.length} of {reports.length} sample records
          </span>
          <span>VisionX · Institution Reports</span>
        </div>
      </section>

      <p className="reportPrototypeNote">
        <strong>Prototype notice:</strong> These are sample records for
        demonstration. Connect the page to your backend to display actual
        institutional data.
      </p>
    </div>
  );
}

export default Reports;
