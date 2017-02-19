import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerReducer, routerMiddleware } from "react-router-redux";

import { composeWithDevTools } from "remote-redux-devtools";

import reducers from "./reducers";
import rootSaga from "./saga/index.js";

export const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

export default function configureStore(basicHistory, state) {
    const sagaMiddleware = createSagaMiddleware();
    var store;
    if (state) {
          store = createStore(
            reducer,
            state,
            composeEnhancers(
              applyMiddleware(...[
                    routerMiddleware(basicHistory),
                    sagaMiddleware,
              ])
            )
          );
  } else {
      store = createStore(
        reducer,
        composeEnhancers(
          applyMiddleware(...[
                routerMiddleware(basicHistory),
                sagaMiddleware,
          ])
        )
      );
  }
  sagaMiddleware.run(rootSaga);
  return store;
}
