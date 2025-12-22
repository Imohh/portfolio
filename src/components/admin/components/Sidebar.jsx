import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

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

  const sidebarLinks = [
    { name: 'home', path: '/admin/home' },
    { name: 'create a blog post', path: '/admin/create' },
    { name: 'blogs', path: '/admin/blog' },
    
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
          <NavLink key={index} to={link.path} style={{ textDecoration: 'none' }}>
            <li
              style={{ ...liStyle, ...(hoverIndex === index ? liHoverStyle : {}) }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {link.name}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
