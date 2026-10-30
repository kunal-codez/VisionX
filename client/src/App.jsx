function App(){
  return (
    <div className="appLayout">
      <aside>
        <div className="logo logoName">
          <img src="" alt="VisionX Logo"/>
          <h1>VisionX</h1>
          <p>AICTE Approval Portal</p>
        </div>
        <div className="nav">
          <nav>
            <div>Dashboard</div>
            <div>Applications</div>
            <div>Complicance</div>
            <div>Notification</div>
            <div>Reports</div>
            <div>Settings</div>
          </nav>
          <div className="asideBottom">
            <div className="user">
              <img src="" alt="User profile"/>
              <div className="userInfo">
                <p>Admin User</p>
                <p>AICTE Officer</p>
              </div>
            </div>
            <div className="login">
              <button>Logout</button>
            </div>
          </div>
        </div>
      </aside>
      <main>
        <header>
          <h2>Dashboard</h2>
          <p>Overview of AICTE Approval workflows</p>
          <input type="text" placeholder="Search application"/>
          <button aria-label="Notifications">Notify</button>
          <img src="" alt="profile photo" width="40"/>
        </header>
        <section>
          <h2>Welcome back, Admin</h2>
          <p>
            Here is an overview of your AICTE approval workflows andpending activities.
          </p>
        </section>
        <section className="statsGrid">
          <div className="statsCard">
            <h3>Total Applications</h3>
            <p>240</p>
          </div>
          <div className="statsCard">
            <h3>Pending Reviews</h3>
            <p>30</p>
          </div>
          <div className="statsCard">
            <h3>Approved</h3>
            <p>180</p>
          </div>
          <div className="statsCard">
            <h3>Overdue</h3>
            <p>10</p>
          </div>
        </section>
        <section>
          <h2>Recent Applications</h2>
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
                <td>Under Review</td>
                <td>01 Nov 2026</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h2>Upcoming Deadlines</h2>
            <div>
              <h3>Faculty Details Verification</h3>
              <p>ABC Institute of Technology</p>
              <p>Application: APP-2026-001</p>
              <p>Due: 02 Nov 2026</p>
              <p>Status: Pending Verification</p>
            </div>
            <div>
              <h3>Infrastructure Compliance Documents</h3>
              <p>XYZ College of Engineering</p>
              <p>Application: APP-2026-014</p>
              <p>Due: 04 Nov 2026</p>
              <p>Status: Awaiting Institution Response</p>
            </div>
            <div>
              <h3>Undertaking Submission</h3>
              <p>National Institute of Technology Example</p>
              <p>Application: APP-2026-021</p>
              <p>Due: 06 Nov 2026</p>
              <p>Status: Not Submitted</p>
            </div>
          </section>
      </main>
    </div>
  )
}

export default App;