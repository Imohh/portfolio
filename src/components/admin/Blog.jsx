import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';
import Sidebar from './components/Sidebar';
import api from '../api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/post');
        setPosts(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await api.delete(`/post/${postId}`);
      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        console.error('Error deleting blog post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        right: '-150px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-200px',
        left: '-200px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <Sidebar />
      
      <div style={{ 
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header Section */}
        <div style={{ 
          padding: '24px 32px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ 
                color: '#60a5fa',
                fontSize: '24px',
                fontWeight: '700',
                letterSpacing: '0.05em',
                margin: '0 0 8px 0',
                textShadow: '0 2px 10px rgba(96, 165, 250, 0.3)'
              }}>
                All Blog Posts
              </h1>
              <p style={{
                color: '#94a3b8',
                fontSize: '14px',
                margin: 0,
                fontWeight: '300'
              }}>
                {loading ? 'Loading...' : `${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} found`}
              </p>
            </div>

            <Link 
              to="/admin/create"
              style={{
                textDecoration: 'none'
              }}
            >
              <button style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(16, 185, 129, 0.3)';
              }}
              >
                <span style={{ fontSize: '18px' }}>✨</span>
                Create New Post
              </button>
            </Link>
          </div>

          {/* Search Bar */}
          <div style={{
            marginTop: '20px'
          }}>
            <div style={{
              position: 'relative',
              maxWidth: '500px'
            }}>
              <input
                type="text"
                placeholder="Search posts by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 48px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  e.target.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                }}
              />
              <span style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px'
              }}>
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={{
          padding: '32px',
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
          {loading ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
              gap: '20px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                border: '4px solid rgba(59, 130, 246, 0.2)',
                borderTop: '4px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{
                color: '#94a3b8',
                fontSize: '16px',
                fontWeight: '500',
                letterSpacing: '0.05em'
              }}>
                Loading posts...
              </p>
            </div>
          ) : error ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
              gap: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '8px'
              }}>
                ⚠️
              </div>
              <p style={{
                color: '#ef4444',
                fontSize: '18px',
                fontWeight: '600',
                margin: 0
              }}>
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '12px',
                  padding: '12px 24px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#60a5fa',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(59, 130, 246, 0.2)';
                }}
              >
                Try Again
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '60vh',
              gap: '20px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '8px'
              }}>
                {searchTerm ? '🔍' : '📝'}
              </div>
              <h3 style={{
                color: '#60a5fa',
                fontSize: '24px',
                fontWeight: '700',
                margin: 0
              }}>
                {searchTerm ? 'No posts found' : 'No posts yet'}
              </h3>
              <p style={{
                color: '#94a3b8',
                fontSize: '16px',
                margin: '8px 0 24px 0',
                maxWidth: '400px'
              }}>
                {searchTerm 
                  ? `No posts match "${searchTerm}". Try a different search term.`
                  : 'Start creating amazing content for your blog!'
                }
              </p>
              {!searchTerm && (
                <Link 
                  to="/admin/create"
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  <button style={{
                    padding: '14px 28px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '700',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3)';
                  }}
                  >
                    Create Your First Post
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '28px'
            }}>
              {filteredPosts.map((post) => (
                <Post key={post._id} {...post} onDelete={handleDeletePost} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (max-width: 1200px) {
            .posts-grid {
              grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
            }
          }

          @media (max-width: 768px) {
            .posts-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Blog;