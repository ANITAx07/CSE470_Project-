import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import './MomentsFeed.css';

const MomentsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch posts', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div>Loading moments...</div>;

  return (
    <div className="moments-feed-container">
      <h2>Pet Moments</h2>
      {posts.length === 0 ? (
        <p>No moments posted yet. Be the first to share!</p>
      ) : (
        posts.map(post => (
          <Post key={post._id} post={post} refreshPosts={fetchPosts} />
        ))
      )}
    </div>
  );
};

export default MomentsFeed;
