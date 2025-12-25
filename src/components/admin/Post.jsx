import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Post = ({ _id, name, summary, content, coverImage, date, createdAt, onDelete }) => {
  
  const containerStyle = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const imageStyle = {
    width: '50%',
  };

  const titleStyle = {
    textTransform: 'capitalize',
    fontSize: '24px',
	color: "white",
    fontWeight: '600',
    fontFamily: 'Muli',
    margin: 0,
  };

  const textStyle = {
    fontFamily: 'Muli',
    margin: '4px 0',
	color: "white",
  };

  const buttonStyle = {
    fontFamily: 'Muli',
    backgroundColor: '#ef4444', // Tailwind red-500
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
    padding: '8px 20px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div>
        <Link to={`/admin/edit/${_id}`}>
          <img src={coverImage} alt="blog" style={imageStyle} />
        </Link>
      </div>
      <div style={{ paddingTop: '20px' }}>
        <Link to={`/admin/blog/${_id}`}>
          <h2 style={titleStyle}>{name}</h2>
        </Link>
        <p style={textStyle}>{date}</p>
        <p style={textStyle}>{name}</p>
      </div>
      <div>
        <button style={buttonStyle} onClick={() => onDelete(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;