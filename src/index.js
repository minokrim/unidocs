import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
<<<<<<< HEAD


import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from './dashboard/dashboard';
=======
import App from './App';
import reportWebVitals from './reportWebVitals';
>>>>>>> baa9fa1f00db3c75549f4c06312ce72859ee2f1e

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
  <Dashboard />
=======
    <App />
>>>>>>> baa9fa1f00db3c75549f4c06312ce72859ee2f1e
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
