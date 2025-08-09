import React, { useState } from 'react';
import axios from 'axios';
import './Post.css';

const Post = ({ post, refreshPosts }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editPhoto, setEditPhoto] = useState(null);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const isOwner = post.user._id === userId;
  const hasLiked = post.likes.includes(userId);

  const handleLike = async () => {
    try {
      const url = `http://localhost:5000/api/posts/${post._id}/${hasLiked ? 'unlike' : 'like'}`;
      await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
      refreshPosts();
    } catch (error) {
      console.error('Failed to update like', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`, { headers: { Authorization: `Bearer ${token}` } });
      refreshPosts();
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(`http://localhost:5000/api/posts/${post._id}/comment`, { text: commentText }, { headers: { Authorization: `Bearer ${token}` } });
      setCommentText('');
      refreshPosts();
      setShowComments(true);
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(post.content);
    setEditPhoto(null);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditPhoto(e.target.files[0]);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('content', editContent);
      if (editPhoto) {
        formData.append('photo', editPhoto);
      }
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsEditing(false);
      setEditPhoto(null);
      refreshPosts();
    } catch (error) {
      console.error('Failed to update post', error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user-info">
          <strong>{post.user.name}</strong> <span className="post-date">{new Date(post.createdAt).toLocaleString()}</span>
        </div>
        {isOwner && !isEditing && (
          <>
            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </>
        )}
        {isOwner && isEditing && (
          <>
            <button className="save-btn" onClick={handleSaveEdit}>Save</button>
            <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
          </>
        )}
      </div>
      <div className="post-content">
        {!isEditing && (
          <>
            <p>{post.content}</p>
            {post.photo && <img src={`http://localhost:5000/uploads/${post.photo}`} alt="Post" className="post-photo" />}
          </>
        )}
        {isEditing && (
          <>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
              cols={50}
            />
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {editPhoto && <p>New photo selected: {editPhoto.name}</p>}
          </>
        )}
      </div>
      <div className="post-actions">
        <button className={`like-btn ${hasLiked ? 'liked' : ''}`} onClick={handleLike}>
          {hasLiked ? 'Unlike' : 'Like'} ({post.likes.length})
        </button>
        <button className="comment-toggle-btn" onClick={() => setShowComments(!showComments)}>
          Comments ({post.comments.length})
        </button>
      </div>
      {showComments && (
        <div className="comments-section">
          {post.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <strong>{comment.user.name}</strong>: {comment.text}
            </div>
          ))}
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
