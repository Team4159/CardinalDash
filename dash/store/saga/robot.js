import { take, call } from "redux-saga/effects";

import api from "../../api";

import * as c from "../constants.js";

function* robot() {
    for (;;) {
        try {
            // Wait for auth realated actions
            const action = yield take([
                c.ROBOT_CONNECT,
                c.ROBOT_DISCONNECT
            ]);
            switch (action.type) {
                case c.ROBOT_CONNECT: {
                    const address = action.payload.address;

                    yield call(api.robot.connect, address);

                    break;
                }
                case c.ROBOT_DISCONNECT: {
                    yield call(api.robot.disconnect);

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

export default robot;
