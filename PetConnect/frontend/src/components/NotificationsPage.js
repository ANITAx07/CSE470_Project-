import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotificationsPage.css';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetchNotifications();

    // Poll every 30 seconds for new notifications
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [userId]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use relative path to avoid CORS issues
      const res = await axios.get('/api/notifications/' + userId);
      setNotifications(res.data);
    } catch (err) {
      setError('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await axios.put('/api/notifications/mark-read/' + notificationId);
      setNotifications(notifications.map(n => n._id === notificationId ? { ...n, read: true } : n));
    } catch (err) {
      alert('Failed to mark notification as read');
    }
  };

  if (!userId) {
    return <p>Please log in to see your notifications.</p>;
  }

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
              className={'notification-item ' + (notification.read ? 'read' : 'unread')}
              onClick={() => {
                if (!notification.read) markAsRead(notification._id);
                if (notification.postId) {
                  navigate(`/post/${notification.postId}`);
                }
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
