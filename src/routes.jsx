import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/navbar/navbar.component';
import Register from './screens/Register';
import { ToastContainer } from 'react-toastify';
import Home from './screens/Home';
import Login from './screens/Login';
const Routes = () => {
    return (
        <Router>
            <Navbar/>
            <ToastContainer />
            <Switch>
                <Route exact path='/' component= { Home }/>
                <Route exact path='/register' component= { Register }/>
                <Route exact path='/login' component= { Login }/>
            </Switch>
        </Router> 
    )
}

export default Routes
