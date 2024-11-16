// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css'; 
import App from './App';
// import store from './store'; // Import your store
import store from './app/store';

ReactDOM.render(
  <Provider store={store}> {/* Wrap your app with Provider */}
    <App />
  </Provider>,
  document.getElementById('root')
);
