
import { useMemo, useState } from "react";
import "./Compliance.css";

const initialRequirements = [
  {
    id: "CMP-001",
    title: "Institution Approval Certificate",
    category: "Approval",
    description:
      "Maintain a valid institutional approval certificate and its supporting records.",
    dueDate: "2026-11-15",
    validUntil: "2027-06-30",
    status: "Compliant",
    document: "Approval_Certificate.pdf",
    lastUpdated: "2026-10-20",
  },
  {
    id: "CMP-002",
    title: "Faculty Qualification Records",
    category: "Faculty",
    description:
      "Maintain updated faculty qualification, appointment, and supporting documents.",
    dueDate: "2026-11-05",
    validUntil: "2027-03-31",
    status: "Pending",
    document: "Not uploaded",
    lastUpdated: "2026-10-12",
  },
  {
    id: "CMP-003",
    title: "Fire Safety Certificate",
    category: "Infrastructure",
    description:
      "Keep the fire safety certificate valid and retain the supporting inspection records.",
    dueDate: "2026-10-25",
    validUntil: "2026-10-25",
    status: "Overdue",
    document: "Fire_Safety_Certificate.pdf",
    lastUpdated: "2026-09-15",
  },
  {
    id: "CMP-004",
    title: "Building and Infrastructure Details",
    category: "Infrastructure",
    description:
      "Review institutional building, laboratory, classroom, and infrastructure information.",
    dueDate: "2026-11-20",
    validUntil: "2027-06-30",
    status: "In Progress",
    document: "Infrastructure_Report.pdf",
    lastUpdated: "2026-10-22",
  },
  {
    id: "CMP-005",
    title: "Student Intake Information",
    category: "Academic",
    description:
      "Verify approved intake, programme details, and student intake information.",
    dueDate: "2026-11-18",
    validUntil: "2027-06-30",
    status: "Compliant",
    document: "Student_Intake_Report.pdf",
    lastUpdated: "2026-10-24",
  },
  {
    id: "CMP-006",
    title: "Laboratory Equipment Records",
    category: "Infrastructure",
    description:
      "Maintain updated laboratory equipment inventories and related records.",
    dueDate: "2026-11-10",
    validUntil: "2027-03-31",
    status: "Pending",
    document: "Not uploaded",
    lastUpdated: "2026-10-10",
  },
  {
    id: "CMP-007",
    title: "Faculty Student Ratio",
    category: "Faculty",
    description:
      "Review faculty strength against applicable programme requirements.",
    dueDate: "2026-11-12",
    validUntil: "2027-06-30",
    status: "In Progress",
    document: "Faculty_Ratio_Report.pdf",
    lastUpdated: "2026-10-23",
  },
  {
    id: "CMP-008",
    title: "Accessibility Compliance Records",
    category: "Infrastructure",
    description:
      "Review accessibility facilities and maintain relevant institutional records.",
    dueDate: "2026-11-22",
    validUntil: "2027-06-30",
    status: "Compliant",
    document: "Accessibility_Report.pdf",
    lastUpdated: "2026-10-26",
  },
];

const categories = [
  "All Categories",
  "Approval",
  "Faculty",
  "Infrastructure",
  "Academic",
];

function getStatusClass(status) {
  switch (status) {
    case "Compliant":
      return "compliant";
    case "In Progress":
      return "in-progress";
    case "Pending":
      return "pending";
    case "Overdue":
      return "overdue";
    case "Pending Verification":
      return "verification";
    default:
      return "";
  }
}

