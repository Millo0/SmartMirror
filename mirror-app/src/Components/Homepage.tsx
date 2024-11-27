import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const HomePage = () => {
 // const navigate = useNavigate();
 const navigate = useNavigate();

 const handleClick = () => navigate('/work');
 const home = () => navigate('/');
  return (
    <div style={homePageStyle}>
      <h1 style={headingStyle}>Welcome to Your Elegant Home Page</h1>
      <p style={paragraphStyle}>
        Experience the blend of modern luxury and simplicity. Explore more in the Work section.
      </p>
      <div>
       
        {/*</div></div><button onClick={()=>{//navigate('/work')}} style={linkStyle}>Home</button>*/}
        {/*<button onClick={()=>{//</div>navigate('/App')}} style={linkStyle}>App</button>*/}
        
        <div>
        <button onClick={home} style={linkStyle}>Home</button>
        <button onClick={handleClick} style={linkStyle}>App</button>
      </div>
      </div>
      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
};

// Styles
const linkStyle:  React.CSSProperties={
  fontSize: '1.5rem',
  fontFamily: 'Playfair Display, serif',
  letterSpacing: '2px',
  cursor: 'pointer',
  color: '#f5f5f5',
  background: 'none',
  border: 'none',
  margin: '10px',
  textDecoration: 'underline',
};

const mainStyle : React.CSSProperties= {
  width: '80%',
  padding: '40px',
  borderRadius: '10px',
  backgroundColor: '#16213e',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  textAlign: 'center',
};

const homePageStyle: React.CSSProperties= {
  padding: '50px',
  textAlign: 'center',
};

const headingStyle :React.CSSProperties= {
  fontSize: '3rem',
  fontFamily: 'Playfair Display, serif',
  color: '#ffd700',
};

const paragraphStyle :React.CSSProperties= {
  fontSize: '1.5rem',
  marginTop: '20px',
  lineHeight: '1.8',
  color: '#f5f5f5',
};

export default HomePage;
