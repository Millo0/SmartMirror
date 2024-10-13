import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div style={layoutStyle}>
      <header style={headerStyle}>
        <nav>
          <ul style={navStyle}>
            <li><p onClick={() => navigate('/')} style={linkStyle}>Home</p></li>
            <li><p onClick={() => navigate('/work')} style={linkStyle}>Work</p></li>
          </ul>
        </nav>
      </header>

      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
};

// Styles
const layoutStyle: React.CSSProperties = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1a1a2e',
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#0f3460',
  width: '100%',
  padding: '20px 0',
  textAlign: 'center',
  borderBottom: '2px solid #ffd700', // Gold border
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '40px',
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

export default Layout;
