import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    const errorDisplay = document.getElementById('error-display');
    const errorContent = document.getElementById('error-content');
    if (errorDisplay && errorContent) {
      errorDisplay.style.display = 'block';
      errorContent.innerText = String(error);
    }
  }
};

mountApp();