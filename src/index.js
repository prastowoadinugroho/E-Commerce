import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './data/store';
import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar/navbar.component';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/' component= { App }/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
