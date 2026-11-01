
import { useMemo, useState } from "react";
import "./Notifications.css";

const initialNotifications = [
  {
    id: 1,
    type: "Application",
    title: "Application status updated",
    message:
      "Your application APP-2026-1042 has moved to the review stage. Check the application details for the latest status.",
    date: "2026-10-31T10:30:00",
    read: false,
    priority: "High",
    reference: "APP-2026-1042",
  },
  {
    id: 2,
    type: "Clarification",
    title: "Clarification requested",
    message:
      "Additional information has been requested for your faculty qualification records. Review the request and prepare a response.",
    date: "2026-10-30T14:15:00",
    read: false,
    priority: "High",
    reference: "APP-2026-1038",
  },
  {
    id: 3,
    type: "Compliance",
    title: "Compliance deadline approaching",
    message:
      "Your faculty qualification records have an upcoming compliance deadline. Review the requirements and supporting documents.",
    date: "2026-10-30T09:00:00",
    read: false,
    priority: "Medium",
    reference: "CMP-002",
  },
  {
    id: 4,
    type: "Document",
    title: "Document validity reminder",
    message:
      "Review the validity of your institution's fire safety certificate and update the supporting records if required.",
    date: "2026-10-29T11:45:00",
    read: true,
    priority: "High",
    reference: "CMP-003",
  },
  {
    id: 5,
    type: "Application",
    title: "Application submitted successfully",
    message:
      "Your application APP-2026-1038 has been recorded in the system. Keep the reference number for future correspondence.",
    date: "2026-10-28T16:20:00",
    read: true,
    priority: "Low",
    reference: "APP-2026-1038",
  },
  {
    id: 6,
    type: "Compliance",
    title: "Compliance record needs review",
    message:
      "Review the laboratory equipment inventory and ensure the relevant supporting records are up to date.",
    date: "2026-10-27T12:10:00",
    read: false,
    priority: "Medium",
    reference: "CMP-006",
  },
  {
    id: 7,
    type: "System",
    title: "Institution profile reminder",
    message:
      "Check your institution profile and confirm that contact details and authorised representative information are current.",
    date: "2026-10-25T09:30:00",
    read: true,
    priority: "Low",
    reference: "PROFILE",
  },
  {
    id: 8,
    type: "Application",
    title: "Application received",
    message:
      "The system has recorded your application submission. Further updates will appear in your notifications.",
    date: "2026-10-24T15:00:00",
    read: true,
    priority: "Low",
    reference: "APP-2026-1029",
  },
];

const notificationCategories = [
  "All",
  "Application",
  "Clarification",
  "Compliance",
  "Document",
  "System",
];

function formatNotificationDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getNotificationIcon(type) {
  switch (type) {
    case "Application":
      return "▤";
    case "Clarification":
      return "?";
    case "Compliance":
      return "✓";
    case "Document":
      return "▧";
    case "System":
      return "⚙";
    default:
      return "•";
  }
}

function getNotificationClass(type) {
  return type.toLowerCase().replace(/\s+/g, "-");
}

