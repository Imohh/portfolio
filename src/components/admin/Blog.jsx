import React, { useState, useEffect } from 'react';
import Post from './Post'
import Sidebar from './components/Sidebar'
import api from '../api'

const Blog = () => {
  const [posts, setPosts] = useState([])

  // const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/post');
        setPosts(response.data); // Axios auto-parses JSON
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


  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="px-5 py-4 bg-black text-white">
          <p className="capitalize text-lg" style={{fontFamily: "Muli"}}>welcome, admin</p>
        </div>
        <div className="grid grid-cols-2  gap-4 px-20 py-10">
          {posts.length > 0 && posts.map(post => (
            <Post {...post} onDelete={handleDeletePost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;