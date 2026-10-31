
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const sampleApplications = [
  {
    id: "AICTE-2026-001",
    name: "Extension of Approval",
    submitted: "2026-10-25",
    status: "Approved",
    updated: "2026-10-30",
  },
  {
    id: "AICTE-2026-002",
    name: "New Course Approval",
    submitted: "2026-10-21",
    status: "Under Review",
    updated: "2026-10-29",
  },
  {
    id: "AICTE-2026-003",
    name: "Intake Approval",
    submitted: "2026-10-14",
    status: "Pending",
    updated: "2026-10-27",
  },
  {
    id: "AICTE-2026-004",
    name: "Faculty Information Update",
    submitted: "2026-09-28",
    status: "Approved",
    updated: "2026-10-24",
  },
  {
    id: "AICTE-2026-005",
    name: "Infrastructure Compliance",
    submitted: "2026-09-17",
    status: "Clarification Required",
    updated: "2026-10-22",
  },
];

const deadlines = [
  {
    title: "Faculty details verification",
    dueDate: "2026-11-05",
    category: "Compliance",
    priority: "High",
  },
  {
    title: "Infrastructure documents",
    dueDate: "2026-11-12",
    category: "Documents",
    priority: "Medium",
  },
  {
    title: "Annual compliance submission",
    dueDate: "2026-11-20",
    category: "Compliance",
    priority: "Medium",
  },
];

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const statusClass = (status) => {
  switch (status) {
    case "Approved":
      return "dashboardStatusApproved";
    case "Under Review":
      return "dashboardStatusReview";
    case "Pending":
      return "dashboardStatusPending";
    case "Clarification Required":
      return "dashboardStatusClarification";
    case "Rejected":
      return "dashboardStatusRejected";
    default:
      return "";
  }
};

