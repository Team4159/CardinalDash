import React from "react";

import { Provider } from "react-redux";
import { Router, Route, Redirect, IndexRedirect } from "react-router";

import Main from "./main";
import Dashboard from "./dashboard";
import Logs from "./logs";
import Settings from "./settings";
import NotFound from "./notfound";

const Root = ({ store, history }) => (
    <Provider store={store}>
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
    </Provider>
);

export default Root;
