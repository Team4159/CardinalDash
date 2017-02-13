import { createSelector } from "reselect";

import { getStore } from "./reducers/kvs.js";
import { getData } from "./reducers/fetch.js";

export const getDashboardForm = createSelector(
  (state) => state.dashboardForm,
  getStore
);

export const getStatus = createSelector(
    (state) => state.status,
    getStore
);

export const getError = createSelector(
    (state) => state.error,
    getStore
);