function Dashboard() {
  const [applications] = useState(sampleApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch = [
        application.id,
        application.name,
        application.status,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const total = applications.length;
  const approved = applications.filter(
    (item) => item.status === "Approved"
  ).length;
  const underReview = applications.filter(
    (item) => item.status === "Under Review"
  ).length;
  const attentionRequired = applications.filter(
    (item) =>
      item.status === "Pending" ||
      item.status === "Clarification Required"
  ).length;

  const statusBreakdown = [
    {
      label: "Approved",
      count: approved,
      colorClass: "dashboardBarApproved",
    },
    {
      label: "Under Review",
      count: underReview,
      colorClass: "dashboardBarReview",
    },
    {
      label: "Pending",
      count: applications.filter((item) => item.status === "Pending").length,
      colorClass: "dashboardBarPending",
    },
    {
      label: "Clarification Required",
      count: applications.filter(
        (item) => item.status === "Clarification Required"
      ).length,
      colorClass: "dashboardBarClarification",
    },
    {
      label: "Rejected",
      count: applications.filter((item) => item.status === "Rejected").length,
      colorClass: "dashboardBarRejected",
    },
  ];

  return (
    <div className="institutionDashboard">
      <section className="dashboardWelcome">
        <div>
          <span className="dashboardEyebrow">INSTITUTION PORTAL</span>
          <h1>Welcome back!</h1>
          <p>
            Track your AICTE applications, monitor compliance, and keep
            important deadlines on schedule.
          </p>
        </div>

        <Link
          to="/institution/applications"
          className="dashboardPrimaryButton"
        >
          <span aria-hidden="true">＋</span>
          View Applications
        </Link>
      </section>

      <section
        className="dashboardStats"
        aria-label="Institution application statistics"
      >
        <article className="dashboardStatCard dashboardStatTotal">
          <div className="dashboardStatHeading">
            <span>Total Applications</span>
            <span className="dashboardStatIcon" aria-hidden="true">▤</span>
          </div>
          <strong>{total}</strong>
          <p>All tracked applications</p>
        </article>

        <article className="dashboardStatCard dashboardStatReview">
          <div className="dashboardStatHeading">
            <span>Under Review</span>
            <span className="dashboardStatIcon" aria-hidden="true">◷</span>
          </div>
          <strong>{underReview}</strong>
          <p>Currently being reviewed</p>
        </article>

        <article className="dashboardStatCard dashboardStatApproved">
          <div className="dashboardStatHeading">
            <span>Approved</span>
            <span className="dashboardStatIcon" aria-hidden="true">✓</span>
          </div>
          <strong>{approved}</strong>
          <p>Successfully approved</p>
        </article>

        <article className="dashboardStatCard dashboardStatAttention">
          <div className="dashboardStatHeading">
            <span>Needs Attention</span>
            <span className="dashboardStatIcon" aria-hidden="true">!</span>
          </div>
          <strong>{attentionRequired}</strong>
          <p>Pending or clarification required</p>
        </article>
      </section>

      <section className="dashboardMainGrid">
        <article className="dashboardPanel dashboardApplicationOverview">
          <div className="dashboardPanelHeader">
            <div>
              <h2>Application Overview</h2>
              <p>Distribution by current application status</p>
            </div>
            <span className="dashboardMiniBadge">Live preview</span>
          </div>

          <div className="dashboardOverviewTotal">
            <strong>{total}</strong>
            <span>Sample applications</span>
          </div>

          <div className="dashboardStatusBars">
            {statusBreakdown.map((item) => (
              <div className="dashboardStatusBarRow" key={item.label}>
                <div className="dashboardStatusBarLabel">
                  <span>{item.label}</span>
                  <strong>{item.count}</strong>
                </div>
                <div
                  className="dashboardBarTrack"
                  role="progressbar"
                  aria-label={item.label}
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-valuenow={item.count}
                >
                  <span
                    className={item.colorClass}
                    style={{
                      width: `${total ? (item.count / total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboardPanel dashboardCompliancePanel">
          <div className="dashboardPanelHeader">
            <div>
              <h2>Compliance Snapshot</h2>
              <p>Items requiring institutional attention</p>
            </div>
            <span className="dashboardComplianceIcon" aria-hidden="true">
              ✓
            </span>
          </div>

          <div className="dashboardComplianceItem">
            <span className="dashboardComplianceDot dashboardDotWarning" />
            <div>
              <strong>Faculty details</strong>
              <p>Verify submitted faculty information</p>
            </div>
            <span className="dashboardComplianceTag">Review</span>
          </div>

          <div className="dashboardComplianceItem">
            <span className="dashboardComplianceDot dashboardDotDanger" />
            <div>
              <strong>Infrastructure documents</strong>
              <p>Check document completeness and validity</p>
            </div>
            <span className="dashboardComplianceTag">Action</span>
          </div>

          <div className="dashboardComplianceItem">
            <span className="dashboardComplianceDot dashboardDotSuccess" />
            <div>
              <strong>Institution profile</strong>
              <p>Keep institutional contact details updated</p>
            </div>
            <span className="dashboardComplianceTag">Routine</span>
          </div>

          <Link
            to="/institution/compliance"
            className="dashboardTextLink"
          >
            View compliance details <span aria-hidden="true">→</span>
          </Link>
        </article>
      </section>

      <section className="dashboardPanel dashboardRecentApplications">
        <div className="dashboardPanelHeader dashboardRecentHeader">
          <div>
            <h2>Recent Applications</h2>
            <p>Search and review your institution's application records.</p>
          </div>
          <Link
            to="/institution/applications"
            className="dashboardTextLink"
          >
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="dashboardApplicationFilters">
          <div className="dashboardSearchField">
            <label htmlFor="dashboardSearch">Search applications</label>
            <input
              id="dashboardSearch"
              type="search"
              placeholder="Search ID, name or status..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="dashboardFilterField">
            <label htmlFor="dashboardStatusFilter">Filter by status</label>
            <select
              id="dashboardStatusFilter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Approved">Approved</option>
              <option value="Under Review">Under Review</option>
              <option value="Pending">Pending</option>
              <option value="Clarification Required">
                Clarification Required
              </option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="dashboardTableWrapper">
          <table className="dashboardTable">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Application Name</th>
                <th>Submitted On</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <span className="dashboardApplicationId">
                      {application.id}
                    </span>
                  </td>
                  <td>{application.name}</td>
                  <td>{formatDate(application.submitted)}</td>
                  <td>
                    <span
                      className={`dashboardStatusBadge ${statusClass(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td>{formatDate(application.updated)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="dashboardEmptyState">
              <span aria-hidden="true">⌕</span>
              <h3>No matching applications</h3>
              <p>Try another search term or select a different status.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="dashboardTableFooter">
          Showing {filteredApplications.length} of {applications.length} sample
          applications
        </div>
      </section>

      <section className="dashboardDeadlinesSection">
        <div className="dashboardPanelHeader">
          <div>
            <h2>Upcoming Deadlines</h2>
            <p>Important dates to keep on your institutional calendar.</p>
          </div>
          <span className="dashboardDeadlineIcon" aria-hidden="true">◷</span>
        </div>

        <div className="dashboardDeadlinesGrid">
          {deadlines.map((deadline) => (
            <article className="dashboardDeadlineCard" key={deadline.title}>
              <div className="dashboardDeadlineTop">
                <span className="dashboardDeadlineCategory">
                  {deadline.category}
                </span>
                <span
                  className={`dashboardPriority dashboardPriority${deadline.priority}`}
                >
                  {deadline.priority} priority
                </span>
              </div>
              <h3>{deadline.title}</h3>
              <p className="dashboardDeadlineDate">
                <span aria-hidden="true">▣</span>
                Due {formatDate(deadline.dueDate)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboardQuickLinks">
        <div>
          <h2>Quick Access</h2>
          <p>Navigate to frequently used institution features.</p>
        </div>

        <div className="dashboardQuickLinkGrid">
          <Link to="/institution/notifications">
            <span aria-hidden="true">♧</span>
            <div>
              <strong>Notifications</strong>
              <small>Review alerts and updates</small>
            </div>
            <span className="dashboardQuickArrow" aria-hidden="true">→</span>
          </Link>

          <Link to="/institution/reports">
            <span aria-hidden="true">▥</span>
            <div>
              <strong>Reports</strong>
              <small>Review application reports</small>
            </div>
            <span className="dashboardQuickArrow" aria-hidden="true">→</span>
          </Link>

          <Link to="/institution/settings">
            <span aria-hidden="true">⚙</span>
            <div>
              <strong>Settings</strong>
              <small>Manage institution preferences</small>
            </div>
            <span className="dashboardQuickArrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <p className="dashboardPrototypeNote">
        <strong>Prototype notice:</strong> Statistics, applications, and
        deadlines are illustrative sample data. Connect your backend to
        display actual institutional records.
      </p>
    </div>
  );
}

export default Dashboard;
