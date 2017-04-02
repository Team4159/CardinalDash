import { fork } from "redux-saga/effects";

import robot from "./robot";
import watcher from "./watcher";

function* rootSaga() {
    yield fork(robot);
    yield fork(watcher);
}

export default rootSaga;
