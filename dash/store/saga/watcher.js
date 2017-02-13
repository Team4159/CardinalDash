import { take, call, select, put, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { push } from "react-router-redux";

import api from "../../api";

import * as c from "../constants.js";
import * as s from "../selectors.js";
import * as a from "../actions.js";

function *watcher() {
    // Notice me senpai
    const chan = yield call(chanMaker, api.robot.updateStateHandler);
    const san = yield call(chanMaker, api.robot.errorHandler);

    yield fork(function *chandler() {
        while (true) {
            const chanData = yield take(chan);
            yield put(chanData);
        }
    });

    yield fork(function *sandler() {
        while (true) {
            const sanData = yield take(san);
            yield put(sanData);
        }
    });
}

const chanMaker = (onii) => {
    return eventChannel(emitter => {
        onii(emitter);
        return () => {
            // Don't leave me oniichan ʕ༼◕ ౪ ◕✿༽ʔ
        };
    });
}

export default watcher;
