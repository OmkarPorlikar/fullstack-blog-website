// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { Provider } from 'react-redux';

// ReactDOM.render(<App />, document.getElementById('root'));


import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './ReduxToolkit/store';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider  store={store}>
    <App />
  </Provider>,
);
