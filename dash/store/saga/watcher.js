import { take, call, put, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import api from "../../api";
function* watcher() {
    // Notice me senpai
    const chan = yield call(chanMaker, api.robot.updateStateHandler);
    const san = yield call(chanMaker, api.robot.errorHandler);
    const sama = yield call(chanMaker, api.robot.dataHandler);

    yield fork(function* chandler() {
        for (;;) {
            const chanData = yield take(chan);
            yield put(chanData);
        }
    });

    yield fork(function* sandler() {
        for (;;) {
            const sanData = yield take(san);
            yield put(sanData);
        }
    });

    yield fork(function* samadler() {
        for (;;) {
            const samaData = yield take(sama);
            yield put(samaData);
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
};

export default watcher;