function Notification() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [notice, setNotice] = useState("");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const readCount = notifications.length - unreadCount;

  const filteredNotifications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return notifications
      .filter((notification) => {
        const matchesCategory =
          activeCategory === "All" ||
          notification.type === activeCategory;

        const matchesReadStatus =
          activeFilter === "All" ||
          (activeFilter === "Unread" && !notification.read) ||
          (activeFilter === "Read" && notification.read);

        const matchesSearch =
          notification.title.toLowerCase().includes(query) ||
          notification.message.toLowerCase().includes(query) ||
          notification.reference.toLowerCase().includes(query) ||
          notification.type.toLowerCase().includes(query);

        return (
          matchesCategory && matchesReadStatus && matchesSearch
        );
      })
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }, [notifications, activeCategory, activeFilter, searchTerm]);

  function markAsRead(id) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );

    setNotice("Notification marked as read.");
  }

  function markAsUnread(id) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: false }
          : notification
      )
    );

    setNotice("Notification marked as unread.");
  }

  function markAllAsRead() {
    if (unreadCount === 0) {
      setNotice("There are no unread notifications.");
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

    setNotice("All notifications have been marked as read.");
  }

  function clearReadNotifications() {
    if (readCount === 0) {
      setNotice("There are no read notifications to clear.");
      return;
    }

    setNotifications((current) =>
      current.filter((notification) => !notification.read)
    );

    setNotice("Read notifications have been cleared.");
  }

  function resetFilters() {
    setSearchTerm("");
    setActiveCategory("All");
    setActiveFilter("All");
  }

  return (
    <div className="notification-page">
      <header className="notification-heading">
        <div>
          <p className="notification-eyebrow">INSTITUTION PORTAL</p>
          <h1>Notifications</h1>
          <p className="notification-subtitle">
            Stay informed about application updates, clarification
            requests, compliance deadlines, and document reminders.
          </p>
        </div>

        <div className="notification-heading-count">
          <span className="notification-count-icon">♧</span>
          <div>
            <strong>{unreadCount}</strong>
            <span>Unread notifications</span>
          </div>
        </div>
      </header>

      {notice && (
        <div className="notification-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <section
        className="notification-stats"
        aria-label="Notification summary"
      >
        <article className="notification-stat-card">
          <div className="notification-stat-icon all-icon">▤</div>
          <div>
            <span>Total Notifications</span>
            <strong>{notifications.length}</strong>
          </div>
        </article>

        <article className="notification-stat-card">
          <div className="notification-stat-icon unread-icon">●</div>
          <div>
            <span>Unread</span>
            <strong>{unreadCount}</strong>
          </div>
        </article>

        <article className="notification-stat-card">
          <div className="notification-stat-icon read-icon">✓</div>
          <div>
            <span>Read</span>
            <strong>{readCount}</strong>
          </div>
        </article>
      </section>

      <section className="notification-content">
        <div className="notification-toolbar">
          <div className="notification-toolbar-title">
            <div>
              <h2>Recent Notifications</h2>
              <p>
                Review important updates from your institution portal.
              </p>
            </div>
            <span className="notification-result-count">
              {filteredNotifications.length} shown
            </span>
          </div>

          <div className="notification-toolbar-actions">
            <button
              type="button"
              className="notification-secondary-btn"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>

            <button
              type="button"
              className="notification-clear-btn"
              onClick={clearReadNotifications}
            >
              Clear read
            </button>
          </div>
        </div>

        <div className="notification-search-row">
          <label className="notification-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search notifications"
            />
          </label>

          <label className="notification-filter-label">
            <span>Show</span>
            <select
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              aria-label="Filter by read status"
            >
              <option value="All">All notifications</option>
              <option value="Unread">Unread only</option>
              <option value="Read">Read only</option>
            </select>
          </label>
        </div>

        <div
          className="notification-category-tabs"
          role="group"
          aria-label="Filter notification category"
        >
          {notificationCategories.map((category) => {
            const count =
              category === "All"
                ? notifications.length
                : notifications.filter(
                    (notification) => notification.type === category
                  ).length;

            return (
              <button
                key={category}
                type="button"
                className={`notification-category-tab ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
                <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="notification-list">
          {filteredNotifications.map((notification) => (
            <article
              key={notification.id}
              className={`notification-item ${
                notification.read ? "is-read" : "is-unread"
              }`}
            >
              <div
                className={`notification-type-icon ${getNotificationClass(
                  notification.type
                )}`}
                aria-hidden="true"
              >
                {getNotificationIcon(notification.type)}
              </div>

              <div className="notification-item-body">
                <div className="notification-item-top">
                  <div className="notification-item-title">
                    {!notification.read && (
                      <span
                        className="notification-unread-dot"
                        aria-label="Unread"
                      />
                    )}

                    <h3>{notification.title}</h3>
                  </div>

                  <span
                    className={`notification-priority ${notification.priority.toLowerCase()}`}
                  >
                    {notification.priority}
                  </span>
                </div>

                <p className="notification-message">
                  {notification.message}
                </p>

                <div className="notification-item-meta">
                  <span
                    className={`notification-type-label ${getNotificationClass(
                      notification.type
                    )}`}
                  >
                    {notification.type}
                  </span>

                  <span className="notification-reference">
                    Ref: {notification.reference}
                  </span>

                  <time dateTime={notification.date}>
                    {formatNotificationDate(notification.date)}
                  </time>
                </div>
              </div>

              <div className="notification-item-actions">
                {notification.read ? (
                  <button
                    type="button"
                    onClick={() => markAsUnread(notification.id)}
                    aria-label={`Mark "${notification.title}" as unread`}
                  >
                    Mark unread
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    aria-label={`Mark "${notification.title}" as read`}
                  >
                    Mark read
                  </button>
                )}
              </div>
            </article>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="notification-empty">
              <span aria-hidden="true">▤</span>
              <h3>No notifications found</h3>
              <p>
                No notifications match your current search and filters.
                Try changing your selection.
              </p>
              <button
                type="button"
                className="notification-secondary-btn"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <footer className="notification-footer">
          <span>
            Showing {filteredNotifications.length} of {notifications.length}{" "}
            notifications
          </span>
          <span>VisionX · Institution Updates</span>
        </footer>
      </section>

      <p className="notification-demo-note">
        <strong>Prototype:</strong> These are sample notifications. Read
        states and clearing read notifications are managed in frontend
        state only and are not saved to a database.
      </p>
    </div>
  );
}

export default Notification;
