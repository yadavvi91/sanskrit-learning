import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

// Pick the right router based on Vite's resolved BASE_URL:
//   - '/' (local dev) → BrowserRouter (clean URLs, dev server handles fallback)
//   - '/sanskrit-learning/' (GitHub Pages build) → HashRouter so deep-link
//     reloads of /journey/2/47 etc. don't 404 against a static host that
//     doesn't know our routes.
const isHashed = import.meta.env.BASE_URL !== '/';
const Router = isHashed ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
