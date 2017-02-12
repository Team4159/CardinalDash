import { fork } from "redux-saga/effects";

import robot from "./robot";

function* rootSaga() {
    yield fork(robot);
}

export default rootSaga;
