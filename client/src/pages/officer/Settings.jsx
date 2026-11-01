import "../../App.css";
import "./Settings.css";
import { useState } from "react";

function Settings() {
  const [profile, setProfile] = useState({
    name: "Admin Officer",
    email: "admin@aicte-india.org",
    designation: "Administrative Officer",
    department: "Approval Bureau",
    phone: "9876543210",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    deadlineReminders: true,
    applicationUpdates: true,
    complianceAlerts: true,
    darkMode: false,
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;

    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setMessage("Profile changes saved in this prototype.");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (!password.current || !password.new || !password.confirm) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (password.new.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (password.new !== password.confirm) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    setMessage("Password validation successful. Backend integration required to update it.");

    setPassword({
      current: "",
      new: "",
      confirm: "",
    });
  };

  return (
    <>
      {/* Welcome Section */}

      <section className="welcomeSection">
        <h2>Settings</h2>
        <p>
          Manage your officer profile, account preferences,
          notifications and security settings.
        </p>
      </section>

      {/* Profile Settings */}

      <section className="settingsSection">
        <div className="settingsHeader">
          <h2>Officer Profile</h2>
          <p>Manage your personal and professional information.</p>
        </div>

        <form onSubmit={handleProfileSave}>

          <div className="profileInfo">
            <div className="profileAvatar">AO</div>

            <div>
              <h3>{profile.name}</h3>
              <p>{profile.designation}</p>
            </div>
          </div>

          <div className="settingsFormGrid">

            <div className="settingsField">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </div>

            <div className="settingsField">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
              />
            </div>

            <div className="settingsField">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={profile.designation}
                onChange={handleProfileChange}
              />
            </div>

            <div className="settingsField">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleProfileChange}
              />
            </div>

            <div className="settingsField">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
              />
            </div>

          </div>

          <button type="submit" className="settingsSaveButton">
            Save Profile
          </button>

        </form>
      </section>

      {/* Account Preferences */}

      <section className="settingsSection">
        <div className="settingsHeader">
          <h2>Account Preferences</h2>
          <p>Customize your portal experience.</p>
        </div>

        <div className="settingsOption">
          <div>
            <h3>Dark Mode</h3>
            <p>Enable dark appearance for the portal.</p>
          </div>

          <input
            type="checkbox"
            name="darkMode"
            checked={preferences.darkMode}
            onChange={handlePreferenceChange}
          />
        </div>
      </section>

      {/* Notification Preferences */}

      <section className="settingsSection">
        <div className="settingsHeader">
          <h2>Notification Preferences</h2>
          <p>Choose which notifications you want to receive.</p>
        </div>

        {[
          {
            name: "emailNotifications",
            title: "Email Notifications",
            description: "Receive important updates through email.",
          },
          {
            name: "deadlineReminders",
            title: "Deadline Reminders",
            description: "Get reminders about upcoming and overdue deadlines.",
          },
          {
            name: "applicationUpdates",
            title: "Application Updates",
            description: "Receive alerts about application submissions and decisions.",
          },
          {
            name: "complianceAlerts",
            title: "Compliance Alerts",
            description: "Get updates about institutional compliance activities.",
          },
        ].map((item) => (
          <div className="settingsOption" key={item.name}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <input
              type="checkbox"
              name={item.name}
              checked={preferences[item.name]}
              onChange={handlePreferenceChange}
            />
          </div>
        ))}
      </section>

      {/* Security Settings */}

      <section className="settingsSection">
        <div className="settingsHeader">
          <h2>Security Settings</h2>
          <p>Update your account password.</p>
        </div>

        <form onSubmit={handlePasswordChange}>

          <div className="settingsPasswordForm">

            <div className="settingsField">
              <label>Current Password</label>
              <input
                type="password"
                value={password.current}
                onChange={(e) =>
                  setPassword({ ...password, current: e.target.value })
                }
                placeholder="Enter current password"
              />
            </div>

            <div className="settingsField">
              <label>New Password</label>
              <input
                type="password"
                value={password.new}
                onChange={(e) =>
                  setPassword({ ...password, new: e.target.value })
                }
                placeholder="Enter new password"
              />
            </div>

            <div className="settingsField">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={password.confirm}
                onChange={(e) =>
                  setPassword({ ...password, confirm: e.target.value })
                }
                placeholder="Confirm new password"
              />
            </div>

          </div>

          <button type="submit" className="settingsSaveButton">
            Update Password
          </button>

        </form>
      </section>

      {/* Feedback Message */}

      {message && (
        <div className="settingsMessage">
          {message}
        </div>
      )}
    </>
  );
}

export default Settings;