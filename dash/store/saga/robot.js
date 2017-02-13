import { take, call, select } from "redux-saga/effects";
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
                    const address = action.payload.address;

                    const status = yield call(api.robot.connect, address);

                    yield put(a.setStatus(status));
                }
                default:
                    break;
            }
        } catch (e) {
            // uh oh... this should't happen.
        }
    }
}

export default robot;
