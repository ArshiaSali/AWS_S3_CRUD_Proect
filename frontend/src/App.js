import React from 'react';
import { Account } from './components/Accounts';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Dashboard from './components/Dashboard';

export default () => {
    return (
        <Router>
            <Account>
                <Switch>
                    <Route exact path="/" component={FrontPage}/>
                    <Route exact path="/dashboard/:userid" component={Dashboard}/>
                </Switch>
            </Account>
        </Router>
    );
};