import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
const electron = (window as any).electron;
const WorkPage = () => {
        const navigate = useNavigate();
        const handleClick = () => navigate('/work');
        const home = () => navigate('/');
        const homeDirectory = electron.homeDir();
        return (
    <div style={workPageStyle}>
      <h1 style={headingStyle}>hello</h1>
      <h1 style={headingStyle}>Welcome to Scalics Work Page</h1>
      <p style={paragraphStyle}>Explore our latest projects and ideas @ {homeDirectory}.<br />

      </p>
      <button  style={paragraphStyle}>Home</button>
      <div>
        <button onClick={home} style={linkStyle}>Home</button>
        <button onClick={handleClick} style={linkStyle}>Work</button>
      </div>
      <main style={mainStyle}>
        <Outlet />
      </main>

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
      const mainStyle: React.CSSProperties = {
        width: '80%',
        padding: '40px',
        borderRadius: '10px',
        backgroundColor: '#16213e',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
      };
export default WorkPage;
