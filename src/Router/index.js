import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';
import Dashboard from '../Pages/dashboard';
import UserDetail from '../Pages/userDetail';

const Routing = () => {
    return(
        <Router>
            <Switch>
            <Route exact path="/" >
                <Dashboard />
            </Route>
            <Route path="/employee-form">
                <UserDetail />
            </Route>
            </Switch>
        </Router>
    )
}

export default Routing;