import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
document.body.style.background = `url(${require('./timg.jpg')}) no-repeat`;
registerServiceWorker();
