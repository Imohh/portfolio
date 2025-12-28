import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin/home', icon: '🏠' },
    { name: 'Create Post', path: '/admin/create', icon: '✍️' },
    { name: 'All Posts', path: '/admin/blog', icon: '📚' },
    { name: 'Logout', action: handleLogout, icon: '🚪' },
  ];

  return (
    <div style={{ 
      width: '280px',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      borderRight: '1px solid rgba(59, 130, 246, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative gradient accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)',
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
      }} />

      {/* Logo/Brand Section */}
      <div style={{ 
        padding: '32px 24px',
        borderBottom: '1px solid rgba(59, 130, 246, 0.15)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '16px',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)'
        }}>
          <p style={{ 
            color: '#60a5fa',
            fontSize: '18px',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: 0,
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(96, 165, 250, 0.4)'
          }}>
            Imoh Precious
          </p>
          <p style={{
            color: '#94a3b8',
            fontSize: '11px',
            fontWeight: '400',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            margin: '8px 0 0 0',
            textAlign: 'center'
          }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '24px 0' }}>
        <ul style={{ 
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {sidebarLinks.map((link, index) => {
            const isHovered = hoverIndex === index;
            const isLogout = link.action !== undefined;
            
            const linkContent = (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 24px',
                color: isLogout 
                  ? (isHovered ? '#fca5a5' : '#94a3b8')
                  : (isHovered ? '#60a5fa' : '#94a3b8'),
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                background: isHovered 
                  ? (isLogout 
                    ? 'linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)'
                    : 'linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, transparent 100%)')
                  : 'transparent',
                borderLeft: isHovered 
                  ? (isLogout ? '3px solid #ef4444' : '3px solid #3b82f6')
                  : '3px solid transparent'
              }}>
                <span style={{
                  fontSize: '20px',
                  filter: isHovered ? 'brightness(1.3)' : 'brightness(1)',
                  transition: 'all 0.3s ease'
                }}>
                  {link.icon}
                </span>
                <span style={{
                  flex: 1
                }}>
                  {link.name}
                </span>
                {isHovered && !isLogout && (
                  <span style={{
                    fontSize: '16px',
                    opacity: 0.6
                  }}>
                    →
                  </span>
                )}
              </div>
            );

            return (
              <li
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={link.action ? link.action : undefined}
                style={{
                  marginBottom: '4px'
                }}
              >
                {link.action ? (
                  linkContent
                ) : (
                  <NavLink 
                    to={link.path}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      display: 'block',
                      color: 'inherit',
                      ...(isActive && {
                        background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, transparent 100%)',
                        borderLeft: '3px solid #3b82f6'
                      })
                    })}
                  >
                    {linkContent}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Decorative Element */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        padding: '24px',
        borderTop: '1px solid rgba(59, 130, 246, 0.15)'
      }}>
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          padding: '12px 16px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#60a5fa',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            margin: 0
          }}>
            v1.0.0
          </p>
          <p style={{
            color: '#64748b',
            fontSize: '10px',
            margin: '4px 0 0 0'
          }}>
            Blog Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;