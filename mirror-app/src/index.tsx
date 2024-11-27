import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Work from './Components/Work';
import HomePage from './Components/Homepage';
import Dashboardhome from "./Components/Dashboardhome"
import HomeMirror from "./Components/HomeMirror"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
       {/*<Work />*/}
       {/*<HomePage/>*/}
       {/*<Dashboardhome />*/}
      <HashRouter>
     <Routes>
     
     <Route  path="/" element={<HomeMirror />} />
        <Route  path="/" element={<HomePage />} />
         <Route  path="/Work" element={<Work />} />
         
         <Route  path="/app" element={<App />}/>
          
         </Routes>
    </HashRouter>
      
   </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
