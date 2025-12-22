import React, { useState, useEffect } from 'react';
import Post from './Post';
import Sidebar from './components/Sidebar';
import api from '../api';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/post');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await api.delete(`/post/${postId}`);
      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== postId));
        alert('Blog post has been deleted successfully');
      } else {
        console.error('Error deleting blog post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const containerStyle = { display: 'flex' };
  const contentStyle = { width: '100%' };
  const headerStyle = { padding: '16px 20px', backgroundColor: 'black', color: 'white', fontFamily: 'Muli' };
  const postsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    padding: '40px 80px',
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentStyle}>
        <div style={headerStyle}>
          <p style={{ textTransform: 'capitalize', fontSize: '18px' }}>welcome, admin</p>
        </div>
        <div style={postsGridStyle}>
          {posts.length > 0 &&
            posts.map((post) => (
              <Post key={post._id} {...post} onDelete={handleDeletePost} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
