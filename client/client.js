import React from 'react';
import ReactDOM from 'react-dom';
import BultenProvider from './context/context';
import App from './components/index';
import './css/main.scss';

ReactDOM.hydrate(
  <BultenProvider>
    <App />
  </BultenProvider>,
  document.getElementById('ssr'),
);
