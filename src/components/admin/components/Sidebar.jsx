import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const navigate = useNavigate();

  const liStyle = {
    textTransform: 'uppercase',
    fontSize: '16px',
    padding: '16px 20px',
    borderTop: '0.5px solid gray',
    fontFamily: 'Muli',
    cursor: 'pointer',
    color: 'white',
  };

  const liHoverStyle = {
    backgroundColor: '#1f2937', // Tailwind's gray-900
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('adminToken');
    // Redirect to login page
    navigate('/admin/login');
  };

  const sidebarLinks = [
    { name: 'home', path: '/admin/home' },
    { name: 'create a blog post', path: '/admin/create' },
    { name: 'blogs', path: '/admin/blog' },
    { name: 'logout', action: handleLogout }, // use action instead of path
  ];

  return (
    <div style={{ width: '25%', minHeight: '100vh', backgroundColor: 'black' }}>
      <div style={{ padding: '40px 20px' }}>
        {/* <img src={logo} alt="" style={{ width: '60%' }} /> */}
        <p style={{ textTransform: 'uppercase', color: 'white', fontFamily: 'Muli' }}>
          Imoh Precious
        </p>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {sidebarLinks.map((link, index) => (
          <li
            key={index}
            style={{ ...liStyle, ...(hoverIndex === index ? liHoverStyle : {}) }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={link.action ? link.action : undefined} // call action if defined
          >
            {link.action ? link.name : <NavLink to={link.path} style={{ textDecoration: 'none', color: 'inherit' }}>{link.name}</NavLink>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
