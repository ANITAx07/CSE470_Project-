import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotificationsPage.css';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) fetchNotifications();
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
      setNotifications(res.data);
    } catch (err) {
      alert('Failed to fetch notifications');
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/mark-read/${notificationId}`);
      setNotifications(notifications.map(n => n._id === notificationId ? { ...n, read: true } : n));
    } catch (err) {
      alert('Failed to mark notification as read');
    }
  };

  return (
    <div className="notifications-page">
      <h2>Your Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              onClick={() => {
                if (!notification.read) markAsRead(notification._id);
                // Optionally navigate to related page
              }}
            >
              <p>{notification.message}</p>
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
