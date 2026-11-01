
import { useMemo, useState } from "react";
import "./Applications.css";

const initialApplications = [
  {
    id: "VX-2026-001",
    title: "Extension of Approval",
    type: "Extension of Approval",
    submitted: "2026-10-12",
    deadline: "2026-11-15",
    status: "Under Review",
    progress: 65,
    description: "Application for extension of institutional approval.",
  },
  {
    id: "VX-2026-002",
    title: "Increase in Intake",
    type: "Change in Intake",
    submitted: "2026-10-18",
    deadline: "2026-11-08",
    status: "Clarification Required",
    progress: 45,
    description: "Request to increase the approved student intake.",
  },
  {
    id: "VX-2026-003",
    title: "New Course Approval",
    type: "New Course",
    submitted: "2026-10-21",
    deadline: "2026-11-20",
    status: "Draft",
    progress: 20,
    description: "Proposal for introducing a new academic course.",
  },
  {
    id: "VX-2026-004",
    title: "Infrastructure Compliance",
    type: "Compliance Report",
    submitted: "2026-10-05",
    deadline: "2026-11-05",
    status: "Approved",
    progress: 100,
    description: "Infrastructure and facilities compliance submission.",
  },
  {
    id: "VX-2026-005",
    title: "Faculty Information Update",
    type: "Faculty Update",
    submitted: "2026-10-24",
    deadline: "2026-11-18",
    status: "Submitted",
    progress: 55,
    description: "Updated faculty details and supporting information.",
  },
];

const applicationTypes = [
  "Extension of Approval",
  "Change in Intake",
  "New Course",
  "Compliance Report",
  "Faculty Update",
  "Other",
];

function getStatusClass(status) {
  switch (status) {
    case "Approved":
      return "approved";
    case "Under Review":
      return "review";
    case "Clarification Required":
      return "clarification";
    case "Submitted":
      return "submitted";
    case "Draft":
      return "draft";
    case "Rejected":
      return "rejected";
    default:
      return "";
  }
}

