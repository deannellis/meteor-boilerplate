import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Switch, Route, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../ui/DashboardPage';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';
import Signup from './../ui/Signup';

const history = createHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    if(isAuthenticated && isUnauthenticatedPage) {
        history.replace('/dashboard');
    } else if(!isAuthenticated && isAuthenticatedPage) {
        history.replace('/');
    }
};

export const routes = (
    <Router history={history}>
        <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/dashboard" component={DashboardPage}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </Router>
);