import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      {/* Welcome Section */}

      <section className="welcomeSection">
        <h2>Welcome back, Admin</h2>
        <p>
          Here is an overview of your AICTE approval workflows
          and pending activities.
        </p>
      </section>

      {/* Statistics */}

      <section className="statsGrid">
        <div className="statsCard">
          <h3>Total Applications</h3>
          <p>240</p>
        </div>

        <div className="statsCard2">
          <h3>Pending Reviews</h3>
          <p>30</p>
        </div>

        <div className="statsCard3">
          <h3>Approved</h3>
          <p>180</p>
        </div>

        <div className="statsCard4">
          <h3>Overdue</h3>
          <p>10</p>
        </div>
      </section>

      {/* Recent Applications */}

      <section className="recentSection">
        <div className="sectionHeader">
          <h2>Recent Applications</h2>
          <button>View All</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Application</th>
              <th>Institution</th>
              <th>Type</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>APP-2026-001</td>
              <td>NIT Patna</td>
              <td>New Approval</td>
              <td>
                <span className="status review">Under Review</span>
              </td>
              <td>01 Nov 2026</td>
            </tr>

            <tr>
              <td>APP-2026-002</td>
              <td>BIT Mesra</td>
              <td>Extension</td>
              <td>
                <span className="status approved">Approved</span>
              </td>
              <td>03 Nov 2026</td>
            </tr>

            <tr>
              <td>APP-2026-003</td>
              <td>Indian Institute of Technology, Madras</td>
              <td>New Approval</td>
              <td>
                <span className="status pending">Pending</span>
              </td>
              <td>05 Nov 2026</td>
            </tr>

            <tr>
              <td>APP-2026-004</td>
              <td>Patna College of Engineering</td>
              <td>Renewal</td>
              <td>
                <span className="status rejected">Rejected</span>
              </td>
              <td>07 Nov 2026</td>
            </tr>

            <tr>
              <td>APP-2026-005</td>
              <td>Indian Institute of Technology, Kanpur</td>
              <td>Extension</td>
              <td>
                <span className="status review">Under Review</span>
              </td>
              <td>09 Nov 2026</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Upcoming Deadlines */}

      <section className="deadlinesSection">
        <h2>Upcoming Deadlines</h2>

        <div className="deadlinesGrid">

          <div className="deadlineCard">
            <div className="deadlineTop">
              <h3>Faculty Details Verification</h3>
              <span className="status pending">Pending</span>
            </div>
            <p>NIT Patna</p>
            <p>Application: APP-2026-001</p>
            <p>Due: 02 Nov 2026</p>
          </div>

          <div className="deadlineCard">
            <div className="deadlineTop">
              <h3>Infrastructure Compliance Documents</h3>
              <span className="status review">Awaiting Response</span>
            </div>
            <p>BIT Mesra</p>
            <p>Application: APP-2026-002</p>
            <p>Due: 04 Nov 2026</p>
          </div>

          <div className="deadlineCard">
            <div className="deadlineTop">
              <h3>Undertaking Submission</h3>
              <span className="status pending">Not Submitted</span>
            </div>
            <p>Indian Institute of Technology, Madras</p>
            <p>Application: APP-2026-003</p>
            <p>Due: 06 Nov 2026</p>
          </div>

        </div>
      </section>
    </>
  );
}

export default Dashboard;