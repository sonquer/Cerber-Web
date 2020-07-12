import React from 'react';
import ReactDOM from 'react-dom';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Home from './views/home/Home';
import Availability from './views/availability/Availability';
import Configuration from './views/configuration/Configuration';
import { store, history } from './app/store';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/availability/:id" component={Availability} />
          <Route path="/configuration/:id" component={Configuration} />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