function Application() {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [form, setForm] = useState({
    title: "",
    type: applicationTypes[0],
    description: "",
    deadline: "",
  });

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        application.title.toLowerCase().includes(query) ||
        application.id.toLowerCase().includes(query) ||
        application.type.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        application.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [applications, search, statusFilter, typeFilter]);

  const counts = useMemo(
    () => ({
      total: applications.length,
      inProgress: applications.filter(
        (app) =>
          app.status === "Submitted" ||
          app.status === "Under Review"
      ).length,
      clarification: applications.filter(
        (app) => app.status === "Clarification Required"
      ).length,
      approved: applications.filter(
        (app) => app.status === "Approved"
      ).length,
    }),
    [applications]
  );

  function openNewApplication() {
    setForm({
      title: "",
      type: applicationTypes[0],
      description: "",
      deadline: "",
    });
    setNotice("");
    setShowModal(true);
  }

  function handleCreateApplication(event) {
    event.preventDefault();

    const newApplication = {
      id: `VX-2026-${String(Date.now()).slice(-5)}`,
      title: form.title.trim(),
      type: form.type,
      submitted: new Date().toISOString().slice(0, 10),
      deadline: form.deadline || "Not set",
      status: "Draft",
      progress: 0,
      description: form.description.trim(),
    };

    setApplications((current) => [
      newApplication,
      ...current,
    ]);

    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setShowModal(false);
    setNotice("Application draft created successfully.");
  }

  function handleSubmitApplication(id) {
    setApplications((current) =>
      current.map((app) =>
        app.id === id && app.status === "Draft"
          ? {
              ...app,
              status: "Submitted",
              progress: 35,
              submitted: new Date().toISOString().slice(0, 10),
            }
          : app
      )
    );

    setSelectedApplication(null);
    setNotice(
      "Application status updated in this prototype. No real submission was sent."
    );
  }

  function handleViewApplication(application) {
    setSelectedApplication(application);
    setNotice("");
  }

  return (
    <div className="application-page">
      <div className="application-heading">
        <div>
          <p className="application-eyebrow">INSTITUTION PORTAL</p>
          <h1>Applications</h1>
          <p className="application-subtitle">
            Create, manage, and track your AICTE approval applications.
          </p>
        </div>

        <button
          className="application-primary-btn"
          onClick={openNewApplication}
        >
          <span aria-hidden="true">＋</span> New Application
        </button>
      </div>

      {notice && (
        <div className="application-notice" role="status">
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <section className="application-stats">
        <div className="application-stat-card">
          <div className="application-stat-top">
            <span className="application-stat-icon total-icon">▤</span>
            <span className="application-stat-label">Total Applications</span>
          </div>
          <strong>{counts.total}</strong>
          <p>All application records</p>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-top">
            <span className="application-stat-icon progress-icon">◷</span>
            <span className="application-stat-label">In Progress</span>
          </div>
          <strong>{counts.inProgress}</strong>
          <p>Submitted or under review</p>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-top">
            <span className="application-stat-icon clarification-icon">!</span>
            <span className="application-stat-label">Action Required</span>
          </div>
          <strong>{counts.clarification}</strong>
          <p>Needs your attention</p>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-top">
            <span className="application-stat-icon approved-icon">✓</span>
            <span className="application-stat-label">Approved</span>
          </div>
          <strong>{counts.approved}</strong>
          <p>Approved applications</p>
        </div>
      </section>

      <section className="application-list-section">
        <div className="application-list-heading">
          <div>
            <h2>All Applications</h2>
            <p>View the status and progress of your submissions.</p>
          </div>
          <span className="application-record-count">
            {filteredApplications.length} record
            {filteredApplications.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="application-filters">
          <div className="application-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search by name, ID, or type..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search applications"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Clarification Required">
              Clarification Required
            </option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            aria-label="Filter by application type"
          >
            <option value="All">All types</option>
            {applicationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            className="application-reset-btn"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setTypeFilter("All");
            }}
          >
            Reset
          </button>
        </div>

        <div className="application-table-wrapper">
          <table className="application-table">
            <thead>
              <tr>
                <th>APPLICATION</th>
                <th>TYPE</th>
                <th>SUBMITTED</th>
                <th>DEADLINE</th>
                <th>STATUS</th>
                <th>PROGRESS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <div className="application-name-cell">
                      <strong>{application.title}</strong>
                      <span>{application.id}</span>
                    </div>
                  </td>

                  <td>{application.type}</td>
                  <td>{application.submitted}</td>
                  <td>{application.deadline}</td>

                  <td>
                    <span
                      className={`application-status ${getStatusClass(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td>
                    <div className="application-progress-cell">
                      <div
                        className="application-progress-track"
                        role="progressbar"
                        aria-label={`${application.title} progress`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={application.progress}
                      >
                        <div
                          className="application-progress-fill"
                          style={{ width: `${application.progress}%` }}
                        />
                      </div>
                      <span>{application.progress}%</span>
                    </div>
                  </td>

                  <td>
                    <button
                      className="application-view-btn"
                      onClick={() => handleViewApplication(application)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="application-empty-state">
              <span aria-hidden="true">▤</span>
              <h3>No applications found</h3>
              <p>
                Try changing your search or filters, or create a new
                application.
              </p>
              <button
                className="application-primary-btn"
                onClick={openNewApplication}
              >
                Create Application
              </button>
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <div
          className="application-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <section
            className="application-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-modal-title"
          >
            <div className="application-modal-heading">
              <div>
                <p className="application-eyebrow">NEW SUBMISSION</p>
                <h2 id="application-modal-title">Create Application</h2>
                <p>Enter the basic details to create a draft.</p>
              </div>
              <button
                className="application-close-btn"
                onClick={() => setShowModal(false)}
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateApplication}>
              <label htmlFor="application-title">
                Application Title <span>*</span>
              </label>
              <input
                id="application-title"
                type="text"
                placeholder="e.g. Extension of Approval 2027"
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                required
                maxLength={100}
              />

              <label htmlFor="application-type">
                Application Type <span>*</span>
              </label>
              <select
                id="application-type"
                value={form.type}
                onChange={(event) =>
                  setForm({ ...form, type: event.target.value })
                }
                required
              >
                {applicationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <label htmlFor="application-deadline">
                Target Deadline
              </label>
              <input
                id="application-deadline"
                type="date"
                value={form.deadline}
                onChange={(event) =>
                  setForm({ ...form, deadline: event.target.value })
                }
                min={new Date().toISOString().slice(0, 10)}
              />

              <label htmlFor="application-description">
                Description
              </label>
              <textarea
                id="application-description"
                placeholder="Briefly describe the purpose of this application..."
                rows={3}
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                maxLength={500}
              />

              <div className="application-modal-note">
                This creates a local draft. Document upload and official
                submission require backend integration.
              </div>

              <div className="application-modal-actions">
                <button
                  type="button"
                  className="application-secondary-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="application-primary-btn"
                >
                  Create Draft
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedApplication && (
        <div
          className="application-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedApplication(null);
            }
          }}
        >
          <section
            className="application-modal application-details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-details-title"
          >
            <div className="application-modal-heading">
              <div>
                <p className="application-eyebrow">
                  {selectedApplication.id}
                </p>
                <h2 id="application-details-title">
                  {selectedApplication.title}
                </h2>
                <p>{selectedApplication.description || "No description provided."}</p>
              </div>
              <button
                className="application-close-btn"
                onClick={() => setSelectedApplication(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="application-details-grid">
              <div>
                <span>Application Type</span>
                <strong>{selectedApplication.type}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedApplication.status}</strong>
              </div>
              <div>
                <span>Created / Submitted</span>
                <strong>{selectedApplication.submitted}</strong>
              </div>
              <div>
                <span>Target Deadline</span>
                <strong>{selectedApplication.deadline}</strong>
              </div>
            </div>

            <div className="application-details-progress">
              <div>
                <span>Application progress</span>
                <strong>{selectedApplication.progress}%</strong>
              </div>
              <div className="application-progress-track">
                <div
                  className="application-progress-fill"
                  style={{
                    width: `${selectedApplication.progress}%`,
                  }}
                />
              </div>
            </div>

            {selectedApplication.status === "Clarification Required" && (
              <div className="application-modal-note">
                This application requires clarification. Review the
                requirements in the official portal before responding.
              </div>
            )}

            <div className="application-modal-actions">
              <button
                className="application-secondary-btn"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>

              {selectedApplication.status === "Draft" && (
                <button
                  className="application-primary-btn"
                  onClick={() =>
                    handleSubmitApplication(selectedApplication.id)
                  }
                >
                  Mark as Submitted
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Application;