function formatDate(dateString) {
  if (!dateString || dateString === "Not set") {
    return "Not set";
  }

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Compliance() {
  const [requirements, setRequirements] = useState(initialRequirements);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [notice, setNotice] = useState("");

  const stats = useMemo(() => {
    const total = requirements.length;
    const compliant = requirements.filter(
      (item) => item.status === "Compliant"
    ).length;
    const pending = requirements.filter(
      (item) =>
        item.status === "Pending" ||
        item.status === "Pending Verification"
    ).length;
    const overdue = requirements.filter(
      (item) => item.status === "Overdue"
    ).length;

    return { total, compliant, pending, overdue };
  }, [requirements]);

  const filteredRequirements = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requirements.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All Categories" ||
        item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [requirements, search, statusFilter, categoryFilter]);

  function updateRequirement(id, updates, message) {
    setRequirements((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
              lastUpdated: new Date().toISOString().slice(0, 10),
            }
          : item
      )
    );

    setSelectedRequirement((current) =>
      current && current.id === id
        ? { ...current, ...updates }
        : current
    );

    setNotice(message);
  }

  function handleMarkInProgress(item) {
    updateRequirement(
      item.id,
      { status: "In Progress" },
      `"${item.title}" marked as in progress.`
    );
  }

  function handleRecordUpload(item) {
    updateRequirement(
      item.id,
      {
        document: "Document recorded — demo only",
        status: "Pending Verification",
      },
      `A document upload was recorded for "${item.title}" in this prototype.`
    );
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All Statuses");
    setCategoryFilter("All Categories");
  }

  return (
    <div className="compliance-page">
      <header className="compliance-heading">
        <div>
          <p className="compliance-eyebrow">INSTITUTION PORTAL</p>
          <h1>Compliance Monitoring</h1>
          <p className="compliance-subtitle">
            Monitor institutional requirements, document validity, and
            upcoming compliance deadlines.
          </p>
        </div>

        <div className="compliance-updated">
          <span className="compliance-live-dot" />
          <span>Institution compliance overview</span>
        </div>
      </header>

      {notice && (
        <div className="compliance-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <section
        className="compliance-stats"
        aria-label="Compliance statistics"
      >
        <article className="compliance-stat-card">
          <div className="compliance-stat-top">
            <span className="compliance-stat-icon total">▤</span>
            <span>Total Requirements</span>
          </div>
          <strong>{stats.total}</strong>
          <p>Tracked compliance items</p>
        </article>

        <article className="compliance-stat-card">
          <div className="compliance-stat-top">
            <span className="compliance-stat-icon good">✓</span>
            <span>Compliant</span>
          </div>
          <strong>{stats.compliant}</strong>
          <p>Marked as compliant</p>
        </article>

        <article className="compliance-stat-card">
          <div className="compliance-stat-top">
            <span className="compliance-stat-icon waiting">◷</span>
            <span>Pending Action</span>
          </div>
          <strong>{stats.pending}</strong>
          <p>Awaiting action or verification</p>
        </article>

        <article className="compliance-stat-card">
          <div className="compliance-stat-top">
            <span className="compliance-stat-icon danger">!</span>
            <span>Overdue</span>
          </div>
          <strong>{stats.overdue}</strong>
          <p>Requires immediate attention</p>
        </article>
      </section>

      <section className="compliance-summary">
        <div className="compliance-summary-header">
          <div>
            <h2>Overall Compliance</h2>
            <p>Based on the current status of tracked requirements.</p>
          </div>
          <strong>
            {stats.total
              ? Math.round((stats.compliant / stats.total) * 100)
              : 0}
            %
          </strong>
        </div>

        <div
          className="compliance-overall-track"
          role="progressbar"
          aria-label="Overall compliant requirements"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={
            stats.total
              ? Math.round((stats.compliant / stats.total) * 100)
              : 0
          }
        >
          <div
            className="compliance-overall-fill"
            style={{
              width: `${
                stats.total
                  ? (stats.compliant / stats.total) * 100
                  : 0
              }%`,
            }}
          />
        </div>

        <p className="compliance-summary-footnote">
          {stats.compliant} of {stats.total} requirements are currently
          marked compliant. This is a prototype indicator, not an official
          AICTE compliance determination.
        </p>
      </section>

      <section className="compliance-list-section">
        <div className="compliance-section-heading">
          <div>
            <h2>Compliance Requirements</h2>
            <p>
              Review status, deadlines, and supporting document records.
            </p>
          </div>

          <span className="compliance-record-count">
            {filteredRequirements.length} record
            {filteredRequirements.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="compliance-filters">
          <div className="compliance-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search requirements..."
              aria-label="Search compliance requirements"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by compliance status"
          >
            <option>All Statuses</option>
            <option>Compliant</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Pending Verification</option>
            <option>Overdue</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <button
            type="button"
            className="compliance-reset-btn"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <div className="compliance-table-wrapper">
          <table className="compliance-table">
            <thead>
              <tr>
                <th>REQUIREMENT</th>
                <th>CATEGORY</th>
                <th>DUE DATE</th>
                <th>DOCUMENT VALID UNTIL</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequirements.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="compliance-requirement-cell">
                      <strong>{item.title}</strong>
                      <span>{item.id}</span>
                    </div>
                  </td>

                  <td>
                    <span className="compliance-category">
                      {item.category}
                    </span>
                  </td>

                  <td>{formatDate(item.dueDate)}</td>
                  <td>{formatDate(item.validUntil)}</td>

                  <td>
                    <span
                      className={`compliance-status ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="compliance-view-btn"
                      onClick={() => setSelectedRequirement(item)}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRequirements.length === 0 && (
            <div className="compliance-empty">
              <span aria-hidden="true">▤</span>
              <h3>No matching requirements</h3>
              <p>
                Try another search term or change your selected filters.
              </p>
              <button
                type="button"
                className="compliance-secondary-btn"
                onClick={resetFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedRequirement && (
        <div
          className="compliance-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedRequirement(null);
            }
          }}
        >
          <section
            className="compliance-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="compliance-modal-title"
          >
            <div className="compliance-modal-heading">
              <div>
                <p className="compliance-eyebrow">
                  {selectedRequirement.id}
                </p>
                <h2 id="compliance-modal-title">
                  {selectedRequirement.title}
                </h2>
                <p>{selectedRequirement.description}</p>
              </div>

              <button
                type="button"
                className="compliance-close-btn"
                onClick={() => setSelectedRequirement(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="compliance-details-grid">
              <div>
                <span>Category</span>
                <strong>{selectedRequirement.category}</strong>
              </div>
              <div>
                <span>Current Status</span>
                <strong>{selectedRequirement.status}</strong>
              </div>
              <div>
                <span>Requirement Due Date</span>
                <strong>{formatDate(selectedRequirement.dueDate)}</strong>
              </div>
              <div>
                <span>Document Valid Until</span>
                <strong>{formatDate(selectedRequirement.validUntil)}</strong>
              </div>
              <div className="compliance-document-detail">
                <span>Supporting Document</span>
                <strong>{selectedRequirement.document}</strong>
              </div>
              <div>
                <span>Last Updated</span>
                <strong>{formatDate(selectedRequirement.lastUpdated)}</strong>
              </div>
            </div>

            {selectedRequirement.status === "Overdue" && (
              <div className="compliance-modal-warning">
                This requirement is marked overdue in the sample data.
                Review the applicable deadline and update the supporting
                records.
              </div>
            )}

            <div className="compliance-modal-note">
              Document records and status changes are stored only in
              frontend state. No document is actually uploaded or verified.
            </div>

            <div className="compliance-modal-actions">
              <button
                type="button"
                className="compliance-secondary-btn"
                onClick={() => setSelectedRequirement(null)}
              >
                Close
              </button>

              {selectedRequirement.status !== "In Progress" &&
                selectedRequirement.status !== "Compliant" && (
                  <button
                    type="button"
                    className="compliance-secondary-btn"
                    onClick={() =>
                      handleMarkInProgress(selectedRequirement)
                    }
                  >
                    Mark In Progress
                  </button>
                )}

              {selectedRequirement.document === "Not uploaded" && (
                <button
                  type="button"
                  className="compliance-primary-btn"
                  onClick={() =>
                    handleRecordUpload(selectedRequirement)
                  }
                >
                  Record Document Upload
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Compliance;
