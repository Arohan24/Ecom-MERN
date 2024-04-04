import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store.js';
import { Provider } from 'react-redux';
import { ThemeProvider } from './utils/context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <ToastContainer />
      <App />
    </ThemeProvider>
  </Provider>
);
