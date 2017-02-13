import { take, call, select, put } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { push } from "react-router-redux";

import api from "../../api";

import * as c from "../constants.js";
import * as s from "../selectors.js";
import * as a from "../actions.js";

function *watcher() {
    // Notice me senpai
    const chan = yield call(chanMaker, api.robot.registerHandlers);

    while (true) {
        const data = yield take(chan);
        yield put(data);
    }
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
