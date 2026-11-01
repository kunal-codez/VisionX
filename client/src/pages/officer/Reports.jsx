import "./Reports.css";

function Reports() {
  const applicationStats = [
    { label: "Total Applications", value: 240, className: "reportTotal" },
    { label: "Approved", value: 180, className: "reportApproved" },
    { label: "Pending", value: 30, className: "reportPending" },
    { label: "Rejected", value: 10, className: "reportRejected" },
  ];

  const monthlyData = [
    { month: "May", applications: 25 },
    { month: "Jun", applications: 35 },
    { month: "Jul", applications: 42 },
    { month: "Aug", applications: 30 },
    { month: "Sep", applications: 48 },
    { month: "Oct", applications: 60 },
  ];

  const institutionData = [
    {
      name: "NIT Patna",
      total: 78,
      approved: 62,
      pending: 10,
      rejected: 6,
    },
    {
      name: "BIT Mesra",
      total: 62,
      approved: 48,
      pending: 9,
      rejected: 5,
    },
    {
      name: "IIT Madras",
      total: 54,
      approved: 42,
      pending: 8,
      rejected: 4,
    },
    {
      name: "IIT Kanpur",
      total: 46,
      approved: 28,
      pending: 12,
      rejected: 6,
    },
  ];

  const complianceData = [
    { label: "Compliant", value: 75, className: "compliantBar" },
    { label: "Pending", value: 15, className: "pendingBar" },
    { label: "Overdue", value: 10, className: "overdueBar" },
  ];

  return (
    <>
      {/* Welcome Section */}

      <section className="welcomeSection">
        <h2>Reports & Analytics</h2>
        <p>
          Analyse application performance, approval statistics
          and institutional compliance across AICTE workflows.
        </p>
      </section>

      {/* Report Actions */}

      <section className="reportActions">
        <div>
          <h3>Performance Overview</h3>
          <p>Applications from May to October 2026</p>
        </div>
      </section>

      {/* Application Statistics */}

      <section className="reportStatsGrid">
        {applicationStats.map((stat) => (
          <div className="reportStatCard" key={stat.label}>
            <h3>{stat.label}</h3>
            <p className={stat.className}>{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Monthly Application Trends */}

      <section className="reportSection">
        <div className="sectionHeader">
          <h2>Monthly Application Trends</h2>
          <span>Applications Received</span>
        </div>

        <div className="monthlyChart">
          {monthlyData.map((item) => (
            <div className="chartColumn" key={item.month}>
              <span className="chartValue">{item.applications}</span>

              <div className="chartBarWrapper">
                <div
                  className="chartBar"
                  style={{
                    height: `${(item.applications / 60) * 100}%`,
                  }}
                ></div>
              </div>

              <span className="chartMonth">{item.month}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Institution-wise Report */}

      <section className="reportSection">
        <div className="sectionHeader">
          <h2>Institution-wise Application Summary</h2>
        </div>

        <div className="reportTable">
          <table>
            <thead>
              <tr>
                <th>Institution</th>
                <th>Total</th>
                <th>Approved</th>
                <th>Pending</th>
                <th>Rejected</th>
              </tr>
            </thead>

            <tbody>
              {institutionData.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.total}</td>
                  <td>{item.approved}</td>
                  <td>{item.pending}</td>
                  <td>{item.rejected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Compliance Report */}

      <section className="reportSection">
        <div className="sectionHeader">
          <h2>Compliance Performance</h2>
          <span>Institutional Compliance Overview</span>
        </div>

        <div className="complianceReport">
          {complianceData.map((item) => (
            <div className="complianceReportItem" key={item.label}>
              <div className="complianceReportHeader">
                <span>{item.label}</span>
                <strong>{item.value}%</strong>
              </div>

              <div className="progressTrack">
                <div
                  className={`progressFill ${item.className}`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Reports;