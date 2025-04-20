import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './index.css';
import App from './App';

// Add loading indicator while JavaScript loads
const loadingElement = document.createElement('div');
loadingElement.innerHTML = `
  <div id="loading-screen" style="
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9fafb;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s ease-out;
  ">
    <div style="text-align: center;">
      <h1 style="
        font-family: 'Playfair Display', serif;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(to right, #4f46e5, #7c3aed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: fadeIn 1s ease-out;
      ">
        CraftSense
      </h1>
      <div style="
        width: 4rem;
        height: 4rem;
        border: 4px solid #4f46e5;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
      "></div>
      <p style="
        margin-top: 1rem;
        color: #6b7280;
        font-size: 1rem;
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      ">Loading your artisanal experience...</p>
    </div>
  </div>
  <style>
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      50% { opacity: .5; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
  </style>
`;
document.body.appendChild(loadingElement);

// Create root and render app
const root = createRoot(document.getElementById('root')!);

// Render the app and remove loading screen with fade out
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove loading screen after app has rendered
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
    }, 300);
  }
});