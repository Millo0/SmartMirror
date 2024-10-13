import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const WorkPage = () => {
        const navigate = useNavigate();
  return (
    <div style={workPageStyle}>
      <h1 style={headingStyle}>Welcome to Scalics Work Page</h1>
      <p style={paragraphStyle}>
        Explore our latest projects and ideas.
      </p>
      <p onClick={() => navigate('/')} style={paragraphStyle}>Home</p>
    </div>
  );
};

// Styles
const workPageStyle: React.CSSProperties = {
  padding: '50px',
  textAlign: 'center',
};

const headingStyle: React.CSSProperties = {
  fontSize: '3rem',
  fontFamily: 'Playfair Display, serif',
  color: '#ffd700', // Gold color for elegance
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  marginTop: '20px',
  lineHeight: '1.8',
  color: '#f5f5f5',
};
const linkStyle: React.CSSProperties = {
        fontSize: '1.5rem',
        fontFamily: 'Playfair Display, serif',
        letterSpacing: '2px',
        cursor: 'pointer',
        color: '#f5f5f5',
      };
export default WorkPage;
