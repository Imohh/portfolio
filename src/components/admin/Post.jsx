import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Post = ({ _id, name, summary, content, coverImage, date, createdAt, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(_id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        style={{
          position: 'relative',
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: isHovered 
            ? '1px solid rgba(59, 130, 246, 0.5)' 
            : '1px solid rgba(59, 130, 246, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isHovered
            ? '0 20px 40px rgba(59, 130, 246, 0.3)'
            : '0 8px 24px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <Link 
          to={`/admin/edit/${_id}`}
          style={{
            display: 'block',
            position: 'relative',
            overflow: 'hidden',
            height: '280px'
          }}
        >
          <img 
            src={coverImage} 
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          
          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 100%)',
            pointerEvents: 'none'
          }} />

          {/* Edit Badge */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(59, 130, 246, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.3s ease'
          }}>
            ✏️ Edit
          </div>
        </Link>

        {/* Content Section */}
        <div style={{
          padding: '24px'
        }}>
          <Link 
            to={`/admin/blog/${_id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <h2 style={{
              color: '#60a5fa',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.02em',
              margin: '0 0 12px 0',
              lineHeight: '1.4',
              transition: 'color 0.3s ease',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textTransform: 'capitalize'
            }}
            onMouseEnter={(e) => e.target.style.color = '#93c5fd'}
            onMouseLeave={(e) => e.target.style.color = '#60a5fa'}
            >
              {name}
            </h2>
          </Link>

          {/* Meta Information */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94a3b8',
              fontSize: '13px',
              fontWeight: '500'
            }}>
              <span style={{ fontSize: '16px' }}>📅</span>
              <span>{date}</span>
            </div>
            
            {createdAt && (
              <>
                <span style={{
                  color: '#475569',
                  fontSize: '12px'
                }}>•</span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#64748b',
                  fontSize: '12px',
                  fontWeight: '400'
                }}>
                  <span>Created {format(new Date(createdAt), 'MMM dd, yyyy')}</span>
                </div>
              </>
            )}
          </div>

          {/* Summary Preview */}
          {summary && (
            <p style={{
              color: '#94a3b8',
              fontSize: '14px',
              lineHeight: '1.6',
              margin: '0 0 20px 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {summary}
            </p>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(59, 130, 246, 0.15)'
          }}>
            <Link 
              to={`/admin/edit/${_id}`}
              style={{
                flex: 1,
                textDecoration: 'none'
              }}
            >
              <button style={{
                width: '100%',
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
              >
                ✏️ Edit Post
              </button>
            </Link>

            <button
              onClick={handleDeleteClick}
              onMouseEnter={() => setIsDeleteHovered(true)}
              onMouseLeave={() => setIsDeleteHovered(false)}
              style={{
                flex: 1,
                padding: '12px 20px',
                background: isDeleteHovered
                  ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  : 'rgba(239, 68, 68, 0.15)',
                color: isDeleteHovered ? '#ffffff' : '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isDeleteHovered 
                  ? '0 6px 20px rgba(239, 68, 68, 0.4)'
                  : '0 4px 12px rgba(239, 68, 68, 0.2)'
              }}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}
        onClick={cancelDelete}
        >
          <div 
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '450px',
              width: '100%',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 20px 60px rgba(239, 68, 68, 0.3)',
              animation: 'slideIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              fontSize: '48px',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              ⚠️
            </div>
            
            <h3 style={{
              color: '#ef4444',
              fontSize: '22px',
              fontWeight: '700',
              textAlign: 'center',
              margin: '0 0 12px 0',
              letterSpacing: '0.02em'
            }}>
              Delete Post?
            </h3>
            
            <p style={{
              color: '#94a3b8',
              fontSize: '15px',
              textAlign: 'center',
              lineHeight: '1.6',
              margin: '0 0 32px 0'
            }}>
              Are you sure you want to delete "<strong style={{ color: '#60a5fa' }}>{name}</strong>"? This action cannot be undone.
            </p>

            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={cancelDelete}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: 'rgba(148, 163, 184, 0.15)',
                  color: '#94a3b8',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(148, 163, 184, 0.25)';
                  e.target.style.color = '#cbd5e1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(148, 163, 184, 0.15)';
                  e.target.style.color = '#94a3b8';
                }}
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(239, 68, 68, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(239, 68, 68, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.4)';
                }}
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </>
  );
};

export default Post;