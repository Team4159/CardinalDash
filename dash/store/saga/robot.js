import { take, call, put, select } from "redux-saga/effects";
import { push } from "react-router-redux";

import trim from "trim";

import api from "../../api";

import * as c from "../constants.js";
import * as s from "../selectors.js";
import * as a from "../actions.js";

function* robot() {
    for (;;) {
        try {
            // Wait for auth realated actions
            const action = yield take([
                c.ROBOT_CONNECT
            ]);
            switch (action.type) {
                case c.ROBOT_CONNECT: {
                    // Gather relevent params
                    const { address } = action.payload;

                    // Login
                    const { user, token } = yield call(authWrapper, login, email, password);
                    yield put(a.setUser({
                        token,
                        ...user
                    }));
                    yield put(a.resetLoginForm());

                    // Redirect to the correct page
                    if (!user.teamnumber)
                        yield put(push("/selectTeam"));
                    else
                        yield put(push("/"));
                    break;
                }
                default:
                    break;
            }
        } catch (e) {
            // uh oh... this should't happen.
        }
    }
}

export function* login(email, password) {
    const res = yield call(api.auth.login, trim(email || ""), password);
    if (res.error) throw new Error(res.error.message);
    return res.data;
}

export function* robotWrapper(func, ...args) {
    yield put(a.authLoad());
    const res = yield call(func, ...args);
    yield put(a.authSuccess());
    return res;
}

export default robot;
