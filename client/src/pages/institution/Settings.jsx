
import { useState } from "react";
import "./Settings.css";

const initialSettings = {
  institutionName: "Vision Institute of Technology",
  aicteId: "AICTE/BIH/2026/001",
  email: "admin@visioninstitute.edu",
  phone: "9876543210",
  address: "Patna, Bihar, India",
  contactPerson: "Institution Administrator",
  applicationAlerts: true,
  complianceAlerts: true,
  deadlineAlerts: true,
  emailNotifications: true,
  sessionTimeout: "30",
};

function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("success");

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFeedback("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!settings.institutionName.trim()) {
      setFeedbackType("error");
      setFeedback("Please enter the institution name.");
      return;
    }

    if (!settings.email.trim()) {
      setFeedbackType("error");
      setFeedback("Please enter an institutional email address.");
      return;
    }

    setFeedbackType("success");
    setFeedback("Settings saved successfully.");
  };

  return (
    <div className="institutionSettings">
      <div className="settingsPageHeader">
        <div>
          <span className="settingsEyebrow">INSTITUTION PORTAL</span>
          <h1>Settings</h1>
          <p>
            Manage your institution profile, notifications, and preferences.
          </p>
        </div>

        <div className="settingsAccountBadge">
          <span className="settingsAccountDot" />
          Institution Account
        </div>
      </div>

      {feedback && (
        <div
          className={`settingsFeedback ${feedbackType}`}
          role="status"
          aria-live="polite"
        >
          <span aria-hidden="true">
            {feedbackType === "error" ? "!" : "✓"}
          </span>
          {feedback}
        </div>
      )}

      <form onSubmit={handleSave}>
        <section className="settingsSection">
          <div className="settingsSectionHeading">
            <div>
              <h2>Institution Profile</h2>
              <p>
                Maintain the contact and identification details associated
                with your institution.
              </p>
            </div>
          </div>

          <div className="settingsFormGrid">
            <div className="settingsField settingsFieldFull">
              <label htmlFor="institutionName">Institution name *</label>
              <input
                id="institutionName"
                name="institutionName"
                type="text"
                value={settings.institutionName}
                onChange={updateField}
                placeholder="Enter institution name"
                required
              />
            </div>

            <div className="settingsField">
              <label htmlFor="aicteId">AICTE institution ID</label>
              <input
                id="aicteId"
                name="aicteId"
                type="text"
                value={settings.aicteId}
                onChange={updateField}
                placeholder="Enter institution ID"
              />
            </div>

            <div className="settingsField">
              <label htmlFor="contactPerson">Primary contact person</label>
              <input
                id="contactPerson"
                name="contactPerson"
                type="text"
                value={settings.contactPerson}
                onChange={updateField}
                placeholder="Enter contact person's name"
              />
            </div>

            <div className="settingsField">
              <label htmlFor="email">Institutional email *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={updateField}
                placeholder="admin@institution.edu"
                required
              />
            </div>

            <div className="settingsField">
              <label htmlFor="phone">Contact number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={settings.phone}
                onChange={updateField}
                placeholder="Enter contact number"
              />
            </div>

            <div className="settingsField settingsFieldFull">
              <label htmlFor="address">Institution address</label>
              <textarea
                id="address"
                name="address"
                value={settings.address}
                onChange={updateField}
                placeholder="Enter the institution address"
                rows={3}
              />
            </div>
          </div>
        </section>

        <section className="settingsSection">
          <div className="settingsSectionHeading">
            <div>
              <h2>Notification Preferences</h2>
              <p>
                Choose which institutional alerts you want to receive.
              </p>
            </div>
          </div>

          <div className="settingsPreferenceList">
            <label className="settingsPreferenceRow">
              <div>
                <strong>Application updates</strong>
                <span>
                  Receive alerts when application statuses change.
                </span>
              </div>
              <input
                type="checkbox"
                name="applicationAlerts"
                checked={settings.applicationAlerts}
                onChange={updateField}
              />
            </label>

            <label className="settingsPreferenceRow">
              <div>
                <strong>Compliance notifications</strong>
                <span>
                  Receive reminders about compliance records and missing
                  documents.
                </span>
              </div>
              <input
                type="checkbox"
                name="complianceAlerts"
                checked={settings.complianceAlerts}
                onChange={updateField}
              />
            </label>

            <label className="settingsPreferenceRow">
              <div>
                <strong>Deadline reminders</strong>
                <span>
                  Receive reminders about approaching submission deadlines.
                </span>
              </div>
              <input
                type="checkbox"
                name="deadlineAlerts"
                checked={settings.deadlineAlerts}
                onChange={updateField}
              />
            </label>

            <label className="settingsPreferenceRow">
              <div>
                <strong>Email notifications</strong>
                <span>
                  Receive important updates by email.
                </span>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={updateField}
              />
            </label>
          </div>
        </section>

        <section className="settingsSection">
          <div className="settingsSectionHeading">
            <div>
              <h2>Security & Session</h2>
              <p>
                Choose how long your account stays active while you are away.
              </p>
            </div>
          </div>

          <div className="settingsSecurityRow">
            <div>
              <strong>Session timeout preference</strong>
              <p>
                Select the preferred inactivity duration before a session
                should expire.
              </p>
            </div>

            <div className="settingsSessionSelect">
              <label htmlFor="sessionTimeout">Timeout</label>
              <select
                id="sessionTimeout"
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={updateField}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
          </div>

        </section>

        <div className="settingsActions">
          <button type="submit" className="settingsSaveButton">
            Save settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
