import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPost(res.data);
    } catch (err) {
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <Post post={post} refreshPosts={fetchPost} />
    </div>
  );
};

export default PostPage;
