import "../../App.css";
import "./Notifications.css";
import { useState } from "react";

function Notifications() {
  const [filter, setFilter] = useState("All");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Application Submitted",
      message:
        "NIT Patna has submitted a new approval application for review.",
      category: "Application",
      date: "01 Nov 2026",
      time: "10:30 AM",
      read: false,
    },
    {
      id: 2,
      title: "Compliance Deadline Approaching",
      message:
        "Infrastructure compliance documents for BIT Mesra are due soon.",
      category: "Compliance",
      date: "01 Nov 2026",
      time: "09:15 AM",
      read: false,
    },
    {
      id: 3,
      title: "Application Overdue",
      message:
        "The undertaking submission for IIT Madras has crossed its deadline.",
      category: "Overdue",
      date: "31 Oct 2026",
      time: "04:45 PM",
      read: false,
    },
    {
      id: 4,
      title: "Application Approved",
      message:
        "The extension application submitted by BIT Mesra has been approved.",
      category: "Application",
      date: "30 Oct 2026",
      time: "02:20 PM",
      read: true,
    },
    {
      id: 5,
      title: "EVC Schedule Updated",
      message:
        "The evaluation visit schedule for Patna College of Engineering has been updated.",
      category: "EVC",
      date: "29 Oct 2026",
      time: "11:00 AM",
      read: true,
    },
    {
      id: 6,
      title: "Scrutiny Pending",
      message:
        "Faculty qualification documents for IIT Kanpur are awaiting verification.",
      category: "Application",
      date: "28 Oct 2026",
      time: "03:30 PM",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = notifications.filter(
    (notification) => {
      if (filter === "Unread") return !notification.read;
      if (filter === "Read") return notification.read;
      return true;
    }
  );

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <>
      {/* Welcome Section */}

      <section className="welcomeSection">
        <h2>Notifications</h2>
        <p>
          Stay updated with application activities, compliance
          alerts and important deadlines.
        </p>
      </section>

      {/* Notification Summary */}

      <section className="notificationSummary">
        <div>
          <h3>Total Notifications</h3>
          <p>{notifications.length}</p>
        </div>

        <div>
          <h3>Unread Notifications</h3>
          <p>{unreadCount}</p>
        </div>

        <div>
          <h3>Read Notifications</h3>
          <p>{notifications.length - unreadCount}</p>
        </div>
      </section>

      {/* Notification List */}

      <section className="notificationSection">

        <div className="sectionHeader">
          <h2>Recent Notifications</h2>

          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All as Read
          </button>
        </div>

        {/* Filters */}

        <div className="notificationFilters">
          {["All", "Unread", "Read"].map((item) => (
            <button
              key={item}
              className={filter === item ? "activeFilter" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
              {item === "Unread" && ` (${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Notification Cards */}

        <div className="notificationList">

          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                className={`notificationCard ${
                  notification.read ? "readNotification" : "unreadNotification"
                }`}
                key={notification.id}
              >
                <div className="notificationContent">

                  <div className="notificationTop">
                    <h3>{notification.title}</h3>

                    {!notification.read && (
                      <span className="unreadDot"></span>
                    )}
                  </div>

                  <p>{notification.message}</p>

                  <div className="notificationMeta">
                    <span className={`notificationCategory ${notification.category.toLowerCase()}`}>
                      {notification.category}
                    </span>

                    <span>
                      {notification.date} • {notification.time}
                    </span>
                  </div>

                </div>

                {!notification.read && (
                  <button
                    className="markReadButton"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </button>
                )}

              </div>
            ))
          ) : (
            <div className="notificationEmpty">
              <h3>No notifications found</h3>
              <p>There are no notifications in this category.</p>
            </div>
          )}

        </div>

      </section>
    </>
  );
}

export default Notifications;