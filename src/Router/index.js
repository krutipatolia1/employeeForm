import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Dashboard from '../Pages/dashboard';
import UserDetail from '../Pages/userDetail';
import UserEdit from '../Component/editComponent';

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    <Dashboard />
                </Route>
                <Route path="/employee-form">
                    <UserDetail />
                </Route>
                <Route path="/employee-edit">
                    <UserEdit />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routing;