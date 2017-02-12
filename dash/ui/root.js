import React from "react";

import { Provider } from "react-redux";
import { Router, Route, IndexRoute, Redirect, IndexRedirect } from "react-router";

import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';

import Main from "./main";
import Dashboard from "./dashboard";
import Logs from "./logs";
import Settings from "./settings";
import NotFound from "./notfound";

const Root = ({ store, history }) => (
    <Provider store={store}>
        <ThemeSwitcher themePath="themes" defaultTheme="superhero">
            <Router history={history}>
                <Route path="/" component={Main}>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/logs" component={Logs} />
                    <Route path="/settings" component={Settings} />
                    <Route path='/404' component={NotFound} />
                    <IndexRedirect to="/dashboard" />
                    <Redirect from='*' to='/404' />
                </Route>
            </Router>
        </ThemeSwitcher>
    </Provider>
);

export default Root;
