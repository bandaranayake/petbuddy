import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
