import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './data/store';
import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar/navbar.component';
import Register from './screens/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar/>
      <ToastContainer />
      <Switch>
        <Route exact path='/' component= { App }/>
        <Route exact path='/register' component= { Register }/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
