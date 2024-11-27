import React from "react";

const CCTVControls = () => {
  const styles = {
    page: {
      display: "flex",
      height: "100vh",
      background: "linear-gradient(135deg, #00c3ff, #ffff1c)",
      color: "white",
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: "100px",
      background: "linear-gradient(135deg, #141e30, #243b55)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 0",
      gap: "20px",
      boxShadow: "2px 0 10px rgba(0, 0, 0, 0.5)",
    },
    sidebarButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "60px",
      height: "60px",
      background: "linear-gradient(135deg, #243b55, #141e30)",
      borderRadius: "50%",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
      cursor: "pointer",
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    sidebarButtonHover: {
      boxShadow: "0 0 20px #00c3ff, 0 0 40px #00c3ff",
      transform: "scale(1.2)",
    },
    icon: {
      fontSize: "24px",
      color: "white",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: "20px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
    },
    cctvContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.7)",
      borderRadius: "15px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    },
    cctvText: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    cctvImage: {
      width: "100%",
      maxWidth: "800px",
      borderRadius: "10px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },
    button: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #ffff1c, #00c3ff)",
      borderRadius: "50%",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
      cursor: "pointer",
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    buttonHover: {
      transform: "scale(1.1)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.5)",
    },
    label: {
      marginTop: "8px",
      fontSize: "12px",
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div className="sidebar" style={styles.sidebar}>
        {/* TV Button */}
        <div
          style={styles.sidebarButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = styles.sidebarButtonHover.boxShadow;
            e.currentTarget.style.transform = styles.sidebarButtonHover.transform;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <i style={styles.icon}>&#x1F4FA;</i>
        </div>
        {/* Microcontroller Button */}
        <div
          style={styles.sidebarButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = styles.sidebarButtonHover.boxShadow;
            e.currentTarget.style.transform = styles.sidebarButtonHover.transform;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <i style={styles.icon}>&#x1F916;</i>
        </div>
        {/* Tablet Button */}
        <div
          style={styles.sidebarButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = styles.sidebarButtonHover.boxShadow;
            e.currentTarget.style.transform = styles.sidebarButtonHover.transform;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <i style={styles.icon}>&#x1F4F1;</i>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>Home Dashboard</div>
        <div style={styles.cctvContainer}>
          <p style={styles.cctvText}>Live CCTV Feed</p>
          <img
            src="../assets/images/cctv-preview.jpg"
            alt="CCTV Preview"
            style={styles.cctvImage}
          />
        </div>
        <div style={styles.buttonContainer}>
          {/* Power Button */}
          <div
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i style={styles.icon}>&#x23FB;</i>
            <span style={styles.label}>Power</span>
          </div>
          {/* Restart Button */}
          <div
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i style={styles.icon}>&#x21BA;</i>
            <span style={styles.label}>Restart</span>
          </div>
          {/* Battery Button */}
          <div
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i style={styles.icon}>&#x1F50B;</i>
            <span style={styles.label}>100%</span>
          </div>
          {/* Alert Button */}
          <div
            style={styles.button}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i style={styles.icon}>&#x26A0;</i>
            <span style={styles.label}>Alert</span>
          </div>
        </div>
      </div>
      {/* Right Panel */}
      <div
          style={{
            flex: '0.2',
            padding: '20px',
            backgroundColor: '#f1f3f5',
            borderRadius: '0 20px 20px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
              Members
            </p>
            <div
              style={{
                padding: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px',
              }}
            >
              Member 1
            </div>
            <div
              style={{
                padding: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              Member 2
            </div>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              Weather
            </p>
            <p style={{ fontSize: '14px', color: '#6c757d' }}>Sunny, 25°C</p>
          </div>
        </div>
        <div/>
    </div>
  );
};

export default CCTVControls;
