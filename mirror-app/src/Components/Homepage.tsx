import React from 'react';

const HomePage = () => {
  return (
    <div style={homePageStyle}>
      <h1 style={headingStyle}>Welcome to Your Elegant Home Page</h1>
      <p style={paragraphStyle}>
        Experience the blend of modern luxury and simplicity. Explore more in the Work section.
      </p>
    </div>
  );
};

// Styles
const homePageStyle: React.CSSProperties = {
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

export default HomePage;
